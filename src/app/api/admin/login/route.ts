import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionToken,
  COOKIE_NAME,
  SESSION_DURATION,
} from "@/lib/admin-auth";

// Brute-force protection
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Check brute-force block
  const attempt = loginAttempts.get(ip);
  if (attempt && Date.now() < attempt.blockedUntil) {
    const minutes = Math.ceil((attempt.blockedUntil - Date.now()) / 60000);
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${minutes} minutes.` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required." },
        { status: 400 }
      );
    }

    if (!verifyCredentials(email, password)) {
      // Track failed attempt
      const current = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
      current.count++;
      if (current.count >= MAX_ATTEMPTS) {
        current.blockedUntil = Date.now() + BLOCK_DURATION;
        current.count = 0;
      }
      loginAttempts.set(ip, current);

      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Clear failed attempts on success
    loginAttempts.delete(ip);

    const token = createSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
