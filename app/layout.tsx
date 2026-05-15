import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { VaultBackground } from "@/components/vault-background";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.halalstyles55.com"),
  title: { default: "HalalStyle — The Excellence Filter for Modest Fashion", template: "%s — HalalStyle" },
  description: "AI-curated modest fashion for Muslim families in Canada. Take our style quiz and get 5 halal-verified picks in 60 seconds.",
  keywords: ["halal fashion", "modest fashion canada", "islamic clothing", "abaya", "hijab", "halal verified"],
  openGraph: {
    title: "HalalStyle — The Excellence Filter for Modest Fashion",
    description: "AI-powered halal modest fashion quiz. Get 5 personalised picks in 60 seconds.",
    url: "/",
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HalalStyle — The Excellence Filter for Modest Fashion",
    description: "AI-curated modest fashion for Muslim families in Canada.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <JsonLd />
        <VaultBackground />
        <div className="relative z-10 min-h-dvh">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
