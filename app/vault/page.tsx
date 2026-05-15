import type { Metadata } from "next";
import { VaultClient } from "@/components/vault-client";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Vault — Halal Modest Fashion Canada | HalalStyle",
  description:
    "21+ halal-verified modest fashion picks for Canadian Muslim families. Abayas, hijabs, thobes, prayer rugs & Islamic gifts. Shop on Amazon.ca with confidence.",
  alternates: { canonical: "/vault" },
  openGraph: {
    title: "The Vault — Halal Modest Fashion Canada | HalalStyle",
    description:
      "21+ halal-verified modest fashion picks for Canadian Muslim families. Abayas, hijabs, thobes, prayer rugs & Islamic gifts. Shop on Amazon.ca with confidence.",
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
