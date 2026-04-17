import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  Warehouse,
  Activity,
  Menu,
  X,
  RefreshCw,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/resources', label: 'Resources', icon: Warehouse },
  { to: '/alerts', label: 'Alerts', icon: Bell },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { refresh, lastUpdated, alerts } = useAppContext();
  const location = useLocation();

  const criticalCount = alerts.filter(
    (a) => (a.severity || '').toLowerCase() === 'critical'
  ).length;

  return (
    <>
      {/* ---------- Sidebar (desktop) ---------- */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[260px] bg-dark-900/80 backdrop-blur-2xl border-r border-dark-700/40 z-50">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-dark-700/40">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ward-500 to-ward-700 flex items-center justify-center shadow-lg shadow-ward-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight gradient-text">Smart Ward</h1>
            <p className="text-[10px] text-dark-400 font-medium uppercase tracking-widest">Healthcare AI</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? 'bg-ward-500/15 text-ward-400 shadow-inner'
                    : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/60'
                  }`}
              >
                <Icon className={`w-[18px] h-[18px] transition-colors ${active ? 'text-ward-400' : 'text-dark-500 group-hover:text-dark-300'}`} />
                {label}
                {label === 'Alerts' && criticalCount > 0 && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {criticalCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-5 space-y-3">
          <button
            onClick={refresh}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-dark-300 bg-dark-800/60 hover:bg-dark-800 hover:text-ward-400 transition-all border border-dark-700/40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Data
          </button>
          {lastUpdated && (
            <p className="text-[10px] text-dark-500 text-center">
              Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </aside>

      {/* ---------- Mobile top-bar ---------- */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-16 bg-dark-900/90 backdrop-blur-2xl border-b border-dark-700/40 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ward-500 to-ward-700 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold gradient-text">Smart Ward</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={refresh} className="p-2 rounded-lg text-dark-400 hover:text-ward-400 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg text-dark-400 hover:text-white transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav className="absolute top-16 right-0 w-64 bg-dark-900 border-l border-dark-700/40 h-[calc(100vh-4rem)] p-4 space-y-1 animate-slide-in-right">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-ward-500/15 text-ward-400'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/60'
                  }`
                }
              >
                <Icon className="w-[18px] h-[18px]" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
