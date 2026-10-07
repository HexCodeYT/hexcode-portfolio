# Palermo publication evidence

Reviewed 7 October 2026. Public source: `Mel-18-Palermo/Palermo-Perfume-System`, documentation revision `46133da18ac97659ce06c3411452c449178dcef4`. Frozen application baseline: `3ac1b426e965f52627a884475b52c6a624f76c85`.

An initial discovery of the private `HexCodeYT/Palermo-Cinematic-Lab` fork led to the canonical public repository. Published claims use the canonical repository; no private fork URL, credential, demo password, connection value, customer record or private configuration is included.

All paths below are relative to the canonical repository at the reviewed revision:
https://github.com/Mel-18-Palermo/Palermo-Perfume-System/tree/46133da18ac97659ce06c3411452c449178dcef4

| Published claim | Source |
| --- | --- |
| Next.js App Router modular monolith; strict TypeScript; Prisma; PostgreSQL/Supabase; server-side adapters and shared contracts | `README.md`, `docs/development/implementation-handbook.md`, `docs/development/frontend-contracts.md` |
| Pawan/HexCodeYT backend, platform and integration ownership; customer/admin UI collaborative | `docs/development/ownership-map.md`; system implementation and Git history remain authoritative |
| Auth provider versus application sessions; hashed tokens, protected cookies, account/credential rechecks; database-backed RBAC | `src/modules/identity/README.md`, `src/modules/identity/service.ts`, `src/lib/auth/session-cookie.ts` |
| Administrator passkeys and verified WebAuthn ceremonies | `src/modules/identity/service.ts`, `src/lib/auth/webauthn.ts`, `src/app/api/auth/admin-passkey/[...operation]/route.ts` |
| Transactional checkout revalidation, order/payment/reservation creation, customer-scoped idempotency | `src/modules/commerce/checkout/README.md`, `src/modules/commerce/checkout/service.ts` |
| Stripe test-mode PaymentIntents, Elements card boundary, signed raw webhooks, fail-closed configuration, idempotent success | `src/modules/commerce/payment/README.md`, `src/modules/commerce/payment/service.ts`, `README.md` |
| Late success conflicts without commerce mutation; explicit reservation recovery when stock is available | `src/modules/commerce/payment/README.md` and payment/inventory services |
| Inventory balances, movements, reservations and authorised finished-product batch release | `src/modules/inventory/README.md`, `src/modules/inventory/service.ts` |
| Catalogue/promotions, customer accounts/orders/tracking/support and admin operational surfaces | `README.md`, relevant `src/modules` and `src/app` surfaces |
| CI type/lint/build, disposable PostgreSQL integration, deterministic provider fixtures, browser pre-payment boundary | `.github/workflows/ci.yml`, `docs/testing/critical-journey-regression.md` |
| 172 unit/contract + 166 database integration + 8 browser = 346 passing tests | Successful [CI run 36519279268](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/actions/runs/36519279268), 29 September 2026, revision `46133da`. Quality job `109248373072`: 31 files, 172 tests; database job `109248372861`: 166 tests; browser job `109248373014`: 5 customer + 3 admin tests. Logs inspected through GitHub. |
| Successful Vercel Production deployment, release freeze, migration state and HTTP smoke checks | `docs/project-management/final-release-freeze.md`, `docs/project-management/final-technical-handover.md` |
| Chromium QA at 375/768/1440 px, safe/read-only scope | `docs/testing/final-customer-qa.md`, `docs/testing/final-admin-qa.md` |
| Known security/dependency/environment limitations | `docs/security/288-release-candidate-recheck.md`, final freeze/handover |

## Public framing

The case study leads with engineering substance, rather than assessment context. It explicitly identifies the deployment as a controlled demonstration with synthetic data, Stripe test mode and simulated delivery. It does not imply commercial customer activity, revenue, live charges, commercial fulfilment, a production SLA, fully isolated Auth projects, security certification, WCAG certification or exhaustive browser coverage.

The engineering insights are explanations drawn from the documented implementation, not measured performance claims. Both initial articles cite the exact implementation documentation. Their code, where present, is labelled conceptual pseudocode.

Public links are limited to the documented demonstration storefront, canonical public repository, reviewed source files and recorded CI run. No administrative login credentials or private deployment URLs are published.

## Deferred content

Longer implementation articles on administrator passkeys, inventory concurrency and release validation are planned topics only. No unbuilt article route is linked. Future content should recheck the relevant repository revision and preserve the scope of its evidence.
