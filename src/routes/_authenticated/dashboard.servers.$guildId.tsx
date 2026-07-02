import { createFileRoute, Link } from "@tanstack/react-router";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/_authenticated/dashboard/servers/$guildId")({
  component: GuildDetail,
});

const sections = [
  { title: "Backups", desc: "Snapshots of channels, roles, permissions, messages, and forum posts.", stat: "0 / 3", href: "backups" },
  { title: "Restore", desc: "Rebuild this server — or a fresh one — from any backup.", stat: "Ready", href: "restore" },
  { title: "Members", desc: "Enable member re-verification and manage the covenant.", stat: "Not enabled", href: "members" },
  { title: "Settings", desc: "Schedule cadence, retention, and notification hooks.", stat: "Default", href: "settings" },
];

function GuildDetail() {
  const { guildId } = Route.useParams();
  return (
    <div className="p-10 max-w-6xl">
      <Link to="/dashboard" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-parchment ink-link">← All servers</Link>
      <div className="mt-4 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-mist border border-blood/40 flex items-center justify-center">
          <Sigil size={40} />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Guild</div>
          <h1 className="font-display text-4xl mt-1">Server <span className="font-mono text-xl text-muted-foreground">#{guildId.slice(-6)}</span></h1>
        </div>
      </div>

      <div className="gothic-divider my-10" />

      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: "Plan", value: "Free" },
          { label: "Backups used", value: "0 / 3" },
          { label: "Verified members", value: "0 / 100" },
        ].map((s) => (
          <div key={s.label} className="border border-border/60 bg-background/60 p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.label}</div>
            <div className="font-display text-3xl text-ember mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-border/40">
        {sections.map((s) => (
          <div key={s.title} className="group bg-background p-8 hover:bg-mist transition cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">{s.title}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{s.stat}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-blood opacity-0 group-hover:opacity-100 transition">Open →</div>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-blood/40 bg-blood/5 p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Ritual queue</div>
        <p className="mt-2 text-sm text-muted-foreground">
          The bot is not yet linked to this server, or full page flows for these sections are being built.
          Backups, restores, and member re-verification wire up via the bot on Render — see docs.
        </p>
      </div>
    </div>
  );
}
