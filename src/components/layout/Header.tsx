import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sigil } from "@/components/effects/Sigil";

export function Header() {
  const [user, setUser] = useState<{ username: string; avatar: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function signOut() {
    window.location.href = "/api/auth/signout";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-satella/20 bg-background/60 backdrop-blur-xl transition-colors duration-500">
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-satella-glow/40 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <Sigil size={32} className="transition-transform duration-1000 group-hover:rotate-180" />
          <div>
            <div className="font-display text-xl leading-none transition-colors duration-300 group-hover:text-satella-glow">
              RE<span className="text-satella-glow">:</span>Restore
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Restore by Death</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {[
            { to: "/features", label: "Features" },
            { to: "/pricing", label: "Pricing" },
            { to: "/docs", label: "Docs" },
            ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
          ].map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className="ink-link relative transition-all duration-300 hover:text-parchment hover:-translate-y-0.5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <span className="hidden md:inline font-mono text-[11px] text-satella-glow/80">{user.username}</span>
              <button onClick={signOut} className="border border-border/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-all duration-300 hover:text-parchment hover:border-satella hover:shadow-[0_0_20px_-6px_oklch(0.55_0.25_300_/_0.6)]">
                Sign out
              </button>
            </>
          ) : !loading ? (
            <Link to="/auth" className="group relative overflow-hidden border border-satella/50 bg-satella-deep/20 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-parchment transition-all duration-500 hover:border-satella hover:shadow-[0_0_24px_-4px_oklch(0.55_0.25_300_/_0.7)]">
              <span className="relative z-10">Sign in</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-satella-deep via-satella to-satella-deep transition-transform duration-700 group-hover:translate-x-0 opacity-40" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
