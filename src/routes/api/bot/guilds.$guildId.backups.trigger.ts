import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/guilds/$guildId/backups/trigger")({
  server: {
    handlers: {
      POST: async ({ params }) => {
        try {
          const result = await botApi(`/api/guilds/${params.guildId}/backups/trigger`, { method: "POST" });
          return Response.json(result);
        } catch (e) {
          return Response.json({ error: e.message }, { status: 502 });
        }
      },
    },
  },
});
