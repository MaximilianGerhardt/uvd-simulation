import { SubpageLayout } from "@/components/subpage-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung gemäß DSGVO für UVD Simulation.",
};

export default function Datenschutz() {
  return (
    <SubpageLayout backLabel="Zurück zur Übersicht">
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            Datenschutzerklärung
          </h1>

          {/* 1. Verantwortlicher */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              1. Verantwortlicher
            </h2>
            <div className="text-base leading-[1.8] text-[#1b1b1b]/60">
              <p className="font-medium text-[#1b1b1b]">Prime Associates LLC</p>
              <p>23160 Fashion Dr Ste 220</p>
              <p>Estero, FL 33928, United States</p>
              <p>EIN: 41-3650497</p>
              <p className="mt-2">
                <span className="text-[#1b1b1b]">E-Mail:</span>{" "}
                <a href="mailto:info@p-a.llc" className="text-[#297FF3] hover:underline">
                  info@p-a.llc
                </a>
              </p>
              <p>
                <span className="text-[#1b1b1b]">Verantwortlich für den Datenschutz:</span>{" "}
                Maximilian Gerhardt —{" "}
                <a href="mailto:maximiliangerhardtofficial@gmail.com" className="text-[#297FF3] hover:underline">
                  maximiliangerhardtofficial@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* 2. Überblick */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              2. Überblick der Datenverarbeitung
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website ist ein nicht-kommerzielles Bildungsprojekt. Wir erheben und verarbeiten
              so wenig personenbezogene Daten wie möglich. Es gibt <span className="text-[#1b1b1b]">keine Benutzerregistrierung,
              kein Login, keine Formulare</span> und <span className="text-[#1b1b1b]">kein Tracking zu Werbezwecken</span>.
              Alle Simulationen und Berechnungen werden ausschließlich lokal in Ihrem Browser
              durchgeführt — es werden keine Eingabedaten an unsere Server übermittelt.
            </p>
          </section>

          {/* 3. Hosting */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              3. Hosting
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website wird über <span className="text-[#1b1b1b]">Vercel Inc.</span> (440 N Baxter St, Los Angeles, CA 90026, USA)
              gehostet. Beim Aufruf der Website werden automatisch technische Daten durch den
              Hosting-Anbieter erfasst (sog. Server-Logfiles):
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Seite</li>
              <li>Referrer-URL (zuvor besuchte Seite)</li>
              <li>Verwendeter Browser und Betriebssystem</li>
              <li>Übertragene Datenmenge</li>
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              Die Verarbeitung erfolgt auf Grundlage von <span className="text-[#1b1b1b]">Art. 6 Abs. 1 lit. f DSGVO</span> (berechtigtes
              Interesse an der sicheren und effizienten Bereitstellung der Website). Vercel
              verarbeitet Daten unter dem EU-US Data Privacy Framework. Weitere Informationen:{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                Vercel Privacy Policy
              </a>.
            </p>
          </section>

          {/* 4. Cookies */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              4. Cookies und Einwilligungsmanagement
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website verwendet <span className="text-[#1b1b1b]">Cookiebot</span> (Cybot A/S, Havnegade 39, 1058 Kopenhagen,
              Dänemark) als Consent Management Platform (CMP) zur Verwaltung Ihrer Cookie-Einwilligungen
              gemäß Art. 6 Abs. 1 lit. c DSGVO und § 25 TDDDG.
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Beim ersten Besuch der Website wird Ihnen ein Cookie-Banner angezeigt, über das Sie
              Ihre Einwilligung für verschiedene Cookie-Kategorien erteilen oder verweigern können:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li><span className="text-[#1b1b1b]">Notwendige Cookies:</span> Erforderlich für die Grundfunktion der Website (immer aktiv)</li>
              <li><span className="text-[#1b1b1b]">Präferenz-Cookies:</span> Speichern Benutzereinstellungen (optional)</li>
              <li><span className="text-[#1b1b1b]">Statistik-Cookies:</span> Anonyme Nutzungsanalyse (optional)</li>
              <li><span className="text-[#1b1b1b]">Marketing-Cookies:</span> Werden auf dieser Website nicht verwendet</li>
            </ul>
            <p className="mt-3 text-base leading-[1.8] text-[#1b1b1b]/60">
              Ihre Einwilligung können Sie jederzeit widerrufen, indem Sie den Cookie-Banner
              erneut aufrufen (Link im Footer). Weitere Informationen:{" "}
              <a href="https://www.cookiebot.com/de/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                Cookiebot Datenschutzerklärung
              </a>.
            </p>
          </section>

          {/* 5. Externe Ressourcen */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              5. Externe Ressourcen und CDN
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website lädt folgende externe Ressourcen:
            </p>

            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">
              Google Fonts
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Wir nutzen die Schriftart &ldquo;Inter&rdquo; von Google Fonts. Die Schrift wird bei
              Build-Time heruntergeladen und lokal über Vercel ausgeliefert (Next.js Font
              Optimization) — es findet <span className="text-[#1b1b1b]">kein direkter Aufruf der Google-Server</span> durch Ihren Browser
              statt. Damit werden keine personenbezogenen Daten an Google übermittelt.
            </p>

            <h3 className="mt-4 mb-2 text-base font-medium text-[#1b1b1b]">
              IPFS (Pinata Gateway)
            </h3>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Links zu Whitepaper und Shortpaper verweisen auf das IPFS-Netzwerk über ein Pinata
              Gateway. Beim Klick auf diese Links wird eine Verbindung zu Pinata-Servern hergestellt.
              Es gelten die{" "}
              <a href="https://www.pinata.cloud/privacy" target="_blank" rel="noopener noreferrer" className="text-[#297FF3] hover:underline">
                Datenschutzbestimmungen von Pinata
              </a>.
            </p>
          </section>

          {/* 6. Keine Analyse-Tools */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              6. Analyse- und Tracking-Tools
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website verwendet derzeit <span className="text-[#1b1b1b]">keine Analyse- oder Tracking-Tools</span> wie
              Google Analytics, Matomo oder ähnliche Dienste. Es findet kein Tracking zu Werbe-
              oder Marketingzwecken statt. Sollte sich dies ändern, wird diese Datenschutzerklärung
              entsprechend aktualisiert und eine Einwilligung über den Cookie-Banner eingeholt.
            </p>
          </section>

          {/* 7. Lokale Datenverarbeitung */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              7. Lokale Datenverarbeitung
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Alle interaktiven Simulationen (Inflationsrechner, RTM-Simulator, Basket Builder)
              werden <span className="text-[#1b1b1b]">ausschließlich lokal in Ihrem Browser</span> berechnet. Eingabedaten wie
              Geburtsjahr, Land oder Einkommenshöhe werden zu keinem Zeitpunkt an einen Server
              übermittelt, gespeichert oder protokolliert. Es gibt keine Datenbank, kein Backend
              und keine serverseitige Verarbeitung von Nutzereingaben.
            </p>
          </section>

          {/* 8. Ihre Rechte */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              8. Ihre Rechte nach DSGVO
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Sie haben gemäß DSGVO folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-base leading-[1.8] text-[#1b1b1b]/60">
              <li><span className="text-[#1b1b1b]">Auskunftsrecht (Art. 15 DSGVO):</span> Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten.</li>
              <li><span className="text-[#1b1b1b]">Berichtigungsrecht (Art. 16 DSGVO):</span> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><span className="text-[#1b1b1b]">Löschungsrecht (Art. 17 DSGVO):</span> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
              <li><span className="text-[#1b1b1b]">Einschränkung der Verarbeitung (Art. 18 DSGVO):</span> Sie können die Einschränkung der Verarbeitung verlangen.</li>
              <li><span className="text-[#1b1b1b]">Datenübertragbarkeit (Art. 20 DSGVO):</span> Sie können die Herausgabe Ihrer Daten in einem maschinenlesbaren Format verlangen.</li>
              <li><span className="text-[#1b1b1b]">Widerspruchsrecht (Art. 21 DSGVO):</span> Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen.</li>
              <li><span className="text-[#1b1b1b]">Beschwerderecht (Art. 77 DSGVO):</span> Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</li>
            </ul>
            <p className="mt-4 text-base leading-[1.8] text-[#1b1b1b]/60">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:maximiliangerhardtofficial@gmail.com" className="text-[#297FF3] hover:underline">
                maximiliangerhardtofficial@gmail.com
              </a>
            </p>
          </section>

          {/* 9. Datenübermittlung in Drittländer */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              9. Datenübermittlung in Drittländer
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Das Hosting über Vercel sowie die Verantwortliche Stelle (Prime Associates LLC)
              befinden sich in den USA. Die Datenübermittlung erfolgt auf Grundlage des{" "}
              <span className="text-[#1b1b1b]">EU-US Data Privacy Framework</span> (Angemessenheitsbeschluss der
              Europäischen Kommission gemäß Art. 45 DSGVO). Vercel ist unter dem DPF zertifiziert.
            </p>
          </section>

          {/* 10. SSL/TLS */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              10. SSL/TLS-Verschlüsselung
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Diese Website nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung für die
              Datenübertragung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile Ihres Browsers von &ldquo;http://&rdquo; auf &ldquo;https://&rdquo; wechselt und
              ein Schloss-Symbol angezeigt wird.
            </p>
          </section>

          {/* 11. Änderungen */}
          <section>
            <h2 className="mb-4 text-xl font-medium text-[#1b1b1b]">
              11. Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
              Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um sie an
              geänderte Rechtslagen oder Änderungen der Website anzupassen. Die aktuelle Version
              ist stets auf dieser Seite abrufbar.
            </p>
            <p className="mt-4 text-sm text-[#1b1b1b]/30">
              Stand: Februar 2026
            </p>
          </section>
        </div>
      </article>
    </SubpageLayout>
  );
}
