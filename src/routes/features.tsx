import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — RE:Restore" },
      { name: "description", content: "Every ritual RE:Restore performs on your Discord server: channels, roles, permissions, messages, forum posts, member re-verification." },
    ],
  }),
  component: () => (
    <div className="grain min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Ritual manual</div>
        <h1 className="mt-4 font-display text-6xl">Features, in <span className="text-blood-gradient italic">full.</span></h1>
        <div className="gothic-divider my-10" />
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {[
            ["Server structure", "Category tree, channel order, topics, slowmode, NSFW, permission overwrites — the full skeleton."],
            ["Roles & permissions", "Every role, its color, hoist, mentionable state, and complete permission bitfield. Restored in the original hierarchy."],
            ["Server settings", "Verification level, explicit content filter, system channel, boost tier, banner, icon, splash, description."],
            ["Text messages", "Last N messages per channel with author, attachments (URLs), embeds, timestamps."],
            ["Forum posts", "Last M threads per forum channel including the starter message and thread metadata."],
            ["Emoji & stickers", "Custom emoji and sticker metadata cached for fast re-upload on restore."],
            ["Member ledger", "Full member snapshot with roles, nickname, join date."],
            ["Member re-verification", "Optional covenant flow: verified members auto-rejoin restored servers with roles remapped."],
            ["Cross-server restore", "Pick a fresh server, aim it at any backup, and rebuild in the same order it was born."],
            ["Scheduled backups", "Pro: daily. Elite: hourly. Free: manual."],
          ].map(([t, b]) => (
            <div key={t}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">Ritual</div>
              <h3 className="mt-2 font-display text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  ),
});
