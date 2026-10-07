import { pageMetadata } from "@/lib/site";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  headingClass,
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
        eyebrow="Selected systems"
        title="Work with substance."
        description="Application architecture, commerce workflows, native tools and compute research. Start with Palermo for a detailed view of the engineering behind a substantial system."
      />
      <section className={sectionClass} aria-label="Flagship case study">
        <PalermoFeature />
      </section>
      <section className="border-t border-neutral-900">
        <div className={sectionClass}>
          <h2 className={`${headingClass} mb-10`}>More systems.</h2>
          <SelectedWork />
        </div>
      </section>
      <section className={`${sectionClass} border-t border-neutral-900`}>
        <h2 className="text-2xl font-medium tracking-tight">
          Supporting infrastructure
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-400">
          Self-hosted services also inform the practice: Debian, Docker,
          WireGuard, Caddy routing and firewall configuration. That operational
          work supports application delivery and reliability.
        </p>
        <a
          href="https://github.com/HexCodeYT/privacy-search-infra"
          className="mt-6 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          Explore the search infrastructure <span aria-hidden="true">→</span>
        </a>
      </section>
      <ContactCTA />
    </main>
  );
}
