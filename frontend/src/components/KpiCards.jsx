import { Users, Wallet, AlertCircle, CheckCircle2, Flag } from 'lucide-react';
import KpiCard from './KpiCard';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount ?? 0);

export default function KpiCards({ summary, loading }) {
  const collectionRate =
    summary && summary.totalFees > 0
      ? Math.round((summary.totalPayments / summary.totalFees) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KpiCard
        title="Total Registrations"
        value={summary?.totalRegistrations ?? 0}
        subtitle={`${summary?.pending ?? 0} Pending • ${summary?.cancelled ?? 0} Cancelled`}
        icon={Users}
        accent="lime"
        loading={loading}
      />
      <KpiCard
        title="Total Payments"
        value={formatCurrency(summary?.totalPayments)}
        subtitle={`${collectionRate}% collection rate`}
        icon={Wallet}
        accent="emerald"
        loading={loading}
      />
      <KpiCard
        title="Uncollected"
        value={formatCurrency(summary?.uncollectedPayments)}
        subtitle="Remaining balance due"
        icon={AlertCircle}
        accent="red"
        loading={loading}
      />
      <KpiCard
        title="Confirmed"
        value={summary?.confirmed ?? 0}
        subtitle="Verified event slots"
        icon={CheckCircle2}
        accent="default"
        loading={loading}
      />
      <KpiCard
        title="Checked In"
        value={summary?.checkedIn ?? 0}
        subtitle="On-site at Sorsogon Coliseum"
        icon={Flag}
        accent="default"
        loading={loading}
      />
    </div>
  );
}