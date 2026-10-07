import { pageMetadata } from "@/lib/site";
import { ContactForm } from "../components/ContactForm";
import { PageHero, sectionClass, headingClass } from "../components/Editorial";

export const metadata = pageMetadata(
  "Contact",
  "Discuss a production-readiness review, technical rescue or engineering partnership with HexCode in Melbourne.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Start with the system."
        description="Tell us what you’re building, what is failing, or what needs to be ready for launch. HexCode will assess the fit and define a project-based engagement around the work."
      />
      <section
        className={`${sectionClass} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}
      >
        <div>
          <h2 className={headingClass}>Discuss an engineering engagement.</h2>
          <p className="mt-6 text-base leading-8 text-neutral-400">
            Useful context includes the stack, the current stage, the affected
            workflow and any launch deadline. An initial description is enough
            to start.
          </p>
          <p className="mt-5 text-sm leading-7 text-neutral-500">
            Keep credentials, customer data and private configuration out of the
            enquiry. Access can be arranged after the scope is understood.
          </p>
          <a
            href="mailto:pawan@hexcode.au"
            className="mt-8 inline-block text-emerald-400 hover:text-emerald-300"
          >
            pawan@hexcode.au
          </a>
          <p className="mt-5 text-sm text-neutral-500">
            Melbourne, Australia · Pawan Sedara, founder & engineer
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
