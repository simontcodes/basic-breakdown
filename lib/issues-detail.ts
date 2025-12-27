export type IssueDetail = {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  date: string; // ISO
  bullets: string[];
  readMore?: string;
  sections: { heading: string; body: string }[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("Missing NEXT_PUBLIC_API_URL in .env.local");

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

// Matches Prisma Issue-ish payload from backend
type BackendIssue = {
  slug: string;
  title: string;
  previewText?: string | null;
  intro?: string | null;
  whatsGoingOn?: string | null;
  whyItMatters?: string | null;
  readMore?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  category?: string | null;
};

function estimateMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 220;
  return Math.max(1, Math.round(words / wpm));
}

// Turn a paragraph into 2–4 bullets (simple + readable)
function cleanBullet(line: string): string {
  return line
    .replace(/^\s*[-•]+\s*/g, "") // remove leading - or •
    .replace(/\s+/g, " ")
    .trim();
}

function makeBullets(issue: BackendIssue): string[] {
  const source =
    issue.previewText ??
    issue.whatsGoingOn ??
    issue.intro ??
    issue.whyItMatters ??
    "";

  // If text contains multiple lines/bullets, split them
  const lines = source
    .split("\n")
    .map(cleanBullet)
    .filter((s) => s.length > 0);

  const bullets = lines.length ? lines : [cleanBullet(source)].filter(Boolean);

  // Fallbacks
  const final = bullets.slice(0, 4);
  if (final.length === 0) final.push("New issue is live.");
  if (final.length === 1) final.push("Read on for the full breakdown.");

  return final;
}


function toDetail(issue: BackendIssue): IssueDetail {
  const date = issue.publishedAt ?? issue.createdAt ?? new Date().toISOString();

  const sections = [
    issue.intro?.trim()
      ? { heading: "The big picture", body: issue.intro.trim() }
      : null,
    issue.whatsGoingOn?.trim()
      ? { heading: "What’s going on", body: issue.whatsGoingOn.trim() }
      : null,
    issue.whyItMatters?.trim()
      ? { heading: "Why it matters", body: issue.whyItMatters.trim() }
      : null,
    issue.readMore?.trim()
      ? { heading: "Read more", body: issue.readMore.trim() }
      : null,
  ].filter((x): x is { heading: string; body: string } => x !== null);

  const fullText = [
    issue.previewText,
    issue.intro,
    issue.whatsGoingOn,
    issue.whyItMatters,
    issue.readMore,
  ]
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .join(" ");

  return {
    slug: issue.slug,
    title: issue.title,
    category: issue.category ?? "NEWS",
    date,
    minutes: estimateMinutes(fullText || issue.previewText || issue.title),
    bullets: makeBullets(issue),
    sections: sections.length
      ? sections
      : [{ heading: "Update", body: issue.previewText ?? "New issue." }],
  };
}

function unwrapData(json: unknown): unknown {
  // Accept raw issue OR { data: issue }
  if (isRecord(json) && "data" in json) return json.data;
  return json;
}

function extractArray(json: unknown): unknown[] {
  // Accept array OR { data: [...] } OR { issues: [...] } OR { data: { issues: [...] } }
  if (Array.isArray(json)) return json;

  if (!isRecord(json)) return [];

  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.issues)) return json.issues;

  const data = json.data;
  if (isRecord(data) && Array.isArray(data.issues)) return data.issues;

  return [];
}

function looksLikeBackendIssue(v: unknown): v is BackendIssue {
  return (
    isRecord(v) &&
    typeof v.slug === "string" &&
    typeof v.title === "string"
  );
}

export async function getIssueBySlug(slug: string): Promise<IssueDetail | null> {
  const res = await fetch(`${API_URL}/issues/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch issue ${slug}: ${res.status}`);

  const json: unknown = await res.json();
  console.log("Fetched JSON for issue:", json);
  const unwrapped = unwrapData(json);

  if (!looksLikeBackendIssue(unwrapped)) return null;

  return toDetail(unwrapped);
}

export async function getAllIssueSlugs(): Promise<string[]> {
  const res = await fetch(`${API_URL}/issues`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);

  const json: unknown = await res.json();
  const arr = extractArray(json);

  return arr
    .filter(looksLikeBackendIssue)
    .map((x) => x.slug);
}
