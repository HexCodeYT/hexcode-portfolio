import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/engineering";
import { caseStudies } from "@/lib/work";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    "/",
    "/work",
    "/engineering",
    "/services",
    "/about",
    "/contact",
    "/agencies",
    "/research/path",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/research/path" ? "yearly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...caseStudies.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...getArticles().map((article) => ({
      url: `${siteUrl}/engineering/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
