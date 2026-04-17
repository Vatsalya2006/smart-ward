import { Heart, Droplets, AlertTriangle } from 'lucide-react';
import { conditionColor } from '../utils/helpers';

export default function PatientCard({ patient }) {
  const {
    name = 'Unknown',
    age,
    heart_rate,
    oxygen_level,
    condition = 'Normal',
    ward,
  } = patient;

  const isCritical = (condition || '').toLowerCase() === 'critical';
  const isWarning = (condition || '').toLowerCase() === 'warning';

  return (
    <div
      className={`glass-card-hover p-5 relative overflow-hidden
        ${isCritical ? 'border-red-500/30' : ''}
        ${isWarning ? 'border-amber-500/30' : ''}
      `}
    >
      {/* Glow accent for critical */}
      {isCritical && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
              ${isCritical ? 'bg-red-500/15 text-red-400' : isWarning ? 'bg-amber-500/15 text-amber-400' : 'bg-ward-500/15 text-ward-400'}`}
          >
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-100">{name}</h3>
            <p className="text-xs text-dark-400">
              {age ? `${age} yrs` : ''} {ward ? `· ${ward}` : ''}
            </p>
          </div>
        </div>

        {/* Condition badge */}
        <span
          className={`stat-chip ${
            isCritical
              ? 'badge-critical'
              : isWarning
              ? 'badge-warning'
              : 'badge-normal'
          }`}
        >
          {isCritical && <AlertTriangle className="w-3 h-3" />}
          {condition}
        </span>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-2 gap-3">
        {/* Heart rate */}
        <div className="flex items-center gap-2 bg-dark-900/50 rounded-xl px-3 py-2.5">
          <Heart
            className={`w-4 h-4 ${
              isCritical ? 'text-red-400 animate-heartbeat' : 'text-rose-400'
            }`}
          />
          <div>
            <p className="text-[10px] text-dark-500 uppercase tracking-wider">Heart Rate</p>
            <p className={`text-sm font-bold ${heart_rate > 100 ? 'text-red-400' : 'text-dark-100'}`}>
              {heart_rate ?? '—'} <span className="text-[10px] font-normal text-dark-500">bpm</span>
            </p>
          </div>
        </div>

        {/* Oxygen */}
        <div className="flex items-center gap-2 bg-dark-900/50 rounded-xl px-3 py-2.5">
          <Droplets className={`w-4 h-4 ${oxygen_level < 92 ? 'text-amber-400' : 'text-sky-400'}`} />
          <div>
            <p className="text-[10px] text-dark-500 uppercase tracking-wider">SpO₂</p>
            <p className={`text-sm font-bold ${oxygen_level < 92 ? 'text-amber-400' : 'text-dark-100'}`}>
              {oxygen_level ?? '—'}
              <span className="text-[10px] font-normal text-dark-500">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
