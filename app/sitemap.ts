import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://halalstyle.vercel.app";
  const now  = new Date();
  return [
    { url: base,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/vault`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partners`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
