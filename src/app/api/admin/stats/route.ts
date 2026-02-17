import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();

    // Fetch all data in parallel
    const [votesRes, commentsRes, chatRes, newsletterRes] = await Promise.all([
      // Votes
      supabase.from("community_votes").select("vote_option, created_at"),

      // Comments (all statuses for admin)
      supabase
        .from("community_comments")
        .select("id, author_name, comment_text, status, moderation_reason, locale, created_at")
        .order("created_at", { ascending: false })
        .limit(200),

      // Chat questions
      supabase
        .from("chat_questions")
        .select("id, question, locale, session_hash, created_at")
        .order("created_at", { ascending: false })
        .limit(200),

      // Newsletter subscribers
      supabase
        .from("newsletter_subscribers")
        .select("id, email, locale, confirmed, confirmed_at, subscribed_at, unsubscribed_at, unsubscribe_reason, unsubscribe_feedback")
        .order("subscribed_at", { ascending: false })
        .limit(200),
    ]);

    // Process votes
    const voteCounts: Record<string, number> = {
      innovative: 0,
      interesting: 0,
      skeptical: 0,
      no_opinion: 0,
    };
    for (const row of votesRes.data ?? []) {
      if (voteCounts[row.vote_option] !== undefined) {
        voteCounts[row.vote_option]++;
      }
    }
    const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);

    // Process newsletter stats
    const subscribers = newsletterRes.data ?? [];
    const newsletterStats = {
      total: subscribers.length,
      confirmed: subscribers.filter((s) => s.confirmed).length,
      unconfirmed: subscribers.filter((s) => !s.confirmed && !s.unsubscribed_at).length,
      unsubscribed: subscribers.filter((s) => s.unsubscribed_at).length,
    };

    // Process comments stats
    const comments = commentsRes.data ?? [];
    const commentStats = {
      total: comments.length,
      approved: comments.filter((c) => c.status === "approved").length,
      rejected: comments.filter((c) => c.status === "rejected").length,
      pending: comments.filter((c) => c.status === "pending").length,
    };

    return NextResponse.json({
      votes: {
        counts: voteCounts,
        total: totalVotes,
        raw: votesRes.data ?? [],
      },
      comments: {
        stats: commentStats,
        items: comments,
      },
      chat: {
        total: (chatRes.data ?? []).length,
        items: chatRes.data ?? [],
      },
      newsletter: {
        stats: newsletterStats,
        items: subscribers,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
