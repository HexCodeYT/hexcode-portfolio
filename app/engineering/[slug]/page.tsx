import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  formatArticleDate,
  getArticle,
  getArticles,
  getRelatedArticles,
} from "@/lib/engineering";
import { pageMetadata, siteUrl } from "@/lib/site";
import { work } from "@/lib/work";
import { ArticleCards } from "../../components/ArticleCards";
import { Tags } from "../../components/WorkCards";
import {
  containerClass,
  eyebrowClass,
  headingClass,
  sectionClass,
  textLinkClass,
} from "../../components/Editorial";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

type MarkdownNode = { value?: string; children?: MarkdownNode[] };
function headingId(node?: MarkdownNode): string {
  function text(node: MarkdownNode): string {
    return node.value ?? node.children?.map(text).join("") ?? "";
  }
  return text(node ?? {})
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const base = pageMetadata(
    article.title,
    article.description,
    `/engineering/${article.slug}`,
  );
  const images = [
    {
      url: article.socialImage ?? "/opengraph-image",
      alt: article.socialImageAlt ?? article.title,
    },
  ];
  return {
    ...base,
    alternates: { canonical: article.canonicalUrl },
    openGraph: {
      ...base.openGraph,
      type: "article",
      url: article.canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: ["Pawan Sedara"],
      tags: article.tags,
      images,
    },
    twitter: { ...base.twitter, card: "summary_large_image", images },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = getRelatedArticles(article);
  const project = work.find(
    (project) => project.slug === article.relatedProject,
  );
  const projectHref =
    project &&
    ("caseStudy" in project
      ? `/work/${project.slug}`
      : "href" in project
        ? project.href
        : "/work");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: article.canonicalUrl,
    image: new URL(article.socialImage ?? "/opengraph-image", siteUrl).href,
    author: {
      "@type": "Person",
      name: "Pawan Sedara",
      url: `${siteUrl}/about`,
    },
    publisher: { "@type": "Organization", name: "HexCode", url: siteUrl },
    keywords: article.tags,
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <header className="border-b border-neutral-900">
          <div className={`${containerClass} pt-36 pb-16 md:pt-44 md:pb-20`}>
            <Link href="/engineering" className={textLinkClass}>
              ← Engineering
            </Link>
            <p className={`${eyebrowClass} mt-10`}>Engineering note</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
              {article.description}
            </p>
            <p className="mt-6 text-sm leading-6 text-neutral-500">
              Pawan Sedara ·{" "}
              <time dateTime={article.publishedAt}>
                {formatArticleDate(article.publishedAt)}
              </time>
              {article.updatedAt && (
                <>
                  {" "}
                  · Updated{" "}
                  <time dateTime={article.updatedAt}>
                    {formatArticleDate(article.updatedAt)}
                  </time>
                </>
              )}
            </p>
            <div className="mt-6">
              <Tags tags={article.tags} />
            </div>
          </div>
        </header>
        <div className={`${containerClass} py-16 md:py-20`}>
          <div className="engineering-prose max-w-3xl">
            <ReactMarkdown
              skipHtml
              components={{
                a: ({ href, children }) =>
                  href?.startsWith("/") && !href.startsWith("//") ? (
                    <Link href={href}>{children}</Link>
                  ) : (
                    <a href={href}>{children}</a>
                  ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} id={headingId(node)} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} id={headingId(node)} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 {...props} id={headingId(node)} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 {...props} id={headingId(node)} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 {...props} id={headingId(node)} />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
          <aside
            className="mt-14 max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-950/40 p-7"
            aria-label="Further context"
          >
            <h2 className="text-xl font-medium">Apply this to a system.</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              Read the project context or discuss a production-readiness review
              of your own application.
            </p>
            <div className="mt-5 flex flex-wrap gap-6">
              {project && projectHref && (
                <Link href={projectHref} className={textLinkClass}>
                  {project.title} <span aria-hidden="true">→</span>
                </Link>
              )}
              <Link
                href="/services#production-readiness"
                className={textLinkClass}
              >
                Production readiness <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className={textLinkClass}>
                Discuss a system <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="border-t border-neutral-900">
          <div className={sectionClass}>
            <h2 className={`${headingClass} mb-10`}>Related engineering.</h2>
            <ArticleCards articles={related} />
          </div>
        </section>
      )}
    </main>
  );
}
