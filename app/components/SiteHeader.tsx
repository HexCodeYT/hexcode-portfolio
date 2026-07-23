import Link from "next/link";

const navLinkClass =
  "rounded-full px-2 py-2 text-sm text-neutral-500 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-3";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-6">
        <Link
          href="/"
          className="rounded-md text-sm font-semibold tracking-[0.18em] text-white uppercase outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          HexCode
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center sm:gap-1">
          <Link href="/#projects" className={`${navLinkClass} hidden sm:block`}>
            Work
          </Link>
          <Link href="/agencies" className={navLinkClass}>
            Agency Partners
          </Link>
          <Link href="/#contact" className={`${navLinkClass} hidden sm:block`}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
