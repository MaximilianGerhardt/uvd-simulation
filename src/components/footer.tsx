"use client";

import { ExternalLink } from "lucide-react";
import { reopenCookieConsent } from "@/components/cookie-consent";

export function Footer() {
  return (
    <footer className="border-t border-[#D0D0D0]/30 bg-[#1b1b1b] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-base font-semibold text-white">
                UVD Simulation
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              An independent companion and educational pitch deck exploring
              the economic model behind the Universe Dollar protocol.
            </p>
          </div>

          {/* Simulations */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              Simulations
            </h4>
            <div className="space-y-3">
              <a
                href="/simulation/time-theft"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                Time-Theft Calculator
              </a>
              <a
                href="/simulation/rtm"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                RTM Live Simulator
              </a>
              <a
                href="/simulation/basket"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                Sovereign Basket Index
              </a>
              <a
                href="/glossary"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                Glossary
              </a>
            </div>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              Official Resources
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
                Shortpaper (IPFS)
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreide3ntd3hitginvxhhkcjspa3xgu4mwcx3nxfocrrl4d4p3jxigoi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Whitepaper (IPFS)
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
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
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
                href="https://en.wikipedia.org/wiki/Cantillon_effect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Cantillon Effect
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <h4 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              Rechtliches
            </h4>
            <div className="space-y-3">
              <a
                href="/impressum"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                Datenschutzerklärung
              </a>
              <button
                onClick={() => reopenCookieConsent()}
                className="block text-sm text-white/50 hover:text-white transition-colors text-left"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
            Disclaimer
          </h5>
          <p className="text-xs leading-[1.8] text-white/25">
            This website is an <span className="text-white/40">independent educational companion and pitch deck</span> created
            in support of the Universe Dollar project. It is <span className="text-white/40">not the official
            website</span> of Universe Dollar — the official project is hosted at{" "}
            <a href="https://www.uvd.xyz" target="_blank" rel="noopener noreferrer" className="text-white/40 underline hover:text-white/60">uvd.xyz</a>.
            All content on this site represents the author&apos;s independent interpretation
            of publicly available research, including the Relative Theory of Money
            by Stéphane Laborde and publicly available economic data from the World Bank,
            ECB, and FRED. No content on this site constitutes financial advice,
            investment recommendation, or a solicitation of any kind. Simulation results
            are mathematical projections based on historical averages and do not
            guarantee future outcomes. The Universe Dollar protocol is under active
            development and subject to change. For authoritative information, refer
            exclusively to the official resources at{" "}
            <a href="https://www.uvd.xyz" target="_blank" rel="noopener noreferrer" className="text-white/40 underline hover:text-white/60">uvd.xyz</a> and
            the published whitepaper and shortpaper.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-white/20">
            Independent companion site &middot; Not financial advice &middot;{" "}
            <a href="/impressum" className="hover:text-white/40 transition-colors">Impressum</a>
            {" "}&middot;{" "}
            <a href="/datenschutz" className="hover:text-white/40 transition-colors">Datenschutz</a>
          </p>
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Prime Associates LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
