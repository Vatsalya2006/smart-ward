import { useState, useMemo } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PatientCard from '../components/PatientCard';

export default function Patients() {
  const { patients, loading } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | critical | warning | normal

  const filtered = useMemo(() => {
    let list = patients;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => (p.name || '').toLowerCase().includes(q));
    }
    if (filter !== 'all') {
      list = list.filter((p) => (p.condition || '').toLowerCase() === filter);
    }
    return list;
  }, [patients, search, filter]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="shimmer-block h-12 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="shimmer-block h-40" />
          ))}
        </div>
      </div>
    );
  }

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical' },
    { key: 'warning', label: 'Warning' },
    { key: 'normal', label: 'Normal' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-dark-100 tracking-tight">Patients</h1>
        <p className="text-sm text-dark-400 mt-0.5">Monitor all admitted patients</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            placeholder="Search patients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/60 border border-dark-700/40 text-sm text-dark-100 placeholder-dark-500 focus:outline-none focus:border-ward-500/50 transition-colors"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dark-500" />
          {filterButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${filter === key
                  ? 'bg-ward-500/20 text-ward-400 border border-ward-500/30'
                  : 'text-dark-400 hover:text-dark-200 bg-dark-800/40 border border-dark-700/30 hover:border-dark-600/50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient count */}
      <div className="flex items-center gap-2 text-sm text-dark-400">
        <Users className="w-4 h-4" />
        <span>
          Showing <span className="font-semibold text-dark-200">{filtered.length}</span> patient{filtered.length !== 1 && 's'}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-dark-500 text-sm">No patients match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <div key={p._id || i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <PatientCard patient={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
