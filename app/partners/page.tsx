"use client";

import { useState } from "react";
import Link from "next/link";

export default function PartnersPage() {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          social_handle: socialHandle,
          email,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Request failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-halal-obsidian pt-24 pb-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-lg px-6">
        <p className="section-eyebrow mb-4 text-center">Affiliate Programme</p>
        <h1 className="font-display text-center text-[clamp(2rem,5vw,2.75rem)] font-medium leading-tight text-halal-cream">
          Join the <span className="text-halal-gold">Excellence Circle</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-halal-muted">
          Partner with HalalStyle — align your audience with curated, halal-conscious modest fashion. Limited
          collaborations each season.
        </p>

        {!done ? (
          <form
            onSubmit={(e) => void onSubmit(e)}
            className="mt-12 rounded-2xl border border-halal-border/50 bg-card-gradient p-8 shadow-card"
          >
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
                  Social handle
                </label>
                <input
                  id="p-social"
                  name="social_handle"
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  className="input-luxury"
                  placeholder="@yourbrand or channel URL"
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
              {loading ? "Sending…" : "Request partnership"}
            </button>
          </form>
        ) : (
          <div
            className="mt-12 rounded-2xl border border-halal-gold/25 bg-halal-surface/80 p-10 text-center shadow-[0_0_40px_-8px_rgba(212,175,55,0.15)] backdrop-blur-sm"
            role="status"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-halal-gold bg-halal-gold/10">
              <span className="text-3xl text-halal-gold" aria-hidden>
                ✓
              </span>
            </div>
            <h2 className="font-display text-xl text-halal-cream">Application received</h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-halal-muted">
              Thank you, {name.split(" ")[0] || "friend"}. Our team will review your profile and reply by email
              within a few business days.
            </p>
            <Link href="/" className="btn-outline mt-8 inline-flex">
              ← Back to HalalStyle
            </Link>
          </div>
        )}

        <p className="mt-10 text-center text-[0.7rem] text-halal-muted/80">
          By applying you agree we may contact you about the HalalStyle partner programme. No spam — ever.
        </p>
      </div>
    </main>
  );
}
