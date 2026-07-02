import { createFileRoute } from "@tanstack/react-router";
import { getSessionFromRequest } from "@/routes/api/auth/session";

export const Route = createFileRoute("/api/auth/discord/guilds")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = getSessionFromRequest(request);
        if (!session) {
          return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (!res.ok) {
          return Response.json({ error: `Discord API ${res.status}` }, { status: 502 });
        }

        const guilds = await res.json();
        return Response.json(guilds);
      },
    },
  },
});
