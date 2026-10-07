import { pageMetadata } from "@/lib/site";
import { ContactCTA, PageHero, sectionClass } from "../components/Editorial";

export const metadata = pageMetadata(
  "Services",
  "Preparing to launch, dealing with a broken system, or looking for deeper engineering? HexCode offers production readiness, rescue and technical partnership.",
  "/services",
);

const services = [
  {
    id: "production-readiness",
    name: "Production Readiness",
    hook: "You’ve built it. Now it has to survive customers.",
    description:
      "An MVP or AI-built application can work in a demo and still lose orders, expose data or fail at launch. HexCode reviews and hardens permissions, payments, data integrity, deployment, testing and recovery.",
    next: "Start with a review of the critical workflows and a scoped plan for what needs fixing.",
  },
  {
    id: "production-rescue",
    name: "Production Rescue",
    hook: "Something important is already breaking.",
    description:
      "Failed payments, unreliable access or broken deployments interrupt the business. HexCode investigates auth, integrations and backend workflows, repairs the cause and checks the affected path.",
    next: "Start with the failure, its impact and the evidence you already have.",
  },
  {
    id: "engineering-partner",
    name: "Engineering Partner",
    hook: "Your team reached the edge of its technical depth.",
    description:
      "When client or product work grows beyond normal website implementation, HexCode supports agencies and startups with complex applications, commerce, backend integrations and launch hardening.",
    next: "Start with the brief and agree which parts of the engineering HexCode will own.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        compact
        eyebrow="Services"
        title="Where does your system need help?"
        description="Preparing for customers, recovering a failure, or taking on a more complex build — start with the situation."
      />
      <section className={sectionClass} aria-label="Engineering engagements">
        <div className="space-y-10">
          {services.map((service) => (
            <article
              id={service.id}
              key={service.id}
              className="scroll-mt-8 grid gap-4 border-t border-neutral-800 pt-7 md:grid-cols-[0.7fr_1.3fr] md:gap-12"
            >
              <h2 className="text-sm font-medium text-emerald-400">
                {service.name}
              </h2>
              <div>
                <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {service.hook}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-400">
                  {service.description}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500">
                  {service.next}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm leading-7 text-neutral-500">
          Project-based engagements. Scope and a quote follow an assessment of
          the work.
        </p>
      </section>
      <ContactCTA />
    </main>
  );
}
