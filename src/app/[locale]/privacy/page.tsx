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
  const url = `${BASE_URL}${prefix}/privacy`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/privacy`;
  }
  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("privacy.title"),
      description: t("privacy.description"),
      url,
      siteName: "UVD Simulation",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/privacy`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("privacy.title"),
      description: t("privacy.description"),
      images: [`${BASE_URL}/${locale}/og/privacy`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: t("title"), path: "/privacy" }]} />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            {t("title")}
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("whoTitle")}</h2>
            <div className="text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">{t("whoName")}</p>
              <p>{t("whoAddress")}</p>
              <p className="mt-2">
                <span className="text-[#1b1b1b]">{t("contactLabel")}</span>{" "}
                <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">info@p-a.llc</a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("overviewTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("overviewText", {
                hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span>,
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("hostingTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("hostingText", {
                hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span>,
              })}
            </p>
            <ul className="mt-3 ms-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              {(t.raw("hostingLogs") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("hostingNote", {
                link: (chunks) => (
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("cookiesTitle")}</h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("cookiesText", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}
            </p>
            <ul className="ms-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li>{t.rich("cookieNecessary", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
              <li>{t.rich("cookiePreferences", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
              <li>{t.rich("cookieStatistics", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              {t("cookiesNote")}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("externalTitle")}</h2>
            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">{t("fontsTitle")}</h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("fontsText", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}
            </p>
            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">{t("ipfsTitle")}</h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("ipfsText", {
                link: (chunks) => (
                  <a href="https://www.pinata.cloud/privacy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("analyticsTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("analyticsText", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("localTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("localText", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("rightsTitle")}</h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">{t("rightsIntro")}</p>
            <ul className="ms-6 list-disc space-y-2 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li>{t.rich("rightAccess", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
              <li>{t.rich("rightDeletion", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
              <li>{t.rich("rightOptOut", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
              <li>{t.rich("rightNonDiscrimination", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}</li>
            </ul>
            <p className="mt-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              {t.rich("ccpaText", { hl: (chunks) => <span className="text-[#1b1b1b]">{chunks}</span> })}
            </p>
            <p className="mt-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              {t("rightsContact")}{" "}
              <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">info@p-a.llc</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("securityTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">{t("securityText")}</p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("childrenTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">{t("childrenText")}</p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">{t("changesTitle")}</h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">{t("changesText")}</p>
            <p className="mt-6 text-sm text-[#1b1b1b]/30">{t("lastUpdated")}</p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
