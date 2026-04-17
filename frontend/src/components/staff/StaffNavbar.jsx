import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { mockNotifications } from '../../data/mockStaffData';

export default function StaffNavbar() {
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const notifRef = useRef(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="glass-card px-4 sm:px-6 py-3 mb-6 flex items-center justify-between gap-4 flex-wrap relative" style={{ zIndex: 30 }}>
      {/* Welcome */}
      <div className="hidden sm:block">
        <h2 className="text-sm font-semibold text-slate-800">Welcome back</h2>
        <p className="text-xs text-slate-500">Medical Staff Portal</p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl bg-white/60 border border-emerald-100 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all backdrop-blur-sm w-56"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="p-2 rounded-xl bg-white/60 border border-emerald-100 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotif && (
            <div
              className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl border border-emerald-100 shadow-2xl shadow-emerald-900/10 overflow-hidden"
              style={{ zIndex: 9999, animation: 'slideUp 0.2s ease-out' }}
            >
              <div className="px-4 py-3 border-b border-emerald-50">
                <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-emerald-50/50 hover:bg-emerald-50/30 transition-colors ${!n.read ? 'bg-emerald-50/50' : ''}`}
                  >
                    <p className="text-xs text-slate-700 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-emerald-50">
                <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
