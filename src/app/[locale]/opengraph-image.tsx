import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "UVD Simulation — Interactive Companion to Universe Dollar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const subtitles: Record<string, string> = {
    en: "Inflation Calculator · RTM Simulator · Sovereign Basket",
    de: "Inflationsrechner · RTM-Simulator · Souveräner Warenkorb",
    ar: "حاسبة التضخم · محاكي RTM · السلة السيادية",
    es: "Calculadora de Inflación · Simulador RTM · Canasta Soberana",
    fr: "Calculateur d'Inflation · Simulateur RTM · Panier Souverain",
  };

  const ctas: Record<string, string> = {
    en: "Try the Simulation →",
    de: "Simulation starten →",
    ar: "← جرّب المحاكاة",
    es: "Probar la Simulación →",
    fr: "Essayer la Simulation →",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #FF6B00, #297FF3, #4ade80)",
          }}
        />

        {/* Main content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 80,
            paddingRight: 80,
            flex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1.5px solid #D0D0D0",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 28,
              fontSize: 14,
              color: "rgba(27,27,27,0.5)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#4ade80",
                display: "flex",
              }}
            />
            uvd.trading — Open Source
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              color: "#1b1b1b",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 20,
              display: "flex",
            }}
          >
            UVD
            <span style={{ color: "#FF6B00", marginLeft: 18 }}>
              Simulation
            </span>
          </div>

          {/* Subtitle — tool list */}
          <div
            style={{
              fontSize: 22,
              color: "rgba(27,27,27,0.45)",
              marginBottom: 36,
              display: "flex",
            }}
          >
            {subtitles[locale] || subtitles.en}
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1b1b1b",
              color: "#ffffff",
              borderRadius: 999,
              padding: "14px 32px",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {ctas[locale] || ctas.en}
          </div>
        </div>

        {/* Right side — mini preview cards (simulating the site) */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 60,
            bottom: 60,
            width: 380,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Card 1 — Inflation chart mock */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              borderRadius: 20,
              border: "1.5px solid rgba(208,208,208,0.5)",
              backgroundColor: "#f8f8f8",
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                color: "rgba(27,27,27,0.3)",
                marginBottom: 12,
                display: "flex",
              }}
            >
              Purchasing Power Decay
            </div>
            {/* Chart bars */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                flex: 1,
              }}
            >
              {[100, 92, 83, 75, 68, 60, 53, 47, 41, 36, 31].map(
                (h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: 4,
                      backgroundColor:
                        i < 3
                          ? "#FF6B00"
                          : i < 7
                            ? "rgba(255,107,0,0.5)"
                            : "rgba(255,107,0,0.25)",
                      display: "flex",
                    }}
                  />
                )
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 10,
                color: "rgba(27,27,27,0.25)",
              }}
            >
              <span>2000</span>
              <span style={{ color: "#FF6B00", fontWeight: 600 }}>
                -69%
              </span>
              <span>2025</span>
            </div>
          </div>

          {/* Card 2 — RTM mini */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 20,
              border: "1.5px solid rgba(208,208,208,0.5)",
              backgroundColor: "#f8f8f8",
              padding: 24,
              height: 140,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                color: "rgba(27,27,27,0.3)",
                marginBottom: 12,
                display: "flex",
              }}
            >
              Universal Dividend
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 300,
                  color: "#297FF3",
                  display: "flex",
                }}
              >
                +10%
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(27,27,27,0.35)",
                  display: "flex",
                }}
              >
                /year per member
              </div>
            </div>
          </div>
        </div>

        {/* Bottom domain bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 44,
            backgroundColor: "#f8f8f8",
            borderTop: "1px solid rgba(208,208,208,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 80,
            paddingRight: 80,
            fontSize: 13,
            color: "rgba(27,27,27,0.3)",
          }}
        >
          <span>uvd.trading</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Open Source</span>
            <span>·</span>
            <span>Data-Driven</span>
            <span>·</span>
            <span>No Financial Advice</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
