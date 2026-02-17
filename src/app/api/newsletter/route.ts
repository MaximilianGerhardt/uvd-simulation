import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uvd.trading";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/*
 * ═══════════════════════════════════════════════════════════════════════
 * UVD EMAIL DESIGN GUIDELINE — keep all transactional emails consistent
 * ═══════════════════════════════════════════════════════════════════════
 * Font:        Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif
 * Background:  #f8f8f8  (outer body)
 * Card:        #ffffff  (main content card)
 * Alt section: #f8f8f8  (privacy boxes, language strip)
 * Primary:     #1b1b1b  (headings, body text)
 * Secondary:   #1b1b1b @ 50% opacity (subtext, descriptions)
 * Muted:       #1b1b1b @ 25% opacity (fine print, disclaimers)
 * Accent:      #FF6B00  (orange — logo highlight, links, active states)
 * Borders:     #D0D0D0  (card border, dividers)
 * Buttons:     bg #1b1b1b, text #fff, border-radius 100px (pill)
 * Accent btn:  bg #FF6B00, text #fff, border-radius 100px
 * Radius:      16px card, 12px inner boxes, 100px buttons/pills
 * Max-width:   520px
 * Logo:        "Universe Dollar" in semibold #1b1b1b + orange dot accent
 *              or "UVD" bold #FF6B00 + "Trading" medium #1b1b1b
 * Sender:      "UVD Trading" (Title Case, NO all-caps, no dots/special chars)
 * ═══════════════════════════════════════════════════════════════════════
 */

const DEFAULT_LOCALE = "en";

function localePrefix(locale: string): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

function getConfirmationEmail(
  locale: string,
  confirmUrl: string,
  confirmToken: string,
  unsubscribeToken: string,
) {
  const subjects: Record<string, string> = {
    en: "Confirm your UVD Ecosystem subscription",
    de: "Bestätige dein UVD Ökosystem Abonnement",
    ar: "أكّد اشتراكك في نظام UVD",
    es: "Confirma tu suscripción al ecosistema UVD",
    fr: "Confirmez votre abonnement à l'écosystème UVD",
  };

  const bodies: Record<string, {
    heading: string; text: string; privacyNote: string;
    button: string; ignoreNote: string;
    unsubText: string; settingsText: string; langLabel: string;
  }> = {
    en: {
      heading: "Confirm your subscription",
      text: "You requested to join the UVD Ecosystem updates — new simulations, UWD protocol insights, and milestone announcements.",
      privacyNote: "We take your privacy seriously. This confirmation ensures no one receives emails they didn't request. We only store your email address — no tracking, no profiling, no data sharing. Ever.",
      button: "Confirm Subscription",
      ignoreNote: "If you didn't request this, simply ignore this email. Your data will be automatically deleted.",
      unsubText: "Unsubscribe",
      settingsText: "Newsletter Settings",
      langLabel: "Change language:",
    },
    de: {
      heading: "Bestätige dein Abonnement",
      text: "Du möchtest Teil der UVD Ökosystem Updates werden — neue Simulationen, UWD-Protokoll-Einblicke und Meilenstein-Ankündigungen.",
      privacyNote: "Deine Privatsphäre ist uns wichtig. Diese Bestätigung stellt sicher, dass niemand ungewollte E-Mails erhält. Wir speichern nur deine E-Mail-Adresse — kein Tracking, kein Profiling, kein Datenverkauf. Niemals.",
      button: "Abonnement bestätigen",
      ignoreNote: "Falls du das nicht angefordert hast, ignoriere diese E-Mail. Deine Daten werden automatisch gelöscht.",
      unsubText: "Abmelden",
      settingsText: "Newsletter-Einstellungen",
      langLabel: "Sprache ändern:",
    },
    ar: {
      heading: "أكّد اشتراكك",
      text: "لقد طلبت الانضمام إلى تحديثات نظام UVD — محاكاة جديدة ورؤى بروتوكول UWD وإعلانات المعالم.",
      privacyNote: "نحن نأخذ خصوصيتك على محمل الجد. هذا التأكيد يضمن عدم تلقي أي شخص رسائل لم يطلبها. نخزن بريدك الإلكتروني فقط — بدون تتبع أو تحليل أو مشاركة بيانات.",
      button: "تأكيد الاشتراك",
      ignoreNote: "إذا لم تطلب هذا، تجاهل هذا البريد. سيتم حذف بياناتك تلقائياً.",
      unsubText: "إلغاء الاشتراك",
      settingsText: "إعدادات النشرة",
      langLabel: "تغيير اللغة:",
    },
    es: {
      heading: "Confirma tu suscripción",
      text: "Solicitaste unirte a las actualizaciones del ecosistema UVD — nuevas simulaciones, información del protocolo UWD y anuncios de hitos.",
      privacyNote: "Tu privacidad es importante para nosotros. Esta confirmación garantiza que nadie reciba correos no solicitados. Solo almacenamos tu dirección de email — sin rastreo, sin perfilado, sin venta de datos. Nunca.",
      button: "Confirmar suscripción",
      ignoreNote: "Si no solicitaste esto, simplemente ignora este correo. Tus datos serán eliminados automáticamente.",
      unsubText: "Cancelar suscripción",
      settingsText: "Ajustes del newsletter",
      langLabel: "Cambiar idioma:",
    },
    fr: {
      heading: "Confirmez votre abonnement",
      text: "Vous souhaitez rejoindre les mises à jour de l'écosystème UVD — nouvelles simulations, aperçus du protocole UWD et annonces de jalons.",
      privacyNote: "Votre vie privée est importante pour nous. Cette confirmation garantit que personne ne reçoit d'emails non sollicités. Nous ne stockons que votre adresse email — pas de tracking, pas de profilage, pas de partage de données. Jamais.",
      button: "Confirmer l'abonnement",
      ignoreNote: "Si vous n'avez pas fait cette demande, ignorez simplement cet email. Vos données seront automatiquement supprimées.",
      unsubText: "Se désabonner",
      settingsText: "Paramètres de la newsletter",
      langLabel: "Changer de langue :",
    },
  };

  const subject = subjects[locale] || subjects.en;
  const b = bodies[locale] || bodies.en;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const textAlign = dir === "rtl" ? "right" : "left";
  const marginDir = dir === "rtl" ? "left" : "right";

  // Build locale-aware URLs (fixes 404 for non-EN locales)
  const prefix = localePrefix(locale);
  const settingsUrl = `${BASE_URL}${prefix}/newsletter/settings?token=${confirmToken}`;
  const unsubUrl = `${BASE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}&locale=${locale}`;

  const langNames: Record<string, string> = { en: "EN", de: "DE", ar: "AR", es: "ES", fr: "FR" };
  const langLinks = Object.entries(langNames)
    .map(([code, label]) => {
      const isCurrent = code === locale;
      const codePrefix = code === DEFAULT_LOCALE ? "" : `/${code}`;
      const langSettingsUrl = `${BASE_URL}${codePrefix}/newsletter/settings?token=${confirmToken}&lang=${code}`;
      const bg = isCurrent ? "#FF6B00" : "#f0f0f0";
      const color = isCurrent ? "#fff" : "#1b1b1b";
      const weight = isCurrent ? "600" : "500";
      return `<a href="${langSettingsUrl}" style="display:inline-block;padding:4px 10px;border-radius:100px;background:${bg};color:${color};font-size:11px;font-weight:${weight};text-decoration:none;margin:0 2px">${label}</a>`;
    })
    .join("");

  const font = "Inter,-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif";

  // Plain text fallback improves spam score (text:html ratio)
  const plainText = [b.heading, b.text, `${b.button}: ${confirmUrl}`, b.privacyNote, b.ignoreNote].join("\n\n");

  const html = `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f8f8;font-family:${font}">
<div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D0D0D0">
<div style="padding:20px 28px;border-bottom:1px solid #D0D0D0;text-align:center">
<a href="${BASE_URL}" style="text-decoration:none"><span style="font-size:16px;font-weight:700;color:#FF6B00">UVD</span> <span style="font-size:16px;font-weight:500;color:#1b1b1b">Trading</span></a>
</div>
<div style="padding:36px 28px;text-align:center">
<h1 style="font-size:22px;font-weight:500;color:#1b1b1b;margin:0 0 12px">${b.heading}</h1>
<p style="font-size:14px;color:#8a8a8a;line-height:1.7;margin:0 0 24px">${b.text}</p>
<a href="${confirmUrl}" style="display:inline-block;background:#1b1b1b;color:#fff;text-decoration:none;padding:13px 36px;border-radius:100px;font-size:14px;font-weight:500">${b.button}</a>
<div style="background:#f8f8f8;border:1px solid #D0D0D0;border-radius:12px;padding:16px 20px;margin:28px 0 0;text-align:${textAlign}">
<p style="font-size:12px;color:#999;line-height:1.7;margin:0">${b.privacyNote}</p>
</div>
<p style="font-size:11px;color:#bbb;margin:16px 0 0;line-height:1.6">${b.ignoreNote}</p>
</div>
<div style="padding:14px 28px;background:#f8f8f8;border-top:1px solid #D0D0D0;text-align:center">
<span style="font-size:11px;color:#999;margin-${marginDir}:8px;vertical-align:middle">${b.langLabel}</span>
${langLinks}
</div>
<div style="padding:20px 28px;border-top:1px solid #D0D0D0;text-align:center">
<p style="margin:0 0 2px"><a href="${BASE_URL}" style="text-decoration:none"><span style="font-size:12px;font-weight:700;color:#FF6B00">UVD</span> <span style="font-size:12px;font-weight:500;color:#1b1b1b">Trading</span></a></p>
<p style="margin:0 0 8px;font-size:9px;color:#ccc">Universe Dollar</p>
<p style="margin:0"><a href="${settingsUrl}" style="font-size:11px;color:#FF6B00;text-decoration:none">${b.settingsText}</a> <span style="font-size:11px;color:#ddd;margin:0 6px">·</span> <a href="${unsubUrl}" style="font-size:11px;color:#999;text-decoration:none">${b.unsubText}</a></p>
</div>
</div>
</body>
</html>`;

  return { subject, html, plainText, unsubUrl };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const body = await request.json();
    const { email, locale } = body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userLocale = locale || "en";
    const token = generateToken();
    const unsubToken = generateToken();

    const supabase = getSupabase();

    // Check if already confirmed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("confirmed, unsubscribe_token")
      .eq("email", cleanEmail)
      .single();

    if (existing?.confirmed) {
      return NextResponse.json({ success: true, already_confirmed: true });
    }

    // Upsert subscriber with unconfirmed status and new tokens
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: cleanEmail,
          locale: userLocale,
          confirm_token: token,
          unsubscribe_token: existing?.unsubscribe_token || unsubToken,
          confirmed: false,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Newsletter DB error:", dbError);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    const activeUnsubToken = existing?.unsubscribe_token || unsubToken;

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || "UVD Trading <news@mail.uvd.trading>";

    if (resendKey) {
      const resend = new Resend(resendKey);
      const confirmUrl = `${BASE_URL}/api/newsletter/confirm?token=${token}&locale=${userLocale}`;
      const { subject, html, plainText, unsubUrl } = getConfirmationEmail(userLocale, confirmUrl, token, activeUnsubToken);

      const { error: emailError } = await resend.emails.send({
        from: fromEmail,
        to: cleanEmail,
        subject,
        html,
        text: plainText,
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });

      if (emailError) {
        console.error("Resend error:", emailError);
        return NextResponse.json({ error: "email_error" }, { status: 500 });
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping confirmation email. Subscriber saved as unconfirmed.");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
