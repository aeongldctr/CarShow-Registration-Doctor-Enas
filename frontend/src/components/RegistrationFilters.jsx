import { Search, RotateCcw, Filter } from 'lucide-react';

export default function RegistrationFilters({
  searchInput,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search participant name..."
          aria-label="Search participant name"
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-2">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <label htmlFor="type-filter" className="text-xs text-zinc-400">Type:</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-900">All Types</option>
            <option value="Exhibitor" className="bg-zinc-900">Exhibitor</option>
            <option value="Competitor" className="bg-zinc-900">Competitor</option>
            <option value="VIP" className="bg-zinc-900">VIP</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-2">
          <label htmlFor="status-filter" className="text-xs text-zinc-400">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-900">All Statuses</option>
            <option value="Pending" className="bg-zinc-900">Pending</option>
            <option value="Confirmed" className="bg-zinc-900">Confirmed</option>
            <option value="CheckedIn" className="bg-zinc-900">Checked In</option>
            <option value="Cancelled" className="bg-zinc-900">Cancelled</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40 border border-white/10 text-zinc-200 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear filters
        </button>
      </div>
    </div>
  );
}