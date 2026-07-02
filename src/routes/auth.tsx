import { createFileRoute, useRouter, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { Header } from "@/components/layout/Header";
import { Sigil } from "@/components/effects/Sigil";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — RE:Restore" },
      { name: "description", content: "Sign in with Discord to open the RE:Restore dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = useSearch({ from: "/auth" });

  function signInDiscord() {
    const params = new URLSearchParams();
    if (redirect) params.set("redirect", redirect);
    window.location.href = `/api/auth/discord${params.toString() ? `?${params}` : ""}`;
  }

  return (
    <div className="grain min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
            <Sigil size={480} className="opacity-[0.06] animate-sigil" />
          </div>
          <div className="relative border border-border/60 bg-background/80 backdrop-blur p-10 animate-fade-up">
            <div className="text-center">
              <Sigil size={56} className="mx-auto" />
              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-satella-glow">Restore by Death</div>
              <h1 className="mt-3 font-display text-4xl">Seal the contract</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Sign in with Discord. RE:Restore requests access to your identity, your servers, and permission to re-add you if a covenant server is restored.
              </p>
            </div>

            <div className="gothic-divider my-8" />

            <button
              onClick={signInDiscord}
              className="w-full flex items-center justify-center gap-3 border border-satella bg-satella px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] text-parchment shadow-[0_0_30px_-8px_oklch(0.55_0.25_300_/_0.6)] hover:shadow-[0_0_50px_-10px_oklch(0.72_0.22_310_/_0.7)] transition"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.317 4.369A19.79 19.79 0 0 0 16.885 3.3a.075.075 0 0 0-.079.037c-.34.607-.719 1.4-.984 2.022a18.29 18.29 0 0 0-5.487 0 12.5 12.5 0 0 0-.995-2.022.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 5.83 4.369a.07.07 0 0 0-.032.028C2.792 8.881 1.995 13.269 2.42 17.601a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.699.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.836 19.836 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.008-.838-9.359-3.548-13.204a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z"/></svg>
              Continue with Discord
            </button>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              First time? The contract is free.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
