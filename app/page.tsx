import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { getArticles } from "@/lib/engineering";
import { ArticleCards } from "./components/ArticleCards";
import { PalermoFeature } from "./components/WorkCards";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  headingClass,
  primaryButtonClass,
  secondaryButtonClass,
  textLinkClass,
} from "./components/Editorial";

export const metadata = pageMetadata(
  "Building the demo is the easy part",
  "HexCode engineers the parts businesses depend on after launch — payments, permissions, data, deployment and recovery.",
  "/",
);

const situations = [
  [
    "Going live",
    "The MVP works. Now real customers, payments and data are entering it.",
  ],
  [
    "Something is breaking",
    "Payments, permissions, deployments or backend workflows are unreliable.",
  ],
  [
    "The build got complicated",
    "Your team or agency has reached engineering work outside its normal depth.",
  ],
];

export default function Home() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="HexCode · Production engineering"
        title="Building the demo is the easy part."
        description="HexCode engineers the parts businesses depend on after launch — payments, permissions, data, deployment and recovery."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/work" className={primaryButtonClass}>
            View our work
          </Link>
          <Link href="/contact" className={secondaryButtonClass}>
            Discuss your system
          </Link>
        </div>
      </PageHero>
      <section
        id="projects"
        className={sectionClass}
        aria-label="Palermo proof"
      >
        <PalermoFeature />
      </section>
      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <h2 className={`${headingClass} max-w-3xl`}>
            When software becomes business-critical.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {situations.map(([title, description]) => (
              <article key={title} className="border-t border-neutral-800 pt-6">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <Link href="/services" className={`${textLinkClass} mt-8`}>
            Find the right engagement <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className={headingClass}>Engineering behind the work.</h2>
          <Link href="/engineering" className={textLinkClass}>
            All engineering <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ArticleCards articles={getArticles().slice(0, 2)} />
      </section>
      <div id="contact">
        <ContactCTA />
      </div>
    </main>
  );
}
