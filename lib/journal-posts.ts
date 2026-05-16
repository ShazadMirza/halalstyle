export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  readMinutes: number;
  tags: string[];
  /** Body copy — one string per paragraph */
  body: string[];
  /** Vault item IDs for "Featured in this Article" (high-ticket / editorial picks) */
  featuredItemIds?: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "the-2026-modest-executive",
    title: "The 2026 Modest Executive: Why Quality is the New Modesty",
    excerpt:
      "In boardrooms from Toronto to Dubai, the Muslim high-achiever is redefining modesty—not as compromise, but as a standard of excellence.",
    publishedAt: "2026-05-01",
    author: "HalalStyles Editorial",
    readMinutes: 6,
    tags: ["Modest Fashion", "Executive Style", "Halal Luxury"],
    featuredItemIds: ["v3", "v1", "v4", "v10", "v22", "v2"],
    body: [
      "For decades, modest fashion was framed as a trade-off: cover more, expect less. Fabric that pilled after three wears. Silhouettes that whispered “good enough” instead of commanding the room. In 2026, that narrative is finished.",
      "The modest executive does not dress to disappear. She—and he—dresses to lead. Quality has become the new modesty: garments that meet Islamic standards for coverage and looseness while rivaling any luxury house in drape, stitch, and longevity.",
      "At HalalStyles, we call this the Excellence Filter. Every piece in The Vault must pass three gates: halal-verified modesty, editorial-grade materials, and real-world wearability for Canadian climates and commutes. A crepe abaya that survives back-to-back meetings. A linen thobe that breathes on the 401 in July. A hijab set that stays put through a keynote—not a photo shoot.",
      "Why does quality matter for faith-aligned dress? Because modesty is an act of intention. When you invest in pieces built to last, you reduce waste, resist disposable trend cycles, and present yourself with the dignity your values demand. Cheap fabric frays; cheap intent shows.",
      "The 2026 modest executive builds a capsule, not a closet explosion: neutral foundations, one statement layer, accessories that signal polish without noise. Pair a premium thobe with a minimalist laptop sleeve. Layer an open kimono over a wrap dress for iftar-to-networking transitions.",
      "This is not about spending more—it is about spending once. Curate fewer items with higher standards. Let Amazon.ca logistics handle delivery; let your filter handle virtue and taste.",
      "Welcome to the Excellence Journal. Here we document the mindset behind The Vault—so your next purchase is not a guess, but a deliberate upgrade.",
    ],
  },
  {
    slug: "abaya-buying-guide-canada-2026",
    title: "The Modest Muslim's Guide to Buying Abayas on Amazon Canada",
    excerpt:
      "Fabric, fit, and faith — everything you need to find the perfect halal-verified abaya on Amazon.ca.",
    publishedAt: "2026-05-10",
    author: "HalalStyles Editorial",
    readMinutes: 7,
    tags: ["Abayas", "Amazon Canada", "Modest Fashion"],
    featuredItemIds: ["v1", "v11", "v14", "v10"],
    body: [
      "Buying an abaya on Amazon.ca should feel like curation—not roulette. Between crepe, jersey, and open-front layers, the Canadian modest shopper faces two challenges at once: finding fabric that drapes without clinging in winter heating, and verifying that “modest” in a product title actually means full coverage when the parcel arrives in Shelburne or Scarborough.",
      "Start with fabric intelligence. Crepe abayas—like our Editor’s Pick Luxury Crepe Abaya—offer structure for office and Eid without the stiffness of cheap polyester. They hold their shape through a full day of meetings and still photograph beautifully for content creators who document modest style. Jersey blends suit everyday prayer runs and school pickup; they stretch for comfort but must remain opaque when backlit. Hold listings up to a window in customer photos: if you see silhouette, pass.",
      "Fit is the second pillar. A proper abaya should cover the ankles when standing and allow a full stride without splitting at the sides. Canadian sizing charts from international sellers often run small; when between sizes, choose looseness. Modesty is not a tent—but it is never a bodycon tube. Look for raglan or A-line cuts that skim rather than trace.",
      "Open-front abayas and kimono cardigans belong in every capsule. They transform a simple dress and hijab into a boardroom-ready silhouette in seconds—ideal for Muslim professionals who move from desk to community events. Our Open-Front Kimono Cardigan is a Best Value layer for this exact reason: lightweight, arm coverage, zero compromise on breathability.",
      "Colour strategy matters in a four-season climate. Deep navy, charcoal, and warm taupe anchor a Canadian wardrobe; reserve black for formal and Eid. Dusty rose and olive photograph well for brand partners but ensure your hijab palette harmonizes. Buy one hero neutral first, then add a statement shade once you trust the seller’s consistency.",
      "Amazon.ca logistics are a gift—Prime delivery to remote Ontario towns, easy returns when fabric fails the light test. Always filter for fulfilled-by-Amazon when possible, read recent reviews from Canadian buyers, and confirm return windows before Eid deadlines. Affiliate links through HalalStyles do not change your price; they fund our Excellence Filter so every recommendation is vetted, not sponsored noise.",
      "Use this checklist before checkout: opaque fabric, ankle length, loose arm, reputable seller, recent reviews, return policy clear. If a listing fails two gates, keep scrolling. The perfect abaya is not the cheapest—it is the one you reach for every Friday, every presentation, every late Ramadan night.",
      "That is the HalalStyles standard: faith-aligned coverage, editorial-grade materials, real life in Canada. Explore our featured abaya picks below—each passed the same filter we apply to our own families’ closets.",
    ],
  },
  {
    slug: "eid-gift-guide-2026",
    title: "Eid Gift Guide 2026: Halal-Verified Picks for the Muslim High-Achiever",
    excerpt:
      "From prayer rugs to tech accessories — curated gifts that honour both faith and taste.",
    publishedAt: "2026-05-12",
    author: "HalalStyles Editorial",
    readMinutes: 7,
    tags: ["Eid", "Gift Guide", "Halal Luxury"],
    featuredItemIds: ["v19", "v9", "v7", "v8", "v6"],
    body: [
      "Eid gifting is an act of love—and an act of taste. In 2026, the Muslim high-achiever does not want generic gift baskets or last-minute mall panic. They want objects that respect prayer, elevate the home, and feel considered when unwrapped after Fajr on the first day of Eid al-Fitr.",
      "Begin with devotional essentials. A stainless steel tasbeeh counter is discreet enough for the boardroom pocket yet sacred enough for tarawih. Our Best Value pick pairs mechanical precision with gift-box presentation—ideal for colleagues, uncles, and university friends who are deepening their dhikr practice. It is faith-forward without being preachy.",
      "Home and hospitality gifts signal excellence. Brass Islamic geometry wall sculpture elevates a prayer corner or entryway with non-figurative sacred art—perfect for new homeowners in Mississauga or Calgary. Pair it with an oud and amber luxury candle duo for iftar hosts who curate atmosphere as carefully as their menus. Scent is sunnah-friendly hospitality when chosen without immodest branding.",
      "Tech that serves deen wins every year. The Quran speaker with azan and LED lamp replaces cluttered bedside tables with one elegant unit: recitation, prayer times, soft reading light. For the student or founder who travels between cities, it is a reminder that barakah and productivity share the same desk.",
      "Do not forget the smallest members of the ummah. A kids modest dress set under fifty dollars makes Eid morning effortless for parents—modest sleeve length, joyful colour, Jummah-ready in minutes. Gifting children clothing that meets Islamic dress guidelines teaches dignity early.",
      "Build a gift tier strategy. Under forty dollars: tasbeeh, candle duo, children’s set. Forty to one hundred: Quran speaker, prayer-adjacent décor. Above one hundred: wall sculpture plus a handwritten note referencing a shared memory. Wrap in emerald or gold paper if you ship across provinces—presentation is part of the Excellence Filter.",
      "Order early for Amazon.ca delivery windows. Ramadan’s final ten days fill logistics networks; Canadian postal delays hit rural routes hardest. Add items to cart two weeks before Eid, verify Prime eligibility, and keep receipts for exchanges. HalalStyles affiliate links support our editorial work at no extra cost to you.",
      "The best Eid gift says: I know what you value. Curate from the picks below—each halal-verified, each chosen for a Muslim household that refuses to choose between faith and refinement.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}

export function getAllJournalSlugs(): string[] {
  return JOURNAL_POSTS.map((post) => post.slug);
}
