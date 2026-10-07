import { getArticles } from "@/lib/engineering";
import { pageMetadata } from "@/lib/site";
import { ArticleCards } from "../components/ArticleCards";
import { PageHero, sectionClass } from "../components/Editorial";

export const metadata = pageMetadata(
  "Engineering",
  "Engineering notes on payments, permissions and the decisions behind HexCode systems.",
  "/engineering",
);

export default function EngineeringPage() {
  return (
    <main id="main-content">
      <PageHero
        compact
        eyebrow="Engineering"
        title="How the difficult parts work."
        description="Implementation decisions, failure paths and evidence from the systems we build."
      />
      <section className={sectionClass} aria-label="Engineering articles">
        <h2 className="sr-only">Engineering articles</h2>
        <ArticleCards articles={getArticles()} />
      </section>
    </main>
  );
}
