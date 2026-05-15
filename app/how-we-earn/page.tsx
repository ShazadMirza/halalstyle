import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Vet & How We Earn",
  description:
    "HalalStyle’s editorial standards, affiliate disclosure, and how we curate halal-verified modest fashion for Canadian Muslim families.",
  alternates: { canonical: "/how-we-earn" },
  openGraph: {
    title: "How We Vet & How We Earn — HalalStyle",
    description: "Transparency on curation, modesty notes, and Amazon affiliate commissions.",
    url: absoluteUrl("/how-we-earn"),
  },
};

export default function HowWeEarnPage() {
  return (
    <main className="min-h-dvh pt-20">
      <section className="border-b border-halal-border/30 bg-halal-surface px-6 py-16 pattern-bg">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mb-4">Transparency</p>
          <h1 className="section-title mb-6">How We Vet &amp; How We Earn</h1>
          <p className="text-[0.95rem] text-halal-muted leading-relaxed">
            HalalStyle exists to save you time — not to hide how the lights stay on. Here is exactly how we choose products and
            how affiliate links work.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl space-y-10 text-[0.95rem] leading-relaxed text-halal-muted">
          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Editorial curation</h2>
            <p>
              Every Vault listing and quiz recommendation is selected for a blend of quality, modest coverage (as described in
              plain language on each card), and fit for Canadian shoppers. We are not a certification body; we apply a
              consistent editorial lens so you can decide quickly with fewer tabs open.
            </p>
          </div>
          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Amazon affiliate links</h2>
            <p>
              Many outbound links to Amazon.ca (and search links we use as discovery shortcuts) include our affiliate tag. When
              you purchase through those links, we may earn a small commission at <strong className="text-halal-cream">no extra
              cost to you</strong>. That income supports hosting, tooling, and ongoing curation — it never changes the price you
              pay on Amazon.
            </p>
          </div>
          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">AI-assisted quiz</h2>
            <p>
              The Style Quiz uses AI to map your answers to product ideas. Outputs can vary; we encourage you to verify sizing,
              fabric, and seller details on Amazon before you buy. If something misses the mark, adjust filters in The Vault or
              retake the quiz.
            </p>
          </div>
          <div className="rounded-2xl border border-halal-gold/25 bg-halal-gold/5 p-6 text-[0.9rem] text-halal-cream/90">
            <p className="font-medium text-halal-gold">Our commitment</p>
            <p className="mt-2">
              We only win when you trust the experience. If you prefer not to use affiliate links, you can search product names
              directly on Amazon — we still hope The Vault helps you discover what to look for.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/vault" className="btn-outline px-6 py-2 text-[0.8rem]">
              Browse The Vault
            </Link>
            <Link href="/#quiz" className="btn-gold btn-shop-glow px-6 py-2 text-[0.8rem]">
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
