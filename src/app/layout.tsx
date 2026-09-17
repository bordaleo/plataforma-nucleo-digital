import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { companyDefaults } from "@/lib/company";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${companyDefaults.name} — ${companyDefaults.tagline}`,
    template: `%s · ${companyDefaults.name}`,
  },
  description: companyDefaults.description,
  openGraph: {
    title: companyDefaults.name,
    description: companyDefaults.description,
    url: site.url,
    siteName: companyDefaults.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: companyDefaults.name,
    description: companyDefaults.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-parchment text-ink">{children}</body>
    </html>
  );
}
