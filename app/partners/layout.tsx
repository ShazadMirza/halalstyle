import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner With HalalStyles — Modest Fashion Brand Placement Canada",
  description:
    "Reach thousands of Canadian Muslim shoppers. Apply to feature your modest fashion or Islamic lifestyle brand in the HalalStyles vault.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner With HalalStyles — Modest Fashion Brand Placement Canada",
    description:
      "Reach thousands of Canadian Muslim shoppers. Apply to feature your modest fashion or Islamic lifestyle brand in the HalalStyles vault.",
    url: absoluteUrl("/partners"),
    siteName: "HalalStyles",
    locale: "en_CA",
    type: "website",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
