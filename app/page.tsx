"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/services";
import Image from "next/image";
import Link from "next/link";
import { UptimeHeatmap } from "./components/UptimeHeatmap";

type ServiceStatus = {
  name: string;
  status: string;
  latency: number | null;
};

type UptimeHistoryDay = {
  date: string;
  uptime: number | null;
  totalChecks: number;
  onlineChecks: number;
  avgLatencyMs: number | null;
  status: "good" | "degraded" | "bad" | "unknown";
};

type ServiceHistory = {
  name: string;
  url: string;
  trackedDays: number;
  history: UptimeHistoryDay[];
};

export default function Home() {
  const [statusData, setStatusData] = useState<ServiceStatus[]>([]);
  const [historyData, setHistoryData] = useState<ServiceHistory[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const liveRes = await fetch("/api/status");

        if (liveRes.ok) {
          const liveData = await liveRes.json();
          setStatusData(liveData);
        }
      } catch (err) {
        console.error("Live status failed:", err);
      }

      try {
        const historyRes = await fetch("/api/status/history");

        if (historyRes.ok) {
          const uptimeHistoryData = await historyRes.json();
          setHistoryData(uptimeHistoryData);
        } else {
          console.error("History API failed:", historyRes.status);
        }
      } catch (err) {
        console.error("History fetch failed:", err);
      }
    };

    fetchStatus();

    const interval = setInterval(fetchStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (name: string) => {
    return statusData.find((item) => item.name === name);
  };

  const getHistory = (name: string) => {
    return historyData.find((item) => item.name === name);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl">
            <Image
              src="/pfp.jpg"
              alt="HexCode"
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-lg font-medium text-white">Pawan Sedara 🇦🇺</p>

            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              HexCode
            </p>
          </div>
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl">
          Self-hosted infrastructure, backend engineering, and systems built to
          last.
        </h1>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Linux • DevOps • Infrastructure Engineering
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
          I build and operate self-hosted platforms, backend services, and secure
          Linux infrastructure with a strong focus on reliability, privacy, and
          clean engineering.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:border-neutral-600"
          >
            Contact
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            className="rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:border-neutral-600"
          >
            Resume
          </a>
        </div>

        <Link
          href="/agencies"
          className="mt-5 w-fit rounded-sm text-sm text-neutral-600 outline-none transition hover:text-neutral-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Need white-label development? <span aria-hidden="true">→</span>
        </Link>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const live = getStatus(service.name);
            const serviceHistory = getHistory(service.name);
            const days = serviceHistory?.history ?? [];

            return (
              <div
                key={service.name}
                className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-medium text-white">
                    {service.name}
                  </h2>

                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${live?.status === "online"
                        ? "bg-green-500"
                        : live?.status === "offline"
                          ? "bg-red-500"
                          : "bg-neutral-700"
                        }`}
                    />

                    <span className="text-xs text-neutral-400">
                      {live?.status || "checking"}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    {live?.latency
                      ? `${live.latency}ms response`
                      : "No response"}
                  </p>

                  <a
                    href={service.url}
                    target="_blank"
                    className="text-sm text-neutral-300 transition hover:text-white"
                  >
                    Visit →
                  </a>
                </div>

                <UptimeHeatmap
                  days={days}
                  trackedDays={serviceHistory?.trackedDays ?? 0}
                />

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <section id="projects" className="mt-32">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Projects
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-tight text-white md:text-5xl">
              Selected work.
            </h2>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white">PlainLink</h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Local-first link cleaner for macOS
                  </p>
                </div>

                <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400">
                  Open Source · Developer Preview
                </span>
              </div>

              <p className="mt-5 max-w-3xl leading-7 text-neutral-400">
                PlainLink cleans tracking parameters from copied URLs at the
                system clipboard level, without requiring a browser extension.
                I built its core engine and CLI in Rust, paired it with a native
                Swift/AppKit menu bar app and user LaunchAgent, and designed a
                conservative, fixture-tested community rules format that
                preserves unknown parameters by default.
              </p>

              <div className="mt-6 grid overflow-hidden rounded-2xl border border-neutral-900 bg-black/40 sm:grid-cols-2">
                <div className="border-b border-neutral-900 p-4 sm:border-r sm:border-b-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                    Copied
                  </p>
                  <p className="mt-2 break-all font-mono text-xs leading-5 text-neutral-500">
                    example.com/read?utm_source=newsletter&amp;id=42
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">
                    Cleaned
                  </p>
                  <p className="mt-2 break-all font-mono text-xs leading-5 text-neutral-300">
                    example.com/read?id=42
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Rust",
                  "Swift",
                  "AppKit",
                  "macOS",
                  "LaunchAgent",
                  "GitHub Actions",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://github.com/HexCodeYT/PlainLink"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm text-neutral-300 transition hover:text-white"
                >
                  Explore PlainLink →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white">AussieLK</h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Founder & Lead Developer
                  </p>
                </div>

                <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500">
                  Live Business
                </span>
              </div>

              <p className="mt-5 max-w-3xl leading-7 text-neutral-400">
                AussieLK is a request-based sourcing platform I founded to
                connect Australian products with customers in Sri Lanka. I
                designed and built the full platform architecture, including
                authentication systems, encrypted request workflows, payment
                integration, admin tooling, audit logging, and infrastructure
                deployment.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Express",
                  "Prisma",
                  "Supabase",
                  "Stripe",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://aussielk.com.au"
                  target="_blank"
                  className="inline-flex items-center text-sm text-neutral-300 transition hover:text-white"
                >
                  Visit AussieLK →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-8">
              <h3 className="text-2xl font-medium text-white">
                Self-Hosted Infrastructure
              </h3>

              <p className="mt-5 max-w-3xl leading-7 text-neutral-400">
                Privacy-focused VPS infrastructure featuring SearXNG, Forgejo,
                WireGuard, Dockerized services, reverse proxy routing with Caddy,
                hardened firewall rules, and production uptime monitoring.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Debian",
                  "Docker",
                  "WireGuard",
                  "UFW",
                  "Caddy",
                  "Cloudflare",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-8">
              <h3 className="text-2xl font-medium text-white">P.A.T.H.</h3>

              <p className="mt-5 max-w-3xl leading-7 text-neutral-400">
                GPU-accelerated compute research project built with Apple Metal,
                exploring deterministic high-throughput prime computation and
                scalable segmented sieve execution on Apple Silicon hardware.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Metal",
                  "Objective-C++",
                  "Apple Silicon",
                  "GPU Compute",
                  "Algorithms",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section
            id="contact"
            className="mt-32 border-t border-neutral-900 pt-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-tight text-white">
              Let’s build something serious.
            </h2>

            <div className="mt-8 flex flex-wrap gap-4 text-neutral-400">
              <a
                href="mailto:pawan@hexcode.au"
                className="transition hover:text-white"
              >
                Email
              </a>

              <a
                href="https://github.com/HexCodeYT"
                target="_blank"
                className="transition hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://search.hexcode.au/"
                target="_blank"
                className="transition hover:text-white"
              >
                Search Engine
              </a>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
