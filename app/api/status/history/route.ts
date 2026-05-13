import { NextResponse } from "next/server";
import { db } from "@/lib/uptime-db";
import { services } from "@/lib/services";

export const dynamic = "force-dynamic";

type HistoryRow = {
  day: string;
  total_checks: number;
  online_checks: number;
  avg_latency_ms: number | null;
};

export async function GET() {
  const history = services.map((service) => {
    const rows = db
      .prepare(
        `
        SELECT
          date(checked_at) as day,
          COUNT(*) as total_checks,
          SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online_checks,
          ROUND(AVG(latency_ms)) as avg_latency_ms
        FROM uptime_checks
        WHERE service_name = ?
          AND checked_at >= datetime('now', '-90 days')
        GROUP BY day
        ORDER BY day ASC
        `
      )
      .all(service.name) as HistoryRow[];

    return {
      name: service.name,
      url: service.url,
      trackedDays: rows.length,
      history: rows.map((row) => {
        const uptime =
          row.total_checks > 0
            ? Number(((row.online_checks / row.total_checks) * 100).toFixed(2))
            : null;

        return {
          date: row.day,
          uptime,
          totalChecks: row.total_checks,
          onlineChecks: row.online_checks,
          avgLatencyMs: row.avg_latency_ms,
          status:
            uptime === null
              ? "unknown"
              : uptime >= 99
                ? "good"
                : uptime >= 95
                  ? "degraded"
                  : "bad",
        };
      }),
    };
  });

  return NextResponse.json(history);
}