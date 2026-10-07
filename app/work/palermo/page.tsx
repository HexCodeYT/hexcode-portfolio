import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { getArticles } from "@/lib/engineering";
import { ArticleCards } from "../../components/ArticleCards";
import {
  PageHero,
  sectionClass,
  eyebrowClass,
  headingClass,
  textLinkClass,
  secondaryButtonClass,
} from "../../components/Editorial";
import { Tags } from "../../components/WorkCards";

export const metadata = pageMetadata(
  "Palermo — Commerce engineering case study",
  "How Palermo keeps prices, payments, stock and permissions consistent. A controlled commerce demonstration with documented engineering and release evidence.",
  "/work/palermo",
);

const repository = "https://github.com/Mel-18-Palermo/Palermo-Perfume-System";
const sourceRef = "46133da18ac97659ce06c3411452c449178dcef4";
const source = (path: string) => `${repository}/blob/${sourceRef}/${path}`;

const decisions = [
  {
    id: "pricing",
    title: "Who gets to decide the price?",
    problem:
      "An old cart should never decide what a customer pays or whether stock is still available.",
    proof:
      "The browser submits intent. The server checks current prices, promotions and stock, then creates the order, payment attempt and reservations in one transaction. Repeated checkout requests have a defined, customer-scoped result.",
    href: "/engineering/server-authoritative-checkout",
    link: "Follow the checkout boundary",
  },
  {
    id: "payments",
    title: "What happens when money and inventory disagree?",
    problem:
      "Payment can succeed after a stock reservation expires. Confirming the order anyway would promise stock the system no longer owns.",
    proof:
      "Palermo verifies Stripe events and changes payment, order and inventory state together. Late success returns a retryable conflict without commerce changes; explicit recovery rechecks stock before the event can finish safely.",
    href: "/engineering/late-payment-recovery",
    link: "Follow the recovery path",
  },
  {
    id: "security",
    title: "Who is actually allowed to do what?",
    problem:
      "A login or an admin button should never grant access to another customer’s order or a stock-changing operation.",
    proof:
      "Server-owned sessions, customer ownership checks and database-backed roles and permissions decide access. Administrator passkeys verify the credential within that same permission model.",
    href: "/engineering/what-palermo-keeps-on-the-server",
    link: "Read the authority and release notes",
  },
];

export default function PalermoCaseStudy() {
  const articles = getArticles().filter(
    (article) =>
      article.relatedProject === "palermo" &&
      article.slug !== "what-palermo-keeps-on-the-server",
  );
  return (
    <main id="main-content">
      <PageHero
        compact
        eyebrow="Palermo · Flagship case study"
        title="A purchase is more than a checkout screen."
        description="Behind one order, Palermo keeps pricing, permissions, payments, stock and customer state consistent — even when requests repeat or external systems respond late."
      >
        <p className="mt-7 max-w-3xl text-sm leading-7 text-neutral-400">
          Controlled demonstration · Synthetic data · Stripe test mode. No
          commercial customer activity or live charges.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-500">
          Pawan’s documented contribution covers backend, platform and
          integrations. Customer and administrator interfaces were delivered
          collaboratively.
        </p>
        <a
          href="https://www.palermoperfumes.store/"
          className={`${secondaryButtonClass} mt-7`}
        >
          View the demonstration <span aria-hidden="true">→</span>
        </a>
      </PageHero>
      <section
        id="architecture"
        className="scroll-mt-8 border-b border-neutral-900"
      >
        <div
          className={`${sectionClass} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}
        >
          <div>
            <p className={eyebrowClass}>The system</p>
            <h2 className={`${headingClass} mt-4`}>
              One purchase. Many things that have to agree.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-neutral-400">
              A customer’s identity and permissions govern their account and
              orders. Catalogue prices and promotions feed checkout; verified
              payments confirm orders against reserved stock. Administrators
              manage that catalogue, inventory and order state through protected
              workflows.
            </p>
            <p className="mt-5 text-base leading-8 text-neutral-400">
              The storefront is one part of a Next.js application with explicit
              business modules and a shared PostgreSQL database.
            </p>
            <div className="mt-6">
              <Tags
                tags={[
                  "Next.js / TypeScript",
                  "Prisma",
                  "PostgreSQL / Supabase",
                  "Stripe",
                  "Vercel",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="decisions"
        className="scroll-mt-8 border-b border-neutral-900"
      >
        <div className={sectionClass}>
          <p className={eyebrowClass}>Three engineering decisions</p>
          <h2 className={`${headingClass} mt-4`}>
            The difficult parts happen behind the screen.
          </h2>
          <div className="mt-10 space-y-8">
            {decisions.map((decision) => (
              <article
                id={decision.id}
                key={decision.id}
                className="grid scroll-mt-8 gap-4 border-t border-neutral-800 pt-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
              >
                <h3 className="text-2xl font-medium tracking-tight">
                  {decision.title}
                </h3>
                <div>
                  <p className="text-base leading-7 text-neutral-200">
                    {decision.problem}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-neutral-400">
                    {decision.proof}
                  </p>
                  <Link
                    href={decision.href}
                    className={`${textLinkClass} mt-5`}
                  >
                    {decision.link} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="testing"
        className="scroll-mt-8 border-b border-neutral-900 bg-neutral-950/40"
      >
        <div className={sectionClass}>
          <span id="deployment" className="scroll-mt-8" />
          <p className={eyebrowClass}>Evidence, with boundaries</p>
          <h2 className={`${headingClass} mt-4`}>
            Tested beyond the happy path.
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-emerald-400">
                346
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-400">
                Passing tests in the recorded release CI: 172 unit/contract, 166
                database integration and 8 browser tests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Checks across the system</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-400">
                GitHub Actions checks types, lint, builds and journeys, with
                migrated disposable PostgreSQL fixtures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium">A deployed demonstration</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-400">
                The release record confirms a Vercel Production deployment,
                migrations and HTTP smoke checks.
              </p>
            </div>
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-neutral-500">
            The count describes the successful 29 September 2026 run at revision
            46133da. Automated providers are deterministic fixtures; browser
            checkout stops before payment. This is demonstration evidence, not
            proof of live payment operation or a security certification.
          </p>
          <a
            href={`${repository}/actions/runs/36519279268`}
            className={`${textLinkClass} mt-5`}
          >
            View the recorded CI run <span aria-hidden="true">→</span>
          </a>
          <details className="mt-8 border-t border-neutral-800 pt-5">
            <summary className="cursor-pointer text-sm font-medium text-neutral-300">
              Inspect the sources and operating limits
            </summary>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400">
              Public sources are pinned to the reviewed revision. Delivery is
              internally simulated, Supabase Auth is shared at project level,
              and final browser QA was read-only Chromium coverage at 375, 768
              and 1440 pixels. No commercial SLA, exhaustive browser coverage or
              certification is implied.
            </p>
            <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["Project and architecture", "README.md"],
                [
                  "Contribution boundaries",
                  "docs/development/ownership-map.md",
                ],
                ["Identity and sessions", "src/modules/identity/README.md"],
                [
                  "Checkout authority",
                  "src/modules/commerce/checkout/README.md",
                ],
                ["Payment recovery", "src/modules/commerce/payment/README.md"],
                ["Inventory", "src/modules/inventory/README.md"],
                [
                  "Regression boundaries",
                  "docs/testing/critical-journey-regression.md",
                ],
                [
                  "Release and deployment",
                  "docs/project-management/final-release-freeze.md",
                ],
              ].map(([label, path]) => (
                <li key={path}>
                  <a
                    href={source(path)}
                    className="text-emerald-400 underline underline-offset-4"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={repository} className={`${textLinkClass} mt-5`}>
              Browse the public repository <span aria-hidden="true">→</span>
            </a>
          </details>
        </div>
      </section>
      <section id="lessons" className={`${sectionClass} scroll-mt-8`}>
        <p className={eyebrowClass}>Deep dives</p>
        <h2 className={`${headingClass} mt-4 mb-8`}>
          Follow the implementation.
        </h2>
        <ArticleCards articles={articles} />
        <Link
          href="/engineering/what-palermo-keeps-on-the-server"
          className={`${textLinkClass} mt-8`}
        >
          Identity, architecture and release evidence{" "}
          <span aria-hidden="true">→</span>
        </Link>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-500">
          Further implementation notes on passkeys and inventory concurrency are
          planned. The{" "}
          <Link
            href="/engineering"
            className="text-emerald-400 underline underline-offset-4"
          >
            engineering hub
          </Link>{" "}
          carries published material.
        </p>
        <p className="mt-8 text-sm text-neutral-400">
          Facing similar risks?{" "}
          <Link href="/services#production-readiness" className={textLinkClass}>
            Explore production readiness <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
    </main>
  );
}
