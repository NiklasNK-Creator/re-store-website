import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/signout")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/",
            "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
          },
        });
      },
    },
  },
});
