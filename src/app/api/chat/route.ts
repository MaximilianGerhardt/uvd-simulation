import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/knowledge-base";

export const maxDuration = 30;

// Simple in-memory rate limiter (works without Upstash for dev/simple deployments)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10; // messages per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Optional: Cloudflare Turnstile verification
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip if not configured

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages, turnstileToken, locale } = body;

    // Turnstile verification (if configured)
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken);
      if (!valid) {
        return new Response(
          JSON.stringify({ error: "Bot verification failed." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Check for OpenAI key
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI chat is not configured. Please set OPENAI_API_KEY." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const localeInstruction = locale && locale !== "en"
      ? `\n\nIMPORTANT: The user is browsing in locale "${locale}". Respond in the same language they write in. If they write in ${locale}, respond in ${locale}.`
      : "";

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + localeInstruction,
      messages,
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
