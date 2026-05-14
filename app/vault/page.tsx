"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { VAULT_ITEMS, type VaultCategory } from "@/lib/vault-items";

const CATEGORIES: (VaultCategory | "All")[] = ["All", "Fashion", "Hijabs", "Menswear", "Home", "Kids", "Gifts"];
const OCCASIONS = ["All", "Everyday", "Eid", "Work", "Wedding", "Prayer"] as const;
const BUDGETS = [
  { label: "All", max: Infinity },
  { label: "Under $50", max: 50 },
  { label: "$50–$100", max: 100 },
  { label: "$100–$200", max: 200 },
  { label: "$200+", max: Infinity, min: 200 },
];

export default function VaultPage() {
  const [cat, setCat] = useState<VaultCategory | "All">("All");
  const [occ, setOcc] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [search, setSearch] = useState("");

  const budget = BUDGETS[budgetIdx];
  const filtered = VAULT_ITEMS.filter(item => {
    if (cat !== "All" && item.category !== cat) return false;
    if (occ !== "All" && !item.occasion.includes(occ as never)) return false;
    if (budgetIdx !== 0) {
      if ("min" in budget && item.priceCAD < (budget.min ?? 0)) return false;
      if (item.priceCAD > budget.max) return false;
    }
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) &&
        !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="min-h-dvh pt-20">

      {/* Header */}
      <section className="border-b border-halal-border/30 bg-halal-surface px-6 py-16 text-center pattern-bg">
        <p className="section-eyebrow mb-4">Curated for Excellence</p>
        <h1 className="section-title mb-4">The Vault</h1>
        <p className="mx-auto max-w-lg text-[0.95rem] text-halal-muted leading-relaxed">
          Every item vetted for quality, modesty, and Islamic values. Zero compromise. Zero noise.
        </p>
      </section>

      {/* Filters */}
      <section className="sticky top-[65px] z-40 border-b border-halal-border/30 bg-halal-forest/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <input type="text" placeholder="Search the vault..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-luxury w-full sm:w-64 text-[0.85rem] py-2" />

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider transition-all duration-200
                  ${cat === c
                    ? "bg-halal-gold text-halal-forest shadow-gold"
                    : "border border-halal-border/50 text-halal-muted hover:border-halal-gold/40 hover:text-halal-gold"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Budget + occasion */}
        <div className="mx-auto mt-3 max-w-6xl flex flex-wrap gap-2">
          {OCCASIONS.map(o => (
            <button key={o} onClick={() => setOcc(o)}
              className={`rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider transition-all duration-200
                ${occ === o
                  ? "bg-halal-forest-3 text-halal-gold border border-halal-gold/40"
                  : "border border-halal-border/30 text-halal-muted hover:text-halal-cream"}`}>
              {o}
            </button>
          ))}
          <span className="mx-2 text-halal-border">|</span>
          {BUDGETS.map((b, i) => (
            <button key={b.label} onClick={() => setBudgetIdx(i)}
              className={`rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider transition-all duration-200
                ${budgetIdx === i
                  ? "bg-halal-forest-3 text-halal-gold border border-halal-gold/40"
                  : "border border-halal-border/30 text-halal-muted hover:text-halal-cream"}`}>
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[0.75rem] text-halal-muted">
              {filtered.length} {filtered.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-[1.5rem] text-halal-muted mb-3">No items found</p>
              <p className="text-[0.85rem] text-halal-muted/60">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
