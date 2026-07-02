import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/billing")({
  component: () => (
    <div className="p-10 max-w-4xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Contract terms</div>
      <h1 className="font-display text-4xl mt-2">Billing</h1>
      <div className="gothic-divider my-8" />

      <div className="border border-blood/40 bg-blood/5 p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">Current plan</div>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-display text-5xl">Free</span>
          <span className="font-mono text-xs text-muted-foreground">— forever</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Paid checkout is being finalized. Upgrades and downgrades will appear here once the payment provider is wired.
        </p>
        <button disabled className="mt-6 border border-border/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground opacity-50 cursor-not-allowed">
          Upgrade — coming soon
        </button>
      </div>
    </div>
  ),
});
