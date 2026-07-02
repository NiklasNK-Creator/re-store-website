import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — RE:Restore" },
      { name: "description", content: "Terms, privacy, and data handling for RE:Restore." },
    ],
  }),
  component: () => (
    <div className="grain min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Ledger</div>
        <h1 className="font-display text-6xl mt-4">Legal</h1>
        <div className="gothic-divider my-8" />
        <div className="space-y-8 text-parchment/90 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-ember mb-3">Data we store</h2>
            <p>Your Discord ID, username, avatar URL. For servers you configure: server metadata, backups you request (channels, roles, permissions, messages, forum posts, member list snapshots).</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ember mb-3">Member re-verification</h2>
            <p>Members who opt in to a covenant grant Discord the ability to re-add them to a restored server. We store a refresh token scoped to <code className="bg-mist px-1">guilds.join</code> for this purpose only.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ember mb-3">Deletion</h2>
            <p>Contact support to erase all data. Deleting the bot from your server removes access; run <code className="bg-mist px-1">/purge</code> to wipe backups immediately.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ember mb-3">Trademarks</h2>
            <p>Discord is a trademark of Discord Inc. Re:Zero is a trademark of Kadokawa. This project is not affiliated with either.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
