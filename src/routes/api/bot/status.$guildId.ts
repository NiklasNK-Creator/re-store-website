import { createFileRoute } from "@tanstack/react-router";
import { botApi } from "@/lib/bot-api";

export const Route = createFileRoute("/api/bot/status/$guildId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const status = await botApi(`/api/guilds/${params.guildId}/status`);
          return Response.json(status);
        } catch {
          return Response.json({ in_guild: false, error: "Bot unreachable" }, { status: 502 });
        }
      },
    },
  },
});
