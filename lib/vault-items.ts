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
  imageUrl: string;
  affiliateUrl: string;
  badge?: "Editor's Pick" | "Best Value" | "New" | "Bestseller";
  rating: number;
}

export const VAULT_ITEMS: VaultItem[] = [
  {
    id: "v1",
    title: "Luxury Crepe Abaya",
    brand: "East Essentials",
    category: "Fashion",
    occasion: ["Everyday", "Eid", "Prayer"],
    priceCAD: 89,
    priceRange: "$80–$100 CAD",
    description:
      "Flowing full-length abaya in premium crepe fabric. Relaxed fit with elegant drape — effortless modesty.",
    whyHalal: "Full body coverage, opaque fabric, loose modest silhouette",
    imageKeyword: "abaya",
    imageUrl:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=luxury+crepe+abaya+women&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.8,
  },
  {
    id: "v2",
    title: "Viscose Jersey Hijab Set",
    brand: "Modanisa",
    category: "Hijabs",
    occasion: ["Everyday", "Work", "Prayer"],
    priceCAD: 34,
    priceRange: "$30–$40 CAD",
    description:
      "Soft viscose jersey hijab with matching undercap. Breathable, non-slip, available in 20+ neutrals.",
    whyHalal: "Full head and neck coverage, opaque non-transparent material",
    imageKeyword: "hijab",
    imageUrl:
      "https://images.unsplash.com/photo-1583292650773-4a70031048b7?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=viscose+jersey+hijab+set&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.9,
  },
  {
    id: "v3",
    title: "Premium Thobe — Linen Blend",
    brand: "Nabeel & Sons",
    category: "Menswear",
    occasion: ["Everyday", "Eid", "Prayer"],
    priceCAD: 119,
    priceRange: "$110–$130 CAD",
    description:
      "Tailored linen-blend thobe with mandarin collar. Modern cut, breathable for Canadian climate.",
    whyHalal: "Loose modest cut, covers ankles, men's Islamic dress code",
    imageKeyword: "thobe",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=premium+men+thobe+linen&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.7,
  },
  {
    id: "v4",
    title: "Maxi Wrap Dress — Modest",
    brand: "Veilkini",
    category: "Fashion",
    occasion: ["Everyday", "Work", "Wedding"],
    priceCAD: 64,
    priceRange: "$60–$70 CAD",
    description:
      "Elegant wrap-style maxi dress with long sleeves. Structured yet comfortable — office to dinner.",
    whyHalal: "Full arm coverage, floor-length, non-clingy drape",
    imageKeyword: "modest+dress",
    imageUrl:
      "https://images.unsplash.com/photo-1572804013427-cdd524fcd550?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=modest+maxi+wrap+dress+long+sleeve&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.6,
  },
  {
    id: "v5",
    title: "Prayer Rug — Luxury Velvet",
    brand: "Al-Noor",
    category: "Home",
    occasion: ["Prayer", "Everyday"],
    priceCAD: 54,
    priceRange: "$50–$60 CAD",
    description:
      "Plush velvet prayer rug with compass-embedded pouch. Thick anti-slip base, travel-friendly.",
    whyHalal: "Purpose-built for Islamic prayer, clean modest design",
    imageKeyword: "prayer+rug",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=luxury+velvet+prayer+rug+compass&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.9,
  },
  {
    id: "v6",
    title: "Kids Modest Dress Set",
    brand: "Little Amirah",
    category: "Kids",
    occasion: ["Eid", "Everyday"],
    priceCAD: 44,
    priceRange: "$40–$50 CAD",
    description: "Adorable modest dress set for girls ages 2–10. Soft cotton, fun patterns, easy care.",
    whyHalal: "Age-appropriate full coverage, comfortable modest design for children",
    imageKeyword: "kids+dress",
    imageUrl:
      "https://images.unsplash.com/photo-1514097348689-198333d32188?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=modest+kids+dress+girls+islamic&tag=halalstyle50d-20",
    badge: "Best Value",
    rating: 4.7,
  },
  {
    id: "v7",
    title: "Brass Islamic Geometry Wall Sculpture",
    brand: "Makkah Atelier",
    category: "Home",
    occasion: ["Everyday", "Eid"],
    priceCAD: 132,
    priceRange: "$120–$145 CAD",
    description:
      "Hand-finished brass lattice inspired by classical girih geometry — a statement of faith and design.",
    whyHalal: "Non-figurative sacred geometry; suitable for Muslim homes and prayer spaces",
    imageKeyword: "islamic+art",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=islamic+geometry+wall+art+brass&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.8,
  },
  {
    id: "v8",
    title: "Oud & Amber Luxury Candle Duo",
    brand: "Dar al-Shifa",
    category: "Home",
    occasion: ["Everyday", "Eid"],
    priceCAD: 72,
    priceRange: "$65–$80 CAD",
    description:
      "Two-piece halal-friendly home fragrance set — warm oud, soft amber, long clean burn for gatherings.",
    whyHalal: "Alcohol-free formulation options; elegant gifting without compromising values",
    imageKeyword: "candle+luxury",
    imageUrl:
      "https://images.unsplash.com/photo-1608571423902-61f887b532cf?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=oud+amber+luxury+candle+set&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.7,
  },
  {
    id: "v9",
    title: "Quran Speaker with Azan & LED Lamp",
    brand: "NoorTech",
    category: "Gifts",
    occasion: ["Everyday", "Prayer", "Eid"],
    priceCAD: 98,
    priceRange: "$90–$110 CAD",
    description:
      "All-in-one reciter, prayer times, and soft reading light — ideal for bedside or student desk.",
    whyHalal: "Faith-forward utility; supports salah and learning without inappropriate content",
    imageKeyword: "quran+speaker",
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=quran+speaker+azan+clock+led&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.8,
  },
];
