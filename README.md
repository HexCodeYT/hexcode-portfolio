# HexCode Portfolio

Next.js portfolio and public status dashboard for HexCode infrastructure.

## Local development

```bash
npm install
npm run seed:uptime
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Uptime worker

The VPS owns the persistent uptime database. It starts with a synthetic 90-day
baseline and replaces each day's synthetic checks when the first real check is
recorded.

Deploy it with:

```bash
docker compose -f compose.uptime.yml up -d --build
```

Proxy `/uptime-api/*` on `search.hexcode.au` to `127.0.0.1:3100` using the
Caddy snippet in `deploy/uptime.Caddyfile`, then set this environment variable
in Vercel:

```text
UPTIME_API_URL=https://search.hexcode.au/uptime-api
```
