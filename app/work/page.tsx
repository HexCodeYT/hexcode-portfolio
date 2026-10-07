import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import {
  PageHero,
  sectionClass,
  headingClass,
  textLinkClass,
} from "../components/Editorial";
import { PalermoFeature, SelectedWork } from "../components/WorkCards";

export const metadata = pageMetadata(
  "Work",
  "Selected HexCode systems: Palermo commerce engineering, AussieLK, PlainLink, GPU research and supporting infrastructure.",
  "/work",
);

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero
        compact
        eyebrow="Selected systems"
        title="The work behind the claims."
        description="Start with Palermo for the difficult parts of commerce. Explore the other systems for breadth."
      />
      <section className={sectionClass} aria-label="Flagship case study">
        <PalermoFeature />
      </section>
      <section className="border-t border-neutral-900">
        <div className={sectionClass}>
          <h2 className={`${headingClass} mb-8`}>Other systems.</h2>
          <SelectedWork />
          <div className="mt-10 border-t border-neutral-900 pt-7">
            <h3 className="text-lg font-medium">Supporting infrastructure</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400">
              Self-hosted search and services, with Docker, WireGuard and Caddy,
              support the practice’s deployment and operational work.
            </p>
            <a
              href="https://github.com/HexCodeYT/privacy-search-infra"
              className={`${textLinkClass} mt-4`}
            >
              Explore the infrastructure <span aria-hidden="true">→</span>
            </a>
          </div>
          <Link href="/contact" className={`${textLinkClass} mt-8`}>
            Discuss your system <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
