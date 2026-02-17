"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Twitter, Copy, Check, Send, Share2 } from "lucide-react";

const SHARE_URL = "https://www.uvd.trading";

export function ShareButtons() {
  const t = useTranslations("newsletterConfirmed");
  const [copied, setCopied] = useState(false);

  const shareText = t("shareMessage");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = SHARE_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHARE_URL)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + SHARE_URL)}`;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b]/70 transition-all hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2]"
      >
        <Twitter className="h-4 w-4" />
        Twitter / X
      </a>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b]/70 transition-all hover:border-[#0088cc]/30 hover:text-[#0088cc]"
      >
        <Send className="h-4 w-4" />
        Telegram
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b]/70 transition-all hover:border-[#25D366]/30 hover:text-[#25D366]"
      >
        <Share2 className="h-4 w-4" />
        WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b]/70 transition-all hover:border-[#FF6B00]/30 hover:text-[#FF6B00]"
      >
        {copied ? <Check className="h-4 w-4 text-[#4ade80]" /> : <Copy className="h-4 w-4" />}
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  );
}
