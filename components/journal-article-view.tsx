"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ExcellenceGuideModal } from "@/components/excellence-guide-modal";
import { GoldToast } from "@/components/gold-toast";
import { JournalFeaturedSlider } from "@/components/journal-featured-slider";
import type { JournalPost } from "@/lib/journal-posts";

const STICKY_DISMISS_KEY = "halalstyle-journal-guide-dismissed";

type JournalArticleViewProps = {
  post: JournalPost;
};

export function JournalArticleView({ post }: JournalArticleViewProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const halfReadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setStickyDismissed(sessionStorage.getItem(STICKY_DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const marker = halfReadRef.current;
    if (!marker || stickyDismissed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowSticky(true);
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [stickyDismissed]);

  const dismissSticky = useCallback(() => {
    setShowSticky(false);
    setStickyDismissed(true);
    sessionStorage.setItem(STICKY_DISMISS_KEY, "1");
  }, []);

  const copyArticleLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2600);
    } catch {
      /* clipboard blocked */
    }
  }, []);

  const stickyVisible = showSticky && !stickyDismissed && !guideOpen;

  return (
    <>
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

          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <p className="section-eyebrow">Excellence Journal</p>
            <button
              type="button"
              onClick={() => void copyArticleLink()}
              className="btn-outline inline-flex items-center gap-2 px-4 py-2 text-[0.72rem]"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden />
              Copy Link
            </button>
          </div>

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

      <section className="journal-prose px-6 py-14 pb-28">
        <div className="mx-auto max-w-2xl">
          {post.body.map((paragraph, i) => {
            const midpoint = Math.floor(post.body.length / 2);
            const showMarker = i === midpoint;

            return (
              <div key={i}>
                {showMarker && <div ref={halfReadRef} className="h-px w-full" aria-hidden />}
                <p className="journal-paragraph">{paragraph}</p>
              </div>
            );
          })}

          {post.featuredItemIds && post.featuredItemIds.length > 0 && (
            <JournalFeaturedSlider itemIds={post.featuredItemIds} />
          )}

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

      <GoldToast message="Link copied to clipboard ✦" visible={linkCopied} />

      <AnimatePresence>
        {stickyVisible && (
          <motion.aside
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[90] border-t-2 border-halal-gold/55 bg-halal-forest/95 px-4 py-4 shadow-[0_-8px_40px_rgba(212,175,55,0.15)] backdrop-blur-md sm:px-6"
            aria-label="Excellence Guide offer"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-brand text-[0.95rem] tracking-[0.06em] text-halal-gold sm:text-base">
                  Want the full 2026 Excellence List?
                </p>
                <p className="mt-0.5 text-[0.75rem] text-halal-muted sm:text-[0.8rem]">
                  Get the Guide — curated picks for the modern Muslim high-achiever.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="btn-gold btn-shop-glow shrink-0 px-5 py-2.5 text-[0.72rem] sm:text-[0.8rem]"
              >
                Get the Guide ✦
              </button>
              <button
                type="button"
                onClick={dismissSticky}
                className="shrink-0 rounded-full p-2 text-halal-muted transition hover:text-halal-gold"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <ExcellenceGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
