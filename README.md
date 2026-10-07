# HexCode

Next.js engineering practice and technical publishing site for [hexcode.au](https://hexcode.au).

## Local development

Use Node.js 24 for the native TypeScript test runner.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

## Routes and content

- `/`: production-engineering positioning, Palermo proof, capabilities, latest articles and selected systems.
- `/work`, `/work/palermo`: selected systems and flagship case study.
- `/engineering`, `/engineering/[slug]`: repository-native Markdown publishing.
- `/services`, `/about`, `/contact`: practice, engagements and qualification.
- `/agencies`: technical engineering partnerships; existing route and analytics events preserved.
- `/research/path`: existing research summary.

### Add an engineering article

Add a Markdown file at `content/engineering/<slug>.md`. Filenames use lowercase words separated by hyphens. The shared template creates the route, cards, metadata, related articles, structured data and sitemap entry at build time; no React page is required.

```yaml
---
title: "A specific engineering decision"
description: "What the reader will learn and which system it concerns."
publishedAt: "2026-10-07"
updatedAt: "2026-10-08" # optional, never before publishedAt
tags: ["Architecture", "Reliability"]
relatedProject: "palermo" # optional slug from lib/work.ts
canonicalUrl: "https://hexcode.au/engineering/a-specific-engineering-decision" # optional; must match this article's exact HexCode route
# socialImage: "/articles/example-og.png" # optional image in public/
# socialImageAlt: "Description of the image" # required with socialImage
# draft: true # excludes the article from routes, cards, related links and sitemap
---

## Start article sections at H2

Body text, [internal links](/work/palermo), lists, and fenced code blocks.
```

Dates must be quoted ISO dates. Set `draft: true` while preparing content; omit it or set it to false to publish on the next build. Publication is explicit; dates do not schedule deployment. Raw HTML is skipped and unsafe Markdown link protocols are filtered by react-markdown. Markdown is rendered on the server, without browser JavaScript for article content. Core Markdown is supported; no executable MDX, CMS, database or client editor is required.

`lib/engineering.ts` validates metadata and loads published content. Related articles use the project and tags. Canonicals are derived from the article slug as `https://hexcode.au/engineering/<slug>`; optional `canonicalUrl` metadata must match that exact URL. External URLs, other paths, query strings and fragments fail publication validation, keeping HexCode the source of record when adapting an article for social distribution. `lib/work.ts` drives selected work and case-study sitemap entries; add a case-study route and catalogue entry together.

The two initial engineering notes use documented Palermo boundaries. See [Palermo evidence](docs/palermo-evidence.md) for source revisions, attribution, test evidence and publication limits.

## Contact and analytics

The reusable contact form at `/contact` and `/agencies` sends through the existing Resend REST integration. `/api/contact` is the shared handler; `/api/contact/agencies` remains a compatibility alias.

Configure:

```text
RESEND_API_KEY=<server secret>
CONTACT_TO=pawan@hexcode.au
CONTACT_FROM=HexCode <enquiries@your-verified-domain.example>
```

Existing `AGENCY_CONTACT_TO` and `AGENCY_CONTACT_FROM` are fallback names, so existing deployments keep working. No secret is needed for static page builds. Without delivery configuration, the form shows an explicit error and email fallback.

Optional consent-gated Google Analytics remains enabled only when the visitor accepts and this variable is configured:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Infrastructure

`deploy/Caddyfile.vps` retains routing for the unrelated self-hosted search, git and vault services. This site does not need a persistent database or worker.
