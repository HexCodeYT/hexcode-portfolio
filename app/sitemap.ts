import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hexcode.au/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://hexcode.au/agencies",
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
