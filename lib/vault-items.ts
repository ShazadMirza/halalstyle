export type VaultCategory = "Fashion" | "Hijabs" | "Menswear" | "Home" | "Kids" | "Gifts";
export type VaultOccasion = "Everyday" | "Eid" | "Work" | "Wedding" | "Prayer";

export interface VaultItem {
  id: string;
  title: string;
  brand: string;
  category: VaultCategory;
  occasion: VaultOccasion[];
  priceCAD: number;
  priceRange: string;
  description: string;
  whyHalal: string;
  imageKeyword: string;
  affiliateUrl: string;
  badge?: "Editor's Pick" | "Best Value" | "New" | "Bestseller";
  rating: number;
}

export const VAULT_ITEMS: VaultItem[] = [
  {
    id: "v1", title: "Luxury Crepe Abaya", brand: "East Essentials",
    category: "Fashion", occasion: ["Everyday","Eid","Prayer"],
    priceCAD: 89, priceRange: "$80–$100 CAD",
    description: "Flowing full-length abaya in premium crepe fabric. Relaxed fit with elegant drape — effortless modesty.",
    whyHalal: "Full body coverage, opaque fabric, loose modest silhouette",
    imageKeyword: "abaya", affiliateUrl: `https://www.amazon.ca/s?k=luxury+crepe+abaya+women&tag=halalstyle50d-20`,
    badge: "Editor's Pick", rating: 4.8,
  },
  {
    id: "v2", title: "Viscose Jersey Hijab Set", brand: "Modanisa",
    category: "Hijabs", occasion: ["Everyday","Work","Prayer"],
    priceCAD: 34, priceRange: "$30–$40 CAD",
    description: "Soft viscose jersey hijab with matching undercap. Breathable, non-slip, available in 20+ neutrals.",
    whyHalal: "Full head and neck coverage, opaque non-transparent material",
    imageKeyword: "hijab", affiliateUrl: `https://www.amazon.ca/s?k=viscose+jersey+hijab+set&tag=halalstyle50d-20`,
    badge: "Bestseller", rating: 4.9,
  },
  {
    id: "v3", title: "Premium Thobe — Linen Blend", brand: "Nabeel & Sons",
    category: "Menswear", occasion: ["Everyday","Eid","Prayer"],
    priceCAD: 119, priceRange: "$110–$130 CAD",
    description: "Tailored linen-blend thobe with mandarin collar. Modern cut, breathable for Canadian climate.",
    whyHalal: "Loose modest cut, covers ankles, men's Islamic dress code",
    imageKeyword: "thobe", affiliateUrl: `https://www.amazon.ca/s?k=premium+men+thobe+linen&tag=halalstyle50d-20`,
    badge: "Editor's Pick", rating: 4.7,
  },
  {
    id: "v4", title: "Maxi Wrap Dress — Modest", brand: "Veilkini",
    category: "Fashion", occasion: ["Everyday","Work","Wedding"],
    priceCAD: 64, priceRange: "$60–$70 CAD",
    description: "Elegant wrap-style maxi dress with long sleeves. Structured yet comfortable — office to dinner.",
    whyHalal: "Full arm coverage, floor-length, non-clingy drape",
    imageKeyword: "modest+dress", affiliateUrl: `https://www.amazon.ca/s?k=modest+maxi+wrap+dress+long+sleeve&tag=halalstyle50d-20`,
    badge: "New", rating: 4.6,
  },
  {
    id: "v5", title: "Prayer Rug — Luxury Velvet", brand: "Al-Noor",
    category: "Home", occasion: ["Prayer","Everyday"],
    priceCAD: 54, priceRange: "$50–$60 CAD",
    description: "Plush velvet prayer rug with compass-embedded pouch. Thick anti-slip base, travel-friendly.",
    whyHalal: "Purpose-built for Islamic prayer, clean modest design",
    imageKeyword: "prayer+rug", affiliateUrl: `https://www.amazon.ca/s?k=luxury+velvet+prayer+rug+compass&tag=halalstyle50d-20`,
    badge: "Bestseller", rating: 4.9,
  },
  {
    id: "v6", title: "Kids Modest Dress Set", brand: "Little Amirah",
    category: "Kids", occasion: ["Eid","Everyday"],
    priceCAD: 44, priceRange: "$40–$50 CAD",
    description: "Adorable modest dress set for girls ages 2–10. Soft cotton, fun patterns, easy care.",
    whyHalal: "Age-appropriate full coverage, comfortable modest design for children",
    imageKeyword: "kids+dress", affiliateUrl: `https://www.amazon.ca/s?k=modest+kids+dress+girls+islamic&tag=halalstyle50d-20`,
    badge: "Best Value", rating: 4.7,
  },
];
