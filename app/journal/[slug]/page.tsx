import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticleJsonLd } from "@/components/journal-article-json-ld";
import { JournalArticleView } from "@/components/journal-article-view";
import { getAllJournalSlugs, getJournalPost } from "@/lib/journal-posts";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getJournalPost(params.slug);
  if (!post) return { title: "Journal — HalalStyle" };

  return {
    title: `${post.title} — Excellence Journal | HalalStyle`,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/journal/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default function JournalArticlePage({ params }: PageProps) {
  const post = getJournalPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-dvh pt-20">
      <JournalArticleJsonLd post={post} />
      <JournalArticleView post={post} />
    </main>
  );
}
