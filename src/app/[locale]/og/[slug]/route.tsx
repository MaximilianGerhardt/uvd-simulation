import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

const PAGE_TITLES: Record<string, { title: string; subtitle: string; color: string }> = {
  "time-theft": {
    title: "Time-Theft Calculator",
    subtitle: "How much purchasing power have you lost to inflation?",
    color: "#FF6B00",
  },
  rtm: {
    title: "RTM Simulator",
    subtitle: "Relative Theory of Money \u2014 Symmetric Money Creation",
    color: "#297FF3",
  },
  basket: {
    title: "Sovereign Basket",
    subtitle: "Fiat vs UVD purchasing power comparison",
    color: "#4ade80",
  },
  glossary: {
    title: "Glossary",
    subtitle: "Key monetary theory concepts explained",
    color: "#FF6B00",
  },
  faq: {
    title: "FAQ",
    subtitle: "Frequently asked questions about Universe Dollar",
    color: "#FF6B00",
  },
  "about-uvd": {
    title: "About UVD",
    subtitle: "What is Universe Dollar and how does it work?",
    color: "#297FF3",
  },
  community: {
    title: "Community",
    subtitle: "Open discussion about Universe Dollar",
    color: "#FF6B00",
  },
  "methodology-time-theft": {
    title: "Methodology",
    subtitle: "Time-Theft Calculator \u2014 Formula & Data Sources",
    color: "#FF6B00",
  },
  "methodology-rtm": {
    title: "Methodology",
    subtitle: "RTM Simulator \u2014 Formula & Data Sources",
    color: "#297FF3",
  },
  "methodology-basket": {
    title: "Methodology",
    subtitle: "Sovereign Basket Index \u2014 Formula & Data Sources",
    color: "#4ade80",
  },
};

export function generateStaticParams() {
  const slugs = Object.keys(PAGE_TITLES);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> }
) {
  const { slug } = await params;
  const page = PAGE_TITLES[slug] ?? {
    title: "UVD Simulation",
    subtitle: "Interactive companion to Universe Dollar",
    color: "#FF6B00",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: page.color,
            }}
          />
          <span
            style={{
              fontSize: "24px",
              color: "#1b1b1b",
              opacity: 0.4,
              fontWeight: 400,
            }}
          >
            UVD Simulation
          </span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 300,
            color: "#1b1b1b",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          {page.title}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#1b1b1b",
            opacity: 0.45,
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {page.subtitle}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            gap: "8px",
            fontSize: "18px",
            color: "#1b1b1b",
            opacity: 0.25,
          }}
        >
          uvd.trading
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "8px",
            height: "100%",
            background: page.color,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
