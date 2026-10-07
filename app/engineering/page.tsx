import Link from "next/link";
import { getArticles } from "@/lib/engineering";
import { pageMetadata } from "@/lib/site";
import { ArticleCards } from "../components/ArticleCards";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  headingClass,
  textLinkClass,
} from "../components/Editorial";

export const metadata = pageMetadata(
  "Engineering",
  "Engineering notes on production software: trust boundaries, payments, data integrity, deployment and the decisions behind HexCode systems.",
  "/engineering",
);

export default function EngineeringPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Engineering · Technical publishing"
        title="From system to explanation."
        description="Detailed notes on the decisions behind real systems: what the server must own, how workflows fail, and how to verify that recovery actually works."
      />
      <section className={sectionClass}>
        <h2 className={`${headingClass} mb-5`}>Engineering notes.</h2>
        <p className="mb-10 max-w-3xl text-base leading-8 text-neutral-400">
          The first notes follow Palermo’s commerce architecture. Future
          articles will expand on implementation, debugging and delivery, with
          evidence and trade-offs attached.
        </p>
        <ArticleCards articles={getArticles()} />
      </section>
      <section className="border-t border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <h2 className={headingClass}>Read the system behind the notes.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400">
            Palermo brings identity, permissions, checkout, inventory and
            payment recovery together in one application.
          </p>
          <Link href="/work/palermo" className={`${textLinkClass} mt-6`}>
            Palermo case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
