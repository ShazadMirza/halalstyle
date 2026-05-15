import type { MetadataRoute } from "next";
import { getAllJournalSlugs } from "@/lib/journal-posts";
import { VAULT_CATEGORY_SLUGS } from "@/lib/vault-category-seo";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/vault", changeFrequency: "weekly", priority: 0.9 },
    { path: "/journal", changeFrequency: "weekly", priority: 0.85 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.65 },
    { path: "/how-we-earn", changeFrequency: "monthly", priority: 0.65 },
    { path: "/results", changeFrequency: "weekly", priority: 0.4 },
    { path: "/docs/excellence-guide-2026.pdf", changeFrequency: "yearly", priority: 0.35 },
  ];

  const journalPosts = getAllJournalSlugs().map((slug) => ({
    url: `${SITE_URL}/journal/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /** All vault category hubs — each page lists every halal-verified pick in that collection */
  const vaultCategories = VAULT_CATEGORY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/vault/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...journalPosts,
    ...vaultCategories,
  ];
}
