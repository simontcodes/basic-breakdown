"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Issue } from "@/lib/issues";

type Props = {
  initialPosts: Issue[];
};

type SortMode = "newest" | "oldest";

function formatDateShort(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeTopic(topic: string) {
  return (topic || "NEWS").trim();
}

export default function ArchiveClient({ initialPosts }: Props) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("all");
  const [sort, setSort] = useState<SortMode>("newest");

  const topics = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => set.add(normalizeTopic(p.topic)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [initialPosts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = initialPosts.filter((p) => {
      const pTopic = normalizeTopic(p.topic);
      const matchesTopic = topic === "all" || pTopic === topic;

      if (!q) return matchesTopic;

      const haystack = [p.title, p.summary, p.slug, pTopic]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesTopic && haystack.includes(q);
    });

    list.sort((a, b) => {
      const ad = new Date(a.date).getTime();
      const bd = new Date(b.date).getTime();
      return sort === "newest" ? bd - ad : ad - bd;
    });

    return list;
  }, [initialPosts, query, topic, sort]);

  const hasActiveFilters = query.trim().length > 0 || topic !== "all" || sort !== "newest";

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:grid-cols-12 sm:items-center">
        {/* Search */}
        <div className="sm:col-span-7">
          <div className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, summaries, topics…"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Topic */}
        <div className="sm:col-span-3">
          <div className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-900 focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All topics" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="sm:col-span-2">
          <div className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="w-full bg-transparent text-sm text-zinc-900 focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Meta row */}
        <div className="sm:col-span-12 flex items-center justify-between pt-1 text-xs text-zinc-500">
          <span>
            Showing{" "}
            <span className="font-medium text-zinc-900">{filtered.length}</span>{" "}
            of {initialPosts.length}
          </span>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setQuery("");
                setTopic("all");
                setSort("newest");
              }}
              className="font-semibold uppercase tracking-[0.18em] text-zinc-900 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200">
          <p className="font-medium text-zinc-900">No matches.</p>
          <p className="mt-1 text-zinc-600">
            Try a different search term or clear filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-zinc-200"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {normalizeTopic(post.topic).toUpperCase()} ·{" "}
                {formatDateShort(post.date)}
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
      )}
    </div>
  );
}
