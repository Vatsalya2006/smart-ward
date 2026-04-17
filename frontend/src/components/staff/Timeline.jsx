/**
 * Timeline component for displaying medical history events.
 */
export default function Timeline({ events = [] }) {
  const typeConfig = {
    admission: { color: 'bg-blue-500', ring: 'ring-blue-100' },
    surgery: { color: 'bg-red-500', ring: 'ring-red-100' },
    diagnosis: { color: 'bg-amber-500', ring: 'ring-amber-100' },
    visit: { color: 'bg-emerald-500', ring: 'ring-emerald-100' },
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent" />

      <div className="space-y-6">
        {events.map((event, idx) => {
          const config = typeConfig[event.type] || typeConfig.visit;
          return (
            <div
              key={idx}
              className="relative flex items-start gap-4 pl-10 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Dot */}
              <div className={`absolute left-[9px] top-1.5 w-3 h-3 rounded-full ${config.color} ring-4 ${config.ring} z-10`} />
              
              {/* Content */}
              <div className="flex-1 bg-white/60 rounded-xl border border-emerald-100/50 p-3 hover:bg-white/80 hover:border-emerald-200 transition-all">
                <p className="text-sm font-medium text-slate-800">{event.event}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{event.date}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize
                    ${event.type === 'surgery' ? 'bg-red-50 text-red-600' :
                      event.type === 'diagnosis' ? 'bg-amber-50 text-amber-600' :
                      event.type === 'admission' ? 'bg-blue-50 text-blue-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
