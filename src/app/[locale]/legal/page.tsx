import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/legal`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/legal`;
  }
  return {
    title: t("legal.title"),
    description: t("legal.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("legal.title"),
      description: t("legal.description"),
      url,
      siteName: "UVD Simulation",
      type: "website",
      images: [{ url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("legal.title"),
      description: t("legal.description"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

export default function LegalNotice() {
  return (
    <SubpageLayout>
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            Legal Notice
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Company Information
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220</p>
              <p>Estero, FL 33928</p>
              <p>United States</p>
            </div>
            <p className="mt-2 text-base leading-[1.8] text-[#1b1b1b]/60">
              <span className="text-[#1b1b1b]">Contact:</span>{" "}
              <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                info@p-a.llc
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              About This Site
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              UVD Simulation is an <span className="text-[#1b1b1b]">independent, non-commercial, open-source educational project</span>.
              It is not affiliated with, endorsed by, or officially connected to the Universe Dollar (UVD)
              project or its creators. This site provides interactive visualizations based on publicly
              available economic theory. The source code is available on{" "}
              <a
                href="https://github.com/MaximilianGerhardt/uvd-simulation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#297FF3] hover:underline"
              >
                GitHub
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Disclaimer
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              All content is for <span className="text-[#1b1b1b]">educational and informational purposes only</span> and
              does not constitute financial, investment, or professional advice. Simulations are
              theoretical models — they do not predict future outcomes. This website and its content
              are provided &ldquo;as is&rdquo; without warranties of any kind. Use at your own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Intellectual Property
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              &ldquo;Universe Dollar,&rdquo; &ldquo;UVD,&rdquo; and associated trademarks belong to their respective
              owners. This site uses these terms solely for educational reference.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              External Links
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This site links to external resources. We assume no responsibility for third-party content.
            </p>
            <p className="mt-8 text-sm text-[#1b1b1b]/30">
              Last updated: February 2026
            </p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
