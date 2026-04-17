import { useNavigate } from 'react-router-dom';
import { ShieldOff, ArrowLeft, Users } from 'lucide-react';

export default function StaffAccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="glass-card p-12 max-w-md w-full text-center animate-fade-in">
        {/* Shield Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center border-2 border-red-200">
            <ShieldOff className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Access Denied</h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          You do not have permission to access this patient record.
          Please contact your administrator if you believe this is an error.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/staff/patients')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all"
          >
            <Users className="w-4 h-4" />
            View Assigned Patients
          </button>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
