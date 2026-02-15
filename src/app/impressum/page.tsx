import { SubpageLayout } from "@/components/subpage-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für UVD Simulation.",
};

export default function Impressum() {
  return (
    <SubpageLayout backLabel="Zurück zur Übersicht">
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            Impressum
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220</p>
              <p>Estero, FL 33928</p>
              <p>United States</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Registrierungsinformationen
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p>
                <span className="text-[#1b1b1b]">Rechtsform:</span> Limited Liability Company (LLC), State of Florida, USA
              </p>
              <p>
                <span className="text-[#1b1b1b]">EIN:</span> 41-3650497
              </p>
              <p>
                <span className="text-[#1b1b1b]">Website des Unternehmens:</span>{" "}
                <a href="https://www.p-a.llc" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                  www.p-a.llc
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Kontakt
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p>
                <span className="text-[#1b1b1b]">E-Mail:</span>{" "}
                <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                  info@p-a.llc
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV
            </h2>
            <div className="space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Maximilian Gerhardt</p>
              <p>c/o Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220</p>
              <p>Estero, FL 33928, United States</p>
              <p>
                <span className="text-[#1b1b1b]">E-Mail:</span>{" "}
                <a href="mailto:maximiliangerhardtofficial@gmail.com" className="text-[#297FF3] hover:underline">
                  maximiliangerhardtofficial@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Hinweis zum Projekt
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website ist ein <span className="text-[#1b1b1b]">unabhängiges, nicht-kommerzielles Bildungs- und
              Demonstrationsprojekt</span> (Companion / Pitch Deck) zur Unterstützung des Universe Dollar
              Projekts. Sie ist <span className="text-[#1b1b1b]">nicht</span> die offizielle Website von Universe Dollar.
              Die offizielle Projektseite befindet sich unter{" "}
              <a href="https://www.uvd.xyz" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                uvd.xyz
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Haftungsausschluss
            </h2>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Haftung für Inhalte
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
              wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
              fremde Informationen zu überwachen.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Haftung für Links
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Keine Finanzberatung
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Die auf dieser Website dargestellten Simulationen und Berechnungen dienen
              ausschließlich zu Bildungs- und Demonstrationszwecken. Sie stellen{" "}
              <span className="text-[#1b1b1b]">keine Finanzberatung, Anlageempfehlung oder Aufforderung
              zum Kauf oder Verkauf von Finanzinstrumenten</span> dar. Simulationsergebnisse basieren
              auf historischen Durchschnittswerten und garantieren keine zukünftigen Ergebnisse.
            </p>

            <h3 className="mt-6 mb-2 text-base font-medium text-[#1b1b1b]">
              Urheberrecht
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem Urheberrecht. Der Quellcode dieses Projekts ist öffentlich
              zugänglich unter{" "}
              <a
                href="https://github.com/MaximilianGerhardt/uvd-simulation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#297FF3] hover:underline"
              >
                GitHub
              </a>.
              Die wissenschaftlichen Grundlagen basieren auf der Relativen Theorie des Geldes
              von Stéphane Laborde sowie öffentlich zugänglichen Wirtschaftsdaten.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              Streitschlichtung
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#297FF3] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>.
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
