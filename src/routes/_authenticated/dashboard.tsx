import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Overview", exact: true },
  { to: "/dashboard/servers", label: "Servers" },
  { to: "/dashboard/billing", label: "Billing" },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function signOut() {
    window.location.href = "/api/auth/signout";
  }

  return (
    <div className="grain min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border/60 bg-sidebar/80 backdrop-blur flex flex-col">
        <Link to="/" className="flex items-center gap-3 p-6 border-b border-border/40">
          <Sigil size={28} />
          <div>
            <div className="font-display text-lg leading-none">RE<span className="text-blood">:</span>Restore</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Dashboard</div>
          </div>
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`block px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] border-l-2 transition ${active ? "border-blood bg-blood/10 text-parchment" : "border-transparent text-muted-foreground hover:text-parchment hover:border-ember/40"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/40">
          <button onClick={signOut} className="w-full text-left px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-blood transition">
            ⛧ End contract
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
