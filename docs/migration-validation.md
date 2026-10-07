# Engineering-practice migration validation

Validated 7 October 2026, on Node.js 24.19.0.

## Repository checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS — Next route generation and strict TypeScript |
| `npm test` | PASS — 7 content/metadata/Markdown regression tests |
| `npm run build` | PASS — default Next.js production builder; 19 generated entries including metadata routes |
| `git diff --check` | PASS |

The native Node test runner uses `--test-isolation=none` so the restricted workspace executes and reports all seven tests directly. Node emits a non-failing module-type detection warning when loading TypeScript; no application error is hidden or suppressed.

Existing dependency versions were compared against the previous lockfile: no retained package version was changed. Added runtime dependencies are `gray-matter` and `react-markdown`; removed dependencies are `better-sqlite3`, its types, and the worker-only `tsx` runner.

## Production-browser verification

A local `npm start` production server was exercised with Playwright 1.63.0 and system Chromium. Browser tooling was installed into a temporary cache, without adding a project dependency. Eleven routes were checked at 375, 768 and 1440 pixels (33 route/viewport checks):

- `/`
- `/work`
- `/work/palermo`
- `/engineering`
- `/engineering/late-payment-recovery`
- `/engineering/server-authoritative-checkout`
- `/services`
- `/about`
- `/contact`
- `/agencies`
- `/research/path`

All returned HTTP 200, had one H1 and the main-content skip target, retained all five primary navigation links, and showed no page-level horizontal overflow or unexpected browser/runtime errors. Mobile and desktop screenshots of the homepage, Palermo, an article, agencies and contact were captured; homepage and mobile contact presentation were visually inspected.

Additional checks passed:

- Canonical, OpenGraph and Twitter metadata on all content routes.
- Article JSON-LD, publication metadata and heading anchors on both article pages.
- Sitemap coverage of all content routes, including articles and Palermo.
- Robots sitemap declaration and valid generated PNG OpenGraph image.
- `/api/status` and `/api/status/history` return 404.
- Unknown/unpublished engineering slug returns 404.
- Both contact endpoints reject invalid and malformed payloads and handle the honeypot.
- Mocked browser delivery verifies a successful submission/reset and a 503 error with email fallback.
- Company/team is optional on `/contact`; agency is required on `/agencies`.
- Keyboard navigation reaches the skip link; primary links remain visible.

The deliberately mocked 503 produces an expected browser resource-error message. It is distinguished from the page/runtime error checks.

## Contact delivery boundary

No Resend credential or recipient configuration is available in this workspace. Valid POSTs to `/api/contact` and the preserved `/api/contact/agencies` alias both returned the explicit 503 response and `pawan@hexcode.au` fallback. No live email was sent. Existing deployment variable names remain supported; delivery should be checked in the configured preview/deployment environment.

## Removal and preservation

A tracked-source/reference scan found no remaining uptime worker/API/UI imports, SQLite dependency or port-3100 deployment hook. Search, git and vault Caddy routing remains. Analytics consent is unchanged; existing agency event names remain and generic contact events use the same consent gate. The P.A.T.H. research body remains unchanged; its work backlink and main-content target integrate it into the new navigation.

## Intentionally deferred

Only two initial engineering notes are published. Longer articles on passkeys, inventory concurrency and release validation remain planned topics. No CMS, CRM, content admin/auth, automated social posting, new fixed pricing, speculative SaaS feature or testimonial was introduced. Production merging/deployment is left for review.

Palermo publication claims, source revisions, contribution scope and the independently inspected 346-test CI evidence are recorded in `docs/palermo-evidence.md`.
