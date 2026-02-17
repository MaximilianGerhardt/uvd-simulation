"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4 font-mono text-6xl font-light text-[#FF6B00]">500</p>
        <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.04em] text-[#1b1b1b]">
          Something went wrong.
        </h1>
        <p className="mb-10 text-base leading-relaxed text-[#1b1b1b]/45">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
