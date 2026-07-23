import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContactForm } from "./AgencyContactForm";
import { AgencyPageTracker, TrackedAgencyLink } from "./AgencyTracking";

export const metadata: Metadata = {
  title: "White-label web development for agencies | HexCode",
  description:
    "Melbourne-based white-label development for design, marketing and SEO agencies. Reliable website builds, ecommerce, integrations and technical rescue without adding headcount.",
  alternates: {
    canonical: "https://hexcode.au/agencies",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hexcode.au/agencies",
    siteName: "HexCode",
    title: "White-label web development for agencies | HexCode",
    description:
      "Melbourne-based white-label development for design, marketing and SEO agencies. Reliable website builds, ecommerce, integrations and technical rescue without adding headcount.",
    images: [
      {
        url: "/hexcode-agencies-og.png",
        width: 1200,
        height: 630,
        alt: "HexCode — You keep the client. I handle the build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "White-label web development for agencies | HexCode",
    description:
      "Melbourne-based white-label development for design, marketing and SEO agencies. Reliable website builds, ecommerce, integrations and technical rescue without adding headcount.",
    images: ["/hexcode-agencies-og.png"],
  },
};

export default function AgenciesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <AgencyPageTracker />

      <section className="relative mx-auto flex min-h-[44rem] max-w-6xl items-center px-6 pt-28 pb-20 md:min-h-[52rem] md:pt-32 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-[-18rem] h-[38rem] w-[38rem] rounded-full bg-emerald-500/[0.08] blur-[120px]"
        />

        <div className="relative max-w-5xl">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-emerald-500 uppercase sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            White-label development
          </p>

          <h1 className="mt-7 text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl md:text-8xl lg:text-[6.5rem]">
            <span className="block">You keep the client.</span>
            <span className="block">I handle the build.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
            Websites, commerce, integrations and technical rescue for design
            and marketing agencies that need reliable delivery capacity.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <TrackedAgencyLink
              href="#agency-contact"
              event="agency_primary_cta_click"
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black outline-none transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start a project
            </TrackedAgencyLink>
            <Link
              href="/#projects"
              className="rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white outline-none transition hover:border-neutral-600 hover:bg-neutral-950 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View selected work
            </Link>
          </div>

          <p className="mt-8 text-sm leading-6 text-neutral-500">
            Melbourne-based · NDA-friendly · Your clients stay yours
          </p>
        </div>
      </section>

      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-10 flex max-w-3xl items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Ways to work together.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr] lg:grid-rows-2">
            <article className="rounded-3xl border border-emerald-500/25 bg-black p-7 shadow-[inset_0_1px_0_rgba(16,185,129,0.08)] transition hover:border-emerald-500/45 sm:p-9 lg:row-span-2">
              <div className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-emerald-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Fixed-scope delivery
              </div>
              <h3 className="mt-16 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Project builds
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-400">
                Websites, landing pages, ecommerce and Figma-to-code delivery.
              </p>
              <ul className="mt-10 space-y-3 border-t border-neutral-800 pt-6 text-sm text-neutral-300">
                <li>Landing pages from $900</li>
                <li>Business websites from $2,000</li>
                <li className="text-neutral-400">50% commencement payment</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-neutral-900 bg-black/70 p-7 transition hover:border-neutral-700 sm:p-8">
              <h3 className="text-2xl font-medium tracking-tight text-white">
                Technical rescue
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Broken deployments, payments, integrations, analytics and
                performance problems.
              </p>
              <p className="mt-8 text-sm font-medium text-white">From $500</p>
            </article>

            <article className="rounded-3xl border border-neutral-900 bg-black/70 p-7 transition hover:border-neutral-700 sm:p-8">
              <h3 className="text-2xl font-medium tracking-tight text-white">
                Reserved capacity
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Pre-booked development capacity for agencies with recurring
                overflow work.
              </p>
              <p className="mt-8 text-sm font-medium text-white">
                From $2,000/month
              </p>
            </article>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-neutral-500">
            Final pricing depends on scope, supplied designs, integrations and
            turnaround requirements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Built beyond brochure sites.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
            Production experience across commerce, payments, backend systems and
            infrastructure through AussieLK, PlainLink and self-hosted
            operations.
          </p>
          <Link
            href="/#projects"
            className="mt-8 inline-block rounded-sm text-sm font-medium text-emerald-500 outline-none transition hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            View selected work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        id="agency-contact"
        className="scroll-mt-20 border-t border-neutral-900 bg-neutral-950/40"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:pt-5">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Got work your team cannot fit?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400">
              Send the brief. I’ll tell you directly whether I can deliver it,
              what it will cost and when it can be done.
            </p>
          </div>

          <AgencyContactForm />
        </div>
      </section>
    </main>
  );
}
