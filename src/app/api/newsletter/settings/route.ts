import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch current settings by token
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    const { data: subscriber, error } = await supabase
      .from("newsletter_subscribers")
      .select("locale, confirmed, email")
      .or(`confirm_token.eq.${token},unsubscribe_token.eq.${token}`)
      .single();

    if (error || !subscriber) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Mask email for privacy
    const parts = subscriber.email.split("@");
    const masked = parts[0].slice(0, 2) + "***@" + parts[1];

    return NextResponse.json({
      locale: subscriber.locale,
      confirmed: subscriber.confirmed,
      email: masked,
    });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// POST: Update language preference
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, locale } = body;

    if (!token || !locale) {
      return NextResponse.json({ error: "missing_params" }, { status: 400 });
    }

    const validLocales = ["en", "de", "ar", "es", "fr"];
    if (!validLocales.includes(locale)) {
      return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
    }

    const supabase = getSupabase();

    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .or(`confirm_token.eq.${token},unsubscribe_token.eq.${token}`)
      .single();

    if (findError || !subscriber) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ locale })
      .eq("id", subscriber.id);

    if (updateError) {
      return NextResponse.json({ error: "update_failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, locale });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
