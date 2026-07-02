import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center animate-fade-up">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-blood">Restore by Death</div>
        <h1 className="mt-4 font-display text-8xl text-blood-gradient">404</h1>
        <div className="gothic-divider my-6" />
        <p className="font-display text-2xl text-foreground">This path does not exist in this loop.</p>
        <p className="mt-2 text-sm text-muted-foreground">Rewind and try another route.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-blood/60 bg-blood/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.3em] text-parchment transition hover:bg-blood hover:shadow-blood"
          >
            ← Rewind to start
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center animate-fade-up">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-blood">Death detected</div>
        <h1 className="mt-4 font-display text-4xl text-foreground">The loop broke</h1>
        <div className="gothic-divider my-6" />
        <p className="text-sm text-muted-foreground">
          Something went wrong. Rewind to the checkpoint and try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center gap-2 border border-blood/60 bg-blood/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.3em] text-parchment transition hover:bg-blood"
          >
            Restore by Death
          </button>
          <a href="/" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-parchment">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RE:Restore — Discord backup & restore, sealed by the Witch's Cult" },
      { name: "description", content: "Full Discord server backups: channels, roles, permissions, messages, forum posts, and member re-verification. Rewind your community by death." },
      { name: "author", content: "RE:Restore" },
      { property: "og:title", content: "RE:Restore — Rewind your Discord server" },
      { property: "og:description", content: "Backup every channel, role, permission and message. Restore your members with one click." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0607" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
