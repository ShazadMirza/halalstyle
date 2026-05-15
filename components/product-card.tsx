"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { VaultItem } from "@/lib/vault-items";

const BADGE_STYLES: Record<string, string> = {
  "Editor's Pick": "bg-halal-gold/15 text-halal-gold border-halal-gold/30",
  "Best Value": "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
  "New": "bg-halal-forest-2/80 text-halal-cream/80 border-halal-border/40",
  "Bestseller": "bg-amber-900/30 text-amber-300 border-amber-700/30",
};

function ImageFallback({ shopUrl }: { shopUrl: string }) {
  return (
    <Link
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#D4AF37]/40 via-[#062C1D] to-[#0A3D28] px-4 text-center transition hover:from-[#D4AF37]/50"
    >
      <span className="font-brand text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-halal-cream">
        Image unavailable
      </span>
      <span className="rounded-full bg-halal-gold/90 px-4 py-2 font-sans text-[0.8rem] font-semibold text-halal-forest shadow-gold">
        Shop on Amazon →
      </span>
    </Link>
  );
}

export type ProductCardProps = {
  item: VaultItem;
  /** LCP: first featured row on home */
  priority?: boolean;
};

export function ProductCard({ item, priority = false }: ProductCardProps) {
  const stars = "★".repeat(Math.round(item.rating)) + "☆".repeat(5 - Math.round(item.rating));
  const [showImage, setShowImage] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 30px rgba(212,175,55,0.5), 0 20px 50px -12px rgba(0,0,0,0.45)",
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border-[0.5px] border-gold/30 bg-card-gradient shadow-card transition-colors duration-500 ease-luxury hover:border-gold/80"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-halal-surface">
        {showImage ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            priority={priority}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
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
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.6rem] uppercase tracking-[0.15em] text-halal-gold/60">{item.brand}</p>
        <h3 className="mb-2 font-brand text-[1rem] leading-snug tracking-[0.075em] text-halal-cream">{item.title}</h3>
        <p className="mb-3 line-clamp-2 flex-1 text-[0.78rem] leading-relaxed text-halal-muted">
          {item.description}
        </p>
        <p className="mb-4 rounded-lg bg-halal-forest-2/60 px-3 py-2 text-[0.7rem] leading-relaxed text-halal-cream/60">
          🌿 {item.whyHalal}
        </p>
        <div className="flex items-center justify-between border-t border-halal-border/30 pt-3">
          <div>
            <span className="font-brand text-[1.1rem] font-medium tracking-[0.06em] text-halal-gold">
              {item.priceRange}
            </span>
            <p className="mt-0.5 text-[0.65rem] text-amber-400/70">
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
