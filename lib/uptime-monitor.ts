import { db } from "./uptime-db";
import { services } from "./services";

export type LiveStatus = {
  name: string;
  status: "online" | "offline";
  latency: number | null;
};

async function probe(url: string) {
  const start = Date.now();

  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: { "user-agent": "HexCode-Uptime/1.0" },
    });

    return {
      online: response.ok,
      statusCode: response.status,
      latency: Date.now() - start,
    };
  } catch {
    return { online: false, statusCode: null, latency: null };
  }
}

export async function checkAllServices(): Promise<LiveStatus[]> {
  return Promise.all(
    services.map(async (service) => {
      const result = await probe(service.url);
      const checkedAt = new Date().toISOString();

      const transaction = db.transaction(() => {
        db.prepare(
          `
            DELETE FROM uptime_checks
            WHERE service_name = ?
              AND date(checked_at) = date(?)
              AND is_synthetic = 1
          `,
        ).run(service.name, checkedAt);

        db.prepare(
          `
            INSERT INTO uptime_checks (
              service_name,
              service_url,
              status,
              status_code,
              latency_ms,
              is_synthetic,
              checked_at
            )
            VALUES (?, ?, ?, ?, ?, 0, ?)
          `,
        ).run(
          service.name,
          service.url,
          result.online ? "online" : "offline",
          result.statusCode,
          result.latency,
          checkedAt,
        );
      });

      transaction();

      return {
        name: service.name,
        status: result.online ? "online" : "offline",
        latency: result.latency,
      };
    }),
  );
}
