"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExcellenceGuideModal } from "@/components/excellence-guide-modal";

const TRUST_ITEMS = [
  { icon: "✦", label: "100% Halal Verified" },
  { icon: "🍁", label: "Ships to Canada" },
  { icon: "⭐", label: "Amazon Trusted" },
  { icon: "🕌", label: "Deen-Aligned" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

export function HomeHero() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pattern-bg px-6 pt-20 text-center">
        <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-halal-gold/5 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-3xl">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="section-eyebrow mb-6 block"
          >
            AI-Powered Modest Fashion · Est. 2025
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-6 font-brand text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.05] tracking-[0.06em] text-halal-cream"
          >
            The{" "}
            <span className="italic text-halal-gold">Excellence</span>
            <br />
            Filter for Modest
            <br />
            Fashion
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-[520px] text-[1rem] leading-relaxed text-halal-cream/55"
          >
            We&apos;ve already vetted the world&apos;s finest products for quality and Islamic values — so you
            don&apos;t have to. Zero noise. Infinite barakah.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <Link href="#quiz" className="btn-gold btn-shop-glow text-[0.9rem]">
              Discover My Style ✦
            </Link>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="btn-outline border-halal-gold/55 text-[0.9rem] hover:border-halal-gold hover:bg-halal-gold/15"
            >
              Get the Guide ✦
            </button>
            <Link href="/vault" className="btn-outline text-[0.9rem]">
              Browse The Vault
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 border-t border-halal-border/30 bg-halal-forest/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-6 py-4">
            {TRUST_ITEMS.map(({ icon, label }, idx) => (
              <motion.span
                key={label}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 5, repeat: Infinity, delay: idx * 0.35, ease: "easeInOut" }}
                className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-wider text-halal-cream/50"
              >
                <span className="text-halal-gold/50">{icon}</span>
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <ExcellenceGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
