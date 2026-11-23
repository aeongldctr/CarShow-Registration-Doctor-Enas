export default function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-zinc-500/20 text-zinc-200 border-zinc-400/30',
    Confirmed: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
    CheckedIn: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    Cancelled: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
  };

  const dots = {
    Pending: 'bg-zinc-400',
    Confirmed: 'bg-sky-400',
    CheckedIn: 'bg-emerald-400',
    Cancelled: 'bg-rose-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${styles[status] || styles.Pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.Pending}`} />
      {status === 'CheckedIn' ? 'Checked In' : status}
    </span>
  );
}