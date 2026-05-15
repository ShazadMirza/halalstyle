"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
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

type VaultClientProps = {
  title: string;
  subtitle: string;
  initialCategory?: VaultCategory | "All";
  /** Extra indexable copy (rendered above filters on category hubs) */
  intro?: ReactNode;
  /** Optional block below product grid (e.g. related category links) */
  footer?: ReactNode;
};

export function VaultClient({ title, subtitle, initialCategory = "All", intro, footer }: VaultClientProps) {
  const [cat, setCat] = useState<VaultCategory | "All">(initialCategory);
  const [occ, setOcc] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [search, setSearch] = useState("");

  const budget = BUDGETS[budgetIdx];
  const filtered = useMemo(
    () =>
      VAULT_ITEMS.filter((item) => {
        if (cat !== "All" && item.category !== cat) return false;
        if (occ !== "All" && !item.occasion.includes(occ as never)) return false;
        if (budgetIdx !== 0) {
          if ("min" in budget && item.priceCAD < (budget.min ?? 0)) return false;
          if (item.priceCAD > budget.max) return false;
        }
        if (
          search &&
          !item.title.toLowerCase().includes(search.toLowerCase()) &&
          !item.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        return true;
      }),
    [cat, occ, budgetIdx, budget, search],
  );

  return (
    <main className="min-h-dvh pt-20">
      <section className="border-b border-halal-border/30 bg-halal-surface px-6 py-16 text-center pattern-bg">
        <nav className="mx-auto mb-6 max-w-6xl text-left text-[0.7rem] text-halal-muted">
          <Link href="/" className="hover:text-halal-gold">
            Home
          </Link>
          <span className="mx-2 text-halal-border">/</span>
          <Link href="/vault" className="hover:text-halal-gold">
            The Vault
          </Link>
          {initialCategory !== "All" && (
            <>
              <span className="mx-2 text-halal-border">/</span>
              <span className="text-halal-cream">{initialCategory}</span>
            </>
          )}
        </nav>
        <p className="section-eyebrow mb-4">Curated for Excellence</p>
        <h1 className="section-title mb-4">{title}</h1>
        <p className="mx-auto max-w-lg text-[0.95rem] text-halal-muted leading-relaxed">{subtitle}</p>
        {intro && <div className="mx-auto mt-10 max-w-2xl text-left text-[0.9rem] leading-relaxed text-halal-muted">{intro}</div>}
      </section>

      <section className="sticky top-[65px] z-40 border-b border-halal-border/30 bg-halal-forest/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search the vault..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-luxury w-full py-2 text-[0.85rem] sm:w-64"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider transition-all duration-200 ${
                  cat === c
                    ? "bg-halal-gold text-halal-forest shadow-gold"
                    : "border border-halal-border/50 text-halal-muted hover:border-halal-gold/40 hover:text-halal-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-3 flex max-w-6xl flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOcc(o)}
              className={`rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider transition-all duration-200 ${
                occ === o
                  ? "border border-halal-gold/40 bg-halal-forest-3 text-halal-gold"
                  : "border border-halal-border/30 text-halal-muted hover:text-halal-cream"
              }`}
            >
              {o}
            </button>
          ))}
          <span className="mx-2 text-halal-border">|</span>
          {BUDGETS.map((b, i) => (
            <button
              key={b.label}
              type="button"
              onClick={() => setBudgetIdx(i)}
              className={`rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider transition-all duration-200 ${
                budgetIdx === i
                  ? "border border-halal-gold/40 bg-halal-forest-3 text-halal-gold"
                  : "border border-halal-border/30 text-halal-muted hover:text-halal-cream"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[0.75rem] text-halal-muted">
              {filtered.length} {filtered.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <ProductCard key={item.id} item={item} cardIndex={i} showExcellenceGuard />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="mb-3 font-display text-[1.5rem] text-halal-muted">No items found</p>
              <p className="text-[0.85rem] text-halal-muted/60">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {footer && (
        <section className="border-t border-halal-border/30 bg-halal-surface/40 px-6 py-14">
          <div className="mx-auto max-w-6xl">{footer}</div>
        </section>
      )}
    </main>
  );
}
