import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hexcode.au"),
  title: "HexCode",
  description: "Infrastructure, systems, and backend engineering.",
  alternates: {
    canonical: "https://hexcode.au",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hexcode.au",
    siteName: "HexCode",
    title: "HexCode",
    description: "Infrastructure, systems, and backend engineering.",
    images: [
      {
        url: "/hexcode-home-og.png",
        width: 1200,
        height: 630,
        alt: "HexCode — Self-hosted infrastructure, backend engineering, and systems built to last.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HexCode",
    description: "Infrastructure, systems, and backend engineering.",
    images: ["/hexcode-home-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <SiteHeader />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
