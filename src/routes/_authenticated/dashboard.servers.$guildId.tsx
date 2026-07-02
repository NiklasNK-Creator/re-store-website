import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/_authenticated/dashboard/servers/$guildId")({
  component: GuildDetail,
});

type Backup = { backup_id: string; created_at: string; size_bytes: number; guild_name: string };
type GuildConfig = { registered: boolean; plan: string; limits: { backups: number }; scheduled_backup: boolean };

function GuildDetail() {
  const { guildId } = Route.useParams();
  const [config, setConfig] = useState<GuildConfig | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    try {
      const [cfgRes, bakRes] = await Promise.all([
        fetch(`/api/bot/guilds/${guildId}/config`),
        fetch(`/api/bot/guilds/${guildId}/backups`),
      ]);
      if (cfgRes.ok) setConfig(await cfgRes.json());
      if (bakRes.ok) {
        const data = await bakRes.json();
        setBackups(data.backups ?? []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [guildId]);

  const handleBackup = async () => {
    setCreating(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/bot/guilds/${guildId}/backups/trigger`, { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setMsg(`Backup sealed: ${data.counts.channels} channels, ${data.counts.messages} messages, ${data.counts.roles} roles, ${data.counts.emojis} emojis, ${data.counts.soundboard} sounds`);
        await load();
      } else {
        setMsg(`Error: ${data.error}`);
      }
    } catch (e) {
      setMsg(`Error: ${(e as Error).message}`);
    }
    setCreating(false);
  };

  const handleRestore = async (backupId: string) => {
    setRestoring(backupId);
    setMsg(null);
    try {
      const res = await fetch(`/api/bot/guilds/${guildId}/backup-restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backupId }),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg(`Restored: ${data.rolesCreated} roles, ${data.channelsCreated} channels, ${data.messagesRestored} messages, ${data.emojisRestored} emojis, ${data.soundboardRestored ?? 0} sounds`);
      } else {
        setMsg(`Error: ${data.error}`);
      }
    } catch (e) {
      setMsg(`Error: ${(e as Error).message}`);
    }
    setRestoring(null);
  };

  const handleDelete = async (backupId: string) => {
    if (!confirm("Delete this backup?")) return;
    setDeleting(backupId);
    setMsg(null);
    try {
      const res = await fetch(`/api/bot/guilds/${guildId}/backup-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backupId }),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("Backup deleted.");
        await load();
      } else {
        setMsg(`Error: ${data.error}`);
      }
    } catch (e) {
      setMsg(`Error: ${(e as Error).message}`);
    }
    setDeleting(null);
  };

  const plan = config?.plan ?? "free";
  const backupLimit = config?.limits?.backups ?? 3;

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

      {loading ? (
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 border border-border/60 bg-mist/40 animate-pulse" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="border border-border/60 bg-background/60 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Plan</div>
              <div className="font-display text-3xl text-ember mt-2">{plan.toUpperCase()}</div>
            </div>
            <div className="border border-border/60 bg-background/60 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Backups</div>
              <div className="font-display text-3xl text-ember mt-2">{backups.length} / {backupLimit === -1 ? "∞" : backupLimit}</div>
            </div>
            <div className="border border-border/60 bg-background/60 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Status</div>
              <div className="font-display text-3xl text-emerald-500 mt-2">{config?.registered ? "Active" : "Unregistered"}</div>
            </div>
          </div>

          {msg && (
            <div className={`border p-4 font-mono text-[11px] mb-6 ${msg.startsWith("Error") ? "border-destructive/60 bg-destructive/10 text-destructive" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"}`}>
              {msg}
            </div>
          )}

          <div className="gothic-divider my-10" />

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Backups</h2>
            <button
              onClick={handleBackup}
              disabled={creating}
              className="border border-blood bg-blood/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-parchment hover:bg-blood transition disabled:opacity-50"
            >
              {creating ? "Sealing..." : "+ Create Backup"}
            </button>
          </div>

          {backups.length === 0 ? (
            <div className="border border-border/60 bg-mist/30 p-16 text-center">
              <Sigil size={48} className="mx-auto opacity-50" />
              <p className="mt-6 font-display text-2xl">No backups yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Click "Create Backup" above or use /backup in Discord.</p>
            </div>
          ) : (
            <div className="border border-border/60 bg-background/60 divide-y divide-border/40">
              {backups.map((b) => (
                <div key={b.backup_id} className="flex items-center justify-between px-6 py-4 hover:bg-mist/30 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-blood/10 flex items-center justify-center font-mono text-sm text-blood">⛭</div>
                    <div>
                      <div className="font-mono text-sm">{b.backup_id}</div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
                        {new Date(b.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {(b.size_bytes / 1024).toFixed(1)} KB
                    </div>
                    <button
                      onClick={() => handleRestore(b.backup_id)}
                      disabled={restoring === b.backup_id}
                      className="border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400 hover:bg-emerald-500/20 transition disabled:opacity-50"
                    >
                      {restoring === b.backup_id ? "Restoring..." : "Restore"}
                    </button>
                    <button
                      onClick={() => handleDelete(b.backup_id)}
                      disabled={deleting === b.backup_id}
                      className="border border-destructive/40 bg-destructive/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-destructive hover:bg-destructive/20 transition disabled:opacity-50"
                    >
                      {deleting === b.backup_id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="gothic-divider my-10" />

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Discord Commands</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cmd: "/backup", desc: "Seal a snapshot of this server" },
              { cmd: "/restore", desc: "Rebuild from a backup" },
              { cmd: "/backups", desc: "List all stored backups" },
              { cmd: "/plan", desc: "Check tier and limits" },
              { cmd: "/verify-setup", desc: "Post the Covenant verify button" },
            ].map((c) => (
              <div key={c.cmd} className="border border-border/60 bg-background/60 p-4 flex items-center gap-4">
                <div className="font-mono text-sm text-blood">{c.cmd}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{c.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
