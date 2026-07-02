import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/guilds/$guildId/backups")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const data = await botApi(`/api/guilds/${params.guildId}/backups`);
          return Response.json(data);
        } catch {
          return Response.json({ backups: [] });
        }
      },
    },
  },
});
