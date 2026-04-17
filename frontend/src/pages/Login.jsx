import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, User, AlertCircle, Shield, Stethoscope } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultPaths = { Admin: '/', Patient: '/patient', Staff: '/staff/dashboard' };
  const from = location.state?.from?.pathname || defaultPaths[role] || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    try {
      login(email, password, role);
      const dest = defaultPaths[role] || '/';
      navigate(dest, { replace: true });
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ── Gradient Mesh Background ── */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100" />
        {/* Mesh blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-400/15 blur-3xl" />
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* ── Logo & Heading ── */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 transform rotate-3 transition-transform hover:rotate-6">
            <Activity className="w-10 h-10 text-white transform -rotate-3" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-950 tracking-tight">
          Welcome to Smart Ward
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Secure access to your healthcare portal
        </p>
      </div>

      {/* ── Login Card ── */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white/70 py-8 px-4 shadow-2xl shadow-emerald-900/10 backdrop-blur-2xl sm:rounded-2xl sm:px-10 border border-white/60">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Account Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('Admin')}
                  className={`flex justify-center items-center gap-2 py-3 px-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    role === 'Admin'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-200'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Staff')}
                  className={`flex justify-center items-center gap-2 py-3 px-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    role === 'Staff'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-200'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  Staff
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Patient')}
                  className={`flex justify-center items-center gap-2 py-3 px-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    role === 'Patient'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-200'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Patient
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                Email Address
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-11 sm:text-sm border-slate-200 rounded-xl py-3 border-2 bg-white/60 text-slate-800 placeholder-slate-400 transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-11 sm:text-sm border-slate-200 rounded-xl py-3 border-2 bg-white/60 text-slate-800 placeholder-slate-400 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/25 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
