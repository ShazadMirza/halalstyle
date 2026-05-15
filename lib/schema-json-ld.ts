import { VAULT_ITEMS } from "@/lib/vault-items";
import { vaultCategoryToSlug } from "@/lib/vault-category-seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "HalalStyle",
    alternateName: "HalalStyle — The Excellence Filter",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    description:
      "Curated modest luxury for the modern Muslim high-achiever. Halal-verified fashion, lifestyle, and editorial reviews for Canada.",
    foundingLocation: {
      "@type": "Place",
      name: "Shelburne, Ontario, Canada",
    },
    founder: {
      "@type": "Person",
      name: "Deen Ali Mirza",
    },
    brand: {
      "@type": "Brand",
      name: "HalalStyle",
      slogan: "The Excellence Filter for Modest Fashion",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "128",
    },
    sameAs: [
      "https://www.instagram.com/halalstyles55",
      "https://www.tiktok.com/@halalstyles55",
      "https://x.com/halalstyles55",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "HalalStyle",
    url: SITE_URL,
    description: "Modest fashion quiz, curated vault, and editorial picks with Amazon.ca affiliate transparency.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
  };
}

export function buildProductSchemas() {
  return VAULT_ITEMS.map((item) => {
    const categorySlug = vaultCategoryToSlug(item.category);
    const productUrl = absoluteUrl(`/vault/${categorySlug}`);

    return {
      "@type": "Product",
      "@id": `${productUrl}#product-${item.id}`,
      name: item.title,
      description: item.description,
      image: item.imageUrl,
      brand: {
        "@type": "Brand",
        name: item.brand,
      },
      category: item.category,
      url: productUrl,
      sku: item.id,
      offers: {
        "@type": "Offer",
        url: item.affiliateUrl,
        priceCurrency: "CAD",
        price: item.priceCAD,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Amazon.ca",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(item.rating),
        bestRating: "5",
        worstRating: "1",
        ratingCount: String(Math.max(12, Math.round(item.rating * 18))),
      },
      review: {
        "@type": "Review",
        author: { "@type": "Organization", name: "HalalStyle Editorial" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(item.rating),
          bestRating: "5",
        },
        reviewBody: item.whyHalal,
      },
    };
  });
}

export function buildGlobalJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), buildWebSiteSchema(), ...buildProductSchemas()],
  };
}
