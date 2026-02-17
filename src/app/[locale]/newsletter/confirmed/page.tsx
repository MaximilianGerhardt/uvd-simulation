import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Check, AlertCircle, Share2, ArrowRight } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { Link } from "@/i18n/navigation";
import { ShareButtons } from "@/components/share-buttons";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletterConfirmed" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function NewsletterConfirmedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "newsletterConfirmed" });
  const isSuccess = status === "success" || status === "already";

  return (
    <SubpageLayout>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        {isSuccess ? (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4ade80]/10">
              <Check className="h-8 w-8 text-[#4ade80]" />
            </div>
            <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">
              {status === "already" ? t("alreadyTitle") : t("successTitle")}
            </h1>
            <p className="mb-10 text-base text-[#1b1b1b]/50">
              {status === "already" ? t("alreadyText") : t("successText")}
            </p>

            {/* Sharing is Caring */}
            <div className="mb-10 rounded-2xl border border-[#FF6B00]/15 bg-gradient-to-b from-[#FF6B00]/5 to-white p-6">
              <Share2 className="mx-auto mb-3 h-6 w-6 text-[#FF6B00]" />
              <h2 className="mb-2 text-lg font-medium text-[#1b1b1b]">
                {t("shareTitle")}
              </h2>
              <p className="mb-5 text-sm text-[#1b1b1b]/50">
                {t("shareText")}
              </p>
              <ShareButtons />
            </div>

            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333]"
            >
              {t("goToUpdates")}
              <ArrowRight className="h-4 w-4" />
            </Link>
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
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333]"
            >
              {t("goToUpdates")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}
      </div>
    </SubpageLayout>
  );
}
