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
  /** Amazon Standard Identification Number — auto-resolves high-res CDN when `imageUrl` is empty */
  asin?: string;
  /** SEO / a11y — pattern: "[product name] — halal modest fashion canada" */
  imageAlt: string;
  affiliateUrl: string;
  badge?: "Editor's Pick" | "Best Value" | "New" | "Bestseller";
  rating: number;
}

const VAULT_ITEMS_RAW: Omit<VaultItem, "imageAlt">[] = [
  // ── FASHION (5) ──────────────────────────────────────────────────────────
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
    id: "v10",
    title: "Open-Front Kimono Cardigan",
    brand: "Covered Couture",
    category: "Fashion",
    occasion: ["Everyday", "Work"],
    priceCAD: 54,
    priceRange: "$50–$60 CAD",
    description:
      "Lightweight open-front kimono in woven viscose. Layers beautifully over dresses and wide-leg trousers.",
    whyHalal: "Loose silhouette, full arm coverage, modest layering piece",
    imageKeyword: "kimono+cardigan+modest",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c8dae94?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=open+front+kimono+cardigan+modest&tag=halalstyle50d-20",
    badge: "Best Value",
    rating: 4.5,
  },
  {
    id: "v11",
    title: "Modest Palazzo Suit Set",
    brand: "Mirra Modest",
    category: "Fashion",
    occasion: ["Work", "Wedding", "Eid"],
    priceCAD: 105,
    priceRange: "$95–$115 CAD",
    description:
      "Two-piece palazzo suit in stretch crepe. Tailored blazer, wide-leg trousers — boardroom to gala.",
    whyHalal: "Full coverage, non-sheer, loose wide-leg silhouette meeting modest dress code",
    imageKeyword: "modest+palazzo+suit+women",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-647bde3668e8?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=modest+palazzo+suit+women&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.7,
  },
  {
    id: "v12",
    title: "Satin Pleated Skirt — Midi",
    brand: "Veilkini",
    category: "Fashion",
    occasion: ["Everyday", "Eid", "Wedding"],
    priceCAD: 44,
    priceRange: "$40–$50 CAD",
    description:
      "Fluid satin midi skirt with pleated front panel. Sits at the waist — pairs with tunics and blouses.",
    whyHalal: "Midi length to mid-calf, fully lined, non-transparent satin",
    imageKeyword: "satin+midi+skirt+modest",
    imageUrl:
      "https://images.unsplash.com/photo-1532453288672-3a27f9c49000?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=satin+pleated+midi+skirt+modest&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.6,
  },

  // ── HIJABS (3) ────────────────────────────────────────────────────────────
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
    id: "v13",
    title: "Chiffon Instant Hijab — Pleated",
    brand: "HijabHouse",
    category: "Hijabs",
    occasion: ["Everyday", "Eid", "Wedding"],
    priceCAD: 28,
    priceRange: "$25–$32 CAD",
    description:
      "Pre-sewn pleated chiffon hijab — no pinning required. Elegant drape for special occasions in 15+ shades.",
    whyHalal: "Full coverage pre-formed cut, opaque double-layer chiffon",
    imageKeyword: "chiffon+hijab+pleated",
    imageUrl:
      "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=chiffon+instant+hijab+pleated&tag=halalstyle50d-20",
    badge: "Best Value",
    rating: 4.7,
  },
  {
    id: "v14",
    title: "Bamboo Jersey Undercap 3-Pack",
    brand: "Al-Amira",
    category: "Hijabs",
    occasion: ["Everyday", "Prayer"],
    priceCAD: 22,
    priceRange: "$20–$25 CAD",
    description:
      "Buttery-soft bamboo jersey undercaps. Non-slip grip, moisture-wicking, minimal seams for all-day wear.",
    whyHalal: "Foundation layer for full head coverage, breathable modest base",
    imageKeyword: "hijab+undercap+women",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=bamboo+jersey+hijab+undercap&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.8,
  },

  // ── MENSWEAR (3) ─────────────────────────────────────────────────────────
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
      "https://images.unsplash.com/photo-1593030767217-7f768dee6ebb?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=premium+men+thobe+linen&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.7,
  },
  {
    id: "v15",
    title: "Embroidered Kufi Cap",
    brand: "Dar al-Sunnah",
    category: "Menswear",
    occasion: ["Everyday", "Prayer", "Eid"],
    priceCAD: 24,
    priceRange: "$20–$28 CAD",
    description:
      "Hand-stitched geometric embroidery on structured cotton kufi. Neutral ivory — pairs with any thobe.",
    whyHalal: "Traditional Islamic headwear for men, faith-affirming dress",
    imageKeyword: "kufi+cap+men+islamic",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=embroidered+kufi+cap+men&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.8,
  },
  {
    id: "v16",
    title: "Linen Qamis — Short Sleeve",
    brand: "Nabeel & Sons",
    category: "Menswear",
    occasion: ["Everyday", "Prayer"],
    priceCAD: 68,
    priceRange: "$60–$75 CAD",
    description:
      "Relaxed linen qamis, short-sleeved for warm weather. Clean mandarin collar, available in white and sand.",
    whyHalal: "Loose modest cut per Sunnah guidelines, breathable modest daily wear",
    imageKeyword: "linen+qamis+men+modest",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=linen+qamis+men+short+sleeve&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.6,
  },

  // ── HOME (4) ──────────────────────────────────────────────────────────────
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
    id: "v17",
    title: "Ayatul Kursi Calligraphy Frame",
    brand: "Makkah Atelier",
    category: "Home",
    occasion: ["Everyday", "Eid"],
    priceCAD: 78,
    priceRange: "$70–$85 CAD",
    description:
      "Laser-engraved Ayatul Kursi on brushed gold aluminium. Museum-quality glass, ready to hang.",
    whyHalal: "Quranic verse for the home — promotes dhikr and Islamic decor",
    imageKeyword: "ayatul+kursi+frame+islamic",
    imageUrl:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=ayatul+kursi+calligraphy+frame+gold&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.9,
  },

  // ── KIDS (2) ──────────────────────────────────────────────────────────────
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
      "https://images.unsplash.com/photo-1516627141067-369eea32b28d?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=modest+kids+dress+girls+islamic&tag=halalstyle50d-20",
    badge: "Best Value",
    rating: 4.7,
  },
  {
    id: "v18",
    title: "Boys Thobe & Kufi Set",
    brand: "Little Amirah",
    category: "Kids",
    occasion: ["Eid", "Prayer", "Everyday"],
    priceCAD: 52,
    priceRange: "$48–$58 CAD",
    description:
      "Matching thobe and kufi set for boys ages 3–12. Soft cotton blend — Jummah ready in minutes.",
    whyHalal: "Full-length boys thobe per Islamic dress, modest children's sunnah style",
    imageKeyword: "boys+thobe+set+kids",
    imageUrl:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=boys+thobe+kufi+set+kids&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.7,
  },

  // ── GIFTS (4) ─────────────────────────────────────────────────────────────
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
      "https://images.unsplash.com/photo-1505740420920-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=quran+speaker+azan+clock+led&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.8,
  },
  {
    id: "v19",
    title: "Tasbeeh Counter — Stainless Steel",
    brand: "Dar al-Sunnah",
    category: "Gifts",
    occasion: ["Everyday", "Prayer"],
    priceCAD: 34,
    priceRange: "$30–$38 CAD",
    description:
      "Elegant stainless steel mechanical tasbeeh counter. Resets at 33 and 99 — gift-boxed for Eid.",
    whyHalal: "Supports dhikr practice, Islamic devotional tool",
    imageKeyword: "tasbeeh+counter+steel",
    imageUrl:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe01?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=stainless+steel+tasbeeh+counter&tag=halalstyle50d-20",
    badge: "Best Value",
    rating: 4.8,
  },
  {
    id: "v20",
    title: "Illustrated Quran Stories for Kids",
    brand: "Kube Publishing",
    category: "Gifts",
    occasion: ["Everyday", "Eid"],
    priceCAD: 29,
    priceRange: "$26–$32 CAD",
    description:
      "Beautifully illustrated hardcover collection of Quranic stories. Ages 4–10 — perfect Eid gift.",
    whyHalal: "Faith-based children's education, age-appropriate Islamic values",
    imageKeyword: "islamic+book+children+illustrated",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=illustrated+quran+stories+kids+book&tag=halalstyle50d-20",
    badge: "Bestseller",
    rating: 4.9,
  },
  {
    id: "v22",
    title: "Minimalist Laptop Sleeve — Vegan Leather",
    brand: "NoorTech",
    category: "Gifts",
    occasion: ["Work", "Everyday"],
    priceCAD: 42,
    priceRange: "$38–$48 CAD",
    description:
      "Slim 13–15\" sleeve in matte vegan leather with magnetic closure. Fits boardroom and coffee-shop commutes.",
    whyHalal: "Modest professional accessory; no inappropriate branding, ethical material choice",
    imageKeyword: "laptop+sleeve+minimal",
    imageUrl:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac7d6f2f?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=minimalist+laptop+sleeve+vegan+leather&tag=halalstyle50d-20",
    badge: "New",
    rating: 4.6,
  },
  {
    id: "v21",
    title: "Ramadan Countdown Lantern Set",
    brand: "NoorTech",
    category: "Gifts",
    occasion: ["Eid", "Everyday"],
    priceCAD: 45,
    priceRange: "$42–$50 CAD",
    description:
      "30-day LED lantern calendar with Islamic art panels. Battery-powered, folds flat — family tradition made easy.",
    whyHalal: "Celebrates Islamic calendar, non-figurative design, family-friendly faith practice",
    imageKeyword: "ramadan+lantern+countdown",
    imageUrl:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://www.amazon.ca/s?k=ramadan+countdown+lantern+calendar&tag=halalstyle50d-20",
    badge: "Editor's Pick",
    rating: 4.7,
  },
];

export const VAULT_ITEMS: VaultItem[] = VAULT_ITEMS_RAW.map((item) => ({
  ...item,
  imageAlt: `${item.title} — halal modest fashion canada`,
}));
