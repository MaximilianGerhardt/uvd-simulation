"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

interface SubpageLayoutProps {
  children: React.ReactNode;
  backLabel?: string;
}

export function SubpageLayout({ children, backLabel = "Back to Overview" }: SubpageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 px-4 py-2 text-sm text-[#1b1b1b]/50 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
