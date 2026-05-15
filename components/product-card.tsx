"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { VaultItem } from "@/lib/vault-items";

const BADGE_STYLES: Record<string, string> = {
  "Editor's Pick": "bg-halal-gold/15 text-halal-gold border-halal-gold/30",
  "Best Value": "bg-halal-forest-2/70 text-halal-gold/90 border-halal-gold/25",
  "New": "bg-halal-forest-2/80 text-halal-cream/80 border-halal-border/40",
  "Bestseller": "bg-halal-gold/12 text-halal-gold border-halal-gold/35",
};

function EmeraldImageShimmer() {
  return (
    <div
      className="absolute inset-0 z-0 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#D4AF37]/35"
      aria-hidden
    />
  );
}

function ImageFallback({ shopUrl }: { shopUrl: string }) {
  return (
    <Link
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#D4AF37]/40 px-4 text-center transition hover:to-[#D4AF37]/55"
    >
      <span className="font-brand text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-halal-cream">
        Image unavailable
      </span>
      <span className="rounded-full bg-halal-gold px-4 py-2 font-sans text-[0.8rem] font-semibold text-halal-forest shadow-gold">
        Shop on Amazon →
      </span>
    </Link>
  );
}

export type ProductCardProps = {
  item: VaultItem;
  /** LCP: parent can mark above-the-fold rows (e.g. home featured) */
  priority?: boolean;
  /** Grid index: first card gets `priority`; first three get `loading="eager"` */
  cardIndex?: number;
};

export function ProductCard({ item, priority = false, cardIndex }: ProductCardProps) {
  const stars = "★".repeat(Math.round(item.rating)) + "☆".repeat(5 - Math.round(item.rating));
  const [showImage, setShowImage] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const effectivePriority = priority || cardIndex === 0;
  const loading: "eager" | "lazy" | undefined =
    cardIndex !== undefined ? (cardIndex < 3 ? "eager" : "lazy") : priority ? "eager" : "lazy";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 0 32px rgba(212,175,55,0.42), 0 20px 50px -12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.12)",
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-halal-gold/20 bg-gradient-to-br from-halal-surface/78 via-halal-forest-2/74 to-halal-surface/78 shadow-card backdrop-blur-[8px] transition-[border-color,box-shadow] duration-500 ease-luxury hover:border-halal-gold/60"
    >
      <motion.div className="relative aspect-[4/3] overflow-hidden bg-halal-surface">
        {showImage && !imageLoaded && (
          <div className="gold-image-shimmer absolute inset-0 z-[1]" aria-hidden />
        )}
        {!showImage && <EmeraldImageShimmer />}
        {showImage ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            priority={effectivePriority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-all duration-700 ease-luxury group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading={loading}
            onLoad={() => setImageLoaded(true)}
            onError={() => setShowImage(false)}
          />
        ) : (
          <ImageFallback shopUrl={item.affiliateUrl} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-halal-forest/60 via-transparent to-transparent" />
        {item.badge && (
          <span
            className={`absolute left-3 top-3 z-[5] rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${BADGE_STYLES[item.badge]}`}
          >
            {item.badge}
          </span>
        )}
        <span className="badge-halal absolute bottom-3 right-3 z-[5] text-[0.55rem]">✦ Halal Verified</span>
      </motion.div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.6rem] uppercase tracking-[0.15em] text-halal-gold/60">{item.brand}</p>
        <h3 className="mb-2 font-brand text-[1rem] leading-snug tracking-[0.075em] text-halal-cream">{item.title}</h3>
        <p className="mb-3 line-clamp-2 flex-1 text-[0.78rem] leading-relaxed text-halal-muted">
          {item.description}
        </p>
        <p className="mb-4 rounded-lg border border-halal-border/25 bg-halal-forest-2/50 px-3 py-2 text-[0.7rem] leading-relaxed text-halal-cream/60">
          🌿 {item.whyHalal}
        </p>
        <div className="flex items-center justify-between border-t border-halal-border/35 pt-3">
          <div>
            <span className="font-brand text-[1.1rem] font-medium tracking-[0.06em] text-halal-gold">
              {item.priceRange}
            </span>
            <p className="mt-0.5 text-[0.65rem] text-halal-gold/65">
              {stars} ({item.rating})
            </p>
          </div>
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-shop-glow px-4 py-2 font-brand text-[0.72rem] font-medium capitalize tracking-[0.2em]"
          >
            Shop Now →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
