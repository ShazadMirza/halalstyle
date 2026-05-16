import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { SocialProofStrip } from "@/components/social-proof-strip";
import { HalalStyleApp } from "@/components/halal-style-app";
import { NewsletterSection } from "@/components/newsletter-section";
import { ProductCard } from "@/components/product-card";
import { VAULT_ITEMS } from "@/lib/vault-items";
import { vaultCategoryToSlug } from "@/lib/vault-category-seo";
import { buildHomeMetadata } from "@/lib/social-metadata";
import { BRAND_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildHomeMetadata(absoluteUrl("/"));

const CATEGORIES = [
  { label: "Fashion", icon: "✦", href: `/vault/${vaultCategoryToSlug("Fashion")}`, desc: "Abayas, dresses & modest wear" },
  { label: "Hijabs", icon: "◈", href: `/vault/${vaultCategoryToSlug("Hijabs")}`, desc: "Scarves, caps & accessories" },
  { label: "Menswear", icon: "◇", href: `/vault/${vaultCategoryToSlug("Menswear")}`, desc: "Thobes, kufis & essentials" },
  { label: "Home", icon: "⌂", href: `/vault/${vaultCategoryToSlug("Home")}`, desc: "Prayer rugs, décor & gifts" },
  { label: "Kids", icon: "👶", href: `/vault/${vaultCategoryToSlug("Kids")}`, desc: "Modest sets for Eid & Jummah." },
  { label: "Gifts", icon: "✧", href: `/vault/${vaultCategoryToSlug("Gifts")}`, desc: "Faith-forward tech, books & more" },
] as const;

export default function HomePage() {
  const featured = VAULT_ITEMS.filter(i => i.badge === "Editor's Pick" || i.badge === "Bestseller").slice(0, 3);

  return (
    <main className="min-h-dvh">

      {/* ── HERO ─────────────────────────────────────────── */}
      <HomeHero />
      <SocialProofStrip />

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="border-y border-halal-border/30 bg-halal-surface px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Curated Collections</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map(({ label, icon, href, desc }) => (
              <Link key={label} href={href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-halal-border/40
                           bg-halal-forest-2/40 p-6 text-center transition-all duration-300
                           hover:border-halal-gold/30 hover:bg-halal-forest-2/70 hover:-translate-y-1">
                <span className="font-display text-[1.5rem] text-halal-gold/60 group-hover:text-halal-gold transition-colors">
                  {icon}
                </span>
                <span className="font-display text-[1rem] text-halal-cream">{label}</span>
                <span className="text-[0.7rem] text-halal-muted leading-snug">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PICKS ───────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-3">Editor&apos;s Selection</p>
              <h2 className="section-title">Featured Picks</h2>
            </div>
            <Link href="/vault" className="btn-outline hidden px-5 py-2 text-[0.75rem] sm:inline-flex">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => (
              <ProductCard
                key={item.id}
                item={item}
                priority
                cardIndex={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ ─────────────────────────────────────────── */}
      <section id="quiz" className="border-t border-halal-border/30 bg-halal-surface px-6 py-20">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="section-eyebrow mb-3">Personalised for You</p>
          <h2 className="section-title mb-4">Find Your Perfect Style</h2>
          <p className="text-[0.95rem] text-halal-muted leading-relaxed">
            Answer 4 questions. Our AI curates 5 halal-verified picks tailored to your style, budget, and occasion.
          </p>
        </div>
        <HalalStyleApp />
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <NewsletterSection />

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-halal-border/30 bg-halal-forest/75 px-6 py-12 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.14em] text-halal-muted">
            <Link href="/how-we-earn" className="hover:text-halal-gold">
              How we vet &amp; earn
            </Link>
            <Link href="/about" className="hover:text-halal-gold">
              Our story
            </Link>
            <Link href="/partners" className="hover:text-halal-gold">
              Partners
            </Link>
            <Link href="/vault" className="hover:text-halal-gold">
              The Vault
            </Link>
            <Link href="/journal" className="hover:text-halal-gold">
              Journal
            </Link>
            <Link href="/privacy" className="hover:text-halal-gold">
              Privacy Policy
            </Link>
          </div>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
              <Image
                src="/halalstyles-logo.png"
                alt={`${BRAND_NAME} logo`}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover object-center ring-1 ring-halal-gold/25 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              />
              <div className="flex flex-col items-center gap-1 sm:items-start">
                <span className="font-brand text-[1.1rem] tracking-[0.06em] text-halal-cream">{BRAND_NAME}</span>
                <p className="text-center text-[0.65rem] text-halal-muted sm:text-left">
                  The Excellence Filter · Built by Deen Ali Mirza, age 14 · Shelburne, Ontario
                </p>
              </div>
            </div>
            <p className="max-w-md text-[0.65rem] text-halal-muted">
              © 2026 {BRAND_NAME}. Amazon affiliate links — we earn a small commission at no extra cost to you.{" "}
              <Link href="/how-we-earn" className="text-halal-gold/90 underline-offset-2 hover:underline">
                Read our disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
