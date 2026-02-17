import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Home, Activity } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4 font-mono text-6xl font-light text-[#FF6B00]">404</p>
        <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.04em] text-[#1b1b1b]">
          {t("heading")}
        </h1>
        <p className="mb-10 text-base leading-relaxed text-[#1b1b1b]/45">
          {t("description")}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
          >
            <Home className="h-4 w-4" />
            {t("backHome")}
          </Link>
          <Link
            href="/simulation/time-theft"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            <Activity className="h-4 w-4" />
            {t("explore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
