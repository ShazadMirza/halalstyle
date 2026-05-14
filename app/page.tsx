import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { VAULT_ITEMS } from "@/lib/vault-items";
import { HalalStyleApp } from "@/components/halal-style-app";
import { NewsletterSection } from "@/components/newsletter-section";

const TRUST_ITEMS = [
  { icon: "✦", label: "100% Halal Verified" },
  { icon: "🍁", label: "Ships to Canada" },
  { icon: "⭐", label: "Amazon Trusted" },
  { icon: "🕌", label: "Deen-Aligned" },
];

const CATEGORIES = [
  { label: "Fashion", icon: "✦", href: "/vault?cat=Fashion", desc: "Abayas, dresses & modest wear" },
  { label: "Hijabs", icon: "◈", href: "/vault?cat=Hijabs", desc: "Scarves, caps & accessories" },
  { label: "Menswear", icon: "◇", href: "/vault?cat=Menswear", desc: "Thobes, kufis & essentials" },
  { label: "Home", icon: "⌂", href: "/vault?cat=Home", desc: "Prayer rugs, décor & gifts" },
];

export default function HomePage() {
  const featured = VAULT_ITEMS.filter(i => i.badge === "Editor's Pick" || i.badge === "Bestseller").slice(0, 3);

  return (
    <main className="min-h-dvh">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pattern-bg px-6 pt-20 text-center">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-halal-gold/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <span className="section-eyebrow mb-6 block animate-fade-in">
            AI-Powered Modest Fashion · Est. 2025
          </span>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.05] tracking-[-0.01em] text-halal-cream mb-6 animate-fade-up">
            The{" "}
            <span className="italic text-halal-gold">Excellence</span>
            <br />Filter for Modest<br />Fashion
          </h1>

          <p className="mx-auto mb-10 max-w-[520px] text-[1rem] leading-relaxed text-halal-cream/55 animate-fade-up"
             style={{ animationDelay: "0.1s" }}>
            We&apos;ve already vetted the world&apos;s finest products for quality and Islamic
            values — so you don&apos;t have to. Zero noise. Infinite barakah.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up"
               style={{ animationDelay: "0.2s" }}>
            <Link href="#quiz" className="btn-gold text-[0.9rem]">
              Discover My Style ✦
            </Link>
            <Link href="/vault" className="btn-outline text-[0.9rem]">
              Browse The Vault
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 inset-x-0 border-t border-halal-border/30 bg-halal-forest/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-6 py-4">
            {TRUST_ITEMS.map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-[0.7rem] font-medium tracking-wider text-halal-cream/40 uppercase">
                <span className="text-halal-gold/50">{icon}</span>{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="border-y border-halal-border/30 bg-halal-surface px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Curated Collections</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
            <Link href="/vault" className="btn-outline text-[0.75rem] py-2 px-5 hidden sm:inline-flex">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(item => <ProductCard key={item.id} item={item} />)}
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
      <footer className="border-t border-halal-border/30 px-6 py-12">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-[1.1rem] text-halal-gold tracking-widest">HalalStyle</p>
            <p className="text-[0.65rem] text-halal-muted mt-0.5">The Excellence Filter · Built by Deen Ali Mirza, age 13 · Shelburne, Ontario</p>
          </div>
          <p className="text-[0.65rem] text-halal-muted">
            © 2025 HalalStyle. Amazon affiliate links — we earn a small commission at no extra cost to you.
          </p>
        </div>
      </footer>
    </main>
  );
}


