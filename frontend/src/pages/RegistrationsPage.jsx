import { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Car, Trophy, Crown, MapPin, Gauge, Database, Server } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import KpiCards from '../components/KpiCards';
import RegistrationFilters from '../components/RegistrationFilters';
import RegistrationTable from '../components/RegistrationTable';
import Pagination from '../components/Pagination';
import * as sampleApi from '../api/sample-data';
import * as liveApi from '../api/registrationsApi';

export default function RegistrationsPage() {
  const [useLiveApi, setUseLiveApi] = useState(false);
  const api = useLiveApi ? liveApi : sampleApi;

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [tableData, setTableData] = useState({ items: [], page: 1, pageSize: 10, totalCount: 0, totalPages: 1 });
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await api.getSummary();
      setSummary(data);
    } catch (err) {
      console.error('Summary fetch error:', err);
    } finally {
      setSummaryLoading(false);
    }
  }, [api]);

  const fetchTable = useCallback(async () => {
    setTableLoading(true);
    setError(null);
    try {
      const data = await api.getRegistrations({
        participantName: debouncedSearch,
        type: typeFilter,
        status: statusFilter,
        page,
        pageSize,
      });
      setTableData(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to the Car Show API.');
    } finally {
      setTableLoading(false);
    }
  }, [api, debouncedSearch, typeFilter, statusFilter, page, pageSize]);

  useEffect(() => { fetchSummary(); }, [fetchSummary]);
  useEffect(() => { fetchTable(); }, [fetchTable]);

  const handleSearchChange = (val) => { setSearchInput(val); setPage(1); };
  const handleTypeChange = (val) => { setTypeFilter(val); setPage(1); };
  const handleStatusChange = (val) => { setStatusFilter(val); setPage(1); };
  const handlePageSizeChange = (newSize) => { setPageSize(newSize); setPage(1); };
  const handleClearFilters = () => { setSearchInput(''); setTypeFilter('All'); setStatusFilter('All'); setPage(1); };

  const hasActiveFilters = searchInput.trim() !== '' || typeFilter !== 'All' || statusFilter !== 'All';
  const navPills = [
    { label: 'All Entries', value: 'All' },
    { label: 'Exhibitors', value: 'Exhibitor' },
    { label: 'Show & Shine', value: 'Competitor' },
    { label: 'VIP Paddock', value: 'VIP' },
  ];

  return (
    <div className="min-h-screen relative text-zinc-100 p-3 sm:p-6">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/racing-bg.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/75 via-zinc-950/80 to-black/90 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-[1440px] mx-auto glass-panel rounded-[32px] p-4 sm:p-6 flex flex-col lg:flex-row gap-5">
        <aside className="hidden lg:flex flex-col items-center justify-between py-2 px-1.5 glass-card rounded-full w-14 shrink-0">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="w-6 h-[1px] bg-white/10 my-1" />
            {[
              { value: 'All', title: 'All Registrations', Icon: LayoutDashboard },
              { value: 'Exhibitor', title: 'Exhibitors', Icon: Car },
              { value: 'Competitor', title: 'Competitors', Icon: Trophy },
              { value: 'VIP', title: 'VIPs', Icon: Crown },
            ].map(({ value, title, Icon }) => (
              <button
                key={value}
                onClick={() => handleTypeChange(value)}
                title={title}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer ${
                  typeFilter === value ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <div className="text-[10px] font-mono text-zinc-500 rotate-[-90deg] mb-4 tracking-widest">CS27</div>
        </aside>

        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                  AUTOVISTA EVENTS
                </span>
                <span className="text-xs text-zinc-400">Official Staff Portal</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Car Show 2027 Registration
              </h1>
            </div>

            <nav className="flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/10">
              {navPills.map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => handleTypeChange(pill.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    typeFilter === pill.value ? 'bg-white text-zinc-950 shadow' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Sorsogon City Coliseum</span>
              </div>

              <button
                type="button"
                onClick={() => { setUseLiveApi((prev) => !prev); setPage(1); }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  useLiveApi
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                }`}
              >
                {useLiveApi ? <Server className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
                {useLiveApi ? 'Live C# API' : 'Sample Data'}
              </button>
            </div>
          </header>

          <KpiCards summary={summary} loading={summaryLoading} />

          <section className="glass-card rounded-3xl p-4 sm:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">Participant Entries</h2>
              <p className="text-xs text-zinc-400">Manage event check-ins, vehicle categories, and payment balances</p>
            </div>

            <RegistrationFilters
              searchInput={searchInput}
              onSearchChange={handleSearchChange}
              typeFilter={typeFilter}
              onTypeChange={handleTypeChange}
              statusFilter={statusFilter}
              onStatusChange={handleStatusChange}
              onClear={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <RegistrationTable
              items={tableData.items}
              loading={tableLoading}
              error={error}
              onRetry={() => { fetchSummary(); fetchTable(); }}
              onClearFilters={handleClearFilters}
            />

            {!error && (
              <Pagination
                page={tableData.page}
                pageSize={tableData.pageSize}
                totalCount={tableData.totalCount}
                totalPages={tableData.totalPages}
                loading={tableLoading}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}