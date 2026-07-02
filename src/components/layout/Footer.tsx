import { Link } from "@tanstack/react-router";
import { Sigil } from "@/components/effects/Sigil";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="gothic-divider" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Sigil size={28} className="animate-sigil" />
            <span className="font-display text-2xl">RE<span className="text-satella-glow">:</span>Restore</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A backup and restoration ritual for Discord servers. Bound by the Witch's Cult,
            powered by return by death.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-satella-glow/70">
            Not affiliated with Discord Inc. or Re:Zero.
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-satella-glow">Product</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/features" className="ink-link hover:text-parchment">Features</Link></li>
            <li><Link to="/pricing" className="ink-link hover:text-parchment">Pricing</Link></li>
            <li><Link to="/docs" className="ink-link hover:text-parchment">Docs</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-satella-glow">Covenant</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/legal" className="ink-link hover:text-parchment">Legal</Link></li>
            <li><a href="#" className="ink-link hover:text-parchment">Status</a></li>
            <li><a href="#" className="ink-link hover:text-parchment">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© {new Date().getFullYear()} RE:Restore</span>
          <span>Sealed by the Witch's Cult</span>
        </div>
      </div>
    </footer>
  );
}
