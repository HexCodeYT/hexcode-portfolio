import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P.A.T.H. — Apple Silicon GPU Prime Sieving | HexCode Research",
  description:
    "Executive summary of P.A.T.H., a Metal-based GPU-native prime-sieving engine developed for Apple Silicon, including architecture, validation approach and measured M1 results.",
  alternates: {
    canonical: "https://hexcode.au/research/path",
  },
  openGraph: {
    type: "article",
    locale: "en_AU",
    url: "https://hexcode.au/research/path",
    siteName: "HexCode",
    title: "P.A.T.H. — Apple Silicon GPU Prime Sieving",
    description:
      "A non-confidential executive summary of experimental GPU compute research on Apple Silicon.",
  },
};

const metrics = [
  ["Test platform", "Apple M1 MacBook Air"],
  ["Workload", "~500 million odd-number candidates"],
  ["Measured time", "5.86 seconds"],
  ["Observed CPU use", "~2% during the reported run"],
  ["Compute path", "Metal GPU pipeline"],
];

export default function PathResearchPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-neutral-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-16rem] top-[-10rem] h-[38rem] w-[38rem] rounded-full bg-emerald-500/[0.08] blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            ← HexCode
          </Link>

          <p className="mt-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-emerald-500 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Research · Executive summary
          </p>

          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-8xl">
            P.A.T.H.
          </h1>
          <p className="mt-5 max-w-4xl text-2xl font-medium tracking-tight text-neutral-200 md:text-4xl">
            High-performance GPU-accelerated prime sieving on Apple Silicon.
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
            Prime Accelerated Throughput Handler is an experimental, GPU-native
            prime-discovery engine designed around Apple Silicon and Metal compute.
            This page presents a non-confidential overview of the architecture,
            validation approach and selected measured results. Internal algorithms
            and optimisation details are intentionally omitted.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:pawan@hexcode.au?subject=P.A.T.H.%20full%20technical%20report%20request"
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Request the full paper
            </a>
            <a
              href="#results"
              className="rounded-full border border-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:border-neutral-600 hover:bg-neutral-950"
            >
              View measured result
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-500">
              01 · Architecture
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Heterogeneous compute by design.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-neutral-400 md:text-lg">
            <p>
              P.A.T.H. was built to move a highly data-parallel workload away from
              general-purpose CPU threads and onto Apple&apos;s integrated GPU. Metal
              compute shaders perform the sieve workload while the CPU primarily
              handles orchestration, dispatch and output.
            </p>
            <p>
              The implementation combines Metal compute, Objective-C++ bindings and
              arbitrary-precision integer backends. The research focus is not simply
              raw prime-counting speed, but the behaviour of a GPU-native numerical
              workload on a tightly integrated system-on-chip.
            </p>
          </div>
        </div>
      </section>

      <section id="results" className="border-y border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-500">
            02 · Selected result
          </p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
            M1 execution with minimal CPU involvement.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-900 md:grid-cols-5">
            {metrics.map(([label, value]) => (
              <div key={label} className="bg-black p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-600">
                  {label}
                </p>
                <p className="mt-3 text-base font-medium leading-6 text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-sm leading-7 text-neutral-500">
            These figures are implementation-specific measurements from the reported
            experimental run. They are not presented as a direct CPU benchmark, nor
            as a claim that P.A.T.H. outperforms specialised CPU prime-sieving tools
            in raw counting throughput. Their relevance is architectural: the test
            demonstrates substantial work being executed through the integrated GPU
            while the CPU remains lightly utilised.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-3">
          <article className="rounded-3xl border border-neutral-900 bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-500">
              Validation
            </p>
            <h3 className="mt-5 text-xl font-medium">Independent output checks</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              Experimental outputs were checked against known prime datasets and
              independent prime-sieving tools to verify numerical correctness.
            </p>
          </article>

          <article className="rounded-3xl border border-neutral-900 bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-500">
              Scope
            </p>
            <h3 className="mt-5 text-xl font-medium">Apple Silicon research</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              The project examines GPU offload, data-parallel execution and system
              behaviour on Apple Silicon rather than attempting to generalise the
              result to unrelated architectures.
            </p>
          </article>

          <article className="rounded-3xl border border-neutral-900 bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-500">
              Disclosure
            </p>
            <h3 className="mt-5 text-xl font-medium">Executive summary only</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              Internal kernel logic, optimisation techniques and implementation
              details remain withheld. The complete technical report is available
              for academic, engineering or research review on request.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-500">
              03 · Access
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Want the complete technical report?
            </h2>
            <p className="mt-6 text-base leading-8 text-neutral-400 md:text-lg">
              The full paper, <em>High-Performance GPU-Accelerated Prime Sieving for
              Cryptographic and HPC Applications</em>, is available to academic,
              engineering and research reviewers on request.
            </p>
            <a
              href="mailto:pawan@hexcode.au?subject=P.A.T.H.%20full%20technical%20report%20request"
              className="mt-8 inline-block rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Email to request access
            </a>
            <p className="mt-8 text-sm text-neutral-600">
              Pawan Sedara · 2026 · HexCode Research
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
