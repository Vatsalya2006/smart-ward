import {
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Activity,
  Clock,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StaffNavbar from '../../components/staff/StaffNavbar';
import { mockPatients, mockRecentActivity, mockUpcomingAppointments } from '../../data/mockStaffData';

/* ─────────── Hero Stat Card ─────────── */
function HeroCard({ icon: Icon, label, value, sub, gradient, trend, trendUp }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
      style={{ background: gradient }}
    >
      {/* Decorative circle */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-extrabold text-white">{value}</p>
          <p className="text-xs text-white/70 font-medium mt-0.5">{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-bold ${trendUp ? 'bg-white/20 text-white' : 'bg-white/20 text-white'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      {sub && <p className="text-[10px] text-white/50 mt-2 relative">{sub}</p>}
    </div>
  );
}

/* ─────────── Patient Row (compact) ─────────── */
function PatientRow({ patient, idx }) {
  const navigate = useNavigate();
  const statusCls = {
    critical: 'bg-red-500',
    moderate: 'bg-amber-500',
    warning: 'bg-amber-500',
    stable: 'bg-emerald-500',
    normal: 'bg-emerald-500',
  };
  const dot = statusCls[(patient.status || '').toLowerCase()] || 'bg-emerald-500';

  return (
    <div
      onClick={() => navigate(`/staff/patient/${patient.id}`)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50/60 transition-all cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
        ${patient.status === 'critical' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
        {patient.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{patient.name}</p>
        <p className="text-[10px] text-slate-400">{patient.ward} · {patient.age} yrs</p>
      </div>
      <div className={`w-2 h-2 rounded-full ${dot}`} />
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
    </div>
  );
}

/* ─────────── Status Distribution Donut ─────────── */
function StatusDonut() {
  const critical = mockPatients.filter(p => p.status === 'critical').length;
  const moderate = mockPatients.filter(p => p.status === 'moderate' || p.status === 'warning').length;
  const stable = mockPatients.filter(p => p.status === 'stable' || p.status === 'normal').length;
  const total = mockPatients.length;

  const segments = [
    { label: 'Critical', count: critical, pct: (critical / total) * 100, color: '#ef4444', tailwind: 'bg-red-500 text-red-600' },
    { label: 'Moderate', count: moderate, pct: (moderate / total) * 100, color: '#f59e0b', tailwind: 'bg-amber-500 text-amber-600' },
    { label: 'Stable', count: stable, pct: (stable / total) * 100, color: '#10b981', tailwind: 'bg-emerald-500 text-emerald-600' },
  ];

  // SVG donut
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          {segments.map((seg) => {
            const dashLen = (seg.pct / 100) * circumference;
            const dashOffset = offset;
            offset += dashLen;
            return (
              <circle
                key={seg.label}
                cx="50" cy="50" r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                strokeDashoffset={-dashOffset}
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-slate-800">{total}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-wider">Total</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${s.tailwind.split(' ')[0]}`} />
            <span className="text-xs text-slate-500 w-16">{s.label}</span>
            <span className={`text-sm font-bold ${s.tailwind.split(' ')[1]}`}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════ */
export default function StaffDashboard() {
  const navigate = useNavigate();

  const totalPatients = mockPatients.length;
  const todayAppointments = mockUpcomingAppointments.filter(a => a.date === '2026-04-18').length;
  const pendingReports = 3;
  const criticalAlerts = mockPatients.filter(p => p.status === 'critical').length;
  const criticalPatients = mockPatients.filter(p => p.status === 'critical');

  return (
    <div>
      <StaffNavbar />

      <div className="space-y-6">
        {/* ── Header ── */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-emerald-900 tracking-tight">Overview</h1>
            <p className="text-sm text-slate-500 mt-0.5">Your daily overview</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 stat-chip badge-stable">
            <Activity className="w-3 h-3" />
            <span>Live</span>
          </div>
        </div>

        {/* ── Hero Cards Row (gradient cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <HeroCard
            icon={Users} label="Assigned Patients" value={totalPatients}
            sub="Currently under your care"
            gradient="linear-gradient(135deg, #059669 0%, #0d9488 100%)"
            trend="+2" trendUp
          />
          <HeroCard
            icon={Calendar} label="Today's Appointments" value={todayAppointments}
            sub="Scheduled for today"
            gradient="linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)"
          />
          <HeroCard
            icon={FileText} label="Pending Reports" value={pendingReports}
            sub="Awaiting your review"
            gradient="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)"
            trend="1 urgent" trendUp={false}
          />
          <HeroCard
            icon={AlertTriangle} label="Critical Alerts" value={criticalAlerts}
            sub="Immediate attention needed"
            gradient="linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
          />
        </div>

        {/* ── 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* LEFT: 3/5 width — Patient overview + Activity */}
          <div className="lg:col-span-3 space-y-5">

            {/* Status Distribution + Critical Patients side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Donut chart */}
              <div className="glass-card p-5 animate-slide-up">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Patient Status
                </h3>
                <StatusDonut />
              </div>

              {/* Critical Patients mini list */}
              <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Critical Patients
                  </h3>
                  <span className="stat-chip badge-critical text-[10px]">{criticalAlerts}</span>
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {criticalPatients.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No critical patients 🎉</p>
                  ) : (
                    criticalPatients.map((p, i) => <PatientRow key={p.id} patient={p} idx={i} />)
                  )}
                </div>
              </div>
            </div>

            {/* All patients compact list */}
            <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '160ms' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  All Assigned Patients
                </h3>
                <button
                  onClick={() => navigate('/staff/patients')}
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
                {mockPatients.map((p, i) => <PatientRow key={p.id} patient={p} idx={i} />)}
              </div>
            </div>
          </div>

          {/* RIGHT: 2/5 width — Appointments, Activity, Quick Actions */}
          <div className="lg:col-span-2 space-y-5">

            {/* Upcoming Appointments */}
            <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Upcoming Appointments
              </h3>
              <div className="space-y-2.5">
                {mockUpcomingAppointments.slice(0, 4).map((apt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/30 border border-emerald-100/50 hover:border-emerald-200 transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 70}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{apt.patient}</p>
                      <p className="text-[10px] text-slate-400">{apt.type}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-emerald-700">{apt.time}</p>
                      <p className="text-[10px] text-slate-400">{apt.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                Recent Activity
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-100" />
                <div className="space-y-4">
                  {mockRecentActivity.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-start gap-3 pl-5 animate-fade-in"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                        item.type === 'medication' ? 'bg-amber-400' :
                        item.type === 'update' ? 'bg-blue-400' :
                        item.type === 'report' ? 'bg-violet-400' :
                        item.type === 'assignment' ? 'bg-teal-400' :
                        'bg-emerald-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 font-medium leading-snug">{item.action}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate('/staff/patients')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 hover:-translate-y-0.5 transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">Patients</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-sky-700 hover:bg-sky-100 hover:border-sky-300 hover:-translate-y-0.5 transition-all">
                  <FileText className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">Reports</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50/60 border border-amber-100 text-amber-700 hover:bg-amber-100 hover:border-amber-300 hover:-translate-y-0.5 transition-all">
                  <Calendar className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">Schedule</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-violet-50/60 border border-violet-100 text-violet-700 hover:bg-violet-100 hover:border-violet-300 hover:-translate-y-0.5 transition-all">
                  <Activity className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">Vitals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
