import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Vault — Halal-Verified Modest Fashion",
  description:
    "Browse 21+ AI-curated halal-verified modest fashion picks. Filter by category, occasion, and budget. Ships to Canada.",
  openGraph: {
    title: "The Vault — HalalStyles | Modest Fashion Canada",
    description:
      "Abayas, hijabs, thobes, home décor — every item vetted for quality and Islamic values.",
    url: absoluteUrl("/vault"),
    siteName: "HalalStyles",
    locale: "en_CA",
    type: "website",
  },
};

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
