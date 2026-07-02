import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardIndex,
});

type Guild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

const ADMIN_PERM = 0x8n;

function DashboardIndex() {
  const [user, setUser] = useState<{ username: string; avatar: string | null; discord_id: string } | null>(null);
  const [guilds, setGuilds] = useState<Guild[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      if (!session.authenticated) return;

      setUser(session.user);

      try {
        const res = await fetch("/api/auth/discord-guilds");
        if (!res.ok) throw new Error(`Discord ${res.status}`);
        const all: Guild[] = await res.json();
        const admin = all.filter((g) => g.owner || (BigInt(g.permissions) & ADMIN_PERM) === ADMIN_PERM);
        setGuilds(admin);
      } catch (e) {
        setError((e as Error).message);
        setGuilds([]);
      }
    })();
  }, []);

  return (
    <div className="p-10 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Restore by Death</div>
          <h1 className="mt-2 font-display text-5xl">Welcome back{user ? `, ${user.username}` : ""}.</h1>
          <p className="mt-3 text-muted-foreground">Pick a server to configure backups, restore points, and the covenant.</p>
        </div>
        {user?.avatar && <img src={user.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-blood shadow-blood" />}
      </div>

      <div className="gothic-divider my-10" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl">Your servers</h2>
        <a
          href="https://discord.com/api/oauth2/authorize?client_id=1522257203103404042&permissions=8&scope=bot%20applications.commands"
          target="_blank" rel="noopener noreferrer"
          className="border border-blood bg-blood/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-parchment hover:bg-blood transition"
        >
          + Invite to server
        </a>
      </div>

      {error && <div className="border border-destructive/60 bg-destructive/10 p-4 font-mono text-[11px] text-destructive">{error}</div>}

      {guilds === null && (
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 border border-border/60 bg-mist/40 animate-pulse" />
          ))}
        </div>
      )}

      {guilds && guilds.length === 0 && !error && (
        <div className="border border-border/60 bg-mist/30 p-16 text-center">
          <Sigil size={48} className="mx-auto opacity-50" />
          <p className="mt-6 font-display text-2xl">No servers found.</p>
          <p className="mt-2 text-sm text-muted-foreground">You need Administrator permission to configure a server here.</p>
        </div>
      )}

      {guilds && guilds.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guilds.map((g) => (
            <Link
              key={g.id}
              to="/dashboard/servers/$guildId"
              params={{ guildId: g.id }}
              className="group relative border border-border/60 bg-background/60 p-6 hover:border-blood hover:shadow-blood transition"
            >
              <div className="flex items-center gap-4">
                {g.icon ? (
                  <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} alt="" className="w-14 h-14 rounded-full" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-mist border border-border/60 flex items-center justify-center font-display text-xl text-ember">
                    {g.name.slice(0, 2)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-display text-lg truncate">{g.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{g.owner ? "Owner" : "Admin"}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>Free tier</span>
                <span className="text-blood group-hover:translate-x-1 transition">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
