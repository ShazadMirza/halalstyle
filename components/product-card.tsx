"use client";

import type { VaultItem } from "@/lib/vault-items";

const BADGE_STYLES: Record<string, string> = {
  "Editor's Pick": "bg-halal-gold/15 text-halal-gold border-halal-gold/30",
  "Best Value":    "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
  "New":           "bg-halal-forest-2/80 text-halal-cream/80 border-halal-border/40",
  "Bestseller":    "bg-amber-900/30 text-amber-300 border-amber-700/30",
};

export function ProductCard({ item }: { item: VaultItem }) {
  const stars = "★".repeat(Math.round(item.rating)) + "☆".repeat(5 - Math.round(item.rating));

  return (
    <article className="card-luxury group flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden bg-halal-surface aspect-[4/3]">
        <img
          src={`https://source.unsplash.com/400x300/?${item.imageKeyword},fashion`}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://source.unsplash.com/400x300/?fashion,modest`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-halal-forest/60 via-transparent to-transparent" />
        {/* Badge */}
        {item.badge && (
          <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${BADGE_STYLES[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {/* Halal badge */}
        <span className="badge-halal absolute bottom-3 right-3 text-[0.55rem]">
          ✦ Halal Verified
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.6rem] uppercase tracking-[0.15em] text-halal-gold/60">{item.brand}</p>
        <h3 className="font-display text-[1rem] leading-snug text-halal-cream mb-2">{item.title}</h3>
        <p className="flex-1 text-[0.78rem] leading-relaxed text-halal-muted mb-3 line-clamp-2">
          {item.description}
        </p>
        {/* Why halal */}
        <p className="mb-4 rounded-lg bg-halal-forest-2/60 px-3 py-2 text-[0.7rem] leading-relaxed text-halal-cream/60">
          🌿 {item.whyHalal}
        </p>
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-halal-border/30">
          <div>
            <span className="font-display text-[1.1rem] font-medium text-halal-gold">{item.priceRange}</span>
            <p className="text-[0.65rem] text-amber-400/70 mt-0.5">{stars} ({item.rating})</p>
          </div>
          <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer"
            className="btn-gold text-[0.75rem] py-2 px-4">
            Shop Now →
          </a>
        </div>
      </div>
    </article>
  );
}
