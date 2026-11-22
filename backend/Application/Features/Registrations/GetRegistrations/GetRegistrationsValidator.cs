namespace Application.Features.Registrations.GetRegistrations;

using Domain.Enums;
using FluentValidation;

public sealed class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .When(x => x.ParticipantName is not null);

        RuleFor(x => x.Type)
            .Must(BeValidRegistrationType)
            .WithMessage("Type must be one of: Exhibitor, Competitor, VIP.")
            .When(x => !string.IsNullOrWhiteSpace(x.Type));

        RuleFor(x => x.Status)
            .Must(BeValidRegistrationStatus)
            .WithMessage("Status must be one of: Pending, Confirmed, CheckedIn, Cancelled.")
            .When(x => !string.IsNullOrWhiteSpace(x.Status));

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be 1 or greater.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("PageSize must be between 1 and 50.");
    }

    private static bool BeValidRegistrationType(string? value) =>
        Enum.TryParse<RegistrationType>(value, ignoreCase: true, out var parsed) &&
        Enum.IsDefined(parsed);

    private static bool BeValidRegistrationStatus(string? value) =>
        Enum.TryParse<RegistrationStatus>(value, ignoreCase: true, out var parsed) &&
        Enum.IsDefined(parsed);
}