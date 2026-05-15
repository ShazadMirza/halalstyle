import Link from "next/link";
import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story — HalalStyle | Halal Fashion Canada",
  description:
    "HalalStyle was built by Deen Ali Mirza, age 14, from Shelburne Ontario. The Excellence Filter for Canadian Muslim families seeking halal-verified modest fashion.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Story — HalalStyle | Halal Fashion Canada",
    description:
      "HalalStyle was built by Deen Ali Mirza, age 14, from Shelburne Ontario. The Excellence Filter for Canadian Muslim families seeking halal-verified modest fashion.",
    url: absoluteUrl("/about"),
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh pt-20">

      {/* Hero */}
      <section className="border-b border-halal-border/30 bg-halal-surface px-6 py-20 text-center pattern-bg">
        <p className="section-eyebrow mb-4">The Story Behind the Filter</p>
        <h1 className="section-title mb-6 max-w-2xl mx-auto">
          Built by a 14-Year-Old.<br />
          <span className="italic text-halal-gold">Inspired by Faith.</span>
        </h1>
        <p className="mx-auto max-w-lg text-[1rem] text-halal-muted leading-relaxed">
          HalalStyle was born from a simple question: why should modest fashion mean compromising on quality?
        </p>
      </section>

      {/* Story */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="rounded-2xl border border-halal-border/40 bg-halal-forest-2/30 p-8">
            <p className="section-eyebrow mb-4">The Founder</p>
            <h2 className="font-display text-[1.5rem] text-halal-cream mb-4">Deen Ali Mirza</h2>
            <p className="text-[0.9rem] text-halal-muted leading-relaxed mb-4">
              I&apos;m Deen — I built HalalStyle when I was 14 years old in Shelburne, Ontario.
              I grew up watching my family struggle to find fashion that was both high-quality and
              aligned with our values. Everything was either cheap and modest, or beautiful and immodest.
              Nothing in between.
            </p>
            <p className="text-[0.9rem] text-halal-muted leading-relaxed mb-4">
              I wanted to build something different — a curation engine that acts like a trusted friend
              who&apos;s already vetted everything for you. No compromises. Just excellence and barakah.
            </p>
            <p className="text-[0.9rem] text-halal-muted leading-relaxed">
              HalalStyle is my contribution to the global Muslim community — powered by AI, guided by values.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-2xl border border-halal-gold/20 bg-halal-gold/5 p-8">
            <p className="section-eyebrow mb-4">Our Mission</p>
            <h2 className="font-display text-[1.3rem] text-halal-gold mb-4 italic">
              &ldquo;Zero noise. Infinite barakah.&rdquo;
            </h2>
            <p className="text-[0.9rem] text-halal-muted leading-relaxed">
              We exist to close the gap between aspiration and compliance.
              Every item in our vault is hand-curated and AI-verified against two standards:
              exceptional quality and genuine Islamic values.
              We don&apos;t list everything — we list the best.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: "✦", title: "Halal First", body: "Every product is verified against Islamic modesty standards before it enters the vault." },
              { icon: "◈", title: "Quality Always", body: "We only feature items we\'d buy ourselves. Cheap fast fashion has no place here." },
              { icon: "◇", title: "Community", body: "HalalStyle is built for the global Muslim community, from Canada to the world." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-xl border border-halal-border/40 bg-halal-forest-2/30 p-5 text-center">
                <span className="font-display text-[1.2rem] text-halal-gold/60 block mb-3">{icon}</span>
                <h3 className="font-display text-[0.9rem] text-halal-cream mb-2">{title}</h3>
                <p className="text-[0.75rem] text-halal-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link href="/#quiz" className="btn-gold">
              Take the Style Quiz ✦
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
