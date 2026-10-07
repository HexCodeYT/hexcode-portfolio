import Link from "next/link";
import type { ReactNode } from "react";

export const containerClass = "mx-auto max-w-6xl px-6";
export const sectionClass = `${containerClass} py-16 md:py-24`;
export const eyebrowClass =
  "text-xs font-medium uppercase tracking-[0.24em] text-emerald-500";
export const headingClass = "text-3xl font-semibold tracking-tight md:text-5xl";
export const textLinkClass =
  "inline-block rounded-sm text-sm font-medium text-emerald-400 transition hover:text-emerald-300";
export const primaryButtonClass =
  "inline-block rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400";
export const secondaryButtonClass =
  "inline-block rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:border-neutral-600 hover:bg-neutral-950";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-8rem] right-[-16rem] h-[38rem] w-[38rem] rounded-full bg-emerald-500/[0.08] blur-[120px]"
      />
      <div
        className={`${containerClass} relative pt-36 pb-16 md:pt-44 md:pb-24`}
      >
        <p className={eyebrowClass}>{eyebrow}</p>
        <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="border-t border-neutral-900 bg-neutral-950/40">
      <div
        className={`${sectionClass} flex flex-col items-start justify-between gap-8 md:flex-row md:items-end`}
      >
        <div className="max-w-2xl">
          <p className={eyebrowClass}>Work with HexCode</p>
          <h2 className={`${headingClass} mt-4`}>
            Have a system that needs serious engineering?
          </h2>
          <p className="mt-6 text-base leading-7 text-neutral-400">
            Preparing for launch, recovering a broken workflow, or looking for a
            technical partner? Start with the system and the problem.
          </p>
        </div>
        <Link href="/contact" className={`${primaryButtonClass} shrink-0`}>
          Discuss a system <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
