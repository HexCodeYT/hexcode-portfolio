import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const remoteUrl = process.env.UPTIME_API_URL?.replace(/\/$/, "");

    if (remoteUrl) {
      const response = await fetch(`${remoteUrl}/history`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) throw new Error(`Uptime API returned ${response.status}`);

      return NextResponse.json(await response.json());
    }

    const [{ db }, { getUptimeHistory }] = await Promise.all([
      import("@/lib/uptime-db"),
      import("@/lib/uptime-history"),
    ]);

    return NextResponse.json(getUptimeHistory(db));
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json([], { status: 503 });
  }
}
