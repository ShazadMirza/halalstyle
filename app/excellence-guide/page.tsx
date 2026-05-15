import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExcellenceGuideExecutiveGrid } from "@/components/excellence-guide-executive-grid";
import { ExcellenceGuideLookCard } from "@/components/excellence-guide-look-card";
import { ExcellenceGuidePrintBar, ExcellenceGuideWelcomeToast } from "@/components/excellence-guide-chrome";
import {
  EXCELLENCE_GUIDE_DOWNLOAD_PATH,
  EXCELLENCE_GUIDE_WEB_PATH,
} from "@/lib/excellence-guide-constants";
import { DOHA_EDIT_LOOKS, EXECUTIVE_WARDROBE_LOOKS } from "@/lib/excellence-guide-lookbook";
import { absoluteUrl } from "@/lib/site";

const HERO_MOSQUE =
  "https://images.unsplash.com/photo-1548013146-79acca42bbb3?auto=format&fit=crop&w=2400&q=88";

export const metadata: Metadata = {
  title: "2026 Excellence — Private Lookbook | HalalStyle",
  description:
    "The private digital lookbook: executive wardrobe, the Doha edit, and the ritual of quality — curated for the Excellence Circle.",
  alternates: { canonical: EXCELLENCE_GUIDE_WEB_PATH },
  openGraph: {
    title: "2026 Excellence: The Private Lookbook",
    description: "Executive modest luxury, Doha edits, and barakah in the details.",
    url: absoluteUrl(EXCELLENCE_GUIDE_WEB_PATH),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "article",
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

const DOHA_BLURBS: Record<string, string> = {
  v9: "Reciter, azan, and warm LED — the bedside command centre for focus and salah.",
  v22: "Matte vegan leather sleeve — quiet luxury for the laptop you carry between majlis and meetings.",
  v5: "Velvet prayer rug with compass pocket — masjid weight, travel-ready fold.",
  v7: "Brass girih sculpture — gold-toned geometry for a desk that doubles as a gallery wall.",
  v8: "Oud and amber candle duo — halal-friendly home scent for hosting after Maghrib.",
};

export default function ExcellenceGuidePage() {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-[#062c1d] via-[#03160f] to-[#0a0a0a] text-halal-cream">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(212,175,55,0.12),transparent_55%)]"
        aria-hidden
      />
      <ExcellenceGuideWelcomeToast />

      <main className="relative z-[2] pb-8 pt-24 print:pt-8">
        {/* Hero — full-bleed Qatar mosque + gold wash */}
        <header className="relative -mx-0 min-h-[min(78vh,640px)] w-full overflow-hidden">
          <Image
            src={HERO_MOSQUE}
            alt="Contemporary Islamic architecture in golden light — Qatar"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-halal-gold/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(212,175,55,0.35),transparent_65%)]"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 pt-32 text-center sm:pb-24">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-halal-gold/90">HalalStyle · Private</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(1.85rem,6.5vw,3.5rem)] font-medium leading-[1.12] tracking-wide text-halal-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]">
              2026 Excellence:
              <br />
              <span className="italic text-halal-gold">The Private Lookbook.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-sans text-[0.92rem] leading-relaxed text-halal-cream/85">
              Executive modesty, Doha-grade curation, and the Excellence Filter — editorial picks with active Amazon.ca
              affiliate links (<span className="text-halal-gold/90">tag=halalstyle50d-20</span>).
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={EXCELLENCE_GUIDE_DOWNLOAD_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-shop-glow inline-flex min-h-[2.85rem] items-center justify-center px-8 text-[0.85rem] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Download PDF ↗
              </a>
              <Link
                href="/vault"
                className="btn-outline inline-flex min-h-[2.85rem] items-center justify-center border-halal-cream/25 px-8 text-[0.85rem] text-halal-cream hover:border-halal-gold/50"
              >
                Shop The Vault
              </Link>
            </div>
          </div>
        </header>

        <SectionShell
          eyebrow="Section I"
          title="The Executive Wardrobe"
          intro="Three high-ticket silhouettes — premium linen thobe, luxury crepe abaya, and a structured palazzo suit for the modern Muslim executive. Each card uses the same Vault engine as the site: halal notes, ratings, and Amazon affiliate transparency."
        >
          <ExcellenceGuideExecutiveGrid items={EXECUTIVE_WARDROBE_LOOKS} />
        </SectionShell>

        <SectionShell
          eyebrow="Section II"
          title="The Doha Edit"
          intro="High-end tech, the prayer rug you reach for first, and gold-accented home pieces — curated for a desk and a diwan that both honour barakah."
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DOHA_EDIT_LOOKS.map((item) => (
              <ExcellenceGuideLookCard key={item.id} item={item} blurb={DOHA_BLURBS[item.id] ?? item.description} />
            ))}
          </div>
        </SectionShell>

        <SectionShell eyebrow="Section III" title="The Ritual of Quality" intro={undefined}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-halal-gold/20 bg-black/35 p-8 font-sans text-[0.95rem] leading-[1.75] text-halal-muted backdrop-blur-md sm:p-10">
            <p className="font-serif text-xl text-halal-gold">Barakah in the Details</p>
            <p className="mt-4">
              Excellence is not a single purchase — it is the slow craft of choosing fabrics that breathe, cuts that
              respect adab, and objects that remind you of salah between meetings. The Gulf luxury stack is not noise;
              it is restraint with intention: one thobe that travels, one abaya that commands a room without demanding
              attention, one prayer corner that resets the heart.
            </p>
            <p className="mt-4">
              At HalalStyle we filter for coverage you can trust, materials that age with dignity, and affiliate paths that
              keep the lights on without ever taxing your values. When the details align — thread, geometry, time for
              dhikr — the wardrobe becomes a witness to ihsan.
            </p>
            <p className="mt-4 text-halal-cream/90">
              This lookbook is your invitation to move from scrolling to selecting with confidence. Welcome to the Circle.
            </p>
          </div>
        </SectionShell>

        <ExcellenceGuidePrintBar />

        <footer className="mx-auto max-w-2xl px-5 pb-16 pt-4 text-center print:hidden">
          <p className="font-serif text-sm text-halal-gold/80">The Excellence Filter</p>
          <Link href="/" className="mt-3 inline-block font-sans text-[0.8rem] text-halal-muted hover:text-halal-gold">
            ← HalalStyle Home
          </Link>
          <p className="mt-6 font-sans text-[0.65rem] text-halal-muted/75">
            Amazon.ca links include our affiliate tag at no extra cost to you.
          </p>
        </footer>
      </main>
    </div>
  );
}
