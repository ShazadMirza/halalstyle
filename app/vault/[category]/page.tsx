import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
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
      title: seo.title,
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

  const path = `/vault/${params.category}`;

  const relatedSlugs = VAULT_CATEGORY_SLUGS.filter((s) => s !== params.category);
  const relatedFooter = (
    <div>
      <h2 className="font-brand text-center text-2xl font-medium tracking-[0.08em] text-halal-cream sm:text-3xl">
        Related Categories
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-[0.85rem] text-halal-muted">
        Explore more halal-verified collections on Amazon.ca.
      </p>
      <nav
        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[0.9rem]"
        aria-label="Related vault categories"
      >
        {relatedSlugs.map((slug) => {
          const label = slugToVaultCategory(slug);
          if (!label) return null;
          return (
            <Link
              key={slug}
              href={`/vault/${slug}`}
              className="rounded-full border border-halal-border/40 px-4 py-2 text-halal-cream transition hover:border-halal-gold/50 hover:text-halal-gold"
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Vault", path: "/vault" },
          { name: cat, path },
        ]}
      />
      <VaultClient
        title={`${cat} · The Vault`}
        subtitle={seo.tagline}
        initialCategory={cat}
        intro={intro}
        footer={relatedFooter}
      />
    </>
  );
}
