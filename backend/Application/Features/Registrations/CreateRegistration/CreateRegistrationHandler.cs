namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationHandler(IAppDbContext dbContext)
    : ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var normalizedPlate = command.PlateNumber.Trim();

        var plateExists = await dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == normalizedPlate.ToLower(), cancellationToken);

        if (plateExists)
        {
            return Result<RegistrationResponse>.Failure(Error.Conflict(
                "Registration.Conflict",
                $"A registration with plate number '{normalizedPlate}' already exists."));
        }

        var existingNumbers = await dbContext.Registrations
            .Where(r => r.RegistrationNumber.StartsWith("CS27-"))
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        var maxNumber = 0;
        foreach (var regNum in existingNumbers)
        {
            if (int.TryParse(regNum[5..], out var parsed) && parsed > maxNumber)
            {
                maxNumber = parsed;
            }
        }

        var nextRegistrationNumber = $"CS27-{(maxNumber + 1):D4}";
        var fee = CreateRegistrationValidator.GetFee(command.RegistrationType);

        var entity = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = nextRegistrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = normalizedPlate,
            RegistrationType = command.RegistrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        dbContext.Registrations.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Result<RegistrationResponse>.Success(RegistrationResponse.FromEntity(entity));
    }
}