import type { UptimeHistoryDay } from "@/lib/uptime-history";

type Props = {
  days: UptimeHistoryDay[];
  trackedDays: number;
};

const statusClasses: Record<UptimeHistoryDay["status"], string> = {
  good: "bg-emerald-500 hover:bg-emerald-400 focus-visible:bg-emerald-400",
  degraded: "bg-amber-400 hover:bg-amber-300 focus-visible:bg-amber-300",
  bad: "bg-rose-500 hover:bg-rose-400 focus-visible:bg-rose-400",
  unknown: "bg-neutral-800 hover:bg-neutral-700 focus-visible:bg-neutral-700",
};

function formatDay(day: UptimeHistoryDay) {
  const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  if (day.uptime === null) return `${date}: no data`;

  const latency =
    day.avgLatencyMs === null ? "no latency data" : `${day.avgLatencyMs}ms avg`;

  return `${date}: ${day.uptime}% uptime, ${latency}, ${day.onlineChecks}/${day.totalChecks} checks online`;
}

export function UptimeHeatmap({ days, trackedDays }: Props) {
  const totalChecks = days.reduce((total, day) => total + day.totalChecks, 0);
  const onlineChecks = days.reduce((total, day) => total + day.onlineChecks, 0);
  const uptime =
    totalChecks === 0
      ? null
      : ((onlineChecks / totalChecks) * 100).toFixed(2);

  return (
    <div className="mt-6 border-t border-neutral-900 pt-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            90-day uptime
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            {trackedDays > 0 ? `${trackedDays} days tracked` : "Collecting data"}
          </p>
        </div>

        <p className="font-mono text-lg font-medium tabular-nums text-white">
          {uptime === null ? "—" : `${uptime}%`}
        </p>
      </div>

      <div
        className="grid grid-flow-col grid-rows-3 gap-1"
        style={{ gridAutoColumns: "minmax(0, 1fr)" }}
        aria-label="Daily uptime for the last 90 days"
      >
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            title={formatDay(day)}
            aria-label={formatDay(day)}
            className={`h-2.5 min-w-0 rounded-[2px] outline-none transition sm:h-3 ${statusClasses[day.status]}`}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-600">
        <span>90 days ago</span>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Operational
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Degraded
          </span>
        </div>

        <span>Today</span>
      </div>
    </div>
  );
}
