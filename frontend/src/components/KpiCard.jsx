import { ArrowUpRight } from 'lucide-react';

export default function KpiCard({ title, value, subtitle, icon: Icon, accent = 'default', loading }) {
  const accentStyles = {
    lime: 'bg-[#d9f99d] text-zinc-950 border-[#d9f99d]',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    default: 'bg-white/10 text-white border-white/15',
  };

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${accentStyles[accent]}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</p>
        {loading ? (
          <div className="h-8 w-28 bg-white/10 animate-pulse rounded-lg mt-1.5" />
        ) : (
          <h3 className="text-2xl font-bold tracking-tight text-white mt-1">{value}</h3>
        )}
        {subtitle && <p className="text-xs text-zinc-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}