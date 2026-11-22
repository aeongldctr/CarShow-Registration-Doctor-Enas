using System.Text.Json.Serialization;
using Api.Endpoints;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// JSON enums as strings
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// CORS for React dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=carshow.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddScoped<IAppDbContext>(sp =>
    sp.GetRequiredService<AppDbContext>());

// Validators
builder.Services.AddValidatorsFromAssembly(typeof(IAppDbContext).Assembly);

// Handlers
builder.Services.AddScoped<ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>, CreateRegistrationHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>>, GetRegistrationsHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>, GetRegistrationByIdHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>, GetRegistrationSummaryHandler>();

// API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "Car Show 2027 Registration API";
        document.Info.Description = "Vertical Slice API for Car Show Registration System";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Apply migrations and seed 25 registrations if empty
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();

    if (!dbContext.Registrations.Any())
    {
        var baseDate = new DateTime(2027, 2, 1, 8, 0, 0, DateTimeKind.Utc);
        var types = new[] { RegistrationType.Exhibitor, RegistrationType.Competitor, RegistrationType.VIP };
        var statuses = new[]
        {
            RegistrationStatus.Pending,
            RegistrationStatus.Confirmed,
            RegistrationStatus.CheckedIn,
            RegistrationStatus.Cancelled
        };

        var seeds = new List<Registration>();
        for (int i = 1; i <= 25; i++)
        {
            var type = types[(i - 1) % types.Length];
            var status = statuses[(i - 1) % statuses.Length];
            var fee = type switch
            {
                RegistrationType.Exhibitor => 1500m,
                RegistrationType.Competitor => 2500m,
                RegistrationType.VIP => 5000m,
                _ => 1500m
            };

            // Cycle through Unpaid (0), Partial (half fee), and Paid (full fee)
            var amountPaid = (i % 3) switch
            {
                1 => 0m,
                2 => Math.Round(fee * 0.5m, 2),
                _ => fee
            };

            seeds.Add(new Registration
            {
                Id = Guid.NewGuid(),
                RegistrationNumber = $"CS27-{i:D4}",
                RegistrationDate = baseDate.AddMinutes(i * 15),
                ParticipantName = $"Participant {i:D2} Cruz",
                ContactNumber = $"09{170000000 + i:D9}",
                Email = $"participant{i:D2}@carshow2027.ph",
                Address = $"{100 + i} Magsaysay Ave., Sorsogon City",
                CarMakeModel = i % 2 == 0 ? $"Toyota GR86 #{i}" : $"Nissan GT-R #{i}",
                PlateNumber = $"SGN {1000 + i:D4}",
                RegistrationType = type,
                Status = status,
                RegistrationFee = fee,
                AmountPaid = amountPaid
            });
        }

        dbContext.Registrations.AddRange(seeds);
        dbContext.SaveChanges();
    }
}

// Configure the HTTP request pipeline
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Root endpoint
app.MapGet("/", () => "Welcome to the Vertical Slice API! Go to /scalar/v1 for API documentation.");

// Map endpoints
app.MapRegistrationEndpoints();

app.Run();