"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  trackGuideDownload,
  trackNewsletterFormFocus,
  trackNewsletterSubmitAttempt,
} from "@/lib/analytics-events";
import {
  EXCELLENCE_GUIDE_WEB_PATH,
  EXCELLENCE_GUIDE_WELCOME_STORAGE_KEY,
} from "@/lib/excellence-guide-constants";

type SubmitStatus = "idle" | "loading" | "error";

export function NewsletterSection() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submitNewsletter() {
    if (!email.trim()) return;
    trackNewsletterSubmitAttempt();
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
        redirectUrl?: string;
        redirect?: string;
      };

      if (!res.ok || data.error) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      trackGuideDownload("newsletter_success");
      try {
        sessionStorage.setItem(EXCELLENCE_GUIDE_WELCOME_STORAGE_KEY, email.trim());
      } catch {
        /* private mode */
      }
      setStatus("idle");
      router.push(EXCELLENCE_GUIDE_WEB_PATH);
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

        <form method="post" onSubmit={onFormSubmit} className="flex flex-col flex-wrap gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => trackNewsletterFormFocus()}
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

        <p className="mt-4 text-[0.65rem] text-halal-muted">
          No spam. Unsubscribe anytime. We respect your inbox like your values.
        </p>
      </div>
    </section>
  );
}
