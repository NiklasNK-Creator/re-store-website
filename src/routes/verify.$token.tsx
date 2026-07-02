import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sigil } from "@/components/effects/Sigil";

export const Route = createFileRoute("/verify/$token")({
  head: () => ({
    meta: [
      { title: "Verify covenant — RE:Restore" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Verify,
});

function Verify() {
  const { token } = Route.useParams();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      if (!session.authenticated) return;
      setStatus("loading");
      try {
        const res = await fetch(`/api/public/verify/${encodeURIComponent(token)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ discord_user_id: session.user.discord_id }),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Verification failed");
        setStatus("done"); setMessage(body.guild ?? "");
      } catch (e) {
        setStatus("error"); setMessage((e as Error).message);
      }
    })();
  }, [token]);

  function signIn() {
    window.location.href = `/api/auth/discord?redirect=${encodeURIComponent(`/verify/${token}`)}`;
  }

  return (
    <div className="grain min-h-screen flex items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-10 pointer-events-none flex items-center justify-center">
          <Sigil size={520} className="opacity-[0.06] animate-sigil" />
        </div>
        <div className="relative border border-border/60 bg-background/80 backdrop-blur p-10 text-center animate-fade-up">
          <Sigil size={56} className="mx-auto" />
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood mt-6">Covenant of the Cult</div>
          <h1 className="font-display text-4xl mt-3">Seal your contract</h1>

          {status === "idle" && (
            <>
              <p className="mt-4 text-sm text-muted-foreground">By verifying, you allow RE:Restore to add you back to this server if the owner restores it.</p>
              <button onClick={signIn} className="mt-8 w-full border border-blood bg-blood px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] text-parchment shadow-blood hover:shadow-ember transition">
                Verify with Discord
              </button>
            </>
          )}
          {status === "loading" && <p className="mt-6 font-display text-xl text-ember">Sealing the covenant…</p>}
          {status === "done" && (
            <div className="mt-6">
              <p className="font-display text-2xl text-ember">Contract sealed.</p>
              <p className="mt-2 text-sm text-muted-foreground">{message ? `You are bound to ${message}.` : "You may close this page."}</p>
            </div>
          )}
          {status === "error" && (
            <div className="mt-6">
              <p className="font-display text-2xl text-destructive">The ritual failed.</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
