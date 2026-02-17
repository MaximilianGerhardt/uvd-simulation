import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "uvd_admin_session";
const SESSION_DURATION = 24 * 60 * 60; // 24 hours in seconds

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET not set");
  return secret;
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;

  // Hash both sides to ensure constant-length for timing-safe comparison
  const emailHash = crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
  const expectedEmailHash = crypto
    .createHash("sha256")
    .update(adminEmail.toLowerCase().trim())
    .digest("hex");
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const expectedPasswordHash = crypto
    .createHash("sha256")
    .update(adminPassword)
    .digest("hex");

  const emailMatch = crypto.timingSafeEqual(
    Buffer.from(emailHash),
    Buffer.from(expectedEmailHash)
  );
  const passwordMatch = crypto.timingSafeEqual(
    Buffer.from(passwordHash),
    Buffer.from(expectedPasswordHash)
  );

  return emailMatch && passwordMatch;
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_DURATION * 1000;
  const payload = `admin:${expires}`;
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}:${hmac}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return false;

    const [role, expiresStr, signature] = parts;
    if (role !== "admin") return false;

    const payload = `${role}:${expiresStr}`;
    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return false;
    }

    return Date.now() < parseInt(expiresStr);
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_DURATION };
