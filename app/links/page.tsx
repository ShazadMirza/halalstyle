import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "HalalStyle — Curated Links",
  description: "Start your journey to modest excellence.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "HalalStyle — Curated Links",
    description: "Start your journey to modest excellence.",
    url: absoluteUrl("/links"),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
};

export default function LinksPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(212,175,55,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03160f] via-halal-forest to-halal-surface"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-sm flex-col px-5 pb-10 pt-6 sm:px-6">
        <header className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="HalalStyle"
            width={140}
            height={28}
            className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
            priority
          />
          <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-halal-gold/70">
            The Excellence Filter
          </p>
        </header>

        <nav className="flex flex-1 flex-col gap-3" aria-label="HalalStyle links">
          <Link
            href="/#quiz"
            className="btn-gold btn-shop-glow flex w-full justify-center py-3.5 text-center text-[0.9rem] font-medium tracking-wide"
          >
            Take the Style Quiz
          </Link>
          <Link
            href="/#newsletter"
            className="btn-outline flex w-full justify-center border-halal-gold/45 py-3.5 text-center text-[0.9rem] text-halal-cream hover:border-halal-gold hover:bg-halal-gold/10"
          >
            The 2026 Excellence Guide
          </Link>
          <Link
            href="/vault"
            className="btn-outline flex w-full justify-center border-halal-gold/35 py-3.5 text-center text-[0.9rem] text-halal-cream hover:border-halal-gold/55 hover:bg-halal-gold/5"
          >
            Shop the Executive Vault
          </Link>
          <Link
            href="/partners"
            className="flex w-full justify-center rounded-xl border border-halal-border/25 bg-halal-forest-2/30 py-3 text-center text-[0.82rem] text-halal-muted transition hover:border-halal-border/50 hover:text-halal-cream/90"
          >
            Apply to Join the Circle
          </Link>
        </nav>

        <footer className="mt-auto pt-14 text-center">
          <p className="text-[0.7rem] tracking-wide text-halal-muted">Built by Deen, age 14</p>
        </footer>
      </div>
    </main>
  );
}
