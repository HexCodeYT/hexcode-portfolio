import Image from "next/image";
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
  "About",
  "HexCode is a Melbourne engineering practice led by Pawan Sedara, focused on production software, reliability and technical publishing.",
  "/about",
);

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About HexCode"
        title="An engineering practice built around systems."
        description="HexCode builds, hardens and rescues production software, and publishes the engineering behind real systems. The work centres on reliability, security boundaries and the integrity of the data a business depends on."
      />
      <section className={sectionClass}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className={eyebrowClass}>Founder & engineer</p>
            <h2 className={`${headingClass} mt-4`}>Pawan Sedara.</h2>
            <Image
              src="/pfp.jpg"
              alt="Pawan Sedara"
              width={120}
              height={120}
              className="mt-8 rounded-2xl border border-neutral-800"
            />
          </div>
          <div className="space-y-6 text-base leading-8 text-neutral-400">
            <p>
              Pawan is the Melbourne-based founder and engineer behind HexCode.
              His work spans web applications, commerce and payment workflows,
              backend systems, self-hosted infrastructure and compute research.
            </p>
            <p>
              Palermo offers a detailed view of that work: backend and platform
              ownership in a collaborative application project, with
              server-authoritative commerce, identity and inventory workflows.
              AussieLK, PlainLink and P.A.T.H. show other parts of the practice.
            </p>
            <Link href="/work" className={textLinkClass}>
              Explore the systems <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="border-y border-neutral-900 bg-neutral-950/40">
        <div className={sectionClass}>
          <h2 className={headingClass}>How HexCode approaches engineering.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              [
                "Make authority explicit",
                "Decide where permissions, prices, state transitions and validation belong. Keep the browser and external providers inside clear trust boundaries.",
              ],
              [
                "Design for the failed path",
                "Treat retries, interrupted checkouts, partial integrations and broken releases as system behaviour to model and verify.",
              ],
              [
                "Leave evidence behind",
                "Use tests, documented decisions and release checks so the next engineer can understand what changed and why.",
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
        </div>
      </section>
      <section className={sectionClass}>
        <h2 className={headingClass}>Publishing is part of the practice.</h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-400">
          The engineering hub turns implementation decisions into useful
          technical explanations. Articles belong here as their canonical
          source, with project context, evidence and limitations that survive a
          shorter social post.
        </p>
        <Link href="/engineering" className={`${textLinkClass} mt-6`}>
          Read engineering notes <span aria-hidden="true">→</span>
        </Link>
      </section>
      <ContactCTA />
    </main>
  );
}
