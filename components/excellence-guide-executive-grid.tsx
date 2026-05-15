"use client";

import { ProductCard } from "@/components/product-card";
import type { VaultItem } from "@/lib/vault-items";

export function ExcellenceGuideExecutiveGrid({ items }: { items: VaultItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {items.map((item, i) => (
        <ProductCard key={item.id} item={item} cardIndex={i} showExcellenceGuard priority={i < 2} />
      ))}
    </div>
  );
}
