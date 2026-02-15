import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "UVD Simulation — Interactive Companion to Universe Dollar",
  description:
    "An independent educational pitch deck exploring the economic model behind Universe Dollar. Run simulations on inflation impact, symmetric money creation, and sovereign basket pricing.",
  openGraph: {
    title: "UVD Simulation — Interactive Companion to Universe Dollar",
    description:
      "Explore the mathematics of fair money creation through interactive simulations.",
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
