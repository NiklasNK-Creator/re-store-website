export function RewindClock({ size = 320 }: { size?: number }) {
  const s = size;
  const c = s / 2;
  const ticks = Array.from({ length: 60 });
  return (
    <div className="relative" style={{ width: s, height: s, opacity: 0.55, mixBlendMode: "screen" }}>
      {/* outer glow */}
      <div className="absolute inset-0 rounded-full animate-ember" style={{ background: "radial-gradient(circle, oklch(0.42 0.19 22 / 0.15), transparent 70%)" }} />
      <svg viewBox={`0 0 ${s} ${s}`} className="relative">
        <defs>
          <radialGradient id="face" cx="50%" cy="50%">
            <stop offset="0%" stopColor="oklch(0.14 0.02 30)" />
            <stop offset="100%" stopColor="oklch(0.08 0.01 30)" />
          </radialGradient>
          <linearGradient id="hand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.15 75)" />
            <stop offset="100%" stopColor="oklch(0.42 0.19 22)" />
          </linearGradient>
        </defs>
        {/* outer ring */}
        <circle cx={c} cy={c} r={c - 4} fill="url(#face)" stroke="oklch(0.42 0.19 22 / 0.6)" strokeWidth="1" />
        <circle cx={c} cy={c} r={c - 20} fill="none" stroke="oklch(0.35 0.05 30 / 0.5)" strokeWidth="0.5" strokeDasharray="2 4" />
        {/* ticks */}
        {ticks.map((_, i) => {
          const angle = (i * 6 * Math.PI) / 180;
          const inner = i % 5 === 0 ? c - 22 : c - 14;
          const outer = c - 10;
          const x1 = c + Math.sin(angle) * inner;
          const y1 = c - Math.cos(angle) * inner;
          const x2 = c + Math.sin(angle) * outer;
          const y2 = c - Math.cos(angle) * outer;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 5 === 0 ? "oklch(0.78 0.15 75)" : "oklch(0.5 0.05 30)"} strokeWidth={i % 5 === 0 ? 1.2 : 0.5} />;
        })}
        {/* roman-ish numerals */}
        {["XII", "III", "VI", "IX"].map((n, idx) => {
          const angle = (idx * 90 * Math.PI) / 180;
          const r = c - 40;
          const x = c + Math.sin(angle) * r;
          const y = c - Math.cos(angle) * r;
          return <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontFamily="Cormorant Garamond" fontSize={s / 16} fill="oklch(0.85 0.05 75)">{n}</text>;
        })}
        {/* rewinding hand (spins backward) */}
        <g style={{ transformOrigin: `${c}px ${c}px`, animation: "clock-tick 8s linear infinite reverse" }}>
          <line x1={c} y1={c + 20} x2={c} y2={c - (c - 40)} stroke="url(#hand)" strokeWidth="2" strokeLinecap="round" />
          <circle cx={c} cy={c} r="4" fill="oklch(0.42 0.19 22)" />
        </g>
        {/* forward hand */}
        <g style={{ transformOrigin: `${c}px ${c}px`, animation: "clock-tick 30s linear infinite" }}>
          <line x1={c} y1={c + 12} x2={c} y2={c - (c - 60)} stroke="oklch(0.85 0.05 75 / 0.7)" strokeWidth="1" strokeLinecap="round" />
        </g>
        {/* center jewel */}
        <circle cx={c} cy={c} r="6" fill="oklch(0.55 0.22 22)" />
        <circle cx={c} cy={c} r="2" fill="oklch(0.92 0.03 80)" />
      </svg>
    </div>
  );
}
