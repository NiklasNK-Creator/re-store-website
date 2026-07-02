import { useEffect, useState } from "react";

// Satella's whispers — just "I love you" in three tongues, on a fast cycle.
const PHRASES = ["I love you", "愛してる", "Aishiteru"];

type Whisper = { id: number; text: string; left: number; top: number; scale: number };

export function SatellaWhispers({ density = 5, className = "" }: { density?: number; className?: string }) {
  const [whispers, setWhispers] = useState<Whisper[]>([]);

  useEffect(() => {
    let id = 0;
    const spawnOne = () => {
      setWhispers((prev) => {
        const next: Whisper = {
          id: id++,
          text: PHRASES[Math.floor(Math.random() * PHRASES.length)],
          left: 5 + Math.random() * 90,
          top: 15 + Math.random() * 70,
          scale: 0.65 + Math.random() * 0.5,
        };
        // keep only the most recent `density * 2` on screen
        return [...prev.slice(-density * 2 + 1), next];
      });
    };
    // seed
    for (let i = 0; i < density; i++) spawnOne();
    const interval = Math.max(220, 1600 / density);
    const iv = setInterval(spawnOne, interval);
    return () => clearInterval(iv);
  }, [density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {whispers.map((w) => (
        <span
          key={w.id}
          className="absolute font-display italic text-satella-glow animate-whisper select-none whitespace-nowrap"
          style={{
            left: `${w.left}%`,
            top: `${w.top}%`,
            fontSize: `${w.scale}rem`,
            color: "oklch(0.78 0.22 305 / 0.85)",
            mixBlendMode: "screen",
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
