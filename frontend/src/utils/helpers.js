/**
 * Utility / helper functions used across the application.
 */

/**
 * Return a Tailwind text-colour class based on patient condition.
 */
export const conditionColor = (condition) => {
  const c = (condition || '').toLowerCase();
  if (c === 'critical') return 'text-red-400';
  if (c === 'warning' || c === 'moderate') return 'text-amber-400';
  return 'text-emerald-400';
};

/**
 * Return a Tailwind bg-colour class based on alert severity.
 */
export const alertBgColor = (severity) => {
  const s = (severity || '').toLowerCase();
  if (s === 'critical' || s === 'red') return 'bg-red-500/15 border-red-500/30';
  if (s === 'warning' || s === 'yellow') return 'bg-amber-500/15 border-amber-500/30';
  return 'bg-emerald-500/15 border-emerald-500/30';
};

/**
 * Return a Tailwind text-colour class based on alert severity.
 */
export const alertTextColor = (severity) => {
  const s = (severity || '').toLowerCase();
  if (s === 'critical' || s === 'red') return 'text-red-400';
  if (s === 'warning' || s === 'yellow') return 'text-amber-400';
  return 'text-emerald-400';
};

/**
 * Return a dot colour class for alert severity.
 */
export const alertDotColor = (severity) => {
  const s = (severity || '').toLowerCase();
  if (s === 'critical' || s === 'red') return 'bg-red-500';
  if (s === 'warning' || s === 'yellow') return 'bg-amber-500';
  return 'bg-emerald-500';
};

/**
 * Percentage helper — clamps between 0-100.
 */
export const clampPercent = (value) => Math.max(0, Math.min(100, value));

/**
 * Format a number with commas.
 */
export const formatNumber = (num) =>
  num != null ? Number(num).toLocaleString() : '—';

/**
 * Time-ago helper (very simple).
 */
export const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};
