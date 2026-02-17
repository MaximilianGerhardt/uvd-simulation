import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Newspaper, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "updates" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function UpdatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "updates" });

  return (
    <SubpageLayout backHref="/">
      <PageBreadcrumb items={[{ name: "Updates", path: "/updates" }]} />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <ScrollReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
              <Newspaper className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
              <span className="text-xs font-medium text-[#1b1b1b]/50">
                {t("badge")}
              </span>
            </div>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              {t("title")}
              <span className="text-[#FF6B00]">{t("titleHighlight")}</span>
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Updates Feed */}
          <div className="space-y-6">
            {/* Entry: UWD/UDRP Reveal */}
            <ScrollReveal>
              <Link
                href="/updates/uwd-reveal"
                className="group block rounded-2xl border border-[#D0D0D0]/50 bg-white p-6 sm:p-8 transition-all hover:border-[#D0D0D0] hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6B00]/10 px-3 py-1 text-xs font-medium text-[#FF6B00]">
                    <Clock className="h-3 w-3" />
                    {t("entry1Date")}
                  </span>
                  <span className="rounded-full bg-[#FF6B00] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {t("entry1Tag")}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                  {t("entry1Title")}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-[#1b1b1b]/50">
                  {t("entry1Excerpt")}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FF6B00]">
                  {t("readMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Newsletter Signup */}
          <ScrollReveal>
            <div className="mt-12">
              <NewsletterSignup />
            </div>
          </ScrollReveal>

          {/* External Resources */}
          <ScrollReveal>
            <div className="mt-16 rounded-2xl bg-[#f8f8f8] p-8">
              <h2 className="mb-4 text-lg font-medium text-[#1b1b1b]">
                {t("externalTitle")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://www.uvd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[#D0D0D0]/50 bg-white p-4 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                >
                  uvd.xyz
                  <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0" />
                </a>
                <a
                  href="https://uwd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[#D0D0D0]/50 bg-white p-4 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                >
                  uwd.xyz — United World Dynamics
                  <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0" />
                </a>
                <a
                  href="https://uwd.xyz/udrp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[#D0D0D0]/50 bg-white p-4 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                >
                  UDRP — Digital Reserve Protocol
                  <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0" />
                </a>
                <a
                  href="https://x.com/uvd99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[#D0D0D0]/50 bg-white p-4 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                >
                  X / Twitter — @uvd99
                  <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Legal Note */}
          <ScrollReveal>
            <div className="mt-10 border-t border-[#D0D0D0]/30 pt-8">
              <p className="text-xs leading-relaxed text-[#1b1b1b]/25">
                {t("legalNote")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SubpageLayout>
  );
}
