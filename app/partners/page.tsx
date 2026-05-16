"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { isValidEmail } from "@/lib/email";

const BENEFITS = [
  {
    icon: "✦",
    title: "10–15% high-ticket commissions",
    body: "Earn on curated modest luxury SKUs with strong AOV — Amazon.ca affiliate programme with our optimised tagging.",
  },
  {
    icon: "◈",
    title: "Verified Excellence Badge",
    body: "Eligible partners receive a HalalStyles trust mark for your bio, link-in-bio, and newsletter footers.",
  },
  {
    icon: "◇",
    title: "Early Vault drops",
    body: "First access to new categories and seasonal capsules before public launch — perfect for planning content.",
  },
  {
    icon: "✧",
    title: "Dedicated promo assets",
    body: "Gold/emerald story frames, quote cards, and quiz deep-links sized for Reels, Shorts, and Pinterest.",
  },
  {
    icon: "⌂",
    title: "Revenue dashboard (coming soon)",
    body: "We’re building a lightweight partner hub for clicks, conversions, and payout milestones — you’ll be first in line.",
  },
] as const;

export default function PartnersPage() {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [persistenceMode, setPersistenceMode] = useState<"database" | "email_only" | "demo" | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!socialHandle.trim()) {
      setError("Please enter your social handle (@username or profile URL).");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const payload = { name: name.trim(), social_handle: socialHandle.trim(), email: email.trim() };
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        persistence?: "database" | "email_only" | "demo";
      };
      if (!res.ok) throw new Error(data.error || "Request failed");
      console.log("[partners] application submitted", payload);
      setPersistenceMode(data.persistence ?? "demo");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-halal-obsidian pb-20 pt-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <p className="section-eyebrow mb-4 text-center">Affiliate Programme</p>
        <h1 className="text-center font-brand text-[clamp(2rem,5vw,2.85rem)] font-medium leading-tight tracking-[0.06em] text-halal-cream">
          Join the <span className="text-halal-gold">Excellence Circle</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[0.95rem] leading-relaxed text-halal-muted">
          Partner with HalalStyles — Canada’s AI-curated modest luxury filter. Limited collaborations each season for
          aligned creators and brands.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:partners@halalstyles55.com?subject=HalalStyles%20Excellence%20Circle%20—%20Partnership%20Inquiry"
            className="btn-gold btn-shop-glow inline-flex justify-center px-8 py-3 text-[0.9rem]"
          >
            Join the Circle — email us
          </a>
          <a href="#partner-apply" className="btn-outline inline-flex justify-center px-8 py-3 text-[0.9rem]">
            Apply online ↓
          </a>
        </div>

        {/* Swiss-luxury hero surface — no stock/AI imagery until partner assets ship */}
        <div
          className="partner-hero-surface relative mt-10 overflow-hidden rounded-2xl border border-halal-gold/25 p-8 text-center shadow-card"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.14),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-halal-forest via-[#0a3d28] to-[#03160f]" />
          <p className="relative font-brand text-[2.5rem] leading-none tracking-[0.2em] text-halal-gold/30">✦</p>
          <p className="relative mt-3 font-brand text-sm tracking-[0.25em] text-halal-gold/80">
            EXCELLENCE CIRCLE
          </p>
          <p className="relative mt-2 text-[0.75rem] uppercase tracking-[0.2em] text-halal-muted">
            Partner assets coming soon
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(({ icon, title, body }) => (
            <li
              key={title}
              className="overflow-hidden rounded-2xl border border-halal-border/50 bg-card-gradient shadow-card transition hover:border-halal-gold/30"
            >
              <div className="partner-benefit-header flex items-center gap-3 border-b border-halal-border/30 bg-gradient-to-r from-halal-forest-2 via-[#0a3d28] to-halal-forest px-5 py-4">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-halal-gold/35 bg-halal-gold/10 font-display text-lg text-halal-gold"
                  aria-hidden
                >
                  {icon}
                </span>
                <p className="font-brand text-[0.95rem] font-medium tracking-[0.06em] text-halal-gold">{title}</p>
              </div>
              <p className="p-5 text-[0.8rem] leading-relaxed text-halal-muted">{body}</p>
            </li>
          ))}
        </ul>

        {!done ? (
          <form
            id="partner-apply"
            onSubmit={(e) => void onSubmit(e)}
            className="mt-12 scroll-mt-28 rounded-2xl border border-halal-border/50 bg-card-gradient p-8 shadow-card sm:p-10"
          >
            <h2 className="mb-6 text-center font-brand text-xl tracking-[0.06em] text-halal-cream">Apply in 60 seconds</h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="p-name" className="mb-2 block text-[0.85rem] font-medium text-halal-cream">
                  Name
                </label>
                <input
                  id="p-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-luxury"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="p-social" className="mb-2 block text-[0.85rem] font-medium text-halal-cream">
                  Social Handle (@username) <span className="text-halal-gold">*</span>
                </label>
                <input
                  id="p-social"
                  name="social_handle"
                  required
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  className="input-luxury"
                  placeholder="@yourbrand or full profile URL"
                  autoComplete="username"
                />
              </div>
              <div>
                <label htmlFor="p-email" className="mb-2 block text-[0.85rem] font-medium text-halal-cream">
                  Email
                </label>
                <input
                  id="p-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-luxury"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-center text-[0.85rem] text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold btn-shop-glow mt-8 w-full justify-center py-4 text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending…" : "Request partnership ✦"}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="mt-12 rounded-2xl border border-halal-gold/30 bg-halal-surface/90 p-10 text-center shadow-[0_0_48px_-10px_rgba(212,175,55,0.35)] backdrop-blur-sm"
            role="status"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.08 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-halal-gold bg-halal-gold/15"
            >
              <span className="text-3xl text-halal-gold" aria-hidden>
                ✓
              </span>
            </motion.div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-halal-cream sm:text-[1rem]">
              Welcome to the Circle. Deen and the team will review your profile shortly.
            </p>
            {persistenceMode === "demo" && (
              <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-[0.78rem] leading-relaxed text-amber-200/90">
                <strong className="text-amber-100">Demo mode:</strong> Supabase is not connected in this
                environment. Deen can still see your application in server logs — connect{" "}
                <code className="text-amber-100/80">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                <code className="text-amber-100/80">SUPABASE_SERVICE_ROLE_KEY</code> on Vercel for live storage.
              </p>
            )}
            {persistenceMode === "email_only" && (
              <p className="mt-4 rounded-lg border border-halal-gold/25 bg-halal-gold/10 px-4 py-3 text-[0.78rem] text-halal-gold/90">
                Saved via email notification. Database sync will activate when Supabase is configured.
              </p>
            )}
            <Link href="/" className="btn-outline btn-shop-glow mt-8 inline-flex">
              ← Back to HalalStyles
            </Link>
          </motion.div>
        )}

        <p className="mt-10 text-center text-[0.7rem] text-halal-muted/80">
          By applying you agree we may contact you about the HalalStyles partner programme. No spam — ever.
        </p>
      </div>
    </main>
  );
}

