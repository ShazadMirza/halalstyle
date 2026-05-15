import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners — Excellence Circle | HalalStyle",
  description:
    "Join the HalalStyle Excellence Circle. 10–15% commissions, verified trust badge, and early vault drops for aligned Muslim creators and brands.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "HalalStyle Excellence Circle — Partner With Us",
    description:
      "Affiliate and brand partnerships for modest fashion creators. Canada-focused, values-aligned.",
    url: absoluteUrl("/partners"),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
