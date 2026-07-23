import { createServer } from "node:http";
import { db } from "../lib/uptime-db";
import { getUptimeHistory } from "../lib/uptime-history";
import { checkAllServices } from "../lib/uptime-monitor";
import type { LiveStatus } from "../lib/uptime-monitor";
import { seedSyntheticHistory } from "../lib/seed-uptime";

const port = Number(process.env.PORT ?? 3100);
const intervalMs = Number(process.env.CHECK_INTERVAL_MS ?? 300_000);
let latestStatus: LiveStatus[] = [];

function sendJson(response: import("node:http").ServerResponse, body: unknown) {
  response.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=30, stale-while-revalidate=60",
  });
  response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
  if (request.url === "/health") {
    return sendJson(response, { ok: true });
  }

  if (request.url === "/history") {
    return sendJson(response, getUptimeHistory(db));
  }

  if (request.url === "/status") {
    return sendJson(response, latestStatus);
  }

  response.writeHead(404).end();
});

async function main() {
  seedSyntheticHistory();
  latestStatus = await checkAllServices();

  server.listen(port, "0.0.0.0", () => {
    console.log(`Uptime worker listening on port ${port}`);
  });

  setInterval(async () => {
    try {
      latestStatus = await checkAllServices();
    } catch (error) {
      console.error("Scheduled uptime check failed:", error);
    }
  }, intervalMs).unref();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
