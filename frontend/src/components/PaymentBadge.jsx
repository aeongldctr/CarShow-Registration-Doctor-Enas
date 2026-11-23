export default function PaymentBadge({ status }) {
  const styles = {
    Unpaid: 'bg-red-500/20 text-red-300 border-red-500/40',
    Partial: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Paid: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${styles[status] || styles.Unpaid}`}>
      {status}
    </span>
  );
}