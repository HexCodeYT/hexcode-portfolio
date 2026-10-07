import Link from "next/link";
import { pageMetadata, siteDescription } from "@/lib/site";
import { getArticles } from "@/lib/engineering";
import { ArticleCards } from "./components/ArticleCards";
import { PalermoFeature, SelectedWork } from "./components/WorkCards";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  eyebrowClass,
  headingClass,
  primaryButtonClass,
  secondaryButtonClass,
  textLinkClass,
} from "./components/Editorial";

export const metadata = pageMetadata(
  "Software that survives production",
  siteDescription,
  "/",
);

const capabilities = [
  [
    "Production applications",
    "Web applications and backend systems with clear ownership, permission boundaries, validation and dependable data workflows.",
  ],
  [
    "Commerce & payments",
    "Checkout, pricing, inventory and payment integrations designed around failures, retries and the integrity of each order.",
  ],
  [
    "Infrastructure & reliability",
    "Deployment, integrations and recovery paths that support the application after it leaves the development environment.",
  ],
];

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black text-white">
      <PageHero
        eyebrow="Production engineering · HexCode"
        title="Software that survives production."
        description="HexCode builds, hardens and rescues web applications, commerce systems, backends and infrastructure where reliability, security and data integrity matter."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/work" className={primaryButtonClass}>
            View our work
          </Link>
          <Link href="/contact" className={secondaryButtonClass}>
            Discuss a system
          </Link>
        </div>
        <p className="mt-8 text-sm text-neutral-500">
          An engineering practice led by Pawan Sedara · Melbourne, Australia
        </p>
      </PageHero>
      <section
        id="projects"
        className={sectionClass}
        aria-label="Flagship work"
      >
        <PalermoFeature />
      </section>
      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <p className={eyebrowClass}>Core capabilities</p>
          <h2 className={`${headingClass} mt-4 max-w-3xl`}>
            The engineering behind the interface.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {capabilities.map(([title, description]) => (
              <article key={title} className="border-t border-neutral-800 pt-6">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <Link href="/services" className={`${textLinkClass} mt-8`}>
            Production readiness, rescue & partnership{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrowClass}>Technical publishing</p>
            <h2 className={`${headingClass} mt-4`}>
              Latest engineering notes.
            </h2>
          </div>
          <Link href="/engineering" className={textLinkClass}>
            All engineering <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ArticleCards articles={getArticles().slice(0, 2)} />
      </section>
      <section className="border-t border-neutral-900">
        <div className={sectionClass}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className={headingClass}>Selected systems.</h2>
            <Link href="/work" className={textLinkClass}>
              Explore our work <span aria-hidden="true">→</span>
            </Link>
          </div>
          <SelectedWork />
        </div>
      </section>
      <div id="contact">
        <ContactCTA />
      </div>
    </main>
  );
}
