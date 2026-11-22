namespace Application.Features.Registrations.CreateRegistration;

using Domain.Enums;
using FluentValidation;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.ContactNumber)
            .NotEmpty()
            .Matches(@"^09\d{9}$")
            .WithMessage("Contact number must be in PH mobile format 09XXXXXXXXX (11 digits).");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.CarMakeModel)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.PlateNumber)
            .NotEmpty()
            .MaximumLength(15);

        RuleFor(x => x.RegistrationType)
            .IsInEnum()
            .WithMessage("Registration type must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0m)
            .WithMessage("Amount paid must be 0 or more.")
            .Must((cmd, amount) =>
            {
                var fee = GetFee(cmd.RegistrationType);
                return amount <= fee;
            })
            .WithMessage(cmd => $"Amount paid cannot be more than the fee ({GetFee(cmd.RegistrationType):0.##}) for {cmd.RegistrationType}.");
    }

    public static decimal GetFee(RegistrationType type) => type switch
    {
        RegistrationType.Exhibitor => 1500m,
        RegistrationType.Competitor => 2500m,
        RegistrationType.VIP => 5000m,
        _ => throw new ArgumentOutOfRangeException(nameof(type))
    };
}