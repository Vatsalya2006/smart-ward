import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  Warehouse,
  Activity,
  Menu,
  X,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Clinical Insights', icon: LayoutDashboard },
  { to: '/admin/patients', label: 'Patients', icon: Users },
  { to: '/admin/resources', label: 'Resources', icon: Warehouse },
  { to: '/admin/alerts', label: 'Alerts', icon: Bell },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { refresh, lastUpdated, alerts } = useAppContext();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const criticalCount = alerts.filter(
    (a) => (a.severity || '').toLowerCase() === 'critical'
  ).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* ---------- Sidebar (desktop) ---------- */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[260px] bg-emerald-950 z-50">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-emerald-800/60">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Smart Ward</h1>
            <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest">Healthcare AI</p>
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
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-emerald-200/60 hover:text-emerald-100 hover:bg-emerald-900/60'
                  }`}
              >
                <Icon className={`w-[18px] h-[18px] transition-colors ${active ? 'text-emerald-300' : 'text-emerald-500/50 group-hover:text-emerald-300/70'}`} />
                {label}
                {label === 'Alerts' && criticalCount > 0 && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {criticalCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-5 space-y-3 border-t border-emerald-800/60 pt-5">
          <button
            onClick={refresh}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-emerald-300/80 bg-emerald-900/60 hover:bg-emerald-900 hover:text-emerald-200 transition-all border border-emerald-700/40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Data
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>

          {lastUpdated && (
            <p className="text-[10px] text-emerald-600 text-center">
              Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </aside>

      {/* ---------- Mobile top-bar ---------- */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-16 bg-emerald-950 flex items-center justify-between px-4 z-50 shadow-lg shadow-emerald-900/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white">Smart Ward</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={refresh} className="p-2 rounded-lg text-emerald-400/60 hover:text-emerald-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg text-emerald-200 hover:text-white transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav className="absolute top-16 right-0 w-64 bg-emerald-950 border-l border-emerald-800/60 h-[calc(100vh-4rem)] p-4 space-y-1 animate-slide-in-right shadow-xl">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-emerald-200/60 hover:text-emerald-100 hover:bg-emerald-900/60'
                  }`
                }
              >
                <Icon className="w-[18px] h-[18px]" />
                {label}
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-emerald-800/60">
               <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
