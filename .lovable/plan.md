# RE:Restore — Plan

## ⚠️ Do this before I build
1. **Reset your bot token now** at Discord Developer Portal → Bot → Reset Token. The one you pasted is public.
2. When I switch to build mode, I'll request these via secure secret forms (don't paste them in chat):
   - `DISCORD_BOT_TOKEN` (new one)
   - `DISCORD_CLIENT_SECRET` (from OAuth2 page)
   - Client ID `1522257203103404042` is public → goes in code as `VITE_DISCORD_CLIENT_ID`.

## Architecture
```text
┌─────────────────────────┐        ┌──────────────────────┐
│  Lovable (this project) │        │  Bot on Render       │
│  - Marketing site       │  HTTP  │  - discord.js gateway│
│  - Dashboard            │◄──────►│  - Backup worker     │
│  - Discord OAuth        │        │  - Restore worker    │
│  - Backup API + DB      │        │  - Calls site API    │
│  - Verify/re-map page   │        │    with shared secret│
└──────────┬──────────────┘        └──────────┬───────────┘
           │                                  │
           ▼                                  ▼
      Lovable Cloud                    GitHub (backup blobs)
     (Postgres + Auth)                  via bot's PAT
```
Site never runs the gateway (Workers can't). Bot lives on Render, you own the GitHub storage. Site owns: users, guild registry, backup metadata index, verification tokens, tier/quotas, restore jobs.

## Pages
**Public**
- `/` — Home: hero with rewinding clock animation, blood-drip transitions, feature grid (Backups / Restore / Member Restore / Tiers), CTA "Invite bot".
- `/features`, `/pricing`, `/docs`, `/legal`
- `/verify/$token` — landing page a restored server's member opens; runs Discord OAuth then re-adds them via bot API.

**Dashboard (`/_authenticated/`)**
- `/dashboard` — guilds you admin, bot status per guild
- `/dashboard/$guildId` — overview, tier usage bars
- `/dashboard/$guildId/backups` — list, create, download, delete, restore-to-other-server
- `/dashboard/$guildId/backups/$id` — contents inspector (channels, roles, message counts, forum posts)
- `/dashboard/$guildId/restore` — pick backup + target guild + toggles (channels/perms/settings/messages/forum posts/members)
- `/dashboard/$guildId/members` — member-restore toggle, choose verify channel, button config, per-member re-map status
- `/dashboard/$guildId/settings` — schedule, retention, notifications
- `/dashboard/billing` — current tier, usage, (upgrade disabled until you pick a provider)

## Design direction — Return by Death
- Palette: obsidian `#0a0607`, blood `#8b0a1a`, ember `#d4a017`, parchment `#e8dcc4`, spectral white
- Type: `Cormorant Garamond` (display, occult serif) + `JetBrains Mono` (data/timestamps) + `Inter` (body)
- Motion: rewind glitch on route change, ticking clock hand cursor accents, blood-ink underline hover, RBD flash (screen desaturates → red vignette → snap) on destructive actions, animated Witch's Cult sigil loader
- Textures: subtle grain, gothic ornamental corner glyphs, clock-gear dividers
- Full custom shadcn tokens in `src/styles.css` (oklch), no purple-gradient defaults

## Backup / Restore feature model
Per guild backup stores:
- Server settings (name, icon, banner, verification level, system channel, etc.)
- All roles + permission bitfields + hierarchy
- All channels/categories + per-channel overwrites + topic/slowmode/nsfw
- Last N text messages per channel (N = tier limit)
- Last M forum posts per forum channel with starter message (M = tier limit)
- Member list snapshot (id, roles, nickname, join date)
- Emoji + sticker metadata (URLs, not blobs)

**Member Restore flow**
1. Owner enables Member Restore, picks verify channel; bot posts embed with "Verify" button (link to `/verify/$guildId`).
2. Members who click get logged into `verified_members(guild_id, user_id, discord_tag, verified_at)` after OAuth (`identify guilds.join` scope).
3. On restore-to-new-server: bot iterates `verified_members` and calls Discord `PUT /guilds/{new}/members/{user}` using each user's stored refresh token → members re-join with original roles remapped by name.

## Payment tiers (logic only, no checkout yet)
Store `plan` on `guilds` table. Enforce in API + dashboard UI.

| Feature | Free | Pro | Elite |
|---|---|---|---|
| Backups retained | 3 | 25 | Unlimited |
| Messages/channel | 50 | 500 | 5000 |
| Forum posts/forum | 10 | 100 | 1000 |
| Backup retention | 7 days | 90 days | Forever |
| Verified members cap | 100 | 2000 | Unlimited |
| Manual restore | ✓ | ✓ | ✓ |
| Scheduled backups | — | Daily | Hourly |
| Cross-server restore | — | ✓ | ✓ |
| Discord support | Community | Priority | Dedicated |

Billing UI shows "Coming soon" — real checkout added later (Paddle recommended when you're ready; no card needed to build tier logic now).

## Data model (Lovable Cloud / Postgres)
- `profiles` (id → auth.users, discord_id, username, avatar, refresh_token_encrypted)
- `user_roles` (separate table, `app_role` enum: user, admin) — per security rules
- `guilds` (id, discord_guild_id, owner_user_id, name, icon, plan, added_at)
- `guild_admins` (guild_id, user_id) — cached from Discord perms
- `backups` (id, guild_id, created_at, size_bytes, storage_url, stats_json, created_by)
- `restore_jobs` (id, source_backup_id, target_guild_id, status, progress, log, requested_by)
- `verify_config` (guild_id, enabled, verify_channel_id, button_label)
- `verified_members` (guild_id, user_id, discord_id, roles_snapshot_json, verified_at)
- `bot_api_keys` (guild_id, hashed_key) — for bot↔site auth
All tables get RLS + explicit GRANTs.

## Bot ↔ Site contract (server routes at `/api/public/*`)
HMAC-signed with shared `BOT_SHARED_SECRET`:
- `POST /api/public/bot/backup` — bot uploads backup manifest + GitHub URL
- `GET  /api/public/bot/config/:guildId` — bot fetches verify config, tier limits
- `POST /api/public/bot/verified-members/:guildId` — list for re-add
- `POST /api/public/bot/restore-callback` — progress updates
- `POST /api/public/verify/:token` — from verify page, tells bot to add role/track

Signature verify + Zod validation in every handler. No PII returned unauthenticated.

## Build order
1. Cloud enable + secrets + schema migration (tables, RLS, GRANTs, roles)
2. Design system tokens + fonts + shared layout (header w/ auth state, footer, RBD transitions)
3. Home + features + pricing + docs + legal (SEO metadata per route)
4. Discord OAuth (`identify guilds guilds.members.join`) + `_authenticated` gate + sign-in/out hygiene
5. Dashboard shell + guild list + guild overview
6. Backups pages + Restore page + Members page + Settings + Billing (UI + tier gating)
7. `/verify/$token` flow
8. Server routes (bot API) with HMAC + Zod
9. Bot-side README with Render deploy steps, env vars, GitHub storage helper (separate repo you deploy)

## Open questions I'll need answered when we start building
- **Discord support server invite URL** (for support links)?
- **GitHub repo/PAT** for backup storage — I'll add `GITHUB_BACKUP_TOKEN` + `GITHUB_BACKUP_REPO` as secrets; confirm the repo exists.
- OK to scope OAuth as `identify guilds guilds.members.join`? (needed for member restore)
- Any brand assets (logo, sigil) or should I generate a Witch's Cult–style mark?
