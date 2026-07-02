export function Sigil({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="sigilG" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.22 22)" />
          <stop offset="100%" stopColor="oklch(0.78 0.15 75)" />
        </linearGradient>
      </defs>
      <g stroke="url(#sigilG)" strokeWidth="1.2" fill="none">
        <circle cx="50" cy="50" r="46" opacity="0.7" />
        <circle cx="50" cy="50" r="34" opacity="0.5" strokeDasharray="1 3" />
        <polygon points="50,10 87,72 13,72" />
        <polygon points="50,90 13,28 87,28" opacity="0.7" />
        <circle cx="50" cy="50" r="6" fill="oklch(0.55 0.22 22)" />
      </g>
    </svg>
  );
}
