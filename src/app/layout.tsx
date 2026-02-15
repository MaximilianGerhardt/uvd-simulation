import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universe Dollar — Simulation Terminal",
  description:
    "Interactive economic simulation for the Universal Value Protocol. Explore how symmetric money creation preserves purchasing power across time and space.",
  openGraph: {
    title: "Universe Dollar — Simulation Terminal",
    description:
      "Interactive economic simulation for the Universal Value Protocol.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
