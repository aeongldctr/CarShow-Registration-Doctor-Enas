import { AlertTriangle, RefreshCw, SearchX, Car } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(val ?? 0);

const formatDate = (isoString) => {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function RegistrationTable({ items, loading, error, onRetry, onClearFilters }) {
  if (error) {
    return (
      <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-white">Cannot reach the API</h4>
        <p className="text-sm text-zinc-400 max-w-md mt-1">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#d9f99d] text-zinc-950 hover:bg-[#bef264] transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <th className="py-3.5 px-4">Reg. No.</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-4">Participant</th>
            <th className="py-3.5 px-4">Car & Plate</th>
            <th className="py-3.5 px-4">Type</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Fee / Paid</th>
            <th className="py-3.5 px-4 text-center">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-sm">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <td className="py-4 px-4"><div className="h-4 w-20 bg-white/10 rounded" /></td>
                <td className="py-4 px-4"><div className="h-4 w-32 bg-white/10 rounded" /></td>
                <td className="py-4 px-4">
                  <div className="h-4 w-36 bg-white/10 rounded mb-1.5" />
                  <div className="h-3 w-24 bg-white/5 rounded" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-32 bg-white/10 rounded mb-1.5" />
                  <div className="h-3 w-16 bg-white/5 rounded" />
                </td>
                <td className="py-4 px-4"><div className="h-5 w-20 bg-white/10 rounded-full" /></td>
                <td className="py-4 px-4"><div className="h-6 w-24 bg-white/10 rounded-full" /></td>
                <td className="py-4 px-4"><div className="h-4 w-28 bg-white/10 rounded ml-auto" /></td>
                <td className="py-4 px-4"><div className="h-6 w-16 bg-white/10 rounded-full mx-auto" /></td>
              </tr>
            ))
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 px-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mb-3">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-white">No registrations match your filters</p>
                  <p className="text-xs text-zinc-400 mt-1">Try adjusting your search term or resetting the active filters.</p>
                  <button
                    type="button"
                    onClick={onClearFilters}
                    className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            items.map((reg) => (
              <tr key={reg.id} className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-4 font-mono text-xs font-semibold text-red-400 whitespace-nowrap">
                  {reg.registrationNumber}
                </td>
                <td className="py-3.5 px-4 text-xs text-zinc-300 whitespace-nowrap">
                  {formatDate(reg.registrationDate)}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-white">{reg.participantName}</div>
                  <div className="text-xs text-zinc-400">
                    {reg.contactNumber} • {reg.email}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 text-zinc-100 font-medium">
                    <Car className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{reg.carMakeModel}</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/10 font-mono text-[11px] text-zinc-300">
                    {reg.plateNumber}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    reg.registrationType === 'VIP'
                      ? 'bg-purple-500/20 text-purple-200 border-purple-400/30'
                      : reg.registrationType === 'Competitor'
                      ? 'bg-red-500/20 text-red-200 border-red-400/30'
                      : 'bg-white/10 text-zinc-200 border-white/15'
                  }`}>
                    {reg.registrationType}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={reg.status} />
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-xs whitespace-nowrap">
                  <div className="text-zinc-400">{formatCurrency(reg.registrationFee)}</div>
                  <div className="text-white font-semibold">{formatCurrency(reg.amountPaid)}</div>
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <PaymentBadge status={reg.paymentStatus} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}