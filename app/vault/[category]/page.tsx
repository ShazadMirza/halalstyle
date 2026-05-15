import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VaultClient } from "@/components/vault-client";
import { CATEGORY_SEO, slugToVaultCategory, VAULT_CATEGORY_SLUGS } from "@/lib/vault-category-seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: { category: string } };

export function generateStaticParams() {
  return VAULT_CATEGORY_SLUGS.map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = slugToVaultCategory(params.category);
  if (!cat) return {};
  const seo = CATEGORY_SEO[cat];
  const path = `/vault/${params.category}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${seo.title} — HalalStyle`,
      description: seo.description,
      url: absoluteUrl(path),
    },
  };
}

export default function VaultCategoryPage({ params }: Props) {
  const cat = slugToVaultCategory(params.category);
  if (!cat) notFound();
  const seo = CATEGORY_SEO[cat];

  const intro = (
    <div className="space-y-4 border-t border-halal-border/30 pt-8">
      {seo.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );

  return (
    <VaultClient
      title={`${cat} · The Vault`}
      subtitle={seo.tagline}
      initialCategory={cat}
      intro={intro}
    />
  );
}
