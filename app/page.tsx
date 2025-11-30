// app/page.tsx
import Link from "next/link";
// import Image from "next/image";
import { getAllPosts, type Post } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const recent = posts.slice(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between gap-2 py-4">
            <div className="flex items-center gap-2 leading-tight">
              {/* <Image
                src="/logo.svg"
                alt="Basic Breakdown logo"
                width={48} // layout box ~48x25ish
                height={25}
                className="object-contain scale-500 origin-left mr-25" // visually zoom logo, nav height stays small
                priority
              /> */}
              <div>
                <span className="text-base font-semibold tracking-tight">
                  Basic Breakdown
                </span>
                <span className="ml-2 text-[11px] text-slate-400">
                  News, simplified.
                </span>
              </div>
            </div>

            {/* Mobile CTA */}
            <button className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-emerald-400 md:hidden">
              Get newsletter
            </button>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#latest" className="hover:text-slate-50">
                Latest
              </a>
              <a href="#topics" className="hover:text-slate-50">
                Topics
              </a>
              <a href="#how-it-works" className="hover:text-slate-50">
                How it works
              </a>
              <a href="#about" className="hover:text-slate-50">
                About
              </a>
              <button className="rounded-full border border-slate-600 px-4 py-1.5 text-sm font-medium hover:border-slate-200 hover:text-slate-50">
                Get the newsletter
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
        {/* Hero + Featured */}
        <section className="space-y-6 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:space-y-0 md:gap-10">
          {/* Hero copy */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
              Daily newsletter
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Understand the news in{" "}
              <span className="text-emerald-400">3 minutes</span>.
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Basic Breakdown turns complex headlines into simple, clear
              explanations — so you can stay informed without drowning in tabs
              and jargon.
            </p>

            <form className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-400"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400 sm:w-auto"
              >
                Get today&apos;s breakdown
              </button>
            </form>

            <p className="mt-2 text-[11px] text-slate-500">
              1–2 emails per week. No spam, no doomscrolling.
            </p>
          </div>

          {/* Featured / Today’s breakdown preview */}
          {featured && (
            <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-slate-950/40">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-300">
                  {featured.topic.charAt(0).toUpperCase() +
                    featured.topic.slice(1)}
                  {" · "}
                  {featured.minutes} min read
                </span>
                <span>
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h2 className="mt-3 text-base font-semibold text-slate-50">
                {featured.title}
              </h2>

              <p className="mt-2 text-sm text-slate-300">{featured.summary}</p>

              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                {featured.bullets.map((bullet: string) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>

              <Link
                href={`/posts/${featured.slug}`}
                className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
              >
                Read today&apos;s breakdown →
              </Link>
            </article>
          )}
        </section>

        {/* Latest breakdowns */}
        <section id="latest" className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-50">
              Recent breakdowns
            </h2>
          </div>

          {/* Filter chips row (static for now) */}
          <div className="-mx-4 mt-3 overflow-x-auto">
            <div className="flex gap-2 px-4 pb-1 text-[11px] text-slate-300">
              <button className="whitespace-nowrap rounded-full border border-slate-700 px-3 py-1 font-medium text-slate-100">
                All
              </button>
              <button className="whitespace-nowrap rounded-full border border-slate-800 px-3 py-1">
                World
              </button>
              <button className="whitespace-nowrap rounded-full border border-slate-800 px-3 py-1">
                Tech
              </button>
              <button className="whitespace-nowrap rounded-full border border-slate-800 px-3 py-1">
                Money
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recent.map((post: Post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="rounded-full bg-slate-800 px-2 py-0.5">
                    {post.topic.charAt(0).toUpperCase() + post.topic.slice(1)}
                    {" · "}
                    {post.minutes} min read
                  </span>
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-50">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{post.summary}</p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-3 inline-block text-xs font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Read breakdown →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="mt-12 border-t border-slate-900 pt-7"
        >
          <h2 className="text-base font-semibold text-slate-50">
            How Basic Breakdown works
          </h2>

          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <div className="space-y-2 text-sm text-slate-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                01
              </p>
              <p className="font-medium text-slate-50">We pick the headline</p>
              <p>
                We track major stories and pick the ones that actually change
                something — not just clickbait.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                02
              </p>
              <p className="font-medium text-slate-50">We break it down</p>
              <p>
                We strip away jargon and spin, focusing on what happened,
                who&apos;s involved, and the real context.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                03
              </p>
              <p className="font-medium text-slate-50">
                You get the bottom line
              </p>
              <p>
                You walk away with a clear, 3-minute understanding — plus what
                to watch next.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter emphasis */}
        <section
          id="about"
          className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                Turn skimming into real understanding.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Basic Breakdown is for people who care about what&apos;s
                happening in the world — but don&apos;t have time to read 10
                different articles every day.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                We do the heavy lifting, you get the signal — without the noise.
              </p>
            </div>

            <div>
              <form className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Join the newsletter
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400"
                >
                  Join free
                </button>
                <p className="text-[11px] text-slate-500">
                  Unsubscribe anytime. No tracking-heavy ads or weird sponsors.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 text-xs text-slate-400 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-50">
              Basic Breakdown
            </p>
            <p className="mt-1 max-w-sm">
              Simple, context-rich explanations of the stories that matter — in
              minutes, not hours.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="space-y-1">
              <p className="font-medium text-slate-300">Product</p>
              <a className="block hover:text-slate-200" href="#latest">
                Latest
              </a>
              <a className="block hover:text-slate-200" href="#topics">
                Topics
              </a>
              <a className="block hover:text-slate-200" href="#latest">
                Archive
              </a>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-300">Company</p>
              <a className="block hover:text-slate-200" href="#about">
                About
              </a>
              <a className="block hover:text-slate-200" href="#">
                Contact
              </a>
              <a className="block hover:text-slate-200" href="#">
                FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Basic Breakdown. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
