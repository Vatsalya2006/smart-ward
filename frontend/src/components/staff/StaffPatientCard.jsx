import { useNavigate } from 'react-router-dom';
import { User, AlertTriangle } from 'lucide-react';

export default function StaffPatientCard({ patient, viewMode = 'card' }) {
  const navigate = useNavigate();
  const { id, name, age, gender, contact, lastVisit, status, photo } = patient;

  const statusConfig = {
    critical: { label: 'Critical', cls: 'bg-red-50 text-red-600 border-red-200' },
    moderate: { label: 'Moderate', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    warning: { label: 'Moderate', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    stable: { label: 'Stable', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    normal: { label: 'Stable', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  };

  const s = statusConfig[(status || '').toLowerCase()] || statusConfig.stable;
  const isCritical = (status || '').toLowerCase() === 'critical';

  const handleOpen = () => navigate(`/staff/patient/${id}`);

  if (viewMode === 'table') {
    return (
      <tr className="hover:bg-emerald-50/40 transition-colors group">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
              ${isCritical ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
              {name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-800">{name}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-slate-600">{age}</td>
        <td className="px-4 py-3 text-sm text-slate-600">{gender}</td>
        <td className="px-4 py-3 text-sm text-slate-600">{contact}</td>
        <td className="px-4 py-3 text-sm text-slate-600">{lastVisit}</td>
        <td className="px-4 py-3">
          <span className={`stat-chip text-[10px] border ${s.cls}`}>
            {isCritical && <AlertTriangle className="w-2.5 h-2.5" />}
            {s.label}
          </span>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={handleOpen}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all"
          >
            Open Record
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div
      className={`glass-card-hover p-5 relative overflow-hidden cursor-pointer
        ${isCritical ? 'border-red-300/60' : ''}`}
      onClick={handleOpen}
    >
      {isCritical && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold
            ${isCritical ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
            <p className="text-xs text-slate-500">
              {age} yrs · {gender}
            </p>
          </div>
        </div>

        <span className={`stat-chip text-[10px] border ${s.cls}`}>
          {isCritical && <AlertTriangle className="w-2.5 h-2.5" />}
          {s.label}
        </span>
      </div>

      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-400">Contact</span>
          <span className="font-medium">{contact}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Last Visit</span>
          <span className="font-medium">{lastVisit}</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); handleOpen(); }}
        className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all"
      >
        Open Record
      </button>
    </div>
  );
}
