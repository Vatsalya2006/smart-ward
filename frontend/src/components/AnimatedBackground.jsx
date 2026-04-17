import { useEffect, useRef, useState } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const [cssMouse, setCssMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      setCssMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas wave rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.003; // Animation speed

      // Interpolate mouse for smooth organic reaction
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waves = 7; // Number of overlapping waves
      
      for (let i = 0; i < waves; i++) {
        ctx.beginPath();

        const depth = (i + 1) / waves; // 0.14 to 1.0
        const mouseEffectY = mouseRef.current.currentY * 150 * depth;
        const mouseEffectX = mouseRef.current.currentX * 100 * depth;

        // Dark Blue to Teal to Neon Green gradient
        const hue = 180 + (i * 15); // 180 (teal/blue) to ~270, wait neon green is hue ~140. 
        // Let's map depth to colors: background waves are blue (220), foreground are neon green (140)
        const customHue = 220 - (depth * 80); 
        
        ctx.strokeStyle = `hsla(${customHue}, 100%, 60%, ${0.05 + (depth * 0.15)})`;
        ctx.lineWidth = 1 + (depth * 2.5);

        for (let x = 0; x <= canvas.width + 50; x += 10) {
          const normalizedX = x / canvas.width;
          const frequency = 2 + (depth * 2);

          // Primary sine wave
          let y = Math.sin((normalizedX * Math.PI * frequency) + time * (3 - depth)) * 120 * depth;
          
          // Secondary complex wave to make it look organic
          y += Math.cos((normalizedX * Math.PI * (frequency * 1.5)) - time * 2) * 60 * depth;

          // Mouse distortion (waves bulge/bend towards mouse)
          const distanceToCenter = Math.abs(normalizedX - 0.5) * 2; // 0 at center, 1 at edges
          y += mouseEffectY * (1 - distanceToCenter); // Affect center more

          // Global vertical centering + slight offset per wave
          const finalY = (canvas.height / 2) + y + (i * 20 - (waves * 10)) + 30;

          if (x === 0) {
            ctx.moveTo(x + mouseEffectX, finalY);
          } else {
            ctx.lineTo(x + mouseEffectX, finalY);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#030b14] pointer-events-none -z-50" style={{ perspective: '1200px' }}>
      
      {/* ─── Base Dark Blue/Teal Gradient ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-[#030b14] to-[#01060a]" />

      {/* ─── Subtle Medical Tech Grid ─── */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${cssMouse.x * 10}px, ${cssMouse.y * 10}px)`
        }}
      />

      {/* ─── Deep Glowing Orbs for Depth ─── */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-teal-400/5 blur-[100px]" />

      {/* ─── 3D Parallax Layer (ECG + Particles) ─── */}
      <div 
        className="absolute transition-transform duration-[2000ms] ease-out will-change-transform"
        style={{ 
          width: '110vw',
          height: '110vh',
          top: '-5vh',
          left: '-5vw',
          transform: `translate3d(${cssMouse.x * -20}px, ${cssMouse.y * -20}px, 0) rotateX(${cssMouse.y * 3}deg) rotateY(${cssMouse.x * 3}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Massive Full-Screen ECG Lines */}
        {/* Layer 1 - Slow Background ECG */}
        <div className="absolute top-1/4 left-0 w-full h-[60vh] opacity-10" style={{ transform: 'translateZ(-150px)' }}>
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full text-blue-500 animate-sweep" style={{ animationDuration: '8s' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M 0,100 L 150,100 L 200,30 L 250,180 L 300,80 L 350,100 L 600,100 L 650,50 L 700,170 L 750,20 L 800,100 L 1000,100" />
          </svg>
        </div>

        {/* Layer 2 - Midground Glowing ECG */}
        <div className="absolute top-[35%] left-0 w-full h-[30vh] opacity-30 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" style={{ transform: 'translateZ(50px)' }}>
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-[150%] h-full text-emerald-400 animate-sweep" style={{ animationDuration: '6s', animationDelay: '2s' }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <path d="M 0,100 L 100,100 L 130,50 L 160,160 L 190,70 L 220,100 L 500,100 L 530,20 L 560,180 L 590,40 L 620,100 L 1000,100" />
          </svg>
        </div>

        {/* Layer 3 - Foreground Neon ECG */}
        <div className="absolute top-[60%] left-[-10vw] w-[120vw] h-[20vh] opacity-20 drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]" style={{ transform: 'translateZ(150px)' }}>
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full text-teal-300 animate-sweep" style={{ animationDuration: '5s', animationDelay: '1s' }} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
             <path d="M 0,100 L 300,100 L 350,10 L 400,190 L 450,40 L 500,100 L 800,100 L 850,60 L 900,140 L 950,80 L 1000,100" />
          </svg>
        </div>

        {/* Floating Glowing Particles */}
        <div style={{ transform: 'translateZ(100px)' }}>
          {[...Array(20)].map((_, i) => {
            // Distribute particles across depth and color
            const isGreen = i % 3 === 0;
            const isTeal = i % 3 === 1;
            const bgClass = isGreen ? 'bg-emerald-400' : isTeal ? 'bg-teal-400' : 'bg-blue-400';
            
            return (
              <div
                key={i}
                className={`absolute rounded-full animate-particle ${bgClass}`}
                style={{
                  width: Math.random() * 5 + 2 + 'px',
                  height: Math.random() * 5 + 2 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.4 + 0.1,
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 15 + 15}s` // Slow particle float
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Interactive 3D Flowing Waveforms (Canvas) ─── */}
      {/* Kept out of the 3D rotation container to prevent canvas anti-aliasing issues, 
          but reacts directly to mouse movement inside its own loop */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-80" 
      />

    </div>
  );
}
