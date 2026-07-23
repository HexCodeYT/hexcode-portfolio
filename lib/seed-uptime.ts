import { db } from "./uptime-db";
import { services } from "./services";

const CHECKS_PER_DAY = 48;

function randomLatency() {
  return Math.floor(Math.random() * 240) + 90;
}

export function seedSyntheticHistory() {
  const insert = db.prepare(`
    INSERT INTO uptime_checks (
      service_name,
      service_url,
      status,
      status_code,
      latency_ms,
      is_synthetic,
      checked_at
    )
    VALUES (?, ?, ?, ?, ?, 1, ?)
  `);
  const hasRealChecks = db.prepare(`
    SELECT 1
    FROM uptime_checks
    WHERE service_name = ?
      AND date(checked_at) = date(?)
      AND is_synthetic = 0
    LIMIT 1
  `);
  const clearSyntheticDay = db.prepare(`
    DELETE FROM uptime_checks
    WHERE service_name = ?
      AND date(checked_at) = date(?)
      AND is_synthetic = 1
  `);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const seed = db.transaction(() => {
    for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
      const day = new Date(today);
      day.setUTCDate(today.getUTCDate() - dayOffset);

      for (const service of services) {
        if (hasRealChecks.get(service.name, day.toISOString())) continue;

        clearSyntheticDay.run(service.name, day.toISOString());

        for (let check = 0; check < CHECKS_PER_DAY; check++) {
          const checkedAt = new Date(day);
          checkedAt.setUTCMinutes(check * 30);

          const online = Math.random() > 0.0015;
          insert.run(
            service.name,
            service.url,
            online ? "online" : "offline",
            online ? 200 : 503,
            online ? randomLatency() : null,
            checkedAt.toISOString(),
          );
        }
      }
    }
  });

  seed();
}
