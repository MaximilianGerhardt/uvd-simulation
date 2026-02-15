import { SubpageLayout } from "@/components/subpage-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and company information for UVD Simulation, operated by Prime Associates LLC.",
};

export default function LegalNotice() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            Legal Notice
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Company Information
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220</p>
              <p>Estero, FL 33928</p>
              <p>United States</p>
            </div>
            <div className="mt-4 space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p>
                <span className="text-[#1b1b1b]">Entity Type:</span> Limited Liability Company (LLC), State of Florida
              </p>
              <p>
                <span className="text-[#1b1b1b]">EIN:</span> 41-3650497
              </p>
              <p>
                <span className="text-[#1b1b1b]">Website:</span>{" "}
                <a href="https://www.p-a.llc" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                  www.p-a.llc
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Contact
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p>
                <span className="text-[#1b1b1b]">Email:</span>{" "}
                <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                  info@p-a.llc
                </a>
              </p>
              <p>
                <span className="text-[#1b1b1b]">Responsible Person:</span>{" "}
                Maximilian Gerhardt —{" "}
                <a href="mailto:maximiliangerhardtofficial@gmail.com" className="text-[#297FF3] hover:underline">
                  maximiliangerhardtofficial@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              About This Website
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website is an <span className="text-[#1b1b1b]">independent, non-commercial educational project</span> created
              in support of the Universe Dollar protocol. It is <span className="text-[#1b1b1b]">not</span> the official
              website of Universe Dollar. The official project is hosted at{" "}
              <a href="https://www.uvd.xyz" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                uvd.xyz
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Disclaimer
            </h2>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              No Financial Advice
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              The simulations and calculations presented on this website are for{" "}
              <span className="text-[#1b1b1b]">educational and demonstration purposes only</span>. Nothing on
              this site constitutes financial advice, investment recommendation, or a
              solicitation to buy or sell any financial instrument. Simulation results are
              based on historical averages and mathematical models and do not guarantee
              future outcomes. Always consult a qualified financial advisor before making
              investment decisions.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Accuracy of Information
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              While we strive to provide accurate and up-to-date information, Prime Associates
              LLC makes no warranties or representations regarding the completeness, accuracy,
              or reliability of any content on this website. Information is provided &ldquo;as is&rdquo;
              without warranty of any kind, express or implied.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              External Links
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This website contains links to external websites operated by third parties.
              We have no control over the content of those sites and accept no responsibility
              for them or for any loss or damage that may arise from your use of them.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Limitation of Liability
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              To the fullest extent permitted by applicable law, Prime Associates LLC shall
              not be liable for any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits or revenues, whether incurred directly or
              indirectly, arising from your use of this website or reliance on any information
              provided herein.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Intellectual Property
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              The source code of this project is publicly available on{" "}
              <a
                href="https://github.com/MaximilianGerhardt/uvd-simulation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#297FF3] hover:underline"
              >
                GitHub
              </a>.
              The underlying scientific framework is based on the Relative Theory of Money
              by Stéphane Laborde and publicly available economic data from the World Bank,
              ECB, and FRED.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Governing Law
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              This legal notice and any disputes arising from the use of this website shall
              be governed by and construed in accordance with the laws of the State of Florida,
              United States, without regard to its conflict of law provisions. Any legal
              action shall be brought exclusively in the courts located in Lee County, Florida.
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
