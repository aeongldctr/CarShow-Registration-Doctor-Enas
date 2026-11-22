using Api.Common;
using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Domain.Common;

namespace Api.Endpoints;

public static class CarShowRegistrationEndpoints
{
    public static void MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
            .WithTags("Registrations");

        group.MapPost("/", async (
            CreateRegistrationCommand command,
            ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>> handler,
            CancellationToken ct) =>
        {
            var result = await handler.HandleAsync(command, ct);
            if (!result.IsSuccess)
            {
                return result.ToProblemDetails();
            }

            return Results.Created($"/api/registrations/{result.Value!.Id}", result.Value);
        })
        .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>();

        group.MapGet("/", async (
            string? participantName,
            string? type,
            string? status,
            IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>> handler,
            CancellationToken ct,
            int page = 1,
            int pageSize = 10) =>
        {
            var query = new GetRegistrationsQuery(participantName, type, status, page, pageSize);
            var result = await handler.HandleAsync(query, ct);
            if (!result.IsSuccess)
            {
                return result.ToProblemDetails();
            }

            return Results.Ok(result.Value);
        })
        .AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>();
    }
}