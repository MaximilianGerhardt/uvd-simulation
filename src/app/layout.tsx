// Root layout — delegates to [locale]/layout.tsx for all rendering
// This file is required by Next.js but should not render <html> or <body>
// since the locale layout handles that.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
