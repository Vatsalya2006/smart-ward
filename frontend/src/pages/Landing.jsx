import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Shield,
  Brain,
  HeartPulse,
  Users,
  Zap,
  ArrowRight,
  ChevronRight,
  Monitor,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: HeartPulse, title: 'Real-Time Monitoring', desc: 'Track patient vitals, heart rate, and oxygen levels in real time with intelligent alerts.' },
    { icon: Brain, title: 'AI-Powered Insights', desc: 'Smart recommendations and predictive analytics to improve clinical decision-making.' },
    { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with role-based access control for every staff member.' },
    { icon: Monitor, title: 'Resource Management', desc: 'Optimize bed allocation, equipment usage, and staff scheduling efficiently.' },
  ];


  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a1628' }}>

      {/* ════════════ NAVBAR ════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-satoshi font-black text-white tracking-tighter drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] hover:drop-shadow-[0_0_20px_rgba(52,211,153,1)] transition-all cursor-default">Smart Ward</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
              <Zap className="w-4 h-4" /> Features
            </a>
            <a href="#about" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
              <Users className="w-4 h-4" /> About
            </a>
            <a href="#stats" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
              <Activity className="w-4 h-4" /> Impact
            </a>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
          >
            Login
          </button>
        </div>
      </nav>

      {/* ════════════ HERO SECTION ════════════ */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center py-24">
        {/* Premium Deep Background */}
        <div className="absolute inset-0 bg-[#050b14] -z-10" />
        
        {/* Subtle Noise Texture for depth */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none -z-10" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Dynamic Multi-Color Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/10 blur-[130px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-teal-800/10 blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              Next-Gen Healthcare Technology
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="text-white block pb-2">Where AI Meets</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Patient Care</span>
            </h1>

            <p className="text-lg text-slate-200 opacity-80 leading-relaxed max-w-lg font-medium">
              Transform patient care with intelligent monitoring, AI-driven insights, 
              and seamless resource management — all in one powerful platform.
            </p>

            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-5">
                <button
                  onClick={() => navigate('/login')}
                  className="group px-8 py-4 rounded-xl text-lg font-extrabold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="px-8 py-4 rounded-xl text-base font-medium text-slate-400 border border-slate-700/50 hover:bg-slate-800/50 hover:text-white hover:border-slate-500 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
              
              {/* Helper Text */}
              <p className="text-sm text-slate-500 mt-5 flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500/60" />
                Start managing wards in under 2 minutes
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              {[
                { icon: CheckCircle, text: 'HIPAA Compliant' },
                { icon: Shield, text: 'ISO 27001' },
                { icon: Clock, text: '24/7 Monitoring' },
              ].map(({ icon: Ic, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Ic className="w-4 h-4 text-emerald-500/70" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Single Hero Image */}
          <div className="relative hidden lg:block w-full">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/40 border border-white/10 aspect-square max-h-[600px] w-full bg-slate-900">
              <img
                src="/images/hospital-hero.png"
                alt="Modern hospital corridor"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════ FEATURES ════════════ */}
      <section id="features" className="py-24 relative">
        <div className="absolute top-0 left-[30%] w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Everything You Need to
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Deliver Better Care</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to optimize every aspect of hospital ward management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Ic, title, desc }, idx) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/20 transition-all">
                  <Ic className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ ABOUT / HORIZONTAL IMAGE SECTION ════════════ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images — horizontal collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <img src="/images/hospital-hero.png" alt="Hospital" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <img src="/images/medical-tech.png" alt="Technology" className="w-full h-32 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <img src="/images/hospital-ward.png" alt="Ward" className="w-full h-32 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>

                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl" />
            </div>

            {/* Text content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                About Smart Ward
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Your Destination for
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> World-Class</span> Patient Care
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Smart Ward is your all-in-one platform for modern hospital management — 
                combining <span className="text-white font-medium">compassionate care</span> with 
                <span className="text-white font-medium"> cutting-edge technology</span>. From real-time patient 
                monitoring to AI-driven diagnostics, we bring everything under one roof.
              </p>
              <ul className="space-y-3">
                {[
                  'Intelligent patient monitoring & alert systems',
                  'Resource optimization & bed management',
                  'Multi-portal access for Admin, Staff & Patients',
                  'Secure, HIPAA-compliant data handling',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="group mt-4 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                Start Using Smart Ward
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-emerald-900/30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join hundreds of healthcare facilities already using Smart Ward to deliver better patient outcomes.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 flex items-center gap-2 mx-auto"
          >
            Login to Your Portal
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-slate-400">Smart Ward</span>
            <span className="text-xs text-slate-600">© 2026</span>
          </div>
          <p className="text-xs text-slate-600">Healthcare AI — Built for better patient outcomes</p>
        </div>
      </footer>
    </div>
  );
}
