import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import {
  PageHero,
  sectionClass,
  headingClass,
  textLinkClass,
} from "../components/Editorial";

export const metadata = pageMetadata(
  "About",
  "HexCode is a Melbourne engineering practice led by Pawan Sedara, focused on production software, reliability and documented implementation.",
  "/about",
);

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        compact
        eyebrow="About HexCode"
        title="Engineering for what happens after launch."
        description="HexCode is an engineering practice focused on production software, reliability and the technical depth behind dependable systems."
      />
      <section className={sectionClass}>
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <Image
            src="/pfp.jpg"
            alt="Pawan Sedara"
            width={120}
            height={120}
            className="shrink-0 rounded-2xl border border-neutral-800"
          />
          <div className="max-w-2xl">
            <h2 className={headingClass}>Pawan Sedara.</h2>
            <p className="mt-3 text-sm text-emerald-400">
              Founder & engineer · Melbourne, Australia
            </p>
            <p className="mt-6 text-base leading-8 text-neutral-400">
              Pawan works on applications, commerce and backend systems where
              failures affect the people using them. The practice is grounded in
              real implementations, tested workflows and documented engineering
              decisions.
            </p>
            <p className="mt-5 text-base leading-8 text-neutral-400">
              The work shows what was built. The engineering notes explain why
              it works, where it can fail and what the evidence actually proves.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              <Link href="/work" className={textLinkClass}>
                Explore the work <span aria-hidden="true">→</span>
              </Link>
              <Link href="/engineering" className={textLinkClass}>
                Read the engineering <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className={textLinkClass}>
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
