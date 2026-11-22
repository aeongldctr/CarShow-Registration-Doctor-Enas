namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;

public sealed record CreateRegistrationCommand(
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    decimal AmountPaid
) : ICommand<Result<RegistrationResponse>>;

public sealed record RegistrationResponse(
    Guid Id,
    string RegistrationNumber,
    DateTime RegistrationDate,
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    string RegistrationType,
    string Status,
    decimal RegistrationFee,
    decimal AmountPaid,
    string PaymentStatus
)
{
    public static RegistrationResponse FromEntity(Registration r)
    {
        var paymentStatus =
            r.AmountPaid <= 0m ? "Unpaid" :
            r.AmountPaid < r.RegistrationFee ? "Partial" :
            "Paid";

        return new RegistrationResponse(
            r.Id,
            r.RegistrationNumber,
            r.RegistrationDate,
            r.ParticipantName,
            r.ContactNumber,
            r.Email,
            r.Address,
            r.CarMakeModel,
            r.PlateNumber,
            r.RegistrationType.ToString(),
            r.Status.ToString(),
            r.RegistrationFee,
            r.AmountPaid,
            paymentStatus
        );
    }
}