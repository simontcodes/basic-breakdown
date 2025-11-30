import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, type Post } from '@/lib/posts';

type PostPageProps = {
  params: { slug: string };
};

// Pre-generate static params for all posts (optional, but nice)
export function generateStaticParams() {
  return getAllPosts().map((post: Post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const slug = params?.slug;

  // Extra safety in case params is weird in dev
  if (!slug || typeof slug !== 'string') {
    return notFound();
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          ← Back to all breakdowns
        </Link>

        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-emerald-400">
          {post.topic.charAt(0).toUpperCase() + post.topic.slice(1)} ·{' '}
          {post.minutes} min read
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {post.title}
        </h1>

        <p className="mt-1 text-sm text-slate-400">{formattedDate}</p>

        {/* TL;DR box */}
        <aside className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Quick recap
          </p>
          <ul className="mt-2 space-y-1">
            {post.bullets.map((bullet: string) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </aside>

        <article className="prose prose-invert mt-6 max-w-none">
          {post.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>

        {/* Inline subscribe block */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-sm font-medium text-slate-50">
            Liked this breakdown?
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Get the next one in your inbox in a 3-minute, no-jargon format.
          </p>
          <form className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-400"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400 sm:w-auto"
            >
              Join the newsletter
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
