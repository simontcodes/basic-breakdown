import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Top */}
      <section className="mx-auto max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          About
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          What is Basic Breakdown?
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Basic Breakdown is a short-form newsletter that explains{" "}
          <span className="font-medium text-zinc-900">one important story</span>{" "}
          at a time—what happened, why it matters, and what to watch next.
          Designed to be readable in about{" "}
          <span className="font-medium text-zinc-900">3 minutes</span>.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-zinc-600">
          {[
            "One story per issue",
            "Plain English",
            "Context + stakes",
            "No doomscrolling",
            "Links to go deeper",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto mt-10 max-w-3xl">
        <h2 className="text-xs font-semibold tracking-[0.22em] text-zinc-700">
          WHAT YOU GET IN EACH ISSUE
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "What’s going on",
              desc: "A clear summary of the event, without assuming you’ve been following it all week.",
            },
            {
              title: "Why it matters",
              desc: "The real-world impact: money, power, safety, tech, your time—whatever the stakes are.",
            },
            {
              title: "What to watch next",
              desc: "The next decision, vote, deadline, or consequence that could change the story.",
            },
            {
              title: "Optional links",
              desc: "If you want to go deeper, you’ll get a couple of reputable sources—not a rabbit hole.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it stays readable */}
      <section className="mx-auto mt-10 max-w-3xl">
        <h2 className="text-xs font-semibold tracking-[0.22em] text-zinc-700">
          HOW WE KEEP IT SIMPLE
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <ul className="space-y-3 text-sm text-zinc-700">
            {[
              "We avoid jargon. If a term matters, we define it.",
              "We write for people who are busy—not people who refresh the news all day.",
              "We prioritize clarity over speed. Better to be right and readable than first.",
              "We separate facts from what’s uncertain (and say what we’re watching).",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-400" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sample format */}
      <section className="mx-auto mt-10 max-w-3xl">
        <h2 className="text-xs font-semibold tracking-[0.22em] text-zinc-700">
          SAMPLE FORMAT
        </h2>

        <div className="mt-4 rounded-2xl border border-lime-400/40 bg-lime-400/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            Example (short)
          </p>

          <div className="mt-4 space-y-4 text-sm text-zinc-800">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">
                What happened
              </p>
              <p className="mt-1 text-zinc-700">
                A quick, plain-language summary of the event in 2–4 sentences.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">
                Why it matters
              </p>
              <p className="mt-1 text-zinc-700">
                The consequence: who’s affected, what changes, and why this is
                bigger than a headline.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">
                What to watch
              </p>
              <p className="mt-1 text-zinc-700">
                The next decision or deadline that could move the story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-10 max-w-3xl">
        <h2 className="text-xs font-semibold tracking-[0.22em] text-zinc-700">
          FAQ
        </h2>

        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
          {[
            {
              q: "How often do you publish?",
              a: "When there’s a story worth breaking down. The goal is quality and clarity, not spam.",
            },
            {
              q: "Is it free?",
              a: "Yes. If you add paid tiers later, the free version should still be useful on its own.",
            },
            {
              q: "Where do the sources come from?",
              a: "Primary reporting and reputable outlets. Issues include a “Read more” link when it helps.",
            },
            {
              q: "Can I suggest a story?",
              a: "Yes—share a link and a one-sentence “why it matters” and it’s easy to evaluate.",
            },
            {
              q: "Can I unsubscribe anytime?",
              a: "Always. One click.",
            },
          ].map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="cursor-pointer list-none text-sm font-medium text-zinc-900">
                <div className="flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-zinc-500 transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-zinc-900">
          Want the next breakdown?
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          One important story. Clear context. Fast read.
        </p>

        <form className="mt-4 flex flex-col gap-2 sm:flex-row">
          <div className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-left text-sm text-zinc-700 shadow-sm">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-lime-400 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900 shadow-sm transition hover:bg-lime-300"
          >
            SUBSCRIBE
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
          <Link href="/#archive" className="font-medium text-zinc-900 hover:underline">
            Browse latest →
          </Link>
          <span className="text-zinc-300">•</span>
          <Link href="/archive" className="font-medium text-zinc-900 hover:underline">
            Full archive →
          </Link>
        </div>
      </section>
    </>
  );
}
