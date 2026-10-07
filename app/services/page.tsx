import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  eyebrowClass,
  headingClass,
  textLinkClass,
} from "../components/Editorial";

export const metadata = pageMetadata(
  "Services",
  "Production readiness, production rescue and engineering partnerships for applications where permissions, payments, data integrity and reliability matter.",
  "/services",
);

const services = [
  {
    id: "production-readiness",
    title: "Production Readiness",
    intro:
      "Take an MVP or AI-built application from a working demo to a system prepared for real users and real failure modes.",
    areas: [
      "Authentication, sessions and permissions",
      "Payments, pricing and data integrity",
      "Validation, testing and security boundaries",
      "Deployment, recovery and reliability",
    ],
    outcome:
      "A review of the critical paths, a prioritised engineering plan, and scoped implementation of the changes needed before launch.",
  },
  {
    id: "production-rescue",
    title: "Production Rescue",
    intro:
      "Diagnose and repair a system that is failing in deployment or in the workflows your business depends on.",
    areas: [
      "Broken deployments and release regressions",
      "Payment failures and inconsistent order state",
      "Authentication and authorisation defects",
      "Backend, integration and reliability problems",
    ],
    outcome:
      "An evidence-led diagnosis, a bounded repair, and regression checks for the failure that brought you here.",
  },
  {
    id: "engineering-partner",
    title: "Engineering Partner",
    intro:
      "Deeper technical delivery for agencies and startups when the work extends beyond normal website implementation.",
    areas: [
      "Complex commerce and application workflows",
      "Backend systems and provider integrations",
      "Architecture and technical delivery",
      "Launch hardening and ongoing engineering",
    ],
    outcome:
      "An agreed technical scope, clear ownership of the difficult system areas, and delivery that fits your team’s workflow.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Engineering engagements"
        title="Build. Harden. Rescue."
        description="A narrow practice focused on the parts of software that carry operational risk. Engagements start with the system, the current failure or launch concern, and the outcome you need."
      />
      <div className={sectionClass}>
        {services.map((service, index) => (
          <section
            id={service.id}
            key={service.id}
            className={`scroll-mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 ${index > 0 ? "mt-16 border-t border-neutral-900 pt-16" : ""}`}
          >
            <div>
              <p className={eyebrowClass}>0{index + 1} · Service</p>
              <h2 className={`${headingClass} mt-4`}>{service.title}</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-neutral-400">
                {service.intro}
              </p>
              <ul className="mt-7 space-y-3 text-sm leading-7 text-neutral-300">
                {service.areas.map((area) => (
                  <li key={area} className="border-b border-neutral-900 pb-3">
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-base leading-8 text-neutral-400">
                {service.outcome}
              </p>
              <Link href="/contact" className={`${textLinkClass} mt-6`}>
                Discuss this engagement <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        ))}
      </div>
      <section className="border-t border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <h2 className={headingClass}>Scope before a quote.</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-400">
            Work is qualified and priced by project. Share the stack, what is
            working, what is blocked and the deadline. We’ll establish the
            technical scope and delivery approach before proposing an
            engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/work/palermo" className={textLinkClass}>
              See Palermo’s engineering <span aria-hidden="true">→</span>
            </Link>
            <Link href="/agencies" className={textLinkClass}>
              Agency partnerships <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
