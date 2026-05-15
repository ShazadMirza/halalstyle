import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticleJsonLd } from "@/components/journal-article-json-ld";
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

      <article className="border-b border-halal-border/30 bg-halal-surface px-6 py-16 pattern-bg">
        <div className="mx-auto max-w-2xl">
          <nav className="mb-8 text-[0.7rem] text-halal-muted">
            <Link href="/" className="hover:text-halal-gold">
              Home
            </Link>
            <span className="mx-2 text-halal-border">/</span>
            <Link href="/journal" className="hover:text-halal-gold">
              Journal
            </Link>
          </nav>

          <p className="section-eyebrow mb-4">Excellence Journal</p>
          <h1 className="font-brand text-[clamp(1.85rem,5vw,2.75rem)] font-medium leading-[1.15] tracking-[0.05em] text-halal-cream">
            {post.title}
          </h1>
          <p className="mt-5 font-brand text-[1.05rem] italic leading-relaxed text-halal-gold/85">
            {post.excerpt}
          </p>
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.2em] text-halal-muted">
            {post.author} ·{" "}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>{" "}
            · {post.readMinutes} min read
          </p>
        </div>
      </article>

      <section className="journal-prose px-6 py-14">
        <div className="mx-auto max-w-2xl">
          {post.body.map((paragraph, i) => (
            <p key={i} className="journal-paragraph">
              {paragraph}
            </p>
          ))}

          <div className="mt-12 rounded-2xl border border-halal-gold/30 bg-halal-forest-2/40 p-8 text-center">
            <p className="section-eyebrow mb-3">Curated for you</p>
            <p className="font-brand text-xl tracking-[0.06em] text-halal-cream">
              Shop the Vault
            </p>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-halal-muted">
              Every pick passes the Excellence Filter — halal-verified, editor-approved, Amazon.ca ready.
            </p>
            <Link href="/vault" className="btn-gold btn-shop-glow mt-6 inline-flex text-[0.8rem]">
              Explore The Vault →
            </Link>
          </div>

          <Link
            href="/journal"
            className="mt-10 inline-block font-brand text-[0.8rem] tracking-[0.12em] text-halal-gold hover:text-halal-gold-2"
          >
            ← All journal essays
          </Link>
        </div>
      </section>
    </main>
  );
}
