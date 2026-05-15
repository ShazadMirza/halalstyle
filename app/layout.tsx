import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { FaqPageJsonLd } from "@/components/faq-page-json-ld";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { VaultBackground } from "@/components/vault-background";
import {
  SOCIAL_DESCRIPTION,
  SOCIAL_TITLE,
  socialOpenGraph,
  socialTwitter,
} from "@/lib/social-metadata";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.halalstyles55.com"),
  title: SOCIAL_TITLE,
  description: SOCIAL_DESCRIPTION,
  keywords: [
    "halal fashion canada",
    "modest fashion canada",
    "modest luxury",
    "halal verified",
    "muslim fashion canada",
    "islamic lifestyle",
  ],
  openGraph: { ...socialOpenGraph, url: "/" },
  twitter: socialTwitter,
  robots: { index: true, follow: true },
  icons: {
    other: [
      { rel: "dns-prefetch", url: "https://amazon.ca" },
      { rel: "dns-prefetch", url: "https://images.unsplash.com" },
      { rel: "preconnect", url: "https://images.unsplash.com" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <JsonLd />
        <FaqPageJsonLd />
        <VaultBackground />
        <div className="relative z-10 min-h-dvh">
          <Nav />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
