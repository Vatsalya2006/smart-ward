import {
  BedDouble,
  Stethoscope,
  Wind,
  Syringe,
  Users,
  HeartPulse,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ResourceChart from '../components/ResourceChart';

/* ---------- Mini resource stat card ---------- */
function ResourceStat({ icon: Icon, label, value, accent = 'ward' }) {
  const accents = {
    ward: 'text-ward-400 bg-ward-500/10 border-ward-500/20',
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };
  return (
    <div className="glass-card-hover p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${accents[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-dark-100">{value ?? '—'}</p>
        <p className="text-xs text-dark-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function Resources() {
  const { resources, loading } = useAppContext();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="shimmer-block h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="shimmer-block h-24" />
          ))}
        </div>
        <div className="shimmer-block h-64" />
      </div>
    );
  }

  const r = resources || {};

  const stats = [
    { icon: BedDouble, label: 'Total Beds', value: r.total_beds, accent: 'ward' },
    { icon: BedDouble, label: 'Occupied Beds', value: r.occupied_beds, accent: 'amber' },
    { icon: BedDouble, label: 'Available Beds', value: r.available_beds, accent: 'emerald' },
    { icon: HeartPulse, label: 'ICU Occupied', value: r.icu_occupied, accent: 'rose' },
    { icon: Wind, label: 'Ventilators in Use', value: r.ventilators_in_use, accent: 'sky' },
    { icon: Syringe, label: 'O₂ Cylinders', value: r.oxygen_cylinders, accent: 'violet' },
  ];

  const chartItems = [
    { label: 'General Beds', used: r.occupied_beds ?? 0, total: r.total_beds ?? 1 },
    { label: 'ICU Beds', used: r.icu_occupied ?? 0, total: r.icu_total ?? 1 },
    { label: 'Ventilators', used: r.ventilators_in_use ?? 0, total: r.ventilators_total ?? 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-dark-100 tracking-tight">Resources</h1>
        <p className="text-sm text-dark-400 mt-0.5">Hospital resource allocation &amp; usage</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ResourceStat {...s} />
          </div>
        ))}
      </div>

      {/* Staff */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-5 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '360ms' }}>
          <div className="w-12 h-12 rounded-xl border flex items-center justify-center text-sky-400 bg-sky-500/10 border-sky-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-dark-100">{r.doctors_on_duty ?? '—'}</p>
            <p className="text-xs text-dark-400 mt-0.5">Doctors on Duty</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '420ms' }}>
          <div className="w-12 h-12 rounded-xl border flex items-center justify-center text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-dark-100">{r.nurses_on_duty ?? '—'}</p>
            <p className="text-xs text-dark-400 mt-0.5">Nurses on Duty</p>
          </div>
        </div>
      </div>

      {/* Usage chart */}
      <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '480ms' }}>
        <h2 className="text-sm font-semibold text-dark-200 mb-5">Usage Overview</h2>
        <ResourceChart items={chartItems} />
      </div>
    </div>
  );
}
