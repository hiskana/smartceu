# SmartCEU Project Hub

The Hub lives at `/hub` and is linked from desktop, mobile menu and bottom navigation.

## Shared data

Netlify Database (Postgres) stores task and post rows. Netlify function `/api/hub` validates requests and uses parameterized queries. Browser refreshes every 15 seconds while active and on focus/reconnect. A separate row is written per post; task updates require the current row version and reject stale updates with HTTP 409. Failed posts retain a local draft, and retried identical post IDs do not duplicate rows.

The Hub is intentionally unlocked per the founders' instruction. Names are self-selected labels, not verified identities. Anyone with access to its URL/API can read and add entries or change tasks. Do not post credentials, confidential records or sensitive partnership terms. Future founder authentication must gate the function as well as the page.

The board is initially seeded by a migration with 13 app, course, strategy and marketing tasks. New deployments must not reseed it. The project summary is a dated snapshot; ongoing updates belong in posts and tasks. API shows up to 1,000 tasks and the latest 200 posts. Older posts remain stored but are not included in the current screen/export.

## Working together

Select Iska or Matthew, choose a post type, and write a discussion entry. Use Add task or Create a task from this post to prepare an editable task. Change status using the Move to selector; select a task title to edit title, details, owner or category. On phones, swipe between board columns, or jump directly to discussion.

Export for Codex review downloads the displayed discussion and board as Markdown. Upload/paste that export into the SmartCEU chat and ask for assessment/task proposals. There is no autonomous AI parsing or background messaging.

## Development and deployment

`npm run dev` uses the Netlify Vite plugin; `npx netlify dev` exposes the complete local site on port 8888. Run `npx netlify database migrations apply` to apply local migrations once the local database is running. Local data is isolated from production. Bare Vite previews without the Netlify runtime show a storage-unavailable message instead of claiming local data is shared.

Schema changes belong in new timestamped SQL files under `netlify/database/migrations`. Commit migrations before deploying. Never change an applied migration or apply schema directly to the hosted database. Production deploys apply migrations before publishing. Do not upload only `dist` for this app: it now needs server functions, database provisioning and migrations via a full Netlify build/deploy.

`.netlify` is ignored to protect local CLI/site state. Database credentials are supplied by Netlify, not committed or shipped to the browser. Netlify database usage consumes the account's normal credits.
