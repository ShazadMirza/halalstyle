import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExcellenceGuideExecutiveGrid } from "@/components/excellence-guide-executive-grid";
import {
  ExcellenceGuideStickyVault,
  ExcellenceGuidePrintBar,
  ExcellenceGuideWelcomeBanner,
} from "@/components/excellence-guide-chrome";
import {
  EXCELLENCE_GUIDE_DOWNLOAD_PATH,
  EXCELLENCE_GUIDE_WEB_PATH,
} from "@/lib/excellence-guide-constants";
import {
  DOHA_EXECUTIVE_LOOKS,
  FRIDAY_STANDARD_LOOKS,
  TECH_EDIT_LOOKS,
  vaultItemsWithLookbookAttribution,
} from "@/lib/excellence-guide-lookbook";
import { excellenceGuideLookbookLocalHref } from "@/lib/excellence-guide-lookbook-attribution";
import { absoluteUrl } from "@/lib/site";

const HERO_QATAR =
  "https://images.unsplash.com/photo-1565008576519-a61d59963765?auto=format&fit=crop&w=2400&q=88";

const GUIDE_KEYWORDS = [
  "modest luxury fashion guide 2026",
  "halal lifestyle guide",
  "Islamic fashion lookbook",
  "modest luxury Canada",
  "halal verified fashion",
  "Muslim executive wardrobe",
  "modest fashion guide",
] as const;

const OG_EXCELLENCE_IMAGE = {
  url: "/og/excellence-guide-2026.jpg",
  width: 1200,
  height: 630,
  alt: "2026 Excellence Guide — modest luxury lookbook by HalalStyles",
} as const;

export const metadata: Metadata = {
  title: "2026 Excellence: The Private Lookbook | HalalStyles",
  description:
    "Curated for the Muslim high-achiever. Vetted for barakah. Doha executive wardrobe, the Friday standard, and the tech edit — with halal-verified Amazon.ca picks.",
  keywords: [...GUIDE_KEYWORDS],
  alternates: { canonical: EXCELLENCE_GUIDE_WEB_PATH },
  openGraph: {
    title: "2026 Excellence: The Private Lookbook | HalalStyles",
    description: "Modest luxury. Curated. Verified. Free.",
    url: absoluteUrl(EXCELLENCE_GUIDE_WEB_PATH),
    siteName: "HalalStyles",
    locale: "en_CA",
    type: "article",
    images: [OG_EXCELLENCE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Excellence: The Private Lookbook | HalalStyles",
    description: "Modest luxury. Curated. Verified. Free.",
    images: [OG_EXCELLENCE_IMAGE.url],
  },
};

function SectionShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative border-t border-halal-gold/20 px-5 py-16 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
      <div className="relative z-[2] mx-auto max-w-6xl">
        <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-halal-gold/85">{eyebrow}</p>
        <h2 className="font-serif text-[clamp(1.55rem,4vw,2.35rem)] font-medium leading-tight tracking-wide text-halal-cream">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-halal-muted">{intro}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const DOHA_EXECUTIVE_ITEMS = vaultItemsWithLookbookAttribution(DOHA_EXECUTIVE_LOOKS);
const FRIDAY_STANDARD_ITEMS = vaultItemsWithLookbookAttribution(FRIDAY_STANDARD_LOOKS);
const TECH_EDIT_ITEMS = vaultItemsWithLookbookAttribution(TECH_EDIT_LOOKS);

const FOUNDER_WELCOME =
  "You're in the Circle. Start your journey with our top 20 picks for 2026.";

export default function ExcellenceGuidePage() {
  const pdfHref = excellenceGuideLookbookLocalHref(EXCELLENCE_GUIDE_DOWNLOAD_PATH);
  const vaultHref = excellenceGuideLookbookLocalHref("/vault");
  const homeHref = excellenceGuideLookbookLocalHref("/");

  return (
    <div className="relative min-h-dvh bg-halal-forest-dark text-halal-cream">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(212,175,55,0.1),transparent_55%)]"
        aria-hidden
      />
      <ExcellenceGuideWelcomeBanner />
      <ExcellenceGuideStickyVault />

      <main className="relative z-[2] pb-8 pt-24 print:pt-8">
        <header className="relative min-h-[min(88vh,720px)] w-full overflow-hidden">
          <Image
            src={HERO_QATAR}
            alt="Modern Qatar skyline at dusk — contemporary Gulf architecture"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-halal-forest-dark via-halal-forest-dark/88 to-halal-gold/15"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_25%,rgba(212,175,55,0.22),transparent_60%)]"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 pt-32 text-center sm:pb-24">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-halal-gold/90">HalalStyles · Private</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(1.85rem,6.5vw,3.5rem)] font-medium leading-[1.12] tracking-wide text-halal-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]">
              2026 Excellence: The Private Lookbook
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-[clamp(1rem,2.8vw,1.2rem)] font-normal leading-relaxed text-halal-cream/90">
              Curated for the Muslim High-Achiever. Vetted for Barakah.
            </p>
            <p className="mx-auto mt-4 max-w-lg font-sans text-[0.88rem] leading-relaxed text-halal-muted">
              Executive picks with active Amazon.ca affiliate links (
              <span className="text-halal-gold/90">tag=halalstyle50d-20</span>).
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-shop-glow inline-flex min-h-[2.85rem] items-center justify-center px-8 text-[0.85rem] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Download PDF ↗
              </a>
              <Link
                href={vaultHref}
                className="btn-outline inline-flex min-h-[2.85rem] items-center justify-center border-halal-cream/25 px-8 text-[0.85rem] text-halal-cream hover:border-halal-gold/50"
              >
                Shop The Vault
              </Link>
            </div>
          </div>
        </header>

        <section className="relative border-t border-halal-gold/15 px-5 py-14 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden />
          <div className="relative z-[2] mx-auto max-w-3xl rounded-2xl border border-halal-gold/25 bg-black/40 p-8 text-center backdrop-blur-md sm:p-10">
            <p className="font-serif text-[0.7rem] font-medium uppercase tracking-[0.28em] text-halal-gold/90">
              Founder&apos;s welcome
            </p>
            <p className="mt-3 font-serif text-xl text-halal-cream">Deen Ali Mirza</p>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[0.95rem] leading-relaxed text-halal-muted">
              {FOUNDER_WELCOME}
            </p>
          </div>
        </section>

        <SectionShell
          eyebrow="Section I"
          title="The Doha Executive"
          intro="Three high-ticket silhouettes — premium linen thobe, luxury crepe abaya, and a structured palazzo suit. Each card carries the Excellence Filter: halal notes, ratings, and transparent Amazon.ca discovery links."
        >
          <ExcellenceGuideExecutiveGrid items={DOHA_EXECUTIVE_ITEMS} />
        </SectionShell>

        <SectionShell
          eyebrow="Section II"
          title="The Friday Standard"
          intro="Two prayer rugs that earn permanent floor space — plus a luxury miswak set worthy of your travel duffle or Eid table."
        >
          <ExcellenceGuideExecutiveGrid items={FRIDAY_STANDARD_ITEMS} />
        </SectionShell>

        <SectionShell
          eyebrow="Section III"
          title="The Tech Edit"
          intro="Gold-accented laptop protection, a faith-forward bedside command centre, and stainless dhikr hardware — tools that respect both boardroom and masjid."
        >
          <ExcellenceGuideExecutiveGrid items={TECH_EDIT_ITEMS} />
        </SectionShell>

        <SectionShell eyebrow="Coda" title="Barakah in the Details" intro={undefined}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-halal-gold/20 bg-black/35 p-8 font-sans text-[0.95rem] leading-[1.75] text-halal-muted backdrop-blur-md sm:p-10">
            <p className="font-serif text-xl text-halal-gold">The Excellence Filter</p>
            <p className="mt-4">
              Excellence is not a single purchase — it is the slow craft of choosing fabrics that breathe, cuts that
              respect adab, and objects that remind you of salah between meetings.
            </p>
            <p className="mt-4">
              At HalalStyles we filter for coverage you can trust, materials that age with dignity, and affiliate paths
              that keep the lights on without ever taxing your values.
            </p>
            <p className="mt-4 text-halal-cream/90">Welcome to the Circle.</p>
          </div>
        </SectionShell>

        <ExcellenceGuidePrintBar />

        <footer className="mx-auto max-w-2xl px-5 pb-16 pt-4 text-center print:hidden">
          <p className="font-serif text-sm text-halal-gold/80">HalalStyles</p>
          <Link href={homeHref} className="mt-3 inline-block font-sans text-[0.8rem] text-halal-muted hover:text-halal-gold">
            ← Home
          </Link>
          <p className="mt-6 font-sans text-[0.65rem] text-halal-muted/75">
            Amazon.ca links include our affiliate tag at no extra cost to you.
          </p>
        </footer>
      </main>
    </div>
  );
}
