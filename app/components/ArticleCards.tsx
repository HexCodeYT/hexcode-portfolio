import Link from "next/link";
import { formatArticleDate, type Article } from "@/lib/engineering";
import { textLinkClass } from "./Editorial";
import { Tags } from "./WorkCards";

export function ArticleCards({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {articles.map((article) => (
        <article
          key={article.slug}
          className="flex flex-col rounded-3xl border border-neutral-900 bg-neutral-950/40 p-7 sm:p-8"
        >
          <time
            dateTime={article.publishedAt}
            className="text-xs text-neutral-500"
          >
            {formatArticleDate(article.publishedAt)}
          </time>
          <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight">
            <Link
              href={`/engineering/${article.slug}`}
              className="hover:text-emerald-400"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-neutral-400">
            {article.description}
          </p>
          <div className="mt-6">
            <Tags tags={article.tags} />
          </div>
          <Link
            href={`/engineering/${article.slug}`}
            className={`${textLinkClass} mt-8`}
          >
            Read engineering note <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
