import type Database from "better-sqlite3";
import { services } from "./services";

export type UptimeHistoryDay = {
  date: string;
  uptime: number | null;
  totalChecks: number;
  onlineChecks: number;
  avgLatencyMs: number | null;
  status: "good" | "degraded" | "bad" | "unknown";
};

type HistoryRow = {
  day: string;
  total_checks: number;
  online_checks: number;
  avg_latency_ms: number | null;
};

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function emptyHistory(): UptimeHistoryDay[] {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: 90 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (89 - index));

    return {
      date: dateKey(date),
      uptime: null,
      totalChecks: 0,
      onlineChecks: 0,
      avgLatencyMs: null,
      status: "unknown" as const,
    };
  });
}

export function getUptimeHistory(db: Database.Database) {
  return services.map((service) => {
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
        `,
      )
      .all(service.name) as HistoryRow[];

    const rowsByDay = new Map(rows.map((row) => [row.day, row]));
    const history = emptyHistory().map((day) => {
      const row = rowsByDay.get(day.date);

      if (!row) return day;

      const uptime = Number(
        ((row.online_checks / row.total_checks) * 100).toFixed(2),
      );

      return {
        date: day.date,
        uptime,
        totalChecks: row.total_checks,
        onlineChecks: row.online_checks,
        avgLatencyMs: row.avg_latency_ms,
        status:
          uptime >= 99
            ? ("good" as const)
            : uptime >= 95
              ? ("degraded" as const)
              : ("bad" as const),
      };
    });

    return {
      name: service.name,
      url: service.url,
      trackedDays: rows.length,
      history,
    };
  });
}
