export function PurpleAurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute -inset-40 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 15% 25%, oklch(0.55 0.25 300 / 0.55), transparent 60%), radial-gradient(ellipse 40% 45% at 85% 75%, oklch(0.42 0.19 22 / 0.5), transparent 60%), radial-gradient(ellipse 30% 30% at 60% 15%, oklch(0.72 0.22 310 / 0.35), transparent 60%)",
          filter: "blur(30px)",
          animation: "aurora-drift 22s ease-in-out infinite alternate",
        }}
      />
      {/* Shadow hands rising */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${10 + i * 15}%`,
            width: "1px",
            height: "40vh",
            background: "linear-gradient(to top, oklch(0.32 0.18 300 / 0.6), transparent)",
            animation: `shadow-hand ${8 + i}s ease-out infinite`,
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}
