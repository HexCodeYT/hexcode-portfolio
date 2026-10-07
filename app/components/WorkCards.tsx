import Link from "next/link";
import { work } from "@/lib/work";
import { eyebrowClass, textLinkClass } from "./Editorial";

export function PalermoFeature() {
  const project = work[0];
  return (
    <article className="grid gap-10 rounded-3xl border border-emerald-500/25 bg-neutral-950/50 p-7 shadow-[inset_0_1px_0_rgba(16,185,129,0.08)] sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div>
        <p className={eyebrowClass}>Flagship case study</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
          Palermo
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-400">
          Commerce engineering beyond the storefront. Identity, permissions,
          transactional checkout, payment recovery and inventory in one coherent
          system.
        </p>
        <Link href="/work/palermo" className={`${textLinkClass} mt-8`}>
          Read the case study <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-8 border-t border-neutral-800 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <ul className="space-y-4 text-sm leading-6 text-neutral-300">
          <li>Server-owned prices, stock and payment outcomes</li>
          <li>Sessions, RBAC and administrator passkeys</li>
          <li>Unit, database and browser regression coverage</li>
        </ul>
        <div>
          <Tags tags={project.tags} />
          <p className="mt-5 text-xs leading-6 text-neutral-500">
            Controlled Vercel demonstration · Synthetic data · Stripe test mode
          </p>
        </div>
      </div>
    </article>
  );
}

export function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function SelectedWork() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {work.slice(1).map((project) => (
        <article
          key={project.slug}
          className="flex flex-col rounded-3xl border border-neutral-900 bg-neutral-950/40 p-7"
        >
          <p className="text-xs leading-5 text-neutral-500">
            {project.category}
          </p>
          <h3 className="mt-5 text-2xl font-medium tracking-tight">
            {project.title}
          </h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-neutral-400">
            {project.description}
          </p>
          <div className="mt-6">
            <Tags tags={project.tags} />
          </div>
          {"href" in project && (
            <Link href={project.href} className={`${textLinkClass} mt-8`}>
              {project.linkLabel} <span aria-hidden="true">→</span>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
