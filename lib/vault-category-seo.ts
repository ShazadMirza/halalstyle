import type { VaultCategory } from "@/lib/vault-items";

export const VAULT_CATEGORY_SLUGS = [
  "fashion",
  "hijabs",
  "menswear",
  "home",
  "kids",
  "gifts",
] as const;

export type VaultCategorySlug = (typeof VAULT_CATEGORY_SLUGS)[number];

const SLUG_TO_CATEGORY: Record<VaultCategorySlug, VaultCategory> = {
  fashion: "Fashion",
  hijabs: "Hijabs",
  menswear: "Menswear",
  home: "Home",
  kids: "Kids",
  gifts: "Gifts",
};

export function slugToVaultCategory(slug: string): VaultCategory | null {
  if (!VAULT_CATEGORY_SLUGS.includes(slug as VaultCategorySlug)) return null;
  return SLUG_TO_CATEGORY[slug as VaultCategorySlug];
}

export function vaultCategoryToSlug(category: VaultCategory): VaultCategorySlug {
  const entry = Object.entries(SLUG_TO_CATEGORY).find(([, c]) => c === category);
  return (entry?.[0] ?? "fashion") as VaultCategorySlug;
}

export type CategorySeo = {
  title: string;
  description: string;
  /** Short line under hero */
  tagline: string;
  /** 2–3 short paragraphs for indexable body copy */
  paragraphs: string[];
};

export const CATEGORY_SEO: Record<VaultCategory, CategorySeo> = {
  Fashion: {
    title: "Modest Fashion & Luxury Abayas — The Vault",
    description:
      "Editor-vetted abayas, dresses, and modest occasion wear for Muslim women in Canada. Quality fabrics, full coverage, Amazon.ca picks.",
    tagline: "Abayas, maxi dresses, and boardroom-ready modest sets — curated for coverage, drape, and barakah.",
    paragraphs: [
      "HalalStyle’s Fashion edit treats modesty as non-negotiable and quality as sacred. Every piece is chosen for opaque fabrics, loose silhouettes, and occasion versatility — from everyday errands to Eid gatherings.",
      "Whether you are building a capsule wardrobe in Toronto or gifting abroad, these picks prioritise crepe, jersey, and woven blends that photograph beautifully and wear comfortably in Canadian seasons.",
      "Use the filters for budget and occasion, then shop with confidence: each listing includes a plain-language note on why it aligns with common Islamic dress expectations.",
    ],
  },
  Hijabs: {
    title: "Hijabs, Undercaps & Scarves — The Vault",
    description:
      "Premium hijabs, jersey sets, and accessories vetted for opacity and comfort. Curated modest headwear for Canada with Amazon.ca affiliate links.",
    tagline: "Jersey, chiffon, and everyday sets chosen for slip-resistance, breathability, and full coverage.",
    paragraphs: [
      "Our Hijabs collection focuses on fabrics that stay put during work and prayer — viscose jersey, opaque chiffon layers, and coordinated undercaps where it matters.",
      "We favour neutrals and jewel tones that pair with abayas and suits alike, so your scarf drawer works harder with fewer pieces.",
      "Each product note calls out coverage and sheerness so you are never guessing from a thumbnail alone.",
    ],
  },
  Menswear: {
    title: "Thobes & Modest Menswear — The Vault",
    description:
      "Linen thobes, kufis, and modest men’s essentials curated for fit, length, and ease. HalalStyle’s Canadian-forward picks on Amazon.ca.",
    tagline: "Tailored thobes and staples that respect length and looseness without sacrificing polish.",
    paragraphs: [
      "From Jumu’ah to Eid, menswear should feel dignified and easy. We look for ankle coverage, modest cut lines, and fabrics that breathe in summer while layering well in winter.",
      "These are affiliate-forward discovery links — we surface search paths and representative styles you can refine to your size and colour.",
      "Pair with Home for oud and décor, or Gifts for faith-forward tech — one cohesive family shopping lens.",
    ],
  },
  Home: {
    title: "Islamic Home, Prayer & Décor — The Vault",
    description:
      "Prayer rugs, brass geometry art, oud candles, and faith-centred home pieces vetted for quality. Modest luxury for Canadian Muslim homes.",
    tagline: "Pieces that elevate dhikr corners, coffee tables, and guest spaces with restraint and warmth.",
    paragraphs: [
      "Home is where barakah gathers. Our Home edit blends functional ritual objects with design-forward accents that still feel calm and uncluttered.",
      "We bias toward natural materials, solid craftsmanship, and gifts that ship reliably to Canadian addresses via Amazon’s network.",
      "Filter by budget to stage a small apartment or refresh a family room without compromising your aesthetic standards.",
    ],
  },
  Kids: {
    title: "Modest Kids’ Fashion — The Vault",
    description:
      "Modest, age-appropriate clothing picks for Muslim families — vetted for coverage and comfort. Curated kids’ finds via Amazon.ca.",
    tagline: "Play-ready modesty: breathable fabrics and cuts that keep active kids covered with ease.",
    paragraphs: [
      "Shopping for children means balancing growth spurts, playground durability, and values-aligned coverage. We highlight pieces parents can trust for school, masjid, and travel.",
      "Look for notes on layering, sleeve length, and opacity — the same Excellence Filter we apply to adult edits.",
      "Pair with Gifts for books and audio, or Fashion for coordinating family Eid palettes.",
    ],
  },
  Gifts: {
    title: "Faith-Forward Gifts & Tech — The Vault",
    description:
      "Curated Islamic gifts: oud sets, geometry art, Qur’an speakers, and luxury modest accessories. HalalStyle gift guide for Canada.",
    tagline: "High-intent gifting — tech, fragrance, and art objects that feel premium, not gimmicky.",
    paragraphs: [
      "Gifts should feel intentional. This edit leans into objects people actually use: scent for the home, portable audio for travel, and décor that reads elegant on a shelf.",
      "Perfect for housewarmings, newlyweds, and Ramadan host gifts — with price filters so you can match your ihsan to your budget.",
      "Every item remains vetted through our modesty and quality lens, even when the category isn’t apparel.",
    ],
  },
};
