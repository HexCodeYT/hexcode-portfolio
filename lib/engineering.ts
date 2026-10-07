import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  relatedProject?: string;
  canonicalUrl: string;
  socialImage?: string;
  socialImageAlt?: string;
  content: string;
};

const contentDirectory = path.join(process.cwd(), "content/engineering");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function dateString(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`Article ${field} must be a quoted YYYY-MM-DD date`);
  }
  return value;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`Article ${field} is required`);
  return value.trim();
}

// Fail the build on malformed published content rather than shipping broken SEO.
export function parseArticle(source: string, slug: string): Article | null {
  if (!slugPattern.test(slug)) throw new Error(`Invalid article slug: ${slug}`);
  const { data, content } = matter(source);
  if (data.draft === true) return null;
  const title = requiredString(data.title, "title");
  const description = requiredString(data.description, "description");
  const publishedAt = dateString(data.publishedAt, "publishedAt");
  const updatedAt =
    data.updatedAt === undefined
      ? undefined
      : dateString(data.updatedAt, "updatedAt");
  if (updatedAt && updatedAt < publishedAt)
    throw new Error("Article updatedAt precedes publishedAt");
  if (
    !Array.isArray(data.tags) ||
    !data.tags.every((tag: unknown) => typeof tag === "string" && tag.trim())
  ) {
    throw new Error("Article tags must be an array of strings");
  }
  const relatedProject =
    data.relatedProject === undefined
      ? undefined
      : requiredString(data.relatedProject, "relatedProject");
  if (relatedProject && !slugPattern.test(relatedProject))
    throw new Error("Invalid related project slug");
  const canonicalUrl = `https://hexcode.au/engineering/${slug}`;
  if (
    data.canonicalUrl !== undefined &&
    requiredString(data.canonicalUrl, "canonicalUrl") !== canonicalUrl
  )
    throw new Error(
      `Article canonicalUrl must match its HexCode HTTPS route: ${canonicalUrl}`,
    );
  const socialImage =
    data.socialImage === undefined
      ? undefined
      : requiredString(data.socialImage, "socialImage");
  if (
    socialImage &&
    (!socialImage.startsWith("/") || socialImage.startsWith("//"))
  )
    throw new Error("Article socialImage must be a local absolute path");
  const socialImageAlt =
    data.socialImageAlt === undefined
      ? undefined
      : requiredString(data.socialImageAlt, "socialImageAlt");
  if (socialImage && !socialImageAlt)
    throw new Error("Article socialImageAlt is required with socialImage");
  if (!content.trim()) throw new Error("Article body is required");
  if (/^#\s/m.test(content.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "")))
    throw new Error("Article body headings must start at H2");
  return {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    tags: data.tags,
    relatedProject,
    canonicalUrl,
    socialImage,
    socialImageAlt,
    content,
  };
}

export function getArticles(): Article[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) =>
      parseArticle(
        fs.readFileSync(path.join(contentDirectory, file), "utf8"),
        file.slice(0, -3),
      ),
    )
    .filter((article): article is Article => article !== null)
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.slug.localeCompare(b.slug),
    );
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return getArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.relatedProject &&
        candidate.relatedProject === article.relatedProject
          ? 3
          : 0) +
        candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.candidate);
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
