import { createFileRoute } from "@tanstack/react-router";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export type Session = {
  discord_id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  access_token: string;
};

export function getSessionFromRequest(request: Request): Session | null {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as Session;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/auth/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = getSessionFromRequest(request);
        if (!session) {
          return Response.json({ authenticated: false });
        }
        return Response.json({
          authenticated: true,
          user: {
            discord_id: session.discord_id,
            username: session.username,
            avatar: session.avatar,
          },
        });
      },
    },
  },
});
