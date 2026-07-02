import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — RE:Restore" },
      { name: "description", content: "Free, Pro, and Elite tiers for RE:Restore Discord backups. Pick the contract that binds you." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  { n: "Free", p: "0", c: "forever", f: ["3 backups", "50 msg/channel", "10 posts/forum", "7 day retention", "100 verified members", "Manual restore"] },
  { n: "Pro", p: "5", c: "monthly", f: ["25 backups", "500 msg/channel", "100 posts/forum", "90 day retention", "2,000 verified members", "Daily scheduled backups", "Cross-server restore"], accent: true },
  { n: "Elite", p: "15", c: "monthly", f: ["Unlimited backups", "5,000 msg/channel", "1,000 posts/forum", "Forever retention", "Unlimited members", "Hourly scheduled backups", "Priority support"] },
];

function Pricing() {
  return (
    <div className="grain min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Terms of the Contract</div>
          <h1 className="mt-4 font-display text-6xl">Bind at <span className="text-blood-gradient italic">your tier.</span></h1>
          <p className="mt-4 text-muted-foreground">Payment provider is being finalized. Start on Free today — upgrades open soon.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.n} className={`relative border p-8 ${t.accent ? "border-blood bg-blood/5 md:scale-105 shadow-blood" : "border-border/60"}`}>
              {t.accent && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blood px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-parchment">Recommended</div>}
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{t.n}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl">${t.p}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.c}</span>
              </div>
              <div className="gothic-divider my-6" />
              <ul className="space-y-3">
                {t.f.map((f) => <li key={f} className="flex gap-3 text-sm text-parchment/80"><span className="text-blood">✦</span>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
