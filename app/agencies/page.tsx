import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { ContactForm } from "../components/ContactForm";
import { AgencyPageTracker, TrackedAgencyLink } from "./AgencyTracking";
import {
  PageHero,
  sectionClass,
  eyebrowClass,
  headingClass,
  primaryButtonClass,
  secondaryButtonClass,
  textLinkClass,
} from "../components/Editorial";

export const metadata = pageMetadata(
  "Technical engineering partner for agencies",
  "Complex commerce, backend integrations, production hardening and rescue for agencies when a project exceeds normal web-development scope.",
  "/agencies",
);

export default function AgenciesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black text-white">
      <AgencyPageTracker />
      <PageHero
        eyebrow="Agency engineering partnerships"
        title="A technical partner for the difficult parts."
        description="When a client project extends into complex commerce, backend integrations or production reliability, HexCode takes ownership of the engineering that sits beyond normal website implementation."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <TrackedAgencyLink
            href="#agency-contact"
            event="agency_primary_cta_click"
            className={primaryButtonClass}
          >
            Discuss a project
          </TrackedAgencyLink>
          <Link href="/work/palermo" className={secondaryButtonClass}>
            Explore Palermo
          </Link>
        </div>
        <p className="mt-8 text-sm leading-6 text-neutral-500">
          Melbourne-based · NDA-friendly · Your client relationship stays yours
        </p>
      </PageHero>
      <section className="border-b border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <h2 className={headingClass}>Where HexCode fits.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.85fr] lg:grid-rows-2">
            <article className="rounded-3xl border border-emerald-500/25 bg-black p-7 shadow-[inset_0_1px_0_rgba(16,185,129,0.08)] sm:p-9 lg:row-span-2">
              <p className={eyebrowClass}>Application engineering</p>
              <h3 className="mt-12 text-3xl font-medium tracking-tight sm:text-4xl">
                Complex commerce & backends
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-400">
                Payment and order workflows, pricing and promotions,
                permissions, inventory and provider integrations. Clear
                technical ownership when the brief becomes an application.
              </p>
              <ul className="mt-8 space-y-3 border-t border-neutral-800 pt-6 text-sm leading-6 text-neutral-300">
                <li>Architecture and system boundaries</li>
                <li>Server-side workflows and integrations</li>
                <li>Testing and technical handover</li>
              </ul>
            </article>
            <article className="rounded-3xl border border-neutral-900 bg-black/70 p-7 sm:p-8">
              <h3 className="text-2xl font-medium tracking-tight">
                Production hardening
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                Prepare an application for launch: auth, permissions,
                deployment, validation, recovery and the business-critical paths
                a successful build cannot verify.
              </p>
            </article>
            <article className="rounded-3xl border border-neutral-900 bg-black/70 p-7 sm:p-8">
              <h3 className="text-2xl font-medium tracking-tight">
                Technical rescue
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                Investigate broken deployments, payment failures and unreliable
                backend integrations. Establish the cause, repair the boundary
                and verify the affected workflow.
              </p>
            </article>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-500">
            Qualification-led, project-based engagements. Scope and delivery
            terms follow an assessment of the system and the technical work
            required.
          </p>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrowClass}>Proof in the system</p>
            <h2 className={`${headingClass} mt-4`}>
              Palermo goes beyond the storefront.
            </h2>
            <p className="mt-6 text-base leading-8 text-neutral-400">
              A substantial Next.js commerce system with PostgreSQL, secure
              sessions, RBAC, Stripe test-mode payments and transactional
              inventory. The case study explains implementation decisions,
              recovery paths and delivery evidence.
            </p>
            <Link href="/work/palermo" className={`${textLinkClass} mt-6`}>
              Read the case study <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              A clear delivery relationship.
            </h2>
            <ol className="mt-6 space-y-6 text-sm leading-7 text-neutral-400">
              <li>
                <span className="text-neutral-200">
                  01 · Understand the system.
                </span>
                <br />
                Review the brief, stack, current state and constraints with your
                team.
              </li>
              <li>
                <span className="text-neutral-200">
                  02 · Agree the boundaries.
                </span>
                <br />
                Define responsibilities, access, acceptance checks and the
                engagement scope.
              </li>
              <li>
                <span className="text-neutral-200">
                  03 · Deliver with evidence.
                </span>
                <br />
                Implement the engineering, verify critical workflows and
                document the handover.
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section
        id="agency-contact"
        className="scroll-mt-8 border-t border-neutral-900 bg-neutral-950/40"
      >
        <div
          className={`${sectionClass} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}
        >
          <div>
            <h2 className={headingClass}>Bring the technical brief.</h2>
            <p className="mt-6 text-base leading-8 text-neutral-400">
              Describe the system, the work your team needs help with and the
              delivery constraints. We’ll establish whether HexCode is the right
              engineering partner.
            </p>
          </div>
          <ContactForm audience="agency" />
        </div>
      </section>
    </main>
  );
}
