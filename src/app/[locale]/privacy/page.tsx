import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/privacy`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/privacy`;
  }
  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("privacy.title"),
      description: t("privacy.description"),
      url,
      siteName: "UVD Simulation",
      type: "website",
      images: [{ url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("privacy.title"),
      description: t("privacy.description"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

export default function PrivacyPolicy() {
  return (
    <SubpageLayout>
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            Privacy Policy
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              1. Who We Are
            </h2>
            <div className="text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220, Estero, FL 33928, United States</p>
              <p className="mt-2">
                <span className="text-[#1b1b1b]">Contact:</span>{" "}
                <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">info@p-a.llc</a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              2. Overview
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website is a non-commercial educational project. We collect as little
              personal data as possible. There is <span className="text-[#1b1b1b]">no user registration, no login,
              no forms</span>, and <span className="text-[#1b1b1b]">no advertising or marketing tracking</span>.
              All simulations and calculations run entirely in your browser — no input data
              is ever sent to our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              3. Hosting &amp; Server Logs
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website is hosted by <span className="text-[#1b1b1b]">Vercel Inc.</span> (440 N Baxter St, Los Angeles,
              CA 90026, USA). When you visit this site, Vercel automatically collects standard
              server log data:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li>IP address</li>
              <li>Date and time of access</li>
              <li>Pages requested</li>
              <li>Referring URL</li>
              <li>Browser type and operating system</li>
              <li>Data volume transferred</li>
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              This data is processed by Vercel for the purpose of delivering the website and
              maintaining security. See{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                Vercel&apos;s Privacy Policy
              </a>{" "}for details.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              4. Cookies
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              This website uses a <span className="text-[#1b1b1b]">custom cookie consent banner</span> to manage your preferences.
              On your first visit, you can choose which cookie categories to accept:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li><span className="text-[#1b1b1b]">Necessary:</span> Stores your cookie consent preference. Always active.</li>
              <li><span className="text-[#1b1b1b]">Preferences:</span> Remembers UI settings such as selected country. Optional.</li>
              <li><span className="text-[#1b1b1b]">Statistics:</span> Anonymous usage analytics to improve the site. Optional.</li>
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              Your consent is stored locally in your browser (localStorage). No cookie data is
              sent to any external server. You can change your preferences at any time via the
              &ldquo;Cookie Settings&rdquo; link in the footer.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              5. External Resources
            </h2>

            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">
              Google Fonts
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              We use the &ldquo;Inter&rdquo; typeface from Google Fonts. The font is downloaded at
              build time and served locally via Vercel (Next.js Font Optimization) —{" "}
              <span className="text-[#1b1b1b]">no direct requests are made to Google servers</span> from your browser.
              No personal data is transmitted to Google.
            </p>

            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">
              IPFS (Pinata Gateway)
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Links to the UVD whitepaper and shortpaper point to IPFS via a Pinata gateway.
              Clicking these links establishes a connection to Pinata servers. See{" "}
              <a href="https://www.pinata.cloud/privacy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                Pinata&apos;s Privacy Policy
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              6. Analytics &amp; Tracking
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website currently uses <span className="text-[#1b1b1b]">no analytics or tracking tools</span> such as
              Google Analytics, Mixpanel, or similar services. There is no advertising tracking
              of any kind. If this changes in the future, this policy will be updated accordingly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              7. Local Data Processing
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              All interactive simulations (Time-Theft Calculator, RTM Simulator, Basket Builder)
              run <span className="text-[#1b1b1b]">entirely in your browser</span>. Input data such as birth year, country,
              or income level is never transmitted to any server, stored, or logged. There is no
              database, no backend, and no server-side processing of user inputs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              8. Your Rights
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Depending on your jurisdiction, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li><span className="text-[#1b1b1b]">Right to Access:</span> You may request information about what personal data we hold about you.</li>
              <li><span className="text-[#1b1b1b]">Right to Deletion:</span> You may request that we delete your personal data.</li>
              <li><span className="text-[#1b1b1b]">Right to Opt-Out:</span> You may opt out of the sale or sharing of personal data (note: we do not sell or share personal data).</li>
              <li><span className="text-[#1b1b1b]">Right to Non-Discrimination:</span> We will not discriminate against you for exercising any of your rights.</li>
            </ul>
            <p className="mt-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              <span className="text-[#1b1b1b]">California Residents (CCPA):</span> Under the California Consumer Privacy Act,
              you have additional rights including the right to know what personal information is
              collected and the right to request deletion. Since this website does not collect,
              sell, or share personal information beyond standard server logs, these rights are
              inherently satisfied.
            </p>
            <p className="mt-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              To exercise any of your rights, contact us at:{" "}
              <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                info@p-a.llc
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              9. Data Security
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website uses SSL/TLS encryption for all data transmission. You can verify
              this by checking that the URL in your browser starts with &ldquo;https://&rdquo; and
              displays a lock icon.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website is not directed at children under the age of 13. We do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              11. Changes to This Policy
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              We may update this Privacy Policy from time to time. The current version is always
              available on this page. We encourage you to review it periodically.
            </p>
            <p className="mt-6 text-sm text-[#1b1b1b]/30">
              Last updated: February 2026
            </p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
