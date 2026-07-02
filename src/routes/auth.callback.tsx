import { createFileRoute, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (s) => z.object({ redirect: z.string().optional() }).parse(s),
  component: Callback,
});

function Callback() {
  const router = useRouter();
  const { redirect } = useSearch({ from: "/auth/callback" });
  const [status, setStatus] = useState("Sealing the contract…");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < 20; i++) {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data.authenticated) {
          if (!cancelled) router.navigate({ to: redirect ?? "/dashboard", replace: true });
          return;
        }
        await new Promise(r => setTimeout(r, 150));
      }
      if (!cancelled) setStatus("The ritual failed. Return by death and try again.");
    })();
    return () => { cancelled = true; };
  }, [redirect, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center animate-fade-up">
        <Sigil size={64} className="mx-auto animate-sigil" />
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-blood">Restore by Death</div>
        <p className="mt-3 font-display text-2xl">{status}</p>
      </div>
    </div>
  );
}
