---
name: deploy-portal
description: Deploy the Murphy Cloud portal (this repo) to production murphylan.cloud. Use when asked to deploy, publish, ship, or release the portal, or to push local portal changes live. Captures the verified server layout, the rsync + build + PM2 reload flow, and the stale-path / process-name pitfalls.
---

# Deploy Portal → murphylan.cloud

Verified production flow for this repo. **Do not use `deploy/deploy.sh`** — it
targets a stale path and a different PM2 process name (see Pitfalls).

## Production facts (verified 2026-06)

| Item | Value |
|------|-------|
| Server | `ubuntu@159.75.253.245` (server **A**) |
| **Serving dir** | **`/home/ubuntu/work/requirement`** (the live `portal` process's `exec cwd`) |
| PM2 process | **`portal`** — `script=/usr/bin/pnpm`, `args=start` (i.e. `next start`) |
| Port | `3000` (Nginx terminates HTTPS, proxies `localhost:3000`) |
| Public URL | `https://murphylan.cloud` (+ `www`) |
| Node / pnpm | node 22.x, pnpm 10.x |
| Server `.env` | present at serving dir — **never overwrite it** |

`/home/ubuntu/apps/portal` is a **stale copy, NOT served** — ignore it.

## Preconditions

- SSH key already authorized on A (passwordless). If not:
  `sshpass -p '<password>' ssh-copy-id -o StrictHostKeyChecking=accept-new ubuntu@159.75.253.245`
- Local build is green: `pnpm build`.

## Deploy steps

1. **Dry-run rsync** (confirm file list + that `.env` is NOT transferred):

   ```bash
   rsync -avzn \
     --exclude='node_modules' --exclude='.next' --exclude='.git' \
     --exclude='.env' --exclude='.cursor' --exclude='.pnpm-store' \
     /Users/murphy/work/projects/murphy-cloud/portal/ \
     ubuntu@159.75.253.245:/home/ubuntu/work/requirement/
   ```

2. **Real rsync**: rerun without `-n`. (No `--delete` — safer.)

3. **Build on server, then reload** (build first to shrink the live-error window):

   ```bash
   ssh ubuntu@159.75.253.245 '
     cd /home/ubuntu/work/requirement &&
     pnpm install --frozen-lockfile &&
     pnpm build &&
     pm2 reload portal &&
     pm2 save'
   ```

4. **Verify** — local 3000 then public HTTPS:

   ```bash
   ssh ubuntu@159.75.253.245 'curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/'
   curl -s -o /dev/null -w "%{http_code}\n" https://murphylan.cloud/
   curl -s https://murphylan.cloud/<changed-route> | grep -o '<expected text>'
   ```

   Confirm `pm2 list` shows `portal` online with a fresh PID/uptime.

## Pitfalls (the reasons for the flow above)

- **Wrong dir**: README / `deploy.sh` say `/home/ubuntu/apps/portal`. Deploying
  there has **zero effect** — the live process runs from `/home/ubuntu/work/requirement`.
  Always confirm with `pm2 describe portal | grep "exec cwd"`.
- **Process-name clash**: `deploy.sh` + `ecosystem.config.js` use standalone +
  `murphy-portal`. The live process is `portal` via `pnpm start`. Running
  `deploy.sh` starts a *second* process that can't bind 3000 → new code never serves.
  Stick to `pm2 reload portal`.
- **`.env`**: always exclude from rsync; the production env lives only on the server.
- Deploy ships the **working tree** (rsync), so committing first is optional for the
  deploy itself — but commit/push separately for history.
