import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { ContactForm } from "../components/ContactForm";
import { AgencyPageTracker, TrackedAgencyLink } from "./AgencyTracking";
import {
  PageHero,
  sectionClass,
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
    <main id="main-content">
      <AgencyPageTracker />
      <PageHero
        compact
        eyebrow="For agencies"
        title="When the client brief outgrows a website."
        description="HexCode handles deeper application engineering so your team can take on complex commerce, integrations and launch reliability."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedAgencyLink
            href="#agency-contact"
            event="agency_primary_cta_click"
            className={primaryButtonClass}
          >
            Discuss a project
          </TrackedAgencyLink>
          <Link href="/work/palermo" className={secondaryButtonClass}>
            See Palermo
          </Link>
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          Melbourne-based · NDA-friendly · Your client relationship stays yours
        </p>
      </PageHero>
      <section className={sectionClass}>
        <h2 className={headingClass}>
          The parts that need deeper engineering.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            [
              "The workflow got complex",
              "Customers need payments, stock and orders to agree. HexCode engineers the commerce and backend integrations behind the interface.",
            ],
            [
              "Launch is getting risky",
              "A successful build doesn’t prove customers can rely on it. HexCode reviews architecture, permissions, deployment and recovery before launch.",
            ],
            [
              "A client system is failing",
              "Broken releases or unreliable payments put delivery at risk. HexCode investigates and repairs the application’s critical paths.",
            ],
          ].map(([title, description]) => (
            <article key={title} className="border-t border-neutral-800 pt-6">
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                {description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 border-t border-neutral-900 pt-7">
          <p className="max-w-3xl text-base leading-8 text-neutral-400">
            Palermo shows how payments, stock and permissions fit together in a
            controlled commerce demonstration.
          </p>
          <Link href="/work/palermo" className={`${textLinkClass} mt-4`}>
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section
        id="agency-contact"
        className="scroll-mt-8 border-t border-neutral-900 bg-neutral-950/40"
      >
        <div
          className={`${sectionClass} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}
        >
          <div>
            <h2 className={headingClass}>Bring the technical brief.</h2>
            <p className="mt-5 text-base leading-8 text-neutral-400">
              Share the system, the blocked work and the deadline. We’ll agree
              scope and technical ownership before quoting a project-based
              engagement.
            </p>
          </div>
          <ContactForm audience="agency" compact />
        </div>
      </section>
    </main>
  );
}
