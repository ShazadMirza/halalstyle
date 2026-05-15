import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExcellenceGuideMosaicOverlay } from "@/components/excellence-guide-mosaic-overlay";
import {
  EXCELLENCE_GUIDE_DOWNLOAD_PATH,
  EXCELLENCE_GUIDE_WEB_PATH,
} from "@/lib/excellence-guide-constants";
import { FRIDAY_STANDARD_LOOKS, TECH_EDIT_LOOKS, TREND_REPORT_LOOKS } from "@/lib/excellence-guide-lookbook";
import { resolveVaultItemImageSrc } from "@/lib/amazon-utils";
import { absoluteUrl } from "@/lib/site";
import type { VaultItem } from "@/lib/vault-items";

export const metadata: Metadata = {
  title: "2026 Excellence Guide — HalalStyle",
  description:
    "The definitive digital lookbook for modest luxury: trend report, Jummah standards, and the faith-forward tech edit.",
  alternates: { canonical: EXCELLENCE_GUIDE_WEB_PATH },
  openGraph: {
    title: "2026 Excellence: The Definitive Guide to Modest Luxury",
    description: "Doha minimalism, Dubai opulence, and the Friday Standard — curated by HalalStyle.",
    url: absoluteUrl(EXCELLENCE_GUIDE_WEB_PATH),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "article",
  },
};

function LookMosaicCard({ item, blurb }: { item: VaultItem; blurb: string }) {
  const src = resolveVaultItemImageSrc(item);
  if (!src) return null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-halal-gold/20 bg-halal-surface/40 shadow-card backdrop-blur-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
        <Image
          src={src}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <ExcellenceGuideMosaicOverlay />
      </div>
      <div className="border-t border-halal-gold/20 p-4 sm:p-5">
        <p className="font-brand text-[0.7rem] uppercase tracking-[0.2em] text-halal-gold/80">{item.brand}</p>
        <h3 className="mt-1 font-brand text-lg leading-snug tracking-[0.04em] text-halal-cream">{item.title}</h3>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-halal-muted">{blurb}</p>
        <p className="mt-2 font-medium text-halal-gold/90">{item.priceRange}</p>
        <a
          href={item.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-3 inline-flex text-[0.72rem] font-medium uppercase tracking-wider text-halal-gold underline-offset-4 hover:underline"
        >
          Shop on Amazon →
        </a>
      </div>
    </article>
  );
}

function MosaicSection({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="relative border-t border-halal-gold/20 px-5 py-16 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-halal-surface/30" aria-hidden />
      <div className="relative z-[2] mx-auto max-w-6xl">
        <p className="section-eyebrow mb-2 text-halal-gold">{eyebrow}</p>
        <h2 className="font-brand text-[clamp(1.5rem,4vw,2.25rem)] font-medium tracking-[0.06em] text-halal-cream">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-halal-muted">{intro}</p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const TREND_BLURBS: Record<string, string> = {
  v11: "Boardroom palazzo energy — structured crepe for the executive who commutes between cities.",
  v1: "Doha quiet luxury: one fluid abaya, zero noise — crepe drape that reads restraint.",
  v4: "Dubai after-dark: wrap maxi with presence for galas without compromising coverage.",
  v3: "Gulf Friday uniform: linen thobe, mandarin collar, breathable for long khutbahs.",
  v9: "High-ticket faith tech at bedside — reciter, azan, soft light for the travelling founder.",
};

const FRIDAY_BLURBS: Record<string, string> = {
  v3: "Tailored thobe for Jummah and post-prayer coffee — ankle coverage, modern cut.",
  v1: "Full-length crepe abaya — opaque, loose, masjid-ready in one pull from the hanger.",
  v2: "Jersey hijab set that stays put from sujood to sidewalk — bestseller for a reason.",
  v5: "Velvet prayer rug with compass pocket — dignity on the musalla, packable for travel.",
};

const TECH_BLURBS: Record<string, string> = {
  v9: "Azan, recitation, and warm LED — the bedside command centre for salah discipline.",
  v22: "Matte vegan leather sleeve — gold-adjacent hardware feel without loud logos.",
  v19: "Mechanical tasbeeh in steel — tactile dhikr between meetings.",
  v21: "Ramadan lantern calendar — LED panels, Islamic geometry, family tradition.",
};

export default function ExcellenceGuidePage() {
  return (
    <main className="relative min-h-dvh bg-halal-forest pb-24 pt-24 text-halal-cream">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.14),transparent_55%)]"
        aria-hidden
      />

      {/* Cover */}
      <header className="relative overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03160f] via-halal-forest to-halal-surface" aria-hidden />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(115deg, rgba(212,175,55,0.15) 1px, transparent 1px),
              linear-gradient(-65deg, rgba(212,175,55,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px, 48px 48px",
          }}
          aria-hidden
        />
        <ExcellenceGuideMosaicOverlay className="opacity-90" />
        <div className="relative z-[2] mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-halal-gold/80">HalalStyle · 2026</p>
          <h1 className="mt-6 font-brand text-[clamp(1.75rem,6vw,3.25rem)] font-medium leading-[1.12] tracking-[0.05em] text-halal-cream">
            2026 Excellence:
            <br />
            <span className="italic text-halal-gold">The Definitive Guide</span>
            <br />
            <span className="text-halal-cream/95">to Modest Luxury.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-halal-muted">
            A Vogue-Arabia-inspired lookbook — mosaic, gold, and editorial picks from The Vault. Save this page on
            your phone for sharpest typography; download the PDF for offline reading.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={EXCELLENCE_GUIDE_DOWNLOAD_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-shop-glow inline-flex min-h-[3rem] min-w-[220px] items-center justify-center px-8 py-3 text-[0.88rem] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Download PDF ↗
            </a>
            <Link href="/#newsletter" className="btn-outline inline-flex min-h-[3rem] min-w-[200px] items-center justify-center border-halal-gold/40 px-6 py-3 text-[0.85rem]">
              Get email updates
            </Link>
          </div>
        </div>
      </header>

      <MosaicSection
        eyebrow="The Trend Report"
        title="Doha Minimalism vs. Dubai Opulence"
        intro="Five high-ticket silhouettes for the modern Muslim executive — from whisper-quiet crepe to statement maxi and faith-forward bedside tech. Each frame carries the Emerald & Gold mosaic; imagery follows the same editorial Unsplash / Vault pipeline as The Vault."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TREND_REPORT_LOOKS.map((item) => (
            <LookMosaicCard key={item.id} item={item} blurb={TREND_BLURBS[item.id] ?? item.description} />
          ))}
        </div>
      </MosaicSection>

      <MosaicSection
        eyebrow="The Friday Standard"
        title="Jummah — and everything after"
        intro="Curated thobes, abayas, hijabs, and a prayer rug worthy of the front row. Built for the masjid run, the office afternoon, and the barakah in between."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FRIDAY_STANDARD_LOOKS.map((item) => (
            <LookMosaicCard key={item.id} item={item} blurb={FRIDAY_BLURBS[item.id] ?? item.description} />
          ))}
        </div>
      </MosaicSection>

      <MosaicSection
        eyebrow="The Tech Edit"
        title="Gold-accented tools for focus & faith"
        intro="Hardware that respects salah: reciters, dhikr counters, and carry that looks at home beside a MacBook — no compromise on ihsan or aesthetics."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_EDIT_LOOKS.map((item) => (
            <LookMosaicCard key={item.id} item={item} blurb={TECH_BLURBS[item.id] ?? item.description} />
          ))}
        </div>
      </MosaicSection>

      <footer className="relative z-[2] mx-auto max-w-2xl px-5 pt-8 text-center">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-halal-muted">The Excellence Filter</p>
        <Link href="/vault" className="mt-4 inline-flex text-halal-gold underline-offset-4 hover:underline">
          Shop the full Vault →
        </Link>
        <p className="mt-8 text-[0.65rem] text-halal-muted/80">
          Amazon affiliate links on product tiles — we may earn a commission at no extra cost to you.
        </p>
      </footer>
    </main>
  );
}
