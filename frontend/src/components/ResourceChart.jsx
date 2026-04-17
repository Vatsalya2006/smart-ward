import { clampPercent } from '../utils/helpers';

/**
 * ResourceChart – visual progress bars for hospital resource usage.
 * Accepts an array of { label, used, total, color? } items.
 */
export default function ResourceChart({ items = [] }) {
  return (
    <div className="space-y-5">
      {items.map(({ label, used, total, color }, idx) => {
        const pct = total > 0 ? clampPercent((used / total) * 100) : 0;
        const barColor =
          color || (pct > 85 ? 'from-red-500 to-red-400' : pct > 60 ? 'from-amber-500 to-amber-400' : 'from-ward-500 to-ward-400');

        return (
          <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-dark-200">{label}</span>
              <span className="text-xs text-dark-400">
                <span className="font-semibold text-dark-200">{used}</span> / {total}{' '}
                <span className={`ml-1 font-bold ${pct > 85 ? 'text-red-400' : pct > 60 ? 'text-amber-400' : 'text-ward-400'}`}>
                  ({Math.round(pct)}%)
                </span>
              </span>
            </div>

            {/* Bar */}
            <div className="progress-track">
              <div
                className={`progress-fill bg-gradient-to-r ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
