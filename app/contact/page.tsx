import { pageMetadata } from "@/lib/site";
import { ContactForm } from "../components/ContactForm";
import { containerClass } from "../components/Editorial";

export const metadata = pageMetadata(
  "Contact",
  "Discuss a production-readiness review, technical rescue or engineering partnership with HexCode in Melbourne.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className={`${containerClass} pt-28 pb-12 md:pt-32`}
    >
      <section className="mx-auto max-w-2xl" aria-labelledby="contact-heading">
        <h1
          id="contact-heading"
          className="text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Tell us what you’re building.
        </h1>
        <p className="mt-4 mb-6 text-base leading-7 text-neutral-400">
          Share what needs to work, what’s blocked and any deadline.
        </p>
        <ContactForm compact />
      </section>
    </main>
  );
}
