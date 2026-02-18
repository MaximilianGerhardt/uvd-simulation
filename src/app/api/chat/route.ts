import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/knowledge-base";
import { getSupabase } from "@/lib/supabase";

export const maxDuration = 30;

// --- Rate Limiter (in-memory, per-IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW = 60 * 1000;

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

// --- Input Validation ---
const MAX_MESSAGE_LENGTH = 500;
const MAX_CONVERSATION_TURNS = 20;
const BLOCKED_PATTERNS = [
  /ignore\s+(previous|all|above|prior)\s+(instructions|prompts|rules)/i,
  /you\s+are\s+now/i,
  /pretend\s+(to\s+be|you'?re)/i,
  /act\s+as\s+(if|a|an)/i,
  /system\s*prompt/i,
  /reveal\s+(your|the)\s+(instructions|prompt|rules)/i,
  /what\s+are\s+your\s+(instructions|rules)/i,
  /DAN\s*mode/i,
  /jailbreak/i,
  /\bDAN\b/,
];

function sanitizeInput(text: string): string {
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

function isPromptInjection(text: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(text));
}

// --- Anonymous Question Logging (fire-and-forget to Supabase) ---
async function logQuestion(question: string, locale: string, ip: string) {
  try {
    const supabase = getSupabase();
    const sessionHash = await hashString(ip + new Date().toISOString().slice(0, 10));

    const { error } = await supabase.from("chat_questions").insert({
      question: question.slice(0, 500),
      locale,
      session_hash: sessionHash,
    });

    if (error) {
      console.error("Chat question log failed:", error.message, error.code);
    }
  } catch (err) {
    console.error("Chat question log error:", err instanceof Error ? err.message : err);
  }
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

// --- Main Handler ---
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI chat is not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages, locale } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enforce conversation length
    if (messages.length > MAX_CONVERSATION_TURNS) {
      return new Response(
        JSON.stringify({ error: "Conversation too long. Please start a new chat." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate & sanitize the latest user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user" || typeof lastMessage.content !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid message format." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const sanitized = sanitizeInput(lastMessage.content);
    if (sanitized.length === 0 || sanitized.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message must be 1-${MAX_MESSAGE_LENGTH} characters.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for prompt injection attempts
    if (isPromptInjection(sanitized)) {
      return new Response(
        JSON.stringify({ error: "I can only help with UVD-related educational questions." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the question anonymously (fire-and-forget)
    logQuestion(sanitized, locale || "en", ip);

    // Build sanitized message history
    const cleanMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: sanitizeInput(m.content).slice(0, MAX_MESSAGE_LENGTH),
    }));

    const localeHint =
      locale && locale !== "en"
        ? `\n\nThe user is browsing in "${locale}". Respond in the same language they write in.`
        : "";

    const result = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: SYSTEM_PROMPT + localeHint,
      messages: cleanMessages,
      maxOutputTokens: 400,
      temperature: 0.5,
    });

    const text = result.text;
    if (!text) {
      return new Response(
        JSON.stringify({ error: "No response generated. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response in small chunks to maintain streaming UX
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = text.split(/(\s+)/);
        for (const word of words) {
          controller.enqueue(encoder.encode(word));
          await new Promise((r) => setTimeout(r, 15));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat API error:", error instanceof Error ? error.message : error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
