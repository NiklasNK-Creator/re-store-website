import { createFileRoute } from "@tanstack/react-router";
import jwt from "jsonwebtoken";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1522257203103404042";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const SITE_URL = process.env.SITE_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export const Route = createFileRoute("/api/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");

        if (!code) {
          return new Response("Missing code", { status: 400 });
        }

        let redirect = "/dashboard";
        if (state) {
          try {
            const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
            redirect = decoded.redirect || "/dashboard";
          } catch {}
        }

        // Exchange code for access token
        const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: `${SITE_URL}/api/auth/callback`,
          }),
        });

        if (!tokenRes.ok) {
          return new Response("Token exchange failed", { status: 401 });
        }

        const tokens = await tokenRes.json();

        // Fetch user info
        const userRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        if (!userRes.ok) {
          return new Response("Failed to fetch user", { status: 401 });
        }

        const user = await userRes.json();

        // Create JWT session
        const session = {
          discord_id: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null,
          access_token: tokens.access_token,
        };

        const token = jwt.sign(session, JWT_SECRET, { expiresIn: "7d" });

        // Redirect with session cookie
        return new Response(null, {
          status: 302,
          headers: {
            Location: redirect,
            "Set-Cookie": `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
          },
        });
      },
    },
  },
});
