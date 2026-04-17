import { useState, useMemo } from 'react';
import { Bell, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AlertBox from '../components/AlertBox';

export default function Alerts() {
  const { alerts, loading } = useAppContext();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return alerts;
    return alerts.filter(
      (a) => (a.severity || '').toLowerCase() === filter || false
    );
  }, [alerts, filter]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="shimmer-block h-10 w-40" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shimmer-block h-16" />
        ))}
      </div>
    );
  }

  const filterButtons = [
    { key: 'all', label: 'All', color: '' },
    { key: 'critical', label: 'Critical', color: 'text-red-600' },
    { key: 'warning', label: 'Moderate', color: 'text-amber-600' },
    { key: 'normal', label: 'Stable', color: 'text-emerald-600' },
  ];

  const counts = {
    all: alerts.length,
    critical: alerts.filter((a) => (a.severity || '').toLowerCase() === 'critical').length,
    warning: alerts.filter((a) => (a.severity || '').toLowerCase() === 'warning').length,
    normal: alerts.filter((a) => (a.severity || '').toLowerCase() === 'normal').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-900 tracking-tight">Alerts</h1>
        <p className="text-sm text-slate-500 mt-0.5">Real-time hospital notifications</p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', count: counts.all, cls: 'bg-white/70 text-slate-700 border-slate-200' },
          { label: 'Critical', count: counts.critical, cls: 'bg-red-50 text-red-600 border-red-200' },
          { label: 'Moderate', count: counts.warning, cls: 'bg-amber-50 text-amber-600 border-amber-200' },
          { label: 'Stable', count: counts.normal, cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
        ].map(({ label, count, cls }) => (
          <div key={label} className={`rounded-xl border p-4 text-center ${cls}`}>
            <p className="text-xl font-bold">{count}</p>
            <p className="text-xs opacity-70 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        {filterButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${filter === key
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'text-slate-500 hover:text-emerald-700 bg-white/60 border border-slate-200 hover:border-emerald-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No alerts to display.</p>
          </div>
        ) : (
          filtered.map((a, i) => (
            <div key={a._id || i} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <AlertBox alert={a} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
