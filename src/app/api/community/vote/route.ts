import { getSupabase } from "@/lib/supabase";
import { createHash } from "crypto";

const VALID_OPTIONS = ["innovative", "interesting", "skeptical", "no_opinion"];

function hashIp(ip: string): string {
  return createHash("sha256").update(ip + (process.env.IP_SALT || "uvd-community")).digest("hex");
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("community_votes")
    .select("vote_option");

  if (error) {
    return Response.json({ error: "Failed to fetch votes" }, { status: 500 });
  }

  const counts: Record<string, number> = {
    innovative: 0,
    interesting: 0,
    skeptical: 0,
    no_opinion: 0,
  };

  for (const row of data ?? []) {
    if (counts[row.vote_option] !== undefined) {
      counts[row.vote_option]++;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return Response.json({ counts, total });
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    const ipHash = hashIp(ip);
    const body = await req.json();
    const { option } = body;

    if (!option || !VALID_OPTIONS.includes(option)) {
      return Response.json({ error: "Invalid vote option" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("community_votes")
      .upsert({ vote_option: option, ip_hash: ipHash }, { onConflict: "ip_hash" });

    if (error) {
      console.error("Vote insert error:", error);
      return Response.json({ error: "Failed to submit vote" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
