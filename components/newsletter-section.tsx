"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function submitNewsletter() {
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || data.error) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("done");
      setModalOpen(true);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void submitNewsletter();
  }

  return (
    <section className="relative px-6 py-20 pattern-bg">
      <div className="mx-auto max-w-xl text-center">
        <span className="section-eyebrow mb-4 block">Free Lead Magnet</span>
        <h2 className="section-title mb-4">The Excellence Guide</h2>
        <p className="mb-8 text-[0.95rem] leading-relaxed text-halal-muted">
          Get our free 2026 Modest Luxury Style Guide — 20+ curated picks, style tips, and the Muslim
          high-achiever&apos;s essential wardrobe. Delivered to your inbox.
        </p>

        {status !== "done" ? (
          <form method="post" onSubmit={onFormSubmit} className="flex flex-col flex-wrap gap-3 sm:flex-row">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-luxury flex-1"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-gold btn-shop-glow inline-flex min-h-[2.75rem] items-center justify-center gap-2 whitespace-nowrap px-5 disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                  <span>Sending…</span>
                </>
              ) : (
                "Get the Guide ✦"
              )}
            </button>
            {status === "error" && errorMessage ? (
              <p className="basis-full text-left text-sm text-red-400 sm:text-center" role="alert" aria-live="polite">
                {errorMessage}
              </p>
            ) : null}
          </form>
        ) : (
          <p
            className="rounded-xl border border-halal-gold/30 bg-halal-gold/10 px-6 py-4 font-medium text-halal-gold"
            role="status"
            aria-live="polite"
          >
            You&apos;re in! Check your inbox ✦
          </p>
        )}

        <p className="mt-4 text-[0.65rem] text-halal-muted">
          No spam. Unsubscribe anytime. We respect your inbox like your values.
        </p>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative max-w-md rounded-2xl border border-halal-gold/30 bg-card-gradient p-8 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 text-halal-muted transition hover:text-halal-cream"
                aria-label="Close"
              >
                ✕
              </button>
              <h3 id="guide-modal-title" className="font-brand pr-8 text-xl tracking-[0.06em] text-halal-cream">
                Welcome to the Excellence Circle
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-halal-muted">
                Download the 2026 Modest Luxury Style Guide (PDF). Prefer email only? You&apos;ll receive the same
                content in your inbox.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/docs/excellence-guide-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold btn-shop-glow inline-flex justify-center text-[0.85rem]"
                >
                  Open PDF ↗
                </a>
                <Link
                  href="/vault"
                  className="btn-outline inline-flex justify-center text-[0.85rem]"
                  onClick={() => setModalOpen(false)}
                >
                  Browse The Vault
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mt-6 w-full text-center text-[0.75rem] text-halal-muted underline underline-offset-2 hover:text-halal-gold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
