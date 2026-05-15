"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { trackGuideDownload } from "@/lib/analytics-events";
import { EXCELLENCE_GUIDE_DOWNLOAD_PATH, EXCELLENCE_GUIDE_WEB_PATH } from "@/lib/excellence-guide-constants";

const FOUNDER_NOTE =
  "Welcome to the Circle. This guide is your first step toward a wardrobe of barakah and excellence.";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState(EXCELLENCE_GUIDE_DOWNLOAD_PATH);

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
      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
        downloadUrl?: string;
      };

      if (!res.ok || data.error) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const url = typeof data.downloadUrl === "string" ? data.downloadUrl : EXCELLENCE_GUIDE_DOWNLOAD_PATH;
      setDownloadUrl(url);
      trackGuideDownload("newsletter_success");
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
        trackGuideDownload("newsletter_pdf_auto");
      }
      setStatus("done");
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
    <section id="newsletter" className="relative scroll-mt-24 px-6 py-20 pattern-bg">
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
              className="btn-gold btn-shop-glow inline-flex min-h-[2.75rem] items-center justify-center gap-2 whitespace-nowrap px-5 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-70"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
            className="mx-auto max-w-md rounded-2xl border border-halal-gold/35 bg-halal-gold/10 px-6 py-8 text-center"
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.05 }}
              className="excellence-success-badge mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-halal-gold bg-halal-gold/20"
            >
              <span className="text-3xl text-halal-gold" aria-hidden>
                ✦
              </span>
            </motion.div>
            <h3 className="font-brand text-xl tracking-[0.06em] text-halal-gold">Excellent.</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-halal-cream">
              You&apos;re in — check your inbox for the 2026 Excellence Guide.
            </p>
            <blockquote className="mt-5 border-l-2 border-halal-gold/50 pl-4 text-left text-[0.85rem] italic leading-relaxed text-halal-muted">
              <span className="font-medium not-italic text-halal-gold/90">Founder&apos;s note — Deen:</span>{" "}
              {FOUNDER_NOTE}
            </blockquote>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGuideDownload("newsletter_pdf_cta")}
              className="btn-gold btn-shop-glow mt-6 inline-flex w-full min-h-[3rem] items-center justify-center px-6 py-3 text-[0.9rem] font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
            >
              Download Your Guide Now ✦
            </a>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={EXCELLENCE_GUIDE_WEB_PATH}
                className="btn-outline inline-flex justify-center text-[0.82rem]"
              >
                Open web lookbook
              </Link>
              <Link href="/vault" className="btn-outline inline-flex justify-center text-[0.82rem]">
                Browse The Vault
              </Link>
            </div>
            <p className="mt-5 text-[0.65rem] leading-relaxed text-halal-muted/90">
              <strong className="text-halal-cream/80">Mobile tip:</strong> the PDF opened in a new tab — rotate to
              portrait and use your reader&apos;s vertical scroll for the cleanest read. For sharpest type and mosaic
              art, use the{" "}
              <Link href={EXCELLENCE_GUIDE_WEB_PATH} className="text-halal-gold underline-offset-2 hover:underline">
                web lookbook
              </Link>{" "}
              (add to Home Screen).
            </p>
          </motion.div>
        )}

        <p className="mt-4 text-[0.65rem] text-halal-muted">
          No spam. Unsubscribe anytime. We respect your inbox like your values.
        </p>
      </div>
    </section>
  );
}
