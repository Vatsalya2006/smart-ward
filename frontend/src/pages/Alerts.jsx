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
    { key: 'critical', label: 'Critical', color: 'text-red-400' },
    { key: 'warning', label: 'Warning', color: 'text-amber-400' },
    { key: 'normal', label: 'Normal', color: 'text-emerald-400' },
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
        <h1 className="text-2xl font-extrabold text-dark-100 tracking-tight">Alerts</h1>
        <p className="text-sm text-dark-400 mt-0.5">Real-time hospital notifications</p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', count: counts.all, cls: 'bg-dark-800/60 text-dark-200 border-dark-700/40' },
          { label: 'Critical', count: counts.critical, cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
          { label: 'Warning', count: counts.warning, cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
          { label: 'Normal', count: counts.normal, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        ].map(({ label, count, cls }) => (
          <div key={label} className={`rounded-xl border p-4 text-center ${cls}`}>
            <p className="text-xl font-bold">{count}</p>
            <p className="text-xs opacity-70 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
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

      {/* Alert list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Bell className="w-8 h-8 text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500 text-sm">No alerts to display.</p>
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
