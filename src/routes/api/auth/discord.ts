import { createFileRoute } from "@tanstack/react-router";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1522257203103404042";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const SITE_URL = process.env.SITE_URL || "";

export const Route = createFileRoute("/api/auth/discord")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const redirect = url.searchParams.get("redirect") || "/dashboard";
        const state = Buffer.from(JSON.stringify({ redirect })).toString("base64url");

        const discordAuthUrl = new URL("https://discord.com/api/oauth2/authorize");
        discordAuthUrl.searchParams.set("client_id", DISCORD_CLIENT_ID);
        discordAuthUrl.searchParams.set("redirect_uri", `${SITE_URL}/api/auth/callback`);
        discordAuthUrl.searchParams.set("response_type", "code");
        discordAuthUrl.searchParams.set("scope", "identify guilds");
        discordAuthUrl.searchParams.set("state", state);

        return new Response(null, {
          status: 302,
          headers: { Location: discordAuthUrl.toString() },
        });
      },
    },
  },
});
