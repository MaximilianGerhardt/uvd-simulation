import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uvd.trading";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@p-a.llc";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/*
 * ═══════════════════════════════════════════════════════════════════════
 * BROADCAST NEWSLETTER — Send to all confirmed subscribers or test-only
 * ═══════════════════════════════════════════════════════════════════════
 * POST /api/newsletter/broadcast
 * Body: { password, testOnly?: boolean }
 *
 * testOnly=true → sends ONLY to ADMIN_EMAIL (info@p-a.llc)
 * testOnly=false → sends to ALL confirmed subscribers
 * ═══════════════════════════════════════════════════════════════════════
 */

const font = "Inter,-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif";

function getEntropyNetworkEmail(locale: string, unsubscribeToken: string) {
  const articleUrl = `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/updates/entropy-network`;
  const unsubUrl = `${BASE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}&locale=${locale}`;

  const subjects: Record<string, string> = {
    de: "Entropy Network: Die Revolution des Settlements? Exklusive Whitepaper-Leaks",
    en: "Entropy Network: The Settlement Revolution? Exclusive Whitepaper Leaks",
    ar: "شبكة Entropy: ثورة التسوية؟ تسريبات حصرية من الورقة البيضاء",
    es: "Entropy Network: ¿La revolución del settlement? Filtraciones exclusivas",
    fr: "Entropy Network : La révolution du settlement ? Fuites exclusives du whitepaper",
  };

  const content: Record<string, {
    preheader: string;
    heading: string;
    intro: string;
    pillar1Title: string;
    pillar1Text: string;
    pillar2Title: string;
    pillar2Text: string;
    pillar3Title: string;
    pillar3Text: string;
    connectionHeading: string;
    connectionText: string;
    countdownHeading: string;
    countdownText: string;
    ctaButton: string;
    closing: string;
    unsubText: string;
    disclaimer: string;
    privacyNote: string;
  }> = {
    de: {
      preheader: "Erste exklusive Insights & Leaks aus dem Whitepaper v0.8.1 von Kiyan Sasan",
      heading: "Entropy Network: Die Revolution des Settlements?",
      intro: "In den letzten Tagen tauchten auf X und Instagram Screenshots eines Dokuments auf, das die Krypto-Welt erschüttern könnte: Das Whitepaper zum Entropy Network (v0.8.1) von Kiyan Sasan. Wir haben die Puzzleteile zusammengefügt.",
      pillar1Title: "Thermodynamisches Settlement",
      pillar1Text: "Volatilität als \"Entropie-Signal\" — Settlement als physikalische Konstante, nicht als politische Verhandlung.",
      pillar2Title: "Zero Governance",
      pillar2Text: "Keine Admin-Keys, keine Räte, keine Notfall-Knöpfe. Das Protokoll ist bei Genesis fixiert.",
      pillar3Title: "Proof of Infinity",
      pillar3Text: "Ein neuer Konsensmechanismus — so leichtgewichtig, dass er auf Smartphone-Hardware läuft.",
      connectionHeading: "Die Verbindung zu UVD",
      connectionText: "Das Entropy Network positioniert sich als Base Layer für Universe Dollar — eine Bitcoin-besicherte, korb-indizierte Währung mit weniger Volatilität als BTC.",
      countdownHeading: "Der Countdown läuft",
      countdownText: "In Insider-Stories ist ein Countdown aufgetaucht: Genesis Calibration bei 08:08:08 und \"End of US Dollar Hegemony\" bei 06:06:00.",
      ctaButton: "Vollständige Analyse lesen",
      closing: "Bleib am Ball — die Entwicklungen bewegen sich mit Lichtgeschwindigkeit.",
      unsubText: "Abmelden",
      disclaimer: "Hinweis: uvd.trading ist ein unabhängiges Recherche- und Analyseprojekt und steht in keiner Verbindung zum Entropy Network oder dem UVD-Projekt. Die dargestellten Inhalte basieren auf öffentlich verfügbaren Informationen und können spekulativen Charakter haben. Diese E-Mail stellt keine Finanzberatung oder Anlageempfehlung dar.",
      privacyNote: "Du erhältst diese E-Mail, weil du dich auf uvd.trading für Updates angemeldet hast. Deine Daten werden gemäß DSGVO verarbeitet.",
    },
    en: {
      preheader: "First exclusive insights & leaks from Kiyan Sasan's Whitepaper v0.8.1",
      heading: "Entropy Network: The Settlement Revolution?",
      intro: "In recent days, screenshots of a document that could shake the crypto world to its core surfaced on X and Instagram: The Entropy Network Whitepaper (v0.8.1) by Kiyan Sasan. We've pieced the puzzle together.",
      pillar1Title: "Thermodynamic Settlement",
      pillar1Text: "Volatility as an \"entropy signal\" — settlement as a physical constant, not a political negotiation.",
      pillar2Title: "Zero Governance",
      pillar2Text: "No admin keys, no councils, no emergency buttons. The protocol is fixed at genesis.",
      pillar3Title: "Proof of Infinity",
      pillar3Text: "A new consensus mechanism — so lightweight it runs on smartphone-class hardware.",
      connectionHeading: "The UVD Connection",
      connectionText: "The Entropy Network positions itself as the base layer for Universe Dollar — a Bitcoin-secured, basket-indexed currency with less volatility than BTC.",
      countdownHeading: "The Countdown Is Running",
      countdownText: "A countdown appeared in insider stories: Genesis Calibration at 08:08:08 and \"End of US Dollar Hegemony\" at 06:06:00.",
      ctaButton: "Read the Full Analysis",
      closing: "Stay tuned — developments are moving at the speed of light.",
      unsubText: "Unsubscribe",
      disclaimer: "Disclaimer: uvd.trading is an independent research and analysis project with no affiliation to the Entropy Network or the UVD project. The content presented is based on publicly available information and may be speculative in nature. This email does not constitute financial advice or an investment recommendation.",
      privacyNote: "You're receiving this email because you signed up for updates on uvd.trading. Your data is processed in accordance with GDPR.",
    },
    ar: {
      preheader: "أولى الرؤى الحصرية والتسريبات من الورقة البيضاء v0.8.1 لكيان ساسان",
      heading: "شبكة Entropy: ثورة التسوية؟",
      intro: "في الأيام الأخيرة، ظهرت على X وإنستغرام لقطات شاشة لوثيقة قد تهز عالم العملات المشفرة: الورقة البيضاء لشبكة Entropy (v0.8.1) بقلم كيان ساسان. جمعنا قطع الأحجية.",
      pillar1Title: "التسوية الديناميكية الحرارية",
      pillar1Text: "التقلب كـ \"إشارة إنتروبيا\" — التسوية كثابت فيزيائي، وليس تفاوضاً سياسياً.",
      pillar2Title: "صفر حوكمة",
      pillar2Text: "لا مفاتيح مسؤول، لا مجالس، لا أزرار طوارئ. البروتوكول ثابت عند البداية.",
      pillar3Title: "إثبات اللانهاية",
      pillar3Text: "آلية إجماع جديدة — خفيفة جداً بحيث تعمل على أجهزة الهاتف الذكي.",
      connectionHeading: "العلاقة بـ UVD",
      connectionText: "شبكة Entropy تضع نفسها كطبقة أساسية لـ Universe Dollar — عملة مدعومة بالبيتكوين ومفهرسة بسلة بتقلب أقل من BTC.",
      countdownHeading: "العد التنازلي يعمل",
      countdownText: "ظهر عد تنازلي في قصص المطلعين: معايرة البداية عند 08:08:08 و\"نهاية هيمنة الدولار\" عند 06:06:00.",
      ctaButton: "اقرأ التحليل الكامل",
      closing: "ابقَ على اطلاع — التطورات تتحرك بسرعة الضوء.",
      unsubText: "إلغاء الاشتراك",
      disclaimer: "تنويه: uvd.trading هو مشروع بحث وتحليل مستقل ولا يرتبط بشبكة Entropy أو مشروع UVD. المحتوى المعروض يستند إلى معلومات متاحة للعموم وقد يكون ذا طبيعة تخمينية. هذه الرسالة لا تشكل نصيحة مالية أو توصية استثمارية.",
      privacyNote: "تتلقى هذه الرسالة لأنك سجلت للتحديثات على uvd.trading. تتم معالجة بياناتك وفقاً للائحة حماية البيانات العامة.",
    },
    es: {
      preheader: "Primeras revelaciones exclusivas del Whitepaper v0.8.1 de Kiyan Sasan",
      heading: "Entropy Network: ¿La revolución del settlement?",
      intro: "En los últimos días aparecieron en X e Instagram capturas de pantalla de un documento que podría sacudir el mundo cripto: El Whitepaper de Entropy Network (v0.8.1) de Kiyan Sasan. Hemos unido las piezas del rompecabezas.",
      pillar1Title: "Settlement termodinámico",
      pillar1Text: "La volatilidad como \"señal de entropía\" — settlement como constante física, no como negociación política.",
      pillar2Title: "Zero Governance",
      pillar2Text: "Sin admin keys, sin consejos, sin botones de emergencia. El protocolo está fijado en génesis.",
      pillar3Title: "Proof of Infinity",
      pillar3Text: "Un nuevo mecanismo de consenso — tan ligero que funciona en hardware de clase smartphone.",
      connectionHeading: "La conexión con UVD",
      connectionText: "Entropy Network se posiciona como la capa base para Universe Dollar — una moneda respaldada por Bitcoin e indexada a canasta con menos volatilidad que BTC.",
      countdownHeading: "La cuenta regresiva está en marcha",
      countdownText: "Una cuenta regresiva apareció en stories de insiders: Genesis Calibration a las 08:08:08 y \"Fin de la hegemonía del dólar\" a las 06:06:00.",
      ctaButton: "Leer el análisis completo",
      closing: "¡Mantente atento — los desarrollos se mueven a la velocidad de la luz!",
      unsubText: "Cancelar suscripción",
      disclaimer: "Aviso: uvd.trading es un proyecto independiente de investigación y análisis sin afiliación al Entropy Network ni al proyecto UVD. El contenido presentado se basa en información disponible públicamente y puede tener carácter especulativo. Este correo no constituye asesoramiento financiero ni recomendación de inversión.",
      privacyNote: "Recibes este correo porque te suscribiste a las actualizaciones en uvd.trading. Tus datos se procesan conforme al RGPD.",
    },
    fr: {
      preheader: "Premières révélations exclusives du Whitepaper v0.8.1 de Kiyan Sasan",
      heading: "Entropy Network : La révolution du settlement ?",
      intro: "Ces derniers jours, des captures d'écran d'un document susceptible d'ébranler le monde crypto sont apparues sur X et Instagram : Le Whitepaper d'Entropy Network (v0.8.1) de Kiyan Sasan. Nous avons assemblé les pièces du puzzle.",
      pillar1Title: "Settlement thermodynamique",
      pillar1Text: "La volatilité comme \"signal d'entropie\" — le settlement comme constante physique, pas comme négociation politique.",
      pillar2Title: "Zero Governance",
      pillar2Text: "Pas de clés admin, pas de conseils, pas de boutons d'urgence. Le protocole est fixé à la genèse.",
      pillar3Title: "Proof of Infinity",
      pillar3Text: "Un nouveau mécanisme de consensus — si léger qu'il fonctionne sur du matériel de classe smartphone.",
      connectionHeading: "La connexion avec UVD",
      connectionText: "Entropy Network se positionne comme la couche de base pour Universe Dollar — une monnaie adossée au Bitcoin et indexée sur un panier avec moins de volatilité que le BTC.",
      countdownHeading: "Le compte à rebours tourne",
      countdownText: "Un compte à rebours est apparu dans les stories d'initiés : Genesis Calibration à 08:08:08 et \"Fin de l'hégémonie du dollar\" à 06:06:00.",
      ctaButton: "Lire l'analyse complète",
      closing: "Restez à l'écoute — les développements avancent à la vitesse de la lumière.",
      unsubText: "Se désabonner",
      disclaimer: "Avertissement : uvd.trading est un projet indépendant de recherche et d'analyse sans aucune affiliation avec Entropy Network ou le projet UVD. Le contenu présenté repose sur des informations accessibles publiquement et peut être de nature spéculative. Cet email ne constitue pas un conseil financier ni une recommandation d'investissement.",
      privacyNote: "Vous recevez cet email car vous vous êtes inscrit aux mises à jour sur uvd.trading. Vos données sont traitées conformément au RGPD.",
    },
  };

  const subject = subjects[locale] || subjects.de;
  const c = content[locale] || content.de;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const plainText = [
    c.heading,
    c.intro,
    `${c.pillar1Title}: ${c.pillar1Text}`,
    `${c.pillar2Title}: ${c.pillar2Text}`,
    `${c.pillar3Title}: ${c.pillar3Text}`,
    `${c.connectionHeading}: ${c.connectionText}`,
    `${c.countdownHeading}: ${c.countdownText}`,
    `${c.ctaButton}: ${articleUrl}`,
    c.closing,
    c.disclaimer,
    `${c.unsubText}: ${unsubUrl}`,
    c.privacyNote,
  ].join("\n\n");

  const html = `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f8f8;font-family:${font}">
<!--[if mso]><style>table,td{font-family:Arial,sans-serif!important}</style><![endif]-->
<span style="display:none;font-size:1px;color:#f8f8f8;max-height:0;overflow:hidden">${c.preheader}</span>
<div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D0D0D0">

<!-- Header -->
<div style="padding:20px 28px;border-bottom:1px solid #D0D0D0;text-align:center">
<a href="${BASE_URL}" style="text-decoration:none"><span style="font-size:16px;font-weight:700;color:#FF6B00">UVD</span> <span style="font-size:16px;font-weight:500;color:#1b1b1b">Trading</span></a>
</div>

<!-- Hero -->
<div style="padding:32px 28px 0;text-align:center">
<div style="display:inline-block;background:#FF6B00;color:#fff;padding:4px 14px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:16px">Breaking</div>
<h1 style="font-size:22px;font-weight:500;color:#1b1b1b;margin:16px 0 12px;line-height:1.3">${c.heading}</h1>
<p style="font-size:14px;color:#8a8a8a;line-height:1.7;margin:0 0 24px">${c.intro}</p>
</div>

<!-- Three Pillars -->
<div style="padding:0 28px 24px">
<div style="background:#f8f8f8;border:1px solid #D0D0D0;border-radius:12px;padding:20px;margin-bottom:12px">
<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#FF6B00;margin-bottom:6px">01</div>
<div style="font-size:14px;font-weight:600;color:#1b1b1b;margin-bottom:4px">${c.pillar1Title}</div>
<div style="font-size:13px;color:#8a8a8a;line-height:1.6">${c.pillar1Text}</div>
</div>
<div style="background:#f8f8f8;border:1px solid #D0D0D0;border-radius:12px;padding:20px;margin-bottom:12px">
<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#297FF3;margin-bottom:6px">02</div>
<div style="font-size:14px;font-weight:600;color:#1b1b1b;margin-bottom:4px">${c.pillar2Title}</div>
<div style="font-size:13px;color:#8a8a8a;line-height:1.6">${c.pillar2Text}</div>
</div>
<div style="background:#f8f8f8;border:1px solid #D0D0D0;border-radius:12px;padding:20px">
<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:6px">03</div>
<div style="font-size:14px;font-weight:600;color:#1b1b1b;margin-bottom:4px">${c.pillar3Title}</div>
<div style="font-size:13px;color:#8a8a8a;line-height:1.6">${c.pillar3Text}</div>
</div>
</div>

<!-- UVD Connection -->
<div style="padding:0 28px 24px">
<div style="background:#FF6B00;background:linear-gradient(135deg,#FF6B00 0%,#ff8533 100%);border-radius:12px;padding:20px;color:#fff">
<div style="font-size:14px;font-weight:600;margin-bottom:6px">${c.connectionHeading}</div>
<div style="font-size:13px;line-height:1.6;opacity:0.9">${c.connectionText}</div>
</div>
</div>

<!-- Countdown -->
<div style="padding:0 28px 24px">
<div style="background:#1b1b1b;border-radius:12px;padding:20px;text-align:center">
<div style="font-size:13px;font-weight:500;color:#fff;opacity:0.6;margin-bottom:10px">${c.countdownHeading}</div>
<div style="display:inline-block;background:rgba(255,255,255,0.08);border-radius:8px;padding:8px 16px;margin:0 4px">
<div style="font-size:18px;font-weight:300;color:#4ade80;font-family:monospace">08:08:08</div>
<div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px">Genesis</div>
</div>
<div style="display:inline-block;background:rgba(255,255,255,0.08);border-radius:8px;padding:8px 16px;margin:0 4px">
<div style="font-size:18px;font-weight:300;color:#FF6B00;font-family:monospace">06:06:00</div>
<div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:2px">Hegemony</div>
</div>
<div style="font-size:11px;color:rgba(255,255,255,0.25);margin-top:12px;line-height:1.5;font-style:italic">${c.countdownText}</div>
</div>
</div>

<!-- CTA -->
<div style="padding:0 28px 32px;text-align:center">
<a href="${articleUrl}" style="display:inline-block;background:#1b1b1b;color:#fff;text-decoration:none;padding:14px 40px;border-radius:100px;font-size:14px;font-weight:500">${c.ctaButton}</a>
<p style="font-size:12px;color:#bbb;margin:16px 0 0;line-height:1.6">${c.closing}</p>
</div>

<!-- Disclaimer -->
<div style="padding:16px 28px;background:#f8f8f8;border-top:1px solid #D0D0D0">
<p style="font-size:10px;color:#bbb;line-height:1.6;margin:0;text-align:center">${c.disclaimer}</p>
</div>

<!-- GDPR / Privacy Footer -->
<div style="padding:12px 28px;background:#f8f8f8;border-top:1px solid #e8e8e8">
<p style="font-size:11px;color:#999;line-height:1.6;margin:0;text-align:center">${c.privacyNote}</p>
</div>

<!-- Footer -->
<div style="padding:20px 28px;border-top:1px solid #D0D0D0;text-align:center">
<p style="margin:0 0 2px"><a href="${BASE_URL}" style="text-decoration:none"><span style="font-size:12px;font-weight:700;color:#FF6B00">UVD</span> <span style="font-size:12px;font-weight:500;color:#1b1b1b">Trading</span></a></p>
<p style="margin:0 0 8px;font-size:9px;color:#ccc">Universe Dollar</p>
<p style="margin:0"><a href="${unsubUrl}" style="font-size:11px;color:#999;text-decoration:none">${c.unsubText}</a></p>
</div>

</div>
</body>
</html>`;

  return { subject, html, plainText, unsubUrl };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, testOnly } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || "UVD Trading <news@mail.uvd.trading>";

    if (!resendKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const resend = new Resend(resendKey);

    if (testOnly) {
      // Send test email only to admin
      const { subject, html, plainText, unsubUrl } = getEntropyNetworkEmail("de", "test-token");

      const { error: emailError } = await resend.emails.send({
        from: fromEmail,
        to: ADMIN_EMAIL,
        subject: `[TEST] ${subject}`,
        html,
        text: plainText,
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });

      if (emailError) {
        console.error("Test email error:", emailError);
        return NextResponse.json({ error: "email_error", details: emailError }, { status: 500 });
      }

      return NextResponse.json({ success: true, sent: 1, testOnly: true, recipient: ADMIN_EMAIL });
    }

    // Production: Send to all confirmed subscribers
    const supabase = getSupabase();
    const { data: subscribers, error: dbError } = await supabase
      .from("newsletter_subscribers")
      .select("email, locale, unsubscribe_token")
      .eq("confirmed", true)
      .is("unsubscribed_at", null);

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: "No confirmed subscribers" });
    }

    let sent = 0;
    let errors = 0;

    for (const sub of subscribers) {
      const locale = sub.locale || "de";
      const { subject, html, plainText, unsubUrl } = getEntropyNetworkEmail(locale, sub.unsubscribe_token);

      let success = false;
      for (let attempt = 0; attempt < 3 && !success; attempt++) {
        if (attempt > 0) {
          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        }
        try {
          const { error: emailError } = await resend.emails.send({
            from: fromEmail,
            to: sub.email,
            subject,
            html,
            text: plainText,
            headers: {
              "List-Unsubscribe": `<${unsubUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          });

          if (emailError) {
            console.error(`Error sending to ${sub.email} (attempt ${attempt + 1}):`, emailError);
            if (attempt === 2) errors++;
          } else {
            sent++;
            success = true;
          }
        } catch (err) {
          console.error(`Exception sending to ${sub.email} (attempt ${attempt + 1}):`, err);
          if (attempt === 2) errors++;
        }
      }

      // Rate limit: 600ms between sends (Resend allows max 2/sec)
      if (subscribers.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    return NextResponse.json({ success: true, sent, errors, total: subscribers.length });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
