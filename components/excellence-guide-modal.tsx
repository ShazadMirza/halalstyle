"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GUIDE_HEADLINE =
  "Download the 2026 Excellence Guide: The Definitive List for the Modern Muslim High-Achiever.";

type ExcellenceGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ExcellenceGuideModal({ open, onClose }: ExcellenceGuideModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  function handleClose() {
    onClose();
    window.setTimeout(() => {
      setEmail("");
      setStatus("idle");
      setErrorMessage(null);
    }, 280);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6 backdrop-blur-lg"
          role="presentation"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="excellence-guide-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-halal-gold/50 bg-gradient-to-br from-halal-surface/95 via-halal-forest-2/90 to-halal-surface/95 p-8 shadow-[0_0_48px_rgba(212,175,55,0.22)] backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 text-halal-muted transition hover:text-halal-gold"
              aria-label="Close"
            >
              ✕
            </button>

            {status === "done" ? (
              <>
                <h3
                  id="excellence-guide-modal-title"
                  className="font-brand pr-8 text-xl tracking-[0.06em] text-halal-cream"
                >
                  Welcome to the Excellence Circle
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-halal-muted">
                  Your guide is ready. Open the PDF below or check your inbox for the same curated list.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
                >
                  <a
                    href="/docs/excellence-guide-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold btn-shop-glow inline-flex justify-center text-[0.85rem]"
                  >
                    Download PDF ↗
                  </a>
                  <Link
                    href="/vault"
                    className="btn-outline inline-flex justify-center text-[0.85rem]"
                    onClick={handleClose}
                  >
                    Browse The Vault
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <p className="section-eyebrow mb-3">Free Lead Magnet</p>
                <h3
                  id="excellence-guide-modal-title"
                  className="font-brand pr-6 text-[1.15rem] leading-snug tracking-[0.05em] text-halal-cream sm:text-xl"
                >
                  {GUIDE_HEADLINE}
                </h3>
                <form method="post" onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-3">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-luxury"
                    disabled={status === "loading"}
                    aria-busy={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold btn-shop-glow flex w-full items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Get the Guide ✦"
                    )}
                  </button>
                  {status === "error" && errorMessage ? (
                    <p className="text-sm text-red-400" role="alert" aria-live="polite">
                      {errorMessage}
                    </p>
                  ) : null}
                </form>
                <p className="mt-4 text-[0.65rem] text-halal-muted">
                  No spam. Unsubscribe anytime. We respect your inbox like your values.
                </p>
              </>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full text-center text-[0.75rem] text-halal-muted underline underline-offset-2 hover:text-halal-gold"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
