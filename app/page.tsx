import Link from "next/link";
import { getAllIssues, Issue } from "@/lib/issues";


export default async function HomePage() {
  const posts = await getAllIssues();
  const featured = posts[0];
  const recent = posts.slice(1);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="mx-auto min-h-screen max-w-5xl border-x border-zinc-300 bg-zinc-50 shadow-md">
        <header className="flex items-center justify-between px-4 py-5 sm:px-8">
          <div className="leading-tight">
            <div className="text-2xl  font-bold tracking-[0.25em] text-zinc-900">
              BASIC
            </div>
            <div className=" text-2xl font-bold tracking-[0.25em] text-zinc-900">
              BREAKDOWN
            </div>
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium tracking-[0.18em] text-zinc-700">
            <Link href="#archive" className="hover:text-zinc-900">
              ARCHIVE
            </Link>
            <Link href="#about" className="hover:text-zinc-900">
              ABOUT
            </Link>
          </nav>
        </header>

        <main className="px-4 pb-16 pt-4 sm:px-8 sm:pb-20">
          <section className="flex flex-col items-center text-center">
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              NEWS, SIMPLIFIED.
            </h1>

            <form className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-full border border-zinc-400 bg-white px-4 py-2.5 text-left text-sm text-zinc-700 shadow-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
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

            <p className="mt-3 text-xs text-zinc-500">
              One short breakdown at a time. No doomscrolling required.
            </p>
          </section>

          <section id="archive" className="mt-12 sm:mt-16">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-zinc-700">
              LATEST BREAKDOWNS
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post: Issue) => (
                <article
                  key={post.slug}
                  className="flex h-full flex-col rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-zinc-200"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {post.topic.toUpperCase()} ·{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2 line-clamp-3 text-xs text-zinc-600">
                    {post.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{post.minutes} min read</span>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-900"
                    >
                      Read <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="about"
            className="mt-16 border-t border-zinc-200 pt-6 text-left text-sm text-zinc-700"
          >
            <p className="max-w-2xl">
              Basic Breakdown is a short-form newsletter that explains one
              important story at a time—what happened, why it matters, and what
              to watch next. Clean, context-rich, and designed to fit into your
              day without taking it over.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
