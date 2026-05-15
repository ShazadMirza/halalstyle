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
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "the-2026-modest-executive",
    title: "The 2026 Modest Executive: Why Quality is the New Modesty",
    excerpt:
      "In boardrooms from Toronto to Dubai, the Muslim high-achiever is redefining modesty—not as compromise, but as a standard of excellence.",
    publishedAt: "2026-05-01",
    author: "HalalStyle Editorial",
    readMinutes: 6,
    tags: ["Modest Fashion", "Executive Style", "Halal Luxury"],
    body: [
      "For decades, modest fashion was framed as a trade-off: cover more, expect less. Fabric that pilled after three wears. Silhouettes that whispered “good enough” instead of commanding the room. In 2026, that narrative is finished.",
      "The modest executive does not dress to disappear. She—and he—dresses to lead. Quality has become the new modesty: garments that meet Islamic standards for coverage and looseness while rivaling any luxury house in drape, stitch, and longevity.",
      "At HalalStyle, we call this the Excellence Filter. Every piece in The Vault must pass three gates: halal-verified modesty, editorial-grade materials, and real-world wearability for Canadian climates and commutes. A crepe abaya that survives back-to-back meetings. A linen thobe that breathes on the 401 in July. A hijab set that stays put through a keynote—not a photo shoot.",
      "Why does quality matter for faith-aligned dress? Because modesty is an act of intention. When you invest in pieces built to last, you reduce waste, resist disposable trend cycles, and present yourself with the dignity your values demand. Cheap fabric frays; cheap intent shows.",
      "The 2026 modest executive builds a capsule, not a closet explosion: neutral foundations, one statement layer, accessories that signal polish without noise. Pair a premium thobe with a minimalist laptop sleeve. Layer an open kimono over a wrap dress for iftar-to-networking transitions.",
      "This is not about spending more—it is about spending once. Curate fewer items with higher standards. Let Amazon.ca logistics handle delivery; let your filter handle virtue and taste.",
      "Welcome to the Excellence Journal. Here we document the mindset behind The Vault—so your next purchase is not a guess, but a deliberate upgrade.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}

export function getAllJournalSlugs(): string[] {
  return JOURNAL_POSTS.map((post) => post.slug);
}
