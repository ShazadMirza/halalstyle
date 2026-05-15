import type { Metadata } from "next";
import { VaultClient } from "@/components/vault-client";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Vault",
  description:
    "HalalStyle’s curated vault — modest fashion, hijabs, menswear, home, kids, and gifts vetted for quality and Islamic values. Shop Amazon.ca picks with confidence.",
  alternates: { canonical: "/vault" },
  openGraph: {
    title: "The Vault — HalalStyle",
    description:
      "Editor-vetted modest fashion and lifestyle picks for Muslim families in Canada.",
    url: absoluteUrl("/vault"),
  },
};

export default function VaultPage() {
  return (
    <VaultClient
      title="The Vault"
      subtitle="Every item vetted for quality, modesty, and Islamic values. Zero compromise. Zero noise."
      initialCategory="All"
    />
  );
}
