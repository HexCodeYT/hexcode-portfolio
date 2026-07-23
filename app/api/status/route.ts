import { NextResponse } from "next/server";
import { services } from "@/lib/services";

export async function GET() {
  const results = await Promise.all(
    services.map(async (service) => {
      const start = Date.now();

      try {
        const response = await fetch(service.url, {
          method: "HEAD",
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });

        const latency = Date.now() - start;

        return {
          name: service.name,
          status: response.ok ? "online" : "offline",
          latency,
        };
      } catch {
        return {
          name: service.name,
          status: "offline",
          latency: null,
        };
      }
    })
  );

  return NextResponse.json(results);
}
