import { db } from "../lib/uptime-db";
import { services } from "../lib/services";

function randomLatency() {
  return Math.floor(Math.random() * 400) + 80;
}

function randomStatus() {
  const rand = Math.random();

  if (rand < 0.96) return "online";
  if (rand < 0.985) return "degraded";

  return "offline";
}

function generateChecksForDay(dayOffset: number) {
  const checksPerDay = 288;

  for (const service of services) {
    for (let i = 0; i < checksPerDay; i++) {
      const status = randomStatus();

      const checkedAt = new Date(
        Date.now() -
          dayOffset * 24 * 60 * 60 * 1000 +
          i * 5 * 60 * 1000
      );

      let finalStatus = "online";
      let statusCode = 200;
      let latency = randomLatency();

      if (status === "degraded") {
        latency = randomLatency() + 600;
      }

      if (status === "offline") {
        finalStatus = "offline";
        statusCode = 503;
        latency = null as unknown as number;
      }

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
        finalStatus,
        statusCode,
        latency,
        checkedAt.toISOString()
      );
    }
  }
}

db.exec(`DELETE FROM uptime_checks`);

for (let day = 90; day >= 0; day--) {
  generateChecksForDay(day);
}

console.log("Seeded fake 90-day uptime history.");