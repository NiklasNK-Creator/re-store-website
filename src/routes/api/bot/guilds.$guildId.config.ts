import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/guilds/$guildId/config")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const config = await botApi(`/api/guilds/${params.guildId}/config`);
          return Response.json(config);
        } catch {
          return Response.json({ registered: false, plan: "free", limits: { backups: 3 }, scheduled_backup: false });
        }
      },
    },
  },
});
