import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, User, Heart, Droplets, MapPin, Phone, AlertTriangle as AlertTri,
  Activity, FileText, Pill, Calendar, ClipboardList, Download, Shield,
} from 'lucide-react';
import StaffNavbar from '../../components/staff/StaffNavbar';
import Timeline from '../../components/staff/Timeline';
import Tabs from '../../components/staff/Tabs';
import { mockPatients } from '../../data/mockStaffData';

export default function StaffPatientRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const patient = mockPatients.find(p => p.id === id);

  if (!patient) {
    navigate('/staff/access-denied');
    return null;
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: Activity },
    { key: 'history', label: 'Medical History', icon: ClipboardList },
    { key: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { key: 'reports', label: 'Reports', icon: FileText },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
  ];

  const statusCfg = {
    critical: { label: 'Critical', cls: 'bg-red-50 text-red-600 border-red-200' },
    moderate: { label: 'Moderate', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    warning: { label: 'Moderate', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    stable: { label: 'Stable', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    normal: { label: 'Stable', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  };
  const st = statusCfg[(patient.status || '').toLowerCase()] || statusCfg.stable;
  const isCritical = (patient.status || '').toLowerCase() === 'critical';
  const progressPct = patient.treatmentProgress || 0;

  return (
    <div>
      <StaffNavbar />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/staff/patients')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4" /> Patients
        </button>
        <span>/</span>
        <span className="text-slate-700 font-medium">{patient.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Left: Sticky Patient Info ── */}
        <div className="lg:w-[300px] flex-shrink-0">
          <div className="glass-card p-6 lg:sticky lg:top-6 space-y-5">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-3
                ${isCritical ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                {patient.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-slate-800">{patient.name}</h2>
              <p className="text-sm text-slate-500">{patient.id}</p>
              <span className={`stat-chip text-xs border mt-2 ${st.cls}`}>
                {isCritical && <AlertTri className="w-3 h-3" />}
                {st.label}
              </span>
            </div>

            {/* Info List */}
            <div className="space-y-3 text-sm">
              {[
                { label: 'Age', value: `${patient.age} years` },
                { label: 'Gender', value: patient.gender },
                { label: 'Blood Group', value: patient.bloodGroup },
                { label: 'Ward', value: patient.ward },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-emerald-50 pb-2">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-medium text-slate-700">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600"><MapPin className="w-3.5 h-3.5 text-slate-400" />{patient.address}</div>
              <div className="flex items-center gap-2 text-slate-600"><Phone className="w-3.5 h-3.5 text-slate-400" />{patient.contact}</div>
              <div className="flex items-center gap-2 text-slate-600"><Phone className="w-3.5 h-3.5 text-red-400" /><span className="text-[10px] text-red-400 mr-1">Emergency</span>{patient.emergencyContact}</div>
            </div>

            {/* Allergies */}
            {patient.allergies?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Allergies</p>
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-600 border border-red-200">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Tabbed Content ── */}
        <div className="flex-1 min-w-0">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Current Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Diagnosis</p>
                    <p className="text-sm font-semibold text-slate-800">{patient.diagnosis}</p>
                  </div>
                  <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Treatment</p>
                    <p className="text-sm font-semibold text-slate-800">{patient.treatment}</p>
                  </div>
                </div>
              </div>

              {/* Treatment Progress */}
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Treatment Progress</h3>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#ecfdf5" strokeWidth="10" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#progressGrad)" strokeWidth="10"
                        strokeLinecap="round" strokeDasharray={`${progressPct * 2.64} 264`}
                        style={{ transition: 'stroke-dasharray 1s ease-out' }} />
                      <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#059669" /><stop offset="100%" stopColor="#0d9488" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-700">{progressPct}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Treatment is <span className="font-semibold text-emerald-700">{progressPct >= 75 ? 'progressing well' : progressPct >= 50 ? 'on track' : 'in early stages'}</span></p>
                    <p className="text-xs text-slate-400 mt-1">Based on clinical assessment</p>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 flex items-center gap-3">
                  <Heart className={`w-5 h-5 ${isCritical ? 'text-red-500 animate-heartbeat' : 'text-rose-400'}`} />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Heart Rate</p>
                    <p className={`text-lg font-bold ${(patient.heart_rate || 0) > 100 ? 'text-red-600' : 'text-slate-800'}`}>{patient.heart_rate} <span className="text-xs font-normal text-slate-400">bpm</span></p>
                  </div>
                </div>
                <div className="glass-card p-4 flex items-center gap-3">
                  <Droplets className={`w-5 h-5 ${(patient.oxygen_level || 0) < 92 ? 'text-amber-500' : 'text-sky-500'}`} />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">SpO₂</p>
                    <p className={`text-lg font-bold ${(patient.oxygen_level || 0) < 92 ? 'text-amber-600' : 'text-slate-800'}`}>{patient.oxygen_level}<span className="text-xs font-normal text-slate-400">%</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'history' && (
            <div className="animate-fade-in">
              <Timeline events={patient.medicalHistory || []} />
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              {(patient.prescriptions || []).map((rx, idx) => (
                <div key={idx} className="glass-card-hover p-5" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">{rx.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{rx.dosage} · {rx.frequency}</p>
                      <p className="text-[10px] text-emerald-600 font-medium mt-1">Duration: {rx.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              {(patient.reports || []).map((rpt, idx) => (
                <div key={idx} className="glass-card-hover p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{rpt.name}</h4>
                      <p className="text-xs text-slate-500">{rpt.date} · {rpt.type}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-4 animate-fade-in">
              {(patient.appointments || []).map((apt, idx) => {
                const isUpcoming = apt.status === 'upcoming';
                return (
                  <div key={idx} className={`glass-card p-4 flex items-center justify-between ${isUpcoming ? 'border-l-4 border-l-emerald-500' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUpcoming ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">{apt.type}</h4>
                        <p className="text-xs text-slate-500">{apt.doctor} · {apt.date} at {apt.time}</p>
                      </div>
                    </div>
                    <span className={`stat-chip text-[10px] border ${isUpcoming ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
