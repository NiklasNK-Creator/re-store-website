import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/guilds/$guildId/backup-restore")({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const body = await request.json();
          const { backupId } = body;
          const result = await botApi(`/api/guilds/${params.guildId}/restore/${backupId}`, { method: "POST" });
          return Response.json(result);
        } catch (e) {
          return Response.json({ error: e.message }, { status: 502 });
        }
      },
    },
  },
});
