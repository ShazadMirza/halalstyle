import Link from "next/link";
import type { Metadata } from "next";
import { JOURNAL_POSTS } from "@/lib/journal-posts";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Excellence Journal — HalalStyles",
  description:
    "Editorial essays on modest luxury, halal-verified fashion, and the Muslim high-achiever mindset. The Excellence Filter, in writing.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Excellence Journal — HalalStyles",
    description:
      "Editorial essays on modest luxury, halal-verified fashion, and the Muslim high-achiever mindset.",
    url: absoluteUrl("/journal"),
    type: "website",
  },
};

export default function JournalPage() {
  const sorted = [...JOURNAL_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="min-h-dvh pt-20">
      <section className="border-b border-halal-border/30 bg-halal-surface px-6 py-20 text-center pattern-bg">
        <p className="section-eyebrow mb-4">Authority &amp; Editorial</p>
        <h1 className="font-brand text-[clamp(2.25rem,6vw,3.5rem)] font-medium leading-tight tracking-[0.06em] text-halal-cream">
          Excellence Journal
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-brand text-[1.05rem] italic leading-relaxed tracking-[0.02em] text-halal-gold/90">
          Where modesty meets mastery — essays for the modern Muslim executive.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="card-luxury group p-8 transition-colors hover:border-halal-gold/30"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-halal-muted">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-halal-border">·</span>
                <span>{post.readMinutes} min read</span>
              </div>
              <h2 className="font-brand text-2xl font-medium leading-snug tracking-[0.05em] text-halal-cream group-hover:text-halal-gold transition-colors sm:text-3xl">
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-4 font-brand text-[1rem] leading-relaxed text-halal-muted/95">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-halal-gold/25 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-halal-gold/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/journal/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-brand text-[0.8rem] tracking-[0.12em] text-halal-gold hover:text-halal-gold-2"
              >
                Read essay →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
