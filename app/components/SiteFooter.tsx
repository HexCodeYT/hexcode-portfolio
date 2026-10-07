import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 py-10 text-sm text-neutral-500 sm:flex-row">
        <p>HexCode · Engineering practice & technical publishing</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
          <Link href="/agencies" className="hover:text-white">
            Agency partnerships
          </Link>
          <Link href="/research/path" className="hover:text-white">
            Research
          </Link>
          <a href="https://github.com/HexCodeYT" className="hover:text-white">
            GitHub
          </a>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
