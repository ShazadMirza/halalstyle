import type { MetadataRoute } from "next";

const SITE = "https://www.halalstyles55.com";

/**
 * Crawl policy: index editorial (/journal) and commerce hubs (/vault);
 * block API and internal-only routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/journal", "/journal/", "/vault", "/vault/", "/privacy", "/excellence-guide"],
        disallow: ["/api", "/api/", "/results"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
