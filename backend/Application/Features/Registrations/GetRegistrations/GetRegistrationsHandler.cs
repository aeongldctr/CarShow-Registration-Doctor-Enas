namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationsHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>>
{
    public async Task<Result<PagedRegistrationsResponse>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var baseQuery = dbContext.Registrations.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var search = query.ParticipantName.Trim().ToLower();
            baseQuery = baseQuery.Where(r => r.ParticipantName.ToLower().Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(query.Type) &&
            Enum.TryParse<RegistrationType>(query.Type.Trim(), ignoreCase: true, out var typeFilter))
        {
            baseQuery = baseQuery.Where(r => r.RegistrationType == typeFilter);
        }

        if (!string.IsNullOrWhiteSpace(query.Status) &&
            Enum.TryParse<RegistrationStatus>(query.Status.Trim(), ignoreCase: true, out var statusFilter))
        {
            baseQuery = baseQuery.Where(r => r.Status == statusFilter);
        }

        var totalCount = await baseQuery.CountAsync(cancellationToken);
        var totalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)query.PageSize);

        var entities = await baseQuery
            .OrderByDescending(r => r.RegistrationDate)
            .ThenByDescending(r => r.RegistrationNumber)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var items = entities.Select(RegistrationResponse.FromEntity).ToList();

        var response = new PagedRegistrationsResponse(
            Items: items,
            Page: query.Page,
            PageSize: query.PageSize,
            TotalCount: totalCount,
            TotalPages: totalPages
        );

        return Result<PagedRegistrationsResponse>.Success(response);
    }
}