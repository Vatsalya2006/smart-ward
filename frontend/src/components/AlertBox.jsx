import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { alertBgColor, alertTextColor, alertDotColor, timeAgo } from '../utils/helpers';

export default function AlertBox({ alert }) {
  const {
    message = 'Unknown alert',
    severity = 'normal',
    timestamp,
  } = alert;

  const s = (severity || '').toLowerCase();
  const Icon = s === 'critical' || s === 'red'
    ? AlertTriangle
    : s === 'warning' || s === 'yellow'
    ? AlertCircle
    : CheckCircle;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${alertBgColor(severity)}`}
    >
      {/* Dot / Icon */}
      <div className="pt-0.5">
        <Icon className={`w-4 h-4 ${alertTextColor(severity)}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${alertTextColor(severity)}`}>
          {message}
        </p>
        {timestamp && (
          <p className="text-[10px] text-dark-500 mt-1">{timeAgo(timestamp)}</p>
        )}
      </div>

      {/* Live dot for critical */}
      {(s === 'critical' || s === 'red') && (
        <span className="relative flex h-2.5 w-2.5 mt-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${alertDotColor(severity)}`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${alertDotColor(severity)}`} />
        </span>
      )}
    </div>
  );
}
