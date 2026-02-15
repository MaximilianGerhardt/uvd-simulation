"use client";

import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#D0D0D0]/30 bg-[#1b1b1b] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-base font-semibold text-white">
                Universe Dollar
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              A Bitcoin-secured, basket-indexed, fixed-supply stable currency.
              Symmetric money creation for every human.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/30">
              Resources
            </h4>
            <div className="space-y-3">
              <a
                href="https://www.uvd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                uvd.xyz
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreig5445hg6o5lgjjtq7ftprhdbrvbfmoekjopimibxazqv3xtwsqi4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Shortpaper
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreide3ntd3hitginvxhhkcjspa3xgu4mwcx3nxfocrrl4d4p3jxigoi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Whitepaper
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://x.com/uvd99"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                X / Twitter
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Theory */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/30">
              Foundation
            </h4>
            <div className="space-y-3">
              <a
                href="https://trm.creationmonetaire.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Relative Theory of Money
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="#rtm-model"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                RTM Simulator
              </a>
              <a
                href="#glossary"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Glossary of Truth
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row">
          <p className="text-xs text-white/25">
            This simulation terminal is an educational tool for economic
            research. All calculations are based on publicly available data and
            the RTM mathematical framework.
          </p>
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Universe Dollar
          </p>
        </div>
      </div>
    </footer>
  );
}
