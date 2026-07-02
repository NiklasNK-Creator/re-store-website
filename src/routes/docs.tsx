import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — RE:Restore" },
      { name: "description", content: "How to install RE:Restore, run your first backup, restore to a new server, and enable member re-verification." },
    ],
  }),
  component: () => (
    <div className="grain min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 prose prose-invert">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Grimoire</div>
        <h1 className="font-display text-6xl mt-4">Docs</h1>
        <div className="gothic-divider my-8" />

        <section className="space-y-6 text-parchment/90">
          <h2 className="font-display text-3xl text-ember">1. Invite the bot</h2>
          <p className="text-muted-foreground">Click <em>Invite the bot</em> on the home page and grant Administrator on your server. The bot needs it to read/write channels, roles, and members.</p>

          <h2 className="font-display text-3xl text-ember">2. Run your first backup</h2>
          <p className="text-muted-foreground">In Discord, run <code className="bg-mist px-2 py-1">/backup create</code>. Or open the dashboard, pick your server → Backups → Create.</p>

          <h2 className="font-display text-3xl text-ember">3. Restore</h2>
          <p className="text-muted-foreground">If disaster strikes, invite the bot to a new server, run <code className="bg-mist px-2 py-1">/restore</code>, and pick a backup. The bot rebuilds structure, roles, permissions and message history up to your tier limit.</p>

          <h2 className="font-display text-3xl text-ember">4. Member re-verification (Covenant)</h2>
          <p className="text-muted-foreground">Enable Member Restore in the dashboard, pick a verify channel. The bot posts a Verify button. Members open it, authorize via Discord, and are sealed. On restore, the bot re-adds every verified member with roles remapped by name.</p>

          <h2 className="font-display text-3xl text-ember">5. Hosting the bot yourself</h2>
          <p className="text-muted-foreground">Deploy the RE:Restore bot to Render. Set env vars <code>DISCORD_BOT_TOKEN</code>, <code>SITE_URL</code>, <code>BOT_SHARED_SECRET</code> (matches the site secret), and a <code>GITHUB_BACKUP_TOKEN</code> + <code>GITHUB_BACKUP_REPO</code> for storage. The bot signs every request to the site with HMAC-SHA256 using the shared secret.</p>
        </section>
      </main>
      <Footer />
    </div>
  ),
});
