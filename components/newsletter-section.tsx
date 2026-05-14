"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tags: ["excellence-guide"] }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 py-20 pattern-bg">
      <div className="mx-auto max-w-xl text-center">
        <span className="section-eyebrow mb-4 block">Free Lead Magnet</span>
        <h2 className="section-title mb-4">The Excellence Guide</h2>
        <p className="mb-8 text-[0.95rem] text-halal-muted leading-relaxed">
          Get our free 2026 Modest Luxury Style Guide — 20+ curated picks, style tips,
          and the Muslim high-achiever&apos;s essential wardrobe. Delivered to your inbox.
        </p>

        {status === "done" ? (
          <div className="rounded-xl border border-halal-gold/30 bg-halal-gold/10 px-6 py-4 text-halal-gold font-medium">
            ✦ Check your inbox — your guide is on its way.
          </div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-luxury flex-1"
            />
            <button type="submit" disabled={status === "loading"} className="btn-gold whitespace-nowrap">
              {status === "loading" ? "Sending..." : "Get the Guide ✦"}
            </button>
          </form>
        )}
        <p className="mt-4 text-[0.65rem] text-halal-muted">
          No spam. Unsubscribe anytime. We respect your inbox like your values.
        </p>
      </div>
    </section>
  );
}
