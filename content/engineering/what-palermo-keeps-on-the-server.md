---
title: "An admin button doesn’t make someone an administrator."
description: "Palermo’s server-owned permissions, application boundaries and the evidence used to validate its release."
publishedAt: "2026-10-07"
tags: ["Security", "Architecture", "Delivery"]
relatedProject: "palermo"
---

A browser can display an administrator interface. It cannot decide that the person using it is allowed to change stock, prices or someone else’s order.

This note preserves the architecture, identity and release material behind the shorter [Palermo case study](/work/palermo). Palermo is a controlled demonstration using synthetic data, Stripe test mode and internally simulated delivery. Pawan’s documented ownership covers backend, platform and integration work; the customer and administrator interfaces were collaborative.

## Keep identity and application authority separate

Supabase Auth owns password handling and email verification. Palermo owns application sessions and account eligibility. Session tokens are stored as hashes; browser cookies use HttpOnly and SameSite protections, with Secure host-scoped cookies in production.

Protected requests recheck account eligibility and credential version. Administrator operations resolve active roles and explicit permissions from the database. A browser role, an email convention or provider metadata cannot grant that authority.

Input validation, customer-scoped reads, safe error contracts and server-only provider access reinforce the same boundary. A customer’s session must not become permission to read another customer’s order.

The reviewed implementation is recorded in the [identity module](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/modules/identity/README.md) and [session-cookie implementation](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/lib/auth/session-cookie.ts).

## A passkey is a credential within the permission model

Administrator passkeys use WebAuthn verification with expected challenge, origin and relying-party checks, requiring user verification. They add a credential path within the same server-owned permission model; they do not replace the permission checks.

The public [WebAuthn implementation](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/lib/auth/webauthn.ts) and [identity service](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/modules/identity/service.ts) provide the implementation evidence. This is a summary of those controls, not a security certification or a complete passkey tutorial.

## Put business rules behind explicit application boundaries

Palermo is a Next.js App Router modular monolith with strict TypeScript. Domain services own business rules, shared typed contracts define the API boundary, and server-side adapters isolate provider behaviour. Prisma connects the application to Supabase PostgreSQL.

Keeping the transactional boundaries in one application allows related records to change together. Adapters also let isolated tests exercise business rules without calling mutable hosted services. The browser submits intent; it cannot decide final prices, stock availability, payment success or administrator authority.

The system includes:

- Catalogue discovery, variants, inventory-backed availability, promotions and server-revalidated pricing.
- Persistent carts, transactional checkout, bounded reservations, payment attempts, order finalisation and attributable inventory movements.
- Customer profiles and addresses, order history and detail, invoice reads, cancellation requests, tracking and support.
- Administrator catalogue, inventory and finished-product batches, orders, promotions, review moderation, reporting and security surfaces.
- Provider adapters, Prisma migrations, isolated test data, GitHub Actions and Vercel deployments.

The [implementation handbook](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/development/implementation-handbook.md) and [frontend contracts](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/development/frontend-contracts.md) explain these boundaries. The companion notes follow [server-authoritative checkout](/engineering/server-authoritative-checkout) and [late payment recovery](/engineering/late-payment-recovery).

## Name what the tests actually prove

The successful [29 September 2026 CI run](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/actions/runs/36519279268) for revision `46133da` records **346 passing tests**: 172 unit/contract tests, 166 database integration tests and 8 browser tests. That count describes the recorded run, not every future revision.

GitHub Actions runs strict type checks, lint, unit/contract tests and a production build. Database integration tests apply migrations to disposable PostgreSQL fixtures. Separate browser jobs exercise customer and administrator journeys.

Automated provider tests use deterministic fixtures rather than live Stripe or hosted Auth. Browser checkout stops at the pre-payment boundary. Database fixtures, browser journeys and deployment smoke checks prove different things; their exclusions matter when deciding what to verify next.

See the [CI workflow](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/.github/workflows/ci.yml) and [critical-journey regression map](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/testing/critical-journey-regression.md).

## A deployment needs a defined operating scope

The final release freeze records a successful Vercel Production deployment, HTTP smoke checks and applied repository migrations, against frozen application baseline `3ac1b426e965f52627a884475b52c6a624f76c85`.

Application data and runtime roles are separated between Preview and Production. Migration authority stays outside the application runtime. Supabase Auth remains shared at project level, a documented environment limitation.

Release work included regression checks, catalogue and UI repairs, browser QA, a security review and the frozen baseline. Final deployment QA exercised Chromium at 375, 768 and 1440 pixels within a read-only scope. It does not establish exhaustive browser coverage or WCAG certification.

The [release freeze](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/project-management/final-release-freeze.md), [technical handover](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/project-management/final-technical-handover.md), [customer QA](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/testing/final-customer-qa.md), [administrator QA](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/testing/final-admin-qa.md) and [release security review](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/security/288-release-candidate-recheck.md) record those limits.

A successful deployment does not imply commercial customer activity, revenue, live charges, commercial fulfilment, a production SLA or security certification.

## Carry the boundary into the next system

The useful question is not whether a system has an admin screen or a green build. It is where authority lives, which state changes together, and what evidence covers the failure paths.

A [production-readiness review](/services#production-readiness) can trace those boundaries before launch. The [Palermo case study](/work/palermo) provides the executive overview; these notes preserve the implementation detail one click deeper.
