import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/guilds/$guildId/backup-delete")({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const body = await request.json();
          const { backupId } = body;
          const result = await botApi(`/api/guilds/${params.guildId}/backups/${backupId}`, { method: "DELETE" });
          return Response.json(result);
        } catch (e) {
          return Response.json({ error: e.message }, { status: 502 });
        }
      },
    },
  },
});
