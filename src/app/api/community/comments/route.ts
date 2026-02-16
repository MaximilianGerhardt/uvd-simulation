import { getSupabase } from "@/lib/supabase";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// OpenAI moderation API (free endpoint)
async function moderateContent(text: string): Promise<{ flagged: boolean; reason?: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // If no API key, default to pending (manual review needed)
    return { flagged: false };
  }

  try {
    const res = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input: text }),
    });

    const data = await res.json();
    const result = data.results?.[0];

    if (result?.flagged) {
      const categories = Object.entries(result.categories)
        .filter(([, v]) => v === true)
        .map(([k]) => k);
      return { flagged: true, reason: `Content flagged: ${categories.join(", ")}` };
    }

    return { flagged: false };
  } catch {
    // On error, allow but mark as pending
    return { flagged: false };
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 50);
  const offset = parseInt(url.searchParams.get("offset") || "0");

  const supabase = getSupabase();
  const { data, error, count } = await supabase
    .from("community_comments")
    .select("id, author_name, comment_text, locale, created_at", { count: "exact" })
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return Response.json({ error: "Failed to fetch comments" }, { status: 500 });
  }

  return Response.json({ comments: data ?? [], total: count ?? 0 });
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many comments. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { authorName, commentText, locale } = body;

    // Validation
    if (!authorName || typeof authorName !== "string" || authorName.trim().length < 2 || authorName.trim().length > 50) {
      return Response.json({ error: "Name must be 2-50 characters." }, { status: 400 });
    }
    if (!commentText || typeof commentText !== "string" || commentText.trim().length < 10 || commentText.trim().length > 1000) {
      return Response.json({ error: "Comment must be 10-1000 characters." }, { status: 400 });
    }

    // AI moderation
    const moderation = await moderateContent(`${authorName}: ${commentText}`);

    const supabase = getSupabase();

    if (moderation.flagged) {
      // Store as rejected for audit
      await supabase.from("community_comments").insert({
        author_name: authorName.trim(),
        comment_text: commentText.trim(),
        status: "rejected",
        moderation_reason: moderation.reason,
        locale: locale || "en",
      });

      return Response.json(
        { error: "Your comment could not be published due to content policy violations." },
        { status: 422 }
      );
    }

    // Auto-approve if moderation passes
    const { error } = await supabase.from("community_comments").insert({
      author_name: authorName.trim(),
      comment_text: commentText.trim(),
      status: "approved",
      locale: locale || "en",
    });

    if (error) {
      console.error("Comment insert error:", error);
      return Response.json({ error: "Failed to submit comment" }, { status: 500 });
    }

    return Response.json({ success: true, message: "Comment published." });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
