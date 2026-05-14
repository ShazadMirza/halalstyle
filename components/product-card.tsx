"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { VaultItem } from "@/lib/vault-items";

const BADGE_STYLES: Record<string, string> = {
  "Editor's Pick": "bg-halal-gold/15 text-halal-gold border-halal-gold/30",
  "Best Value": "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
  "New": "bg-halal-forest-2/80 text-halal-cream/80 border-halal-border/40",
  "Bestseller": "bg-amber-900/30 text-amber-300 border-amber-700/30",
};

function ImagePlaceholder() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/35 via-[#062C1D] to-[#0A3D28]"
      aria-hidden
    />
  );
}

export function ProductCard({ item }: { item: VaultItem }) {
  const stars = "★".repeat(Math.round(item.rating)) + "☆".repeat(5 - Math.round(item.rating));
  const [showImage, setShowImage] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border-[0.5px] border-gold/30 bg-card-gradient shadow-card transition-all duration-500 ease-luxury hover:-translate-y-1 hover:border-gold/80 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.48),0_0_22px_rgba(212,175,55,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-halal-surface">
        {showImage ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            loading="lazy"
            onError={() => setShowImage(false)}
          />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-halal-forest/60 via-transparent to-transparent" />
        {item.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${BADGE_STYLES[item.badge]}`}
          >
            {item.badge}
          </span>
        )}
        <span className="badge-halal absolute bottom-3 right-3 text-[0.55rem]">✦ Halal Verified</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.6rem] uppercase tracking-[0.15em] text-halal-gold/60">{item.brand}</p>
        <h3 className="mb-2 font-display text-[1rem] leading-snug text-halal-cream">{item.title}</h3>
        <p className="mb-3 line-clamp-2 flex-1 text-[0.78rem] leading-relaxed text-halal-muted">
          {item.description}
        </p>
        <p className="mb-4 rounded-lg bg-halal-forest-2/60 px-3 py-2 text-[0.7rem] leading-relaxed text-halal-cream/60">
          🌿 {item.whyHalal}
        </p>
        <div className="flex items-center justify-between border-t border-halal-border/30 pt-3">
          <div>
            <span className="font-display text-[1.1rem] font-medium text-halal-gold">{item.priceRange}</span>
            <p className="mt-0.5 text-[0.65rem] text-amber-400/70">
              {stars} ({item.rating})
            </p>
          </div>
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-shop-glow px-4 py-2 font-display text-[0.72rem] font-medium capitalize tracking-[0.2em]"
          >
            Shop Now →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
