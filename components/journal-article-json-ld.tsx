import type { JournalPost } from "@/lib/journal-posts";
import { absoluteUrl, SITE_URL } from "@/lib/site";

type JournalArticleJsonLdProps = {
  post: JournalPost;
};

export function JournalArticleJsonLd({ post }: JournalArticleJsonLdProps) {
  const url = absoluteUrl(`/journal/${post.slug}`);
  const payload = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "HalalStyles",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.tags.join(", "),
    inLanguage: "en-CA",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
