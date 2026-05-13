import { db } from "../lib/uptime-db";
import { services } from "../lib/services";

async function checkService(service: { name: string; url: string }) {
  const start = Date.now();

  try {
    const response = await fetch(service.url, {
      method: "HEAD",
      cache: "no-store",
    });

    const latency = Date.now() - start;

    db.prepare(`
      INSERT INTO uptime_checks (
        service_name,
        service_url,
        status,
        status_code,
        latency_ms,
        checked_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      service.name,
      service.url,
      response.ok ? "online" : "offline",
      response.status,
      latency,
      new Date().toISOString()
    );

    console.log(`${service.name}: ${response.ok ? "online" : "offline"} ${latency}ms`);
  } catch {
    db.prepare(`
      INSERT INTO uptime_checks (
        service_name,
        service_url,
        status,
        status_code,
        latency_ms,
        checked_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      service.name,
      service.url,
      "offline",
      null,
      null,
      new Date().toISOString()
    );

    console.log(`${service.name}: offline`);
  }
}

async function main() {
  await Promise.all(services.map(checkService));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});