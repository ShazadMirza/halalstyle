import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Curated Links`,
  description: "Start your journey to modest excellence.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: `${BRAND_NAME} — Curated Links`,
    description: "Start your journey to modest excellence.",
    url: absoluteUrl("/links"),
    siteName: BRAND_NAME,
    locale: "en_CA",
    type: "website",
  },
};

const linkBtn =
  "flex w-full max-w-[min(100%,20rem)] items-center justify-center rounded-2xl border-2 border-halal-gold/55 bg-halal-forest-2/25 px-5 py-3.5 text-center text-[0.88rem] font-medium leading-snug text-halal-cream shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] transition hover:border-halal-gold hover:bg-halal-gold/10 hover:shadow-[0_0_20px_-4px_rgba(212,175,55,0.35)] active:scale-[0.99] sm:text-[0.9rem]";

export default function LinksPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-halal-forest pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(212,175,55,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-halal-forest-2/80 via-halal-forest to-halal-surface"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-sm flex-col items-center px-5 pb-12 pt-8 sm:px-6">
        <header className="mb-12 flex w-full flex-col items-center">
          <Image
            src="/halalstyles-logo.png"
            alt={`${BRAND_NAME} logo`}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover object-center ring-2 ring-halal-gold/35 drop-shadow-[0_0_24px_rgba(212,175,55,0.45)]"
            priority
          />
          <p className="mt-4 font-brand text-xl tracking-[0.06em] text-halal-cream">{BRAND_NAME}</p>
        </header>

        <nav className="flex w-full flex-1 flex-col items-center gap-3.5" aria-label={`${BRAND_NAME} links`}>
          <Link href="/#quiz" className={linkBtn}>
            ✦ Take the Style Quiz
          </Link>
          <Link href="/#newsletter" className={linkBtn}>
            📥 Download the 2026 Excellence Guide
          </Link>
          <Link href="/vault" className={linkBtn}>
            🛍️ Shop the Executive Vault
          </Link>
          <Link href="/partners" className={linkBtn}>
            🤝 Join the Excellence Circle (Creators)
          </Link>
        </nav>

        <footer className="mt-auto w-full pt-16 text-center">
          <p className="text-[0.7rem] tracking-wide text-halal-muted">Curated by Deen, age 14</p>
        </footer>
      </div>
    </main>
  );
}
