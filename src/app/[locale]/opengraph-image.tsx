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
    en: "Interactive Simulation Terminal for Universe Dollar",
    de: "Interaktives Simulationsterminal für Universe Dollar",
    ar: "محطة محاكاة تفاعلية لـ Universe Dollar",
    es: "Terminal de Simulación Interactiva para Universe Dollar",
    fr: "Terminal de Simulation Interactif pour Universe Dollar",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1b1b1b",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #FF6B00, #297FF3, #4ade80)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#FF6B00",
            marginBottom: 32,
            fontSize: 44,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          U
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            marginBottom: 16,
            display: "flex",
          }}
        >
          UVD{" "}
          <span style={{ color: "#FF6B00", marginLeft: 16 }}>Simulation</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 700,
            textAlign: "center",
            display: "flex",
          }}
        >
          {subtitles[locale] || subtitles.en}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 16,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span>uvd.trading</span>
          <span>•</span>
          <span>Open Source</span>
          <span>•</span>
          <span>Data-Driven</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
