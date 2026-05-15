import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner With HalalStyle — Modest Fashion Brand Placement Canada",
  description:
    "Reach thousands of Canadian Muslim shoppers. Apply to feature your modest fashion or Islamic lifestyle brand in the HalalStyle vault.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner With HalalStyle — Modest Fashion Brand Placement Canada",
    description:
      "Reach thousands of Canadian Muslim shoppers. Apply to feature your modest fashion or Islamic lifestyle brand in the HalalStyle vault.",
    url: absoluteUrl("/partners"),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
