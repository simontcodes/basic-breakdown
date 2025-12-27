import { getAllIssues, Issue } from "@/lib/issues";
import ArchiveClient from "./ArchiveClient";

export default async function ArchivePage() {
  const posts = await getAllIssues();

  return (
    <>
      <section className="mx-auto max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Archive
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          Full archive
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Browse every breakdown. Search by keyword, filter by topic, or sort by
          date.
        </p>

        <div className="mt-8">
          <ArchiveClient initialPosts={posts as Issue[]} />
        </div>
      </section>
    </>
  );
}
