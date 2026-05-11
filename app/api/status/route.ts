import { NextResponse } from "next/server";

const services = [
  {
    name: "SearXNG",
    url: "https://search.hexcode.au",
  },
  {
    name: "Forgejo",
    url: "https://git.hexcode.au",
  },
];

export async function GET() {
  const results = await Promise.all(
    services.map(async (service) => {
      const start = Date.now();

      try {
        const response = await fetch(service.url, {
          method: "HEAD",
          cache: "no-store",
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