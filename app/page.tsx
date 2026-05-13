"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/services";
import Image from "next/image";

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
        const [liveRes, historyRes] = await Promise.all([
          fetch("/api/status"),
          fetch("/api/status/history"),
        ]);

        const liveData = await liveRes.json();
        const uptimeHistoryData = await historyRes.json();

        setStatusData(liveData);
        setHistoryData(uptimeHistoryData);
      } catch (err) {
        console.error(err);
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

  const getBarClass = (status: UptimeHistoryDay["status"]) => {
    switch (status) {
      case "good":
        return "bg-blue-500";

      case "degraded":
        return "bg-orange-400";

      case "bad":
        return "bg-red-500";

      default:
        return "bg-neutral-900";
    }
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

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">
                      {serviceHistory?.trackedDays
                        ? `${serviceHistory.trackedDays}-day uptime history`
                        : "Uptime history collecting"}
                    </p>

                    <p className="text-xs text-neutral-600">Target: 90 days</p>
                  </div>
                  <div className="flex gap-1">
                    {days.length > 0 ? (
                      days.map((day) => (
                        <div
                          key={day.date}
                          className="group relative flex-1"
                          aria-label={`${day.date}: ${day.status} uptime`}
                        >
                          <div
                            className={`h-10 rounded-md transition-all duration-200 hover:opacity-80 ${getBarClass(
                              day.status
                            )}`}
                          />

                          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-52 -translate-x-1/2 rounded-2xl border border-neutral-800 bg-black/95 p-3 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                            <p className="text-xs font-medium text-white">
                              {new Date(day.date).toLocaleDateString("en-AU", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>

                            <div className="mt-3 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-neutral-500">Uptime</span>

                                <span className="text-neutral-200">
                                  {day.uptime ?? 0}%
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-neutral-500">Avg latency</span>

                                <span className="text-neutral-200">
                                  {day.avgLatencyMs
                                    ? `${day.avgLatencyMs}ms`
                                    : "N/A"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-neutral-500">Checks</span>

                                <span className="text-neutral-200">
                                  {day.onlineChecks}/{day.totalChecks}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-neutral-500">Status</span>

                                <span className="capitalize text-neutral-200">
                                  {day.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 7 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-10 flex-1 rounded-md bg-neutral-900"
                        />
                      ))
                    )}
                  </div>

                  {/* <div className="flex gap-1">
                    {days.length > 0
                      ? days.map((day) => (
                        <div
                          key={day.date}
                          aria-label={`${day.date}: ${day.status} uptime`}
                          title={`${day.date} • ${day.uptime ?? 0
                            }% uptime • ${day.avgLatencyMs
                              ? `${day.avgLatencyMs}ms avg`
                              : "no latency"
                            } • ${day.onlineChecks}/${day.totalChecks
                            } checks online`}
                          className={`h-10 flex-1 rounded-md transition-opacity hover:opacity-80 ${getBarClass(
                            day.status
                          )}`}
                        />
                      ))
                      : Array.from({ length: 7 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-10 flex-1 rounded-md transition-opacity hover:opacity-80 bg-neutral-900"
                        />
                      ))}
                  </div> */}
                </div>

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