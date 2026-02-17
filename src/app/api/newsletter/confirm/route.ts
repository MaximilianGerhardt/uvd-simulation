import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uvd.trading";
const DEFAULT_LOCALE = "en";

function localePath(locale: string, path: string) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const locale = searchParams.get("locale") || "en";

  if (!token) {
    return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=error"));
  }

  try {
    const supabase = getSupabase();

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("id, confirmed")
      .eq("confirm_token", token)
      .single();

    if (findError || !subscriber) {
      return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=invalid"));
    }

    if (subscriber.confirmed) {
      return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=already"));
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
        confirm_token: null, // Clear token after use
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("Confirm error:", updateError);
      return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=error"));
    }

    return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=success"));
  } catch {
    return NextResponse.redirect(localePath(locale, "/newsletter/confirmed?status=error"));
  }
}
