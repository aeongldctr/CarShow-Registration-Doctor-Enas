import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pageSize, totalCount, totalPages, loading, onPageChange, onPageSizeChange }) {
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-zinc-300">
      <div className="flex items-center gap-4">
        <span>
          Showing <strong className="text-white">{startItem}–{endItem}</strong> of{' '}
          <strong className="text-white">{totalCount}</strong>
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-zinc-400">Per page:</label>
          <select
            id="page-size"
            value={pageSize}
            disabled={loading}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white focus:outline-none cursor-pointer disabled:opacity-50"
          >
            <option value={5} className="bg-zinc-900">5</option>
            <option value={10} className="bg-zinc-900">10</option>
            <option value={20} className="bg-zinc-900">20</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            disabled={loading}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-full font-semibold transition cursor-pointer disabled:opacity-50 ${
              pageNum === page
                ? 'bg-[#d9f99d] text-zinc-950 shadow-sm'
                : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          disabled={loading || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}