namespace Application.Features.Registrations.GetRegistrationSummary;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationSummaryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>
{
    public async Task<Result<RegistrationSummaryResponse>> HandleAsync(
        GetRegistrationSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var all = await dbContext.Registrations
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var totalRegistrations = all.Count;
        var confirmed = all.Count(r => r.Status == RegistrationStatus.Confirmed);
        var checkedIn = all.Count(r => r.Status == RegistrationStatus.CheckedIn);
        var pending = all.Count(r => r.Status == RegistrationStatus.Pending);
        var cancelled = all.Count(r => r.Status == RegistrationStatus.Cancelled);

        var activeMoneyRegs = all.Where(r => r.Status != RegistrationStatus.Cancelled).ToList();
        var totalFees = activeMoneyRegs.Sum(r => r.RegistrationFee);
        var totalPayments = activeMoneyRegs.Sum(r => r.AmountPaid);
        var uncollectedPayments = totalFees - totalPayments;

        var response = new RegistrationSummaryResponse(
            TotalRegistrations: totalRegistrations,
            Confirmed: confirmed,
            CheckedIn: checkedIn,
            Pending: pending,
            Cancelled: cancelled,
            TotalFees: totalFees,
            TotalPayments: totalPayments,
            UncollectedPayments: uncollectedPayments
        );

        return Result<RegistrationSummaryResponse>.Success(response);
    }
}