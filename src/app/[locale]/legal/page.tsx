import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb } from "@/components/structured-data";

const BASE_URL = "https://www.uvd.trading";

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
      siteName: "UVD Trading",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/legal`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("legal.title"),
      description: t("legal.description"),
      images: [`${BASE_URL}/${locale}/og/legal`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LegalNotice({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalPage" });

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: t("title"), path: "/legal" }]} />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            {t("title")}
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              {t("companyTitle")}
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">{t("companyName")}</p>
              <p>{t("companyAddress1")}</p>
              <p>{t("companyAddress2")}</p>
              <p>{t("companyCountry")}</p>
            </div>
            <p className="mt-2 text-base leading-[1.8] text-[#1b1b1b]/60">
              <span className="text-[#1b1b1b]">{t("contactLabel")}</span>{" "}
              <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                info@p-a.llc
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              {t("aboutTitle")}
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("aboutText", {
                hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span>,
                github: (chunks) => (
                  <a
                    href="https://github.com/MaximilianGerhardt/uvd-simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#297FF3] hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              {t("disclaimerTitle")}
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("disclaimerText", {
                hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span>,
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              {t("ipTitle")}
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t("ipText")}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              {t("linksTitle")}
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t("linksText")}
            </p>
            <p className="mt-8 text-sm text-[#1b1b1b]/30">
              {t("lastUpdated")}
            </p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
