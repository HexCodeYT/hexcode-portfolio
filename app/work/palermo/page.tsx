import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { getArticles } from "@/lib/engineering";
import { ArticleCards } from "../../components/ArticleCards";
import {
  ContactCTA,
  PageHero,
  sectionClass,
  eyebrowClass,
  headingClass,
  textLinkClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "../../components/Editorial";
import { Tags } from "../../components/WorkCards";

export const metadata = pageMetadata(
  "Palermo — Commerce engineering case study",
  "Inside Palermo: server-authoritative Next.js commerce, secure sessions, RBAC, Stripe test-mode payments, transactional inventory and verified delivery.",
  "/work/palermo",
);

const repository = "https://github.com/Mel-18-Palermo/Palermo-Perfume-System";
const sourceRef = "46133da18ac97659ce06c3411452c449178dcef4";
const source = (path: string) => `${repository}/blob/${sourceRef}/${path}`;

const systemAreas = [
  [
    "Identity & permissions",
    "Supabase-backed authentication, application-owned sessions, customer ownership checks, database-backed administrator RBAC and WebAuthn passkeys.",
  ],
  [
    "Catalogue & pricing",
    "Catalogue discovery, variants and inventory-backed availability, with promotions and current pricing revalidated on the server.",
  ],
  [
    "Commerce & inventory",
    "Persistent carts, transactional checkout, bounded stock reservations, payment attempts, order finalisation and attributable inventory movements.",
  ],
  [
    "Customer workflows",
    "Profiles and addresses, order history and detail, invoice reads, cancellation requests, tracking and support functionality.",
  ],
  [
    "Administrator tooling",
    "Catalogue, inventory and finished-product batches, orders, promotions, review moderation, reporting and security surfaces.",
  ],
  [
    "Delivery boundaries",
    "Shared typed API contracts, provider adapters, Prisma migrations, isolated test data, GitHub Actions and Vercel deployments.",
  ],
];

function CaseSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-neutral-900">
      <div
        className={`${sectionClass} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}
      >
        <div>
          <p className={eyebrowClass}>{number} · Engineering</p>
          <h2 className={`${headingClass} mt-4`}>{title}</h2>
        </div>
        <div className="space-y-6 text-base leading-8 text-neutral-400">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function PalermoCaseStudy() {
  const articles = getArticles().filter(
    (article) => article.relatedProject === "palermo",
  );
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Flagship case study · Application & commerce engineering"
        title="Palermo."
        description="A commerce system where the server owns prices, permissions, stock and payment outcomes. The engineering connects a customer storefront to the transactional workflows and administrator tools behind it."
      >
        <div className="mt-8">
          <Tags
            tags={[
              "Next.js",
              "TypeScript",
              "Prisma",
              "PostgreSQL",
              "Supabase",
              "Stripe",
              "Vercel",
            ]}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#architecture" className={primaryButtonClass}>
            Explore the engineering
          </a>
          <a
            href="https://www.palermoperfumes.store/"
            className={secondaryButtonClass}
          >
            View controlled demonstration
          </a>
        </div>
        <p className="mt-7 max-w-3xl text-sm leading-7 text-neutral-500">
          Deployed on Vercel Production as a controlled demonstration, using
          synthetic data and Stripe test mode. It is not a commercial live
          store.
        </p>
      </PageHero>
      <section className={sectionClass}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className={eyebrowClass}>Project overview</p>
            <h2 className={`${headingClass} mt-4`}>
              The system behind a purchase.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-neutral-400">
            <p>
              Palermo is a perfume-commerce application with public catalogue
              and discovery, customer accounts, checkout, orders and tracking,
              alongside protected operational tools. Its value as an engineering
              case study is the coordination of these areas across trust
              boundaries.
            </p>
            <p>
              Pawan’s documented ownership covers backend, platform and
              integration work: database architecture, identity, checkout,
              payment, order and inventory authority, plus security and delivery
              controls. Customer and administrator interfaces were delivered
              collaboratively; this case study describes the system and that
              engineering contribution.
            </p>
            <p>
              The central challenge was keeping financial and stock state
              coherent when a browser repeats a request, a payment arrives late,
              a reservation expires, or an administrator’s access changes.
            </p>
          </div>
        </div>
        <nav
          aria-label="Case study sections"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-neutral-900 pt-7 text-sm text-neutral-400"
        >
          {[
            ["Architecture", "architecture"],
            ["Decisions", "decisions"],
            ["Security", "security"],
            ["Payments", "payments"],
            ["Testing", "testing"],
            ["Deployment", "deployment"],
            ["Lessons", "lessons"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="hover:text-emerald-400">
              {label}
            </a>
          ))}
        </nav>
      </section>
      <section
        id="architecture"
        className="scroll-mt-8 border-y border-neutral-900 bg-neutral-950/40"
      >
        <div className={sectionClass}>
          <p className={eyebrowClass}>01 · Architecture</p>
          <h2 className={`${headingClass} mt-4`}>
            One application. Explicit boundaries.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
            A Next.js App Router modular monolith, with strict TypeScript,
            domain services, shared API contracts and server-side provider
            adapters. Prisma connects the application to Supabase PostgreSQL.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-800 md:grid-cols-3">
            {[
              ["Browser", "Storefront & admin interfaces"],
              ["Application", "HTTP contracts → domain services"],
              ["Server boundaries", "PostgreSQL · Auth · Stripe adapters"],
            ].map(([label, detail]) => (
              <div key={label} className="bg-black p-6">
                <p className={eyebrowClass}>{label}</p>
                <p className="mt-4 text-base leading-7 text-neutral-300">
                  {detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {systemAreas.map(([title, description]) => (
              <article
                key={title}
                className="rounded-3xl border border-neutral-900 bg-black p-7"
              >
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CaseSection
        id="decisions"
        number="02"
        title="Business outcomes belong on the server."
      >
        <p>
          The browser submits intent. It cannot decide final prices, stock
          availability, payment success or administrator authority. Shared
          contracts define the application’s API boundary, while domain modules
          own business rules.
        </p>
        <p>
          Checkout revalidates the active cart, current variant prices,
          promotion, saved addresses, delivery method and available stock in one
          transaction. It creates the order, pending payment attempt and short
          inventory reservations together.
        </p>
        <p>
          A customer-scoped idempotency key allows an identical checkout request
          to replay safely. Conditional inventory writes and unique movement
          references guard against repeat effects, while batch release is
          restricted to an authorised administrator.
        </p>
        <p>
          The modular monolith keeps these transactional boundaries in one
          application. Provider-specific behaviour sits behind adapters, so
          isolated tests can exercise business rules without calling mutable
          hosted services.
        </p>
      </CaseSection>
      <CaseSection
        id="security"
        number="03"
        title="Identity is more than a login screen."
      >
        <p>
          Supabase Auth owns password handling and verification. Palermo owns
          application sessions and account eligibility. Session tokens are
          stored as hashes; browser cookies use HttpOnly and SameSite
          protections, with Secure host-scoped cookies in production.
        </p>
        <p>
          Protected requests recheck account eligibility and credential version.
          Administrator operations resolve active roles and explicit permissions
          from the database; a browser role, email convention or provider
          metadata cannot grant authority.
        </p>
        <p>
          Administrator passkeys use WebAuthn verification with expected
          challenge, origin and relying-party checks, requiring user
          verification. They add a credential path within the same server-owned
          permission model.
        </p>
        <p>
          Input validation, customer-scoped reads, safe error contracts and
          server-only provider access reinforce these boundaries. The release
          security review records its scope and limitations; these controls are
          not presented as a security certification.
        </p>
      </CaseSection>
      <CaseSection
        id="payments"
        number="04"
        title="Payment success is a verified transition."
      >
        <p>
          Palermo uses Stripe test-mode PaymentIntents and Stripe Elements. Card
          data remains within Stripe-controlled fields. Missing server payment
          configuration fails closed rather than silently switching to a
          simulated gateway.
        </p>
        <p>
          The webhook verifies the raw body through Stripe’s signature verifier.
          A successful event finalises payment, confirms the order, claims
          active reservations, decrements inventory balances and appends
          movements within an authoritative database transaction.
        </p>
        <p>
          Duplicate successful events are idempotent. If success arrives after
          stock reservations expire, the transaction returns a retryable
          conflict without changing commerce state. An explicit payment retry
          can reactivate released or expired reservations when stock remains
          available, allowing a repeated verified webhook to finish safely.
        </p>
        <p>
          This separation matters: placing an order, reserving stock and
          receiving payment are distinct steps. A browser return from checkout
          is not evidence that the payment completed.
        </p>
      </CaseSection>
      <section
        id="testing"
        className="scroll-mt-8 border-y border-neutral-900 bg-neutral-950/40"
      >
        <div className={sectionClass}>
          <p className={eyebrowClass}>05 · Testing & delivery</p>
          <h2 className={`${headingClass} mt-4`}>
            Verification across the boundaries.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
            {[
              ["172", "Unit & contract tests"],
              ["166", "Database integration tests"],
              ["8", "Browser tests"],
            ].map(([count, label]) => (
              <div key={label} className="bg-black p-7">
                <p className="text-4xl font-semibold tracking-tight text-emerald-400">
                  {count}
                </p>
                <p className="mt-3 text-sm text-neutral-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-500">
            346 passing tests in the successful 29 September 2026 CI run for
            repository revision 46133da. Counts describe that recorded run,
            rather than a claim about every future revision.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p className="text-base leading-8 text-neutral-400">
              GitHub Actions runs strict type checks, lint, unit/contract tests
              and a production build. Database integration tests apply
              migrations to disposable PostgreSQL fixtures; separate browser
              jobs exercise customer and administrator journeys.
            </p>
            <p className="text-base leading-8 text-neutral-400">
              The automated suites use deterministic providers rather than live
              Stripe or hosted Auth. Browser checkout stops at the pre-payment
              boundary. Final deployment QA exercised Chromium at 375, 768 and
              1440 pixels, within its documented read-only scope.
            </p>
          </div>
          <a
            href={`${repository}/actions/runs/36519279268`}
            className={`${textLinkClass} mt-6`}
          >
            View the recorded CI run <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <CaseSection
        id="deployment"
        number="06"
        title="A release with a defined operating scope."
      >
        <p>
          The final release freeze records a successful Vercel Production
          deployment, HTTP smoke checks and applied repository migrations.
          Application data and runtime roles are separated between Preview and
          Production, and migration authority stays outside the application
          runtime.
        </p>
        <p>
          The deployed system remains a controlled demonstration: synthetic
          customers and orders, Stripe test mode and internally simulated
          delivery. Supabase Auth is shared at the project level, a documented
          limitation of this environment.
        </p>
        <p>
          Release work included regression checks, catalogue and UI repairs,
          browser QA, a security review and a frozen application baseline. The
          handover records the operational boundaries and known limitations
          instead of treating a successful deployment as proof of commercial
          readiness.
        </p>
        <a
          href={source("docs/project-management/final-release-freeze.md")}
          className={textLinkClass}
        >
          Read the release record <span aria-hidden="true">→</span>
        </a>
      </CaseSection>
      <CaseSection
        id="lessons"
        number="07"
        title="What the engineering makes visible."
      >
        <p>
          <strong className="font-medium text-neutral-200">
            Retries are part of the domain.
          </strong>{" "}
          Idempotency has to span the request, payment attempt and stock
          effects. Preventing a duplicate button click covers only one entry
          point.
        </p>
        <p>
          <strong className="font-medium text-neutral-200">
            Recovery must preserve the same invariants as success.
          </strong>{" "}
          A late webhook cannot confirm an order against stock it no longer
          owns. Restoring a reservation needs a fresh availability check.
        </p>
        <p>
          <strong className="font-medium text-neutral-200">
            Test evidence needs a boundary.
          </strong>{" "}
          Database fixtures, browser tests and deployment smoke checks prove
          different things. Naming the exclusions makes the evidence useful when
          planning the next release.
        </p>
        <Link href="/services#production-readiness" className={textLinkClass}>
          Apply this approach to production readiness{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </CaseSection>
      <section className="border-t border-neutral-900">
        <div className={sectionClass}>
          <p className={eyebrowClass}>Engineering behind the case study</p>
          <h2 className={`${headingClass} mt-4 mb-10`}>
            Continue into the details.
          </h2>
          <ArticleCards articles={articles} />
          <p className="mt-8 max-w-3xl text-sm leading-7 text-neutral-500">
            Further notes are planned on administrator passkeys, transactional
            inventory and release validation. Published articles will appear in
            the{" "}
            <Link
              href="/engineering"
              className="text-emerald-400 underline underline-offset-4"
            >
              engineering hub
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="border-t border-neutral-900">
        <div className={sectionClass}>
          <h2 className="text-2xl font-medium tracking-tight">
            Project sources.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400">
            This case study is grounded in the public project documentation and
            recorded CI. The architecture and implementation evidence is pinned
            to the reviewed repository revision.
          </p>
          <ul className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            {[
              ["Project overview", "README.md"],
              [
                "Backend & platform ownership",
                "docs/development/ownership-map.md",
              ],
              ["Identity & sessions", "src/modules/identity/README.md"],
              ["Checkout authority", "src/modules/commerce/checkout/README.md"],
              ["Payment & recovery", "src/modules/commerce/payment/README.md"],
              [
                "Test coverage & exclusions",
                "docs/testing/critical-journey-regression.md",
              ],
              [
                "Release & deployment",
                "docs/project-management/final-release-freeze.md",
              ],
              [
                "Technical handover",
                "docs/project-management/final-technical-handover.md",
              ],
            ].map(([label, path]) => (
              <li key={path}>
                <a href={source(path)} className={textLinkClass}>
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={repository} className={`${textLinkClass} mt-8`}>
            Explore the public repository <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
