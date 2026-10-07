import Link from "next/link";

const navLinkClass =
  "rounded-full px-2 py-2 text-xs text-neutral-400 transition hover:text-white sm:px-3 sm:text-sm";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="rounded-md text-sm font-semibold tracking-[0.18em] text-white uppercase outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          HexCode
        </Link>

        <nav
          aria-label="Primary navigation"
          className="-ml-2 flex flex-wrap items-center sm:ml-0 sm:gap-1"
        >
          {[
            ["Work", "/work"],
            ["Engineering", "/engineering"],
            ["Services", "/services"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className={navLinkClass}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
