import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletterUnsubscribed" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function NewsletterUnsubscribedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "newsletterUnsubscribed" });
  const isSuccess = status === "success";

  return (
    <SubpageLayout>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        {isSuccess ? (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1b1b1b]/5">
              <Check className="h-8 w-8 text-[#1b1b1b]/40" />
            </div>
            <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">
              {t("successTitle")}
            </h1>
            <p className="mb-6 text-base text-[#1b1b1b]/50">
              {t("successText")}
            </p>
            <p className="mb-10 text-sm text-[#1b1b1b]/30">
              {t("dataNote")}
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">
              {status === "invalid" ? t("invalidTitle") : t("errorTitle")}
            </h1>
            <p className="mb-10 text-base text-[#1b1b1b]/50">
              {status === "invalid" ? t("invalidText") : t("errorText")}
            </p>
          </>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333]"
        >
          {t("backHome")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SubpageLayout>
  );
}
