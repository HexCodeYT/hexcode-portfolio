// The same catalogue drives selected work, case-study routing, and the sitemap.
export const work = [
  {
    slug: "palermo",
    title: "Palermo",
    category: "Flagship · Application & commerce engineering",
    description:
      "A server-authoritative commerce system connecting identity, checkout, payment recovery and inventory. Deployed as a controlled demonstration with Stripe test mode.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Stripe"],
    caseStudy: true,
  },
  {
    slug: "aussielk",
    title: "AussieLK",
    category: "Sourcing platform",
    description:
      "Australian products sourced for customers in Sri Lanka, with request workflows, payments and administration.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    href: "https://aussielk.com.au",
    linkLabel: "Visit AussieLK",
  },
  {
    slug: "plainlink",
    title: "PlainLink",
    category: "Native software · Privacy",
    description:
      "A macOS clipboard utility that removes known tracking parameters while preserving unknown ones. Its conservative rules are fixture-tested.",
    tags: ["Rust", "Swift", "AppKit", "GitHub Actions"],
    href: "https://github.com/HexCodeYT/PlainLink",
    linkLabel: "Explore the repository",
  },
  {
    slug: "path",
    title: "P.A.T.H.",
    category: "Research · GPU compute",
    description:
      "Experimental prime sieving on Apple Silicon, with architecture, validation and measured M1 results in the research summary.",
    tags: ["Metal", "Objective-C++", "Apple Silicon"],
    href: "/research/path",
    linkLabel: "Read the research summary",
  },
] as const;

export const caseStudies = work.filter(
  (project) => "caseStudy" in project && project.caseStudy,
);
