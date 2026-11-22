namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationByIdHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> HandleAsync(
        GetRegistrationByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.Registrations
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == query.Id, cancellationToken);

        if (entity is null)
        {
            return Result<RegistrationResponse>.Failure(Error.NotFound(
                "Registration.NotFound",
                $"Registration with ID '{query.Id}' was not found."));
        }

        return Result<RegistrationResponse>.Success(RegistrationResponse.FromEntity(entity));
    }
}