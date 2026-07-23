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
};

const outcomes = [
  {
    title: "Overflow capacity",
    description:
      "Add delivery capacity when your internal team is booked without committing to another permanent hire.",
  },
  {
    title: "Technical depth",
    description:
      "Bring in backend, integration, deployment and production support when a build extends beyond presentation work.",
  },
  {
    title: "Invisible delivery",
    description:
      "Work is delivered under your agency relationship, with confidential communication and no direct client solicitation.",
  },
];

const services = [
  "Figma-to-code implementation",
  "Landing pages and campaign sites",
  "Multi-page business websites",
  "Ecommerce and payment integrations",
  "Analytics and conversion tracking",
  "Forms, APIs and third-party integrations",
  "Performance and accessibility remediation",
  "Deployment and production troubleshooting",
  "Ongoing development capacity",
];

const engagements = [
  { title: "Landing pages", price: "From $900" },
  { title: "Business websites", price: "From $2,000" },
  { title: "Technical rescue", price: "From $500" },
  { title: "Reserved monthly capacity", price: "From $2,000" },
];

const process = [
  {
    title: "Scope",
    description:
      "Share the designs, requirements, integrations, deadline and current project state.",
  },
  {
    title: "Agreement",
    description:
      "Confirm the written scope, delivery plan, responsibilities, price and commencement payment.",
  },
  {
    title: "Delivery",
    description:
      "Receive documented progress updates and review builds at agreed checkpoints.",
  },
  {
    title: "Handover",
    description:
      "Receive production-ready code, deployment support and practical documentation for your team.",
  },
];

const proof = [
  {
    title: "AussieLK",
    label: "Full-stack platform",
    description:
      "Designed and built a request-based sourcing platform with authentication, encrypted request workflows, payment integration, admin tooling, audit logging and infrastructure deployment.",
  },
  {
    title: "PlainLink",
    label: "Native macOS product",
    description:
      "Built a local-first copied-link cleaner with a Rust core and CLI, native Swift/AppKit menu bar app, user LaunchAgent, fixture-tested rules and release automation.",
  },
  {
    title: "Infrastructure and technical operations",
    label: "Production systems",
    description:
      "Deploy and operate containerised services with secure networking, reverse proxy routing, firewall controls, persistent monitoring and production troubleshooting.",
  },
];

const principles = [
  "Fixed documented scope",
  "Realistic delivery dates",
  "Written progress updates",
  "Confidential white-label delivery",
  "Clean handover and documentation",
  "No direct solicitation of agency clients",
  "Paid pilot available",
  "NDA-friendly",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-neutral-400">{description}</p>
      ) : null}
    </div>
  );
}

export default function AgenciesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <AgencyPageTracker />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          White-label agency development
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-7xl">
          You keep the client. I handle the build.
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
          Reliable white-label development for design, marketing and SEO
          agencies that need projects delivered without hiring another
          full-time developer.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <TrackedAgencyLink
            href="#agency-contact"
            event="agency_primary_cta_click"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black outline-none transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Discuss a project
          </TrackedAgencyLink>
          <a
            href="#process"
            className="rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white outline-none transition hover:border-neutral-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            See how it works
          </a>
        </div>

        <p className="mt-7 text-sm leading-6 text-neutral-600">
          Melbourne-based • Australian business hours • Confidential delivery
        </p>
      </section>

      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-16 md:grid-cols-3 md:py-20">
          {outcomes.map((outcome, index) => (
            <article
              key={outcome.title}
              className={`py-7 md:px-7 md:py-0 ${
                index > 0
                  ? "border-t border-neutral-900 md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <h2 className="text-xl font-medium text-white">{outcome.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {outcome.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Services"
          title="Development capacity where your agency needs it."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service}
              className="flex min-h-28 items-end rounded-2xl border border-neutral-900 bg-neutral-950/70 p-5"
            >
              <p className="font-medium leading-6 text-neutral-300">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <SectionHeading
            eyebrow="Engagement options"
            title="Clear starting points."
            description="Choose a defined build, bring in technical rescue, or reserve ongoing delivery capacity."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((engagement) => (
              <article
                key={engagement.title}
                className="rounded-3xl border border-neutral-900 bg-black/60 p-6"
              >
                <p className="text-sm leading-6 text-neutral-500">
                  {engagement.title}
                </p>
                <p className="mt-5 text-2xl font-medium text-white">
                  {engagement.price}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-900 p-5 text-sm leading-6 text-neutral-500">
            <p>Fixed projects require a 50% commencement payment.</p>
            <p className="mt-1">
              Final pricing depends on scope, supplied designs, integrations and
              turnaround.
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <SectionHeading eyebrow="Process" title="Structured enough to stay invisible." />

          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <li
                key={step.title}
                className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-6"
              >
                <p className="font-mono text-xs text-neutral-600">
                  0{index + 1}
                </p>
                <h3 className="mt-8 text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-7 max-w-3xl text-base leading-7 text-neutral-400">
            Your agency retains ownership of the client relationship and
            commercial terms.
          </p>
        </div>
      </section>

      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <SectionHeading
            eyebrow="Proof"
            title="Systems delivered across product and operations."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {proof.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-neutral-900 bg-black/60 p-7"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                  {item.label}
                </p>
                <h3 className="mt-5 text-2xl font-medium text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Working principles"
          title="A predictable extension of your team."
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <li
              key={principle}
              className="flex min-h-24 items-center gap-3 rounded-2xl border border-neutral-900 px-5 py-4 text-sm leading-6 text-neutral-400"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="agency-contact"
        className="scroll-mt-20 border-t border-neutral-900 bg-neutral-950/40"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Have a project your team cannot currently fit?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
              Share the practical details. You will receive a direct response
              about fit, availability and the next useful step.
            </p>
          </div>

          <AgencyContactForm />
        </div>
      </section>

      <footer className="border-t border-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>HexCode · Melbourne, Australia</p>
          <div className="flex gap-5">
            <Link
              href="/"
              className="rounded-sm outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              Portfolio
            </Link>
            <TrackedAgencyLink
              href="mailto:pawan@hexcode.au?subject=White-label%20agency%20project"
              event="agency_email_click"
              className="rounded-sm outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              Email
            </TrackedAgencyLink>
          </div>
        </div>
      </footer>
    </main>
  );
}
