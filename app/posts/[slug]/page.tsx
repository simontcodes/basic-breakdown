import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllIssueSlugs, getIssueBySlug } from "@/lib/issues-detail";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Helpers to render bullet-style sections cleanly
function cleanLine(line: string): string {
  let s = line;

  // Repeatedly strip leading bullet-ish tokens (covers combos like "- •", "• -", "–", "·", etc.)
  // Keep looping until it stops changing.
  while (true) {
    const next = s
      .replace(/^\s*(?:[-–—•·●◦*]+)\s*/u, "") // remove one "cluster" of bullet chars
      .trimStart();

    if (next === s) break;
    s = next;
  }

  return s.trim();
}

function isBulletSection(text: string): boolean {
  return text.split("\n").some((line) => /^\s*[-•]+/.test(line));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") return notFound();

  const post = await getIssueBySlug(slug);
  if (!post) return notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Same frame as homepage */}
      <div className="mx-auto min-h-screen max-w-5xl border-x border-zinc-300 bg-zinc-50 shadow-md">
        {/* Same header as homepage */}
        <header className="flex items-center justify-between px-4 py-5 sm:px-8">
          <Link href="/" className="leading-tight hover:opacity-90 transition">
            <div className="text-2xl font-bold tracking-[0.25em] text-zinc-900">
              BASIC
            </div>
            <div className="text-2xl font-bold tracking-[0.25em] text-zinc-900">
              BREAKDOWN
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-xs font-medium tracking-[0.18em] text-zinc-700">
            <Link href="/#archive" className="hover:text-zinc-900">
              ARCHIVE
            </Link>
            <Link href="/#about" className="hover:text-zinc-900">
              ABOUT
            </Link>
          </nav>
        </header>

        <main className="px-4 pb-16 pt-4 sm:px-8 sm:pb-20">
          <Link
            href="/#archive"
            className="text-xs text-zinc-500 hover:text-zinc-800"
          >
            ← Back to all breakdowns
          </Link>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {post.topic.toUpperCase()} · {post.minutes} min read
          </p>

          <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-3xl">
            {post.title}
          </h1>

          <p className="mt-1 text-sm text-zinc-500">{formattedDate}</p>

          {/* Quick recap */}
          <aside className="mt-6 rounded-2xl border border-lime-400/40 bg-lime-400/10 p-4 text-sm text-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800">
              Quick recap
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {post.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-[2px] text-zinc-700">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Article */}
          <article className="prose mt-8 max-w-none prose-zinc">
            {post.sections.map((section) => (
              <section key={section.heading} className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-800">
                  {section.heading}
                </h2>

                {section.heading.toLowerCase() === "read more" ? (
                  <a
                    href={section.body}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-lime-600 underline hover:text-lime-700"
                  >
                    {section.body}
                  </a>
                ) : isBulletSection(section.body) ? (
                  // Optional polish included: lime-colored bullet markers
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700 marker:text-lime-500">
                    {section.body
                      .split("\n")
                      .map(cleanLine)
                      .filter(Boolean)
                      .map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                  </ul>
                ) : (
                  <div className="mt-3 space-y-4 text-zinc-700">
                    {section.body.split("\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Inline subscribe */}
          <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-zinc-900">
              Liked this breakdown?
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              Get the next one in your inbox in a 3-minute, no-jargon format.
            </p>
            <form className="mt-3 flex flex-col gap-2 sm:flex-row">
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
          </section>
        </main>
      </div>
    </div>
  );
}
