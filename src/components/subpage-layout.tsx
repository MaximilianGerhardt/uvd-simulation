"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

interface SubpageLayoutProps {
  children: React.ReactNode;
  backLabel?: string;
  backHref?: string;
}

export function SubpageLayout({ children, backLabel, backHref }: SubpageLayoutProps) {
  const t = useTranslations("subpage");
  const router = useRouter();
  const label = backLabel || t("backToOverview");

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 px-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={handleBack}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 px-4 py-2 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {label}
          </button>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
