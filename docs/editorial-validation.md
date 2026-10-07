# Editorial reduction validation

Validated 7 October 2026 from the merged engineering-practice foundation on main.

## Page budgets

Rendered major sections (the form is the Contact page’s single section):

| Route         | Sections |
| ------------- | -------: |
| /             |        5 |
| /work         |        3 |
| /work/palermo |        5 |
| /engineering  |        2 |
| /services     |        3 |
| /about        |        2 |
| /contact      |        1 |
| /agencies     |        3 |

The homepage now follows hook, Palermo proof, buyer situations, latest two notes and contact. Its separate selected-systems section was removed; those systems remain on Work. Palermo combines the report’s architecture, security, payment, delivery and lessons sections into a system overview, three decisions, compact evidence and deep dives. Source links and additional limits use a native keyboard-accessible disclosure.

Services no longer has separate detailed task lists or a long process section. About combines founder and approach, Engineering removes its publishing philosophy and repeated case-study/CTA sections, Contact removes its sales essay, and Agencies combines relevance and proof before its form.

## Technical content preservation

Existing checkout and payment article URLs and bodies remain, with clearer titles and the relocated inventory/provider details. The new Markdown note at `/engineering/what-palermo-keeps-on-the-server` preserves identity, passkeys, application architecture, module relationships, CI breakdown, release controls and limitations. See `docs/palermo-evidence.md` for the mapping to the reviewed public sources.

All existing routes remain. The research page, article renderer/validation, canonical restrictions, sitemap generator, Article JSON-LD, contact handlers, agency compatibility API and analytics consent are unchanged. No dependencies, uptime code or backend features were added.

## Commands

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: passed, all 8 tests, including exact HexCode canonical enforcement.
- `npm run build`: passed; all three Markdown article routes generated.
- `git diff --check`: passed.

The test runner still emits the existing non-fatal MODULE_TYPELESS_PACKAGE_JSON warning. No package-module refactor was introduced for this editorial task.

## Browser checks

A production Next.js server was tested using Playwright and system Chromium at **375, 768 and 1440 pixels**, with a 900-pixel viewport height. All **36 route/viewport combinations** passed:

`/`, `/work`, `/work/palermo`, `/engineering`, all three engineering articles, `/services`, `/about`, `/contact`, `/agencies`, and `/research/path`.

Verified:

- HTTP 200, one H1, main landmark, no horizontal overflow, all five primary navigation links visible.
- Section budgets, latest-two article count, both homepage hero CTAs and the contact submit button within the first viewport.
- Exact HexCode canonicals, OpenGraph and Twitter metadata; Article JSON-LD and generated heading IDs for all three articles.
- 14 unique internal destinations/anchors resolve, including the retained Palermo section anchors and Services engagement anchors.
- Sitemap includes all tested routes/articles; robots references it; the generated OpenGraph image returns PNG.
- Removed status APIs and an unpublished article return 404.
- Both contact endpoints reject invalid/malformed input and quietly accept the honeypot.
- Mocked client success for contact and agency enquiries preserves source/type/organisation values, and delivery failure displays the email fallback.
- Agency is required, company remains optional, and the keyboard skip link works.
- Palermo’s source disclosure opens/closes with Enter; its summary has the existing emerald focus treatment.
- No unexpected browser errors before the deliberately mocked contact 503.

Screenshots were captured for commercial pages and articles at mobile/desktop widths. Visual review checked homepage, Palermo, Work, Services and Contact; it led to full-width email/project-type rows on mobile so the form’s select remains readable. At 768 pixels the route/overflow/navigation checks also pass.

Contact delivery was mocked to avoid sending test enquiries. Real email delivery and a hosted preview were not exercised. There was no deployment or merge.

## Intentionally deferred

Detailed new tutorials on passkey ceremonies and inventory concurrency remain planned topics, without dead article links. No additional case studies, fixed prices, testimonials, new services or publishing infrastructure were introduced.
