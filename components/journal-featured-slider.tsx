"use client";

import { ProductCard } from "@/components/product-card";
import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";

type JournalFeaturedSliderProps = {
  itemIds: string[];
};

function resolveFeaturedItems(itemIds: string[]): VaultItem[] {
  return itemIds
    .map((id) => VAULT_ITEMS.find((item) => item.id === id))
    .filter((item): item is VaultItem => item != null);
}

export function JournalFeaturedSlider({ itemIds }: JournalFeaturedSliderProps) {
  const items = resolveFeaturedItems(itemIds);
  if (items.length === 0) return null;

  return (
    <section className="mt-14 border-t border-halal-border/30 pt-12" aria-labelledby="journal-featured-heading">
      <p className="section-eyebrow mb-2">Shop the Journal</p>
      <h2 id="journal-featured-heading" className="font-brand text-2xl tracking-[0.06em] text-halal-cream">
        Featured in this Article
      </h2>
      <p className="mt-2 text-[0.85rem] text-halal-muted">
        High-ticket picks mentioned above — halal-verified, editor-approved.
      </p>

      <div className="journal-product-slider mt-8 -mx-2 px-2">
        {items.map((item, i) => (
          <div key={item.id} className="journal-product-slide">
            <ProductCard item={item} cardIndex={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
