import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RewindClock } from "@/components/effects/RewindClock";
import { Sigil } from "@/components/effects/Sigil";
import { SatellaWhispers } from "@/components/effects/SatellaWhispers";
import { PurpleAurora } from "@/components/effects/PurpleAurora";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RE:Restore — Rewind your Discord server by death" },
      { name: "description", content: "Full server backups: channels, roles, permissions, messages, forum posts. Restore members with one click. Built for communities that refuse to stay dead." },
    ],
  }),
  component: Home,
});

const features = [
  {
    tag: "I. Ritual",
    title: "Full server snapshots",
    body: "Channels, categories, roles, permission overwrites, server settings, emojis and stickers — sealed into a single restore point.",
  },
  {
    tag: "II. Memory",
    title: "Message & forum archives",
    body: "Retain the last N messages per channel and the last M forum posts with their starter — bounded by your tier.",
  },
  {
    tag: "III. Return",
    title: "One-click server restore",
    body: "Point a fresh server at any backup. Structure, permissions, and settings rebuild in the same order they died.",
  },
  {
    tag: "IV. Covenant",
    title: "Member re-verification",
    body: "Members verify through a portal on our site. When you restore to a new server, the bot pulls every verified member back in — with their roles remapped.",
  },
];

const tiers = [
  { name: "Free", price: "0", cadence: "forever", features: ["3 backups retained", "50 messages / channel", "10 forum posts / forum", "7 day retention", "100 verified members"], cta: "Invite bot", accent: false },
  { name: "Pro", price: "5", cadence: "per month", features: ["25 backups", "500 messages / channel", "100 forum posts / forum", "90 day retention", "2,000 verified members", "Daily scheduled backups", "Cross-server restore"], cta: "Coming soon", accent: true },
  { name: "Elite", price: "15", cadence: "per month", features: ["Unlimited backups", "5,000 messages / channel", "1,000 forum posts / forum", "Forever retention", "Unlimited verified members", "Hourly scheduled backups", "Dedicated support"], cta: "Coming soon", accent: false },
];

function Home() {
  return (
    <div className="grain min-h-screen">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <PurpleAurora />
          <SatellaWhispers density={7} />

          <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow/80">
                <span className="h-px w-8 bg-satella/60" />
                Restore by Death, Volume I
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-parchment/95">
                Your server<br />
                <span className="text-satella-gradient italic">will not stay dead.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base text-muted-foreground/90 leading-relaxed">
                RE:Restore is a Discord backup ritual. Every channel, every role, every message —
                sealed into a checkpoint. When disaster comes, you rewind.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://discord.com/api/oauth2/authorize?client_id=1522257203103404042&permissions=8&scope=bot%20applications.commands"
                  target="_blank" rel="noopener noreferrer"
                  className="group relative overflow-hidden border border-satella bg-satella px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] text-parchment shadow-[0_0_30px_-8px_oklch(0.55_0.25_300_/_0.6)] transition hover:shadow-[0_0_50px_-10px_oklch(0.72_0.22_310_/_0.7)]"
                >
                  <span className="relative z-10">Invite the bot</span>
                  <span className="absolute inset-0 bg-satella opacity-0 group-hover:opacity-100 transition duration-500" />
                  <span className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-obsidian font-mono text-xs uppercase tracking-[0.3em]">Bind the contract</span>
                </a>
                <Link to="/auth" className="border border-border/60 px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] text-parchment hover:border-satella hover:text-satella-glow transition">
                  Open dashboard
                </Link>
              </div>
              <div className="mt-14 grid grid-cols-3 gap-8 max-w-md">
                {[
                  { k: "∞", v: "Servers" },
                  { k: "5s", v: "To restore" },
                  { k: "0", v: "Data lost" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-4xl text-satella-glow">{s.k}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sigil size={480} className="opacity-10 animate-sigil" />
              </div>
              <RewindClock size={380} />
            </div>
          </div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
        </section>


        <div className="gothic-divider mx-auto max-w-5xl" />

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow">The Four Trials</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">
              Every ritual, <span className="text-satella-gradient italic">memorized</span>.
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-border/40">
            {features.map((f, i) => (
              <div key={f.title} className="group relative bg-background p-10 transition hover:bg-mist">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow">
                  <span className="h-px w-6 bg-satella" />
                  {f.tag}
                </div>
                <h3 className="mt-6 font-display text-3xl text-parchment">{f.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                <div className="absolute top-6 right-6 font-mono text-4xl text-satella-glow/20 group-hover:text-satella-glow/60 transition">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MEMBER RESTORE FLOW */}
        <section className="relative bg-mist/30 border-y border-border/60">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow">Covenant of the Cult</div>
                <h2 className="mt-4 font-display text-5xl md:text-6xl">
                  Members that <span className="text-satella-gradient italic">refuse to leave.</span>
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
                  Enable Member Restore, pick a verify channel, and the bot posts a sealed button.
                  Members open it, verify through this site, and their contract is stored.
                  When you restore your server to a new one — every verified member is pulled back in
                  with their original roles.
                </p>
                <ol className="mt-10 space-y-6 max-w-xl">
                  {[
                    "Owner enables Member Restore in dashboard.",
                    "Bot posts a Verify button in your chosen channel.",
                    "Members verify through RE:Restore with Discord OAuth.",
                    "On restore-to-new-server, bot re-adds every member.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-6">
                      <div className="font-display text-3xl text-satella-glow shrink-0 w-10">{String(i + 1).padStart(2, "0")}</div>
                      <div className="text-sm text-parchment/90 leading-relaxed pt-2">{s}</div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative border border-border/60 bg-background/80 p-8 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">verify.channel.embed</div>
                <div className="mt-4 border-l-2 border-satella pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <Sigil size={24} />
                    <span className="font-display text-xl">RE:Restore Covenant</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Verify your presence in this server. If disaster strikes, you will return.
                  </p>
                  <button className="mt-5 border border-satella bg-satella/20 px-6 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-parchment hover:bg-satella transition">
                    ⛧ Verify contract
                  </button>
                </div>
                <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-satella-glow">
                  ▸ 1,247 members bound to this covenant
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow/80">Terms of the Contract</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Pick your <span className="text-satella-gradient italic">tier of return.</span></h2>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div key={t.name} className={`group relative border p-8 transition-all duration-500 hover:-translate-y-1 ${t.accent ? "border-satella/60 bg-satella-deep/10 md:scale-105 shadow-[0_0_40px_-10px_oklch(0.55_0.25_300_/_0.5)]" : "border-border/60 bg-background/60 hover:border-satella/40"}`}>
                {t.accent && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-satella px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-parchment">Most bound</div>}
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-satella-glow/90">{t.name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-6xl text-parchment">${t.price}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.cadence}</span>
                </div>
                <div className="gothic-divider my-6" />
                <ul className="space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-parchment/80">
                      <span className="text-satella-glow/80 mt-1">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3 font-mono text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${t.accent ? "bg-satella text-parchment hover:bg-satella-glow hover:text-obsidian" : "border border-border/60 text-muted-foreground hover:border-satella hover:text-parchment"}`}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <PurpleAurora />
          <SatellaWhispers density={5} />
          <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
            <Sigil size={64} className="mx-auto animate-sigil opacity-70" />
            <h2 className="mt-8 font-display text-5xl md:text-7xl">
              Death is not the end.<br />
              <span className="text-satella-gradient italic">It's a checkpoint.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Bind the contract. Add RE:Restore to your server in under a minute.
            </p>
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=1522257203103404042&permissions=8&scope=bot%20applications.commands"
              target="_blank" rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 border border-satella bg-satella-deep/60 px-10 py-5 font-mono text-xs uppercase tracking-[0.3em] text-parchment shadow-[0_0_40px_-10px_oklch(0.55_0.25_300_/_0.7)] transition-all duration-500 hover:bg-satella hover:shadow-[0_0_60px_-8px_oklch(0.72_0.22_310_/_0.8)] hover:-translate-y-0.5"
            >
              ⛧ Invite the bot
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
