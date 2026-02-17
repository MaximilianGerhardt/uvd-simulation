import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uvd.trading";
const DEFAULT_LOCALE = "en";

function localePath(locale: string, path: string) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

// GET: Redirect to feedback page (don't unsubscribe directly)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const locale = searchParams.get("locale") || "en";

  if (!token) {
    return NextResponse.redirect(localePath(locale, "/newsletter/unsubscribed?status=error"));
  }

  // Redirect to feedback page instead of direct unsubscribe
  return NextResponse.redirect(localePath(locale, `/newsletter/unsubscribe?token=${token}`));
}

// POST: Process unsubscribe with optional feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, feedback, reason } = body;

    if (!token) {
      return NextResponse.json({ error: "missing_token" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Find subscriber by unsubscribe token
    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("id, locale")
      .eq("unsubscribe_token", token)
      .single();

    if (findError || !subscriber) {
      return NextResponse.json({ error: "invalid_token" }, { status: 404 });
    }

    // Mark as unsubscribed
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        unsubscribed_at: new Date().toISOString(),
        confirmed: false,
        unsubscribe_reason: reason || null,
        unsubscribe_feedback: feedback || null,
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("Unsubscribe error:", updateError);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, locale: subscriber.locale });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
