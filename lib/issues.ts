export type Issue = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  date: string;
  minutes: number;
  readMore?: string | null; // estimated reading time
};

type BackendIssue = {
  slug: string;
  title: string;
  subject: string;
  previewText?: string | null;
  intro?: string | null;
  whatsGoingOn?: string | null;
  whyItMatters?: string | null;
  readMore?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  createdAt?: string; 
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in .env.local");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function estimateMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 220;
  return Math.max(1, Math.round(words / wpm));
}

function toIssueCard(item: BackendIssue): Issue {
  const summary = item.previewText ?? item.intro ?? "New issue.";
  const date = item.publishedAt ?? item.createdAt ?? new Date().toISOString();

  const fullText = [
    item.previewText,
    item.intro,
    item.whatsGoingOn,
    item.whyItMatters,
    item.readMore,
    item.category,
  ]
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .join(" ");

  return {
    slug: item.slug,
    title: item.title,
    summary,
    topic: item.category ?? "NEWS",
    date,
    minutes: estimateMinutes(fullText || summary),
  };
}

function looksLikeIssueCard(obj: unknown): obj is Issue {
  if (!isRecord(obj)) return false;
  return (
    typeof obj.slug === "string" &&
    typeof obj.title === "string" &&
    typeof obj.summary === "string" &&
    typeof obj.topic === "string" &&
    typeof obj.date === "string" &&
    typeof obj.minutes === "number"
  );
}

function looksLikeBackendIssue(obj: unknown): obj is BackendIssue {
  if (!isRecord(obj)) return false;
  return typeof obj.slug === "string" && typeof obj.title === "string";
}

function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (isRecord(payload)) {
    const maybeIssues = payload.issues;
    if (Array.isArray(maybeIssues)) return maybeIssues;

    const maybeData = payload.data;
    if (Array.isArray(maybeData)) return maybeData;

    if (isRecord(maybeData) && Array.isArray(maybeData.issues)) {
      return maybeData.issues;
    }
  }

  return [];
}

export async function getAllIssues(): Promise<Issue[]> {
  const res = await fetch(`${API_URL}/issues`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch issues: ${res.status} ${res.statusText}`);
  }

  const json: unknown = (await res.json()) as unknown;
  const arr = extractArray(json);

  // If backend already returns IssueCard[]
  if (arr.length > 0 && arr.every(looksLikeIssueCard)) {
    return arr as Issue[];
  }

  // Otherwise map Prisma-ish issues into cards
  const backend = arr.filter(looksLikeBackendIssue) as BackendIssue[];
  return backend.map(toIssueCard);
}
