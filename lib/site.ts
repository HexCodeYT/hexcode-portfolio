import type { Metadata } from "next";

export const siteUrl = "https://hexcode.au";
export const siteDescription =
  "HexCode builds, hardens and rescues production software, and publishes the engineering behind real systems.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | HexCode`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: "HexCode",
      title: fullTitle,
      description,
      url: `${siteUrl}${path}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "HexCode — Building the demo is the easy part.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
