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
  title: "HalalStyle — Halal Modest Fashion Canada | The Excellence Filter",
  description:
    "Shop halal-verified modest fashion in Canada. Abayas, hijabs, thobes & Islamic gifts — curated for Muslim families. Free style quiz. Ships via Amazon.ca.",
  keywords: [
    "halal fashion canada",
    "modest fashion canada",
    "abaya canada",
    "hijab canada",
    "islamic clothing canada",
    "modest fashion ontario",
    "halal clothing",
    "muslim fashion canada",
    "halal fashion",
    "halal verified",
  ],
  openGraph: {
    title: "HalalStyle — Halal Modest Fashion Canada | The Excellence Filter",
    description:
      "Shop halal-verified modest fashion in Canada. Abayas, hijabs, thobes & Islamic gifts — curated for Muslim families. Free style quiz. Ships via Amazon.ca.",
    url: "/",
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HalalStyle — Halal Modest Fashion Canada | The Excellence Filter",
    description:
      "Shop halal-verified modest fashion in Canada. Abayas, hijabs, thobes & Islamic gifts — curated for Muslim families.",
  },
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
        <VaultBackground />
        <div className="relative z-10 min-h-dvh">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
