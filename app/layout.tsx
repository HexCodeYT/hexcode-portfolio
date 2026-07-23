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
