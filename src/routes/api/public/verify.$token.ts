import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSessionFromRequest } from "@/routes/api/auth/session";
import { botApi } from "@/lib/bot-api";

const schema = z.object({
  discord_user_id: z.string().min(1),
  roles_snapshot: z.array(z.string()).default([]),
});

export const Route = createFileRoute("/api/public/verify/$token")({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        let discordGuildId: string;
        try {
          discordGuildId = Buffer.from(params.token, "base64url").toString("utf-8");
          if (!/^\d{10,25}$/.test(discordGuildId)) throw new Error("bad token");
        } catch {
          return Response.json({ error: "Invalid token" }, { status: 400 });
        }

        const session = getSessionFromRequest(request);
        if (!session) {
          return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
        const parsed = schema.safeParse(body);
        if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

        try {
          await botApi(`/api/guilds/${discordGuildId}/verify`, {
            method: "POST",
            body: JSON.stringify({
              discord_user_id: session.discord_id,
              roles_snapshot: parsed.data.roles_snapshot,
            }),
          });
          return Response.json({ ok: true });
        } catch (e) {
          return Response.json({ error: (e as Error).message }, { status: 502 });
        }
      },
    },
  },
});
