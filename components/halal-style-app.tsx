"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  BUDGET_OPTIONS, CATEGORY_OPTIONS, OCCASION_OPTIONS, STYLE_OPTIONS,
} from "@/lib/quiz-options";
import type { HalalPickItem } from "@/lib/types";
import { sanitizeRemoteImageUrl } from "@/lib/utils";

type Screen = "quiz" | "email-gate" | "loading" | "results";

const LOADING_LINES = [
  "Filtering for Uncompromising Quality...",
  "Verifying Ethical & Halal Compliance...",
  "Curating Your Personal Excellence Suite...",
] as const;

function QuizPickImage({ url, title, buyLink }: { url?: string; title: string; buyLink: string }) {
  const safe = sanitizeRemoteImageUrl(url);
  const [show, setShow] = useState(!!safe);
  const [loaded, setLoaded] = useState(false);
  if (!safe || !show) {
    return (
      <Link
        href={buyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-44 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#D4AF37]/40 via-[#062C1D] to-[#0A3D28] px-4 text-center"
      >
        <span className="font-brand text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90">
          Preview unavailable
        </span>
        <span className="rounded-full bg-halal-gold px-4 py-2 font-sans text-[0.78rem] font-semibold text-halal-forest shadow-gold">
          Shop on Amazon →
        </span>
      </Link>
    );
  }
  return (
    <div className="relative h-44 w-full overflow-hidden">
      {!loaded && <div className="gold-image-shimmer absolute inset-0 z-[1]" aria-hidden />}
      <Image
        src={safe}
        alt={title}
        fill
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        onLoad={() => setLoaded(true)}
        onError={() => setShow(false)}
      />
    </div>
  );
}

export function HalalStyleApp() {
  const [screen, setScreen] = useState<Screen>("quiz");
  const [style, setStyle] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HalalPickItem[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [shareToast, setShareToast] = useState(false);
  const [loadLine, setLoadLine] = useState(0);

  useEffect(() => {
    if (screen !== "loading") return;
    setLoadLine(0);
    const id = window.setInterval(() => {
      setLoadLine((i) => (i + 1) % LOADING_LINES.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [screen]);

  function startOver() {
    setScreen("quiz");
    setError(null);
    setItems([]);
    setStyle("");
    setCategory("");
    setBudget("");
    setOccasion("");
    setFirstName("");
    setEmail("");
  }

  function showEmailGate() {
    if (!style || !category || !budget || !occasion) {
      setError("Please answer all questions before continuing.");
      return;
    }
    setError(null);
    setScreen("email-gate");
  }

  async function submitEmail(skip = false) {
    if (!skip && email && email.includes("@")) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, first_name: firstName, style, category, budget, occasion }),
        });
      } catch { /* silent */ }
    }
    await fetchRecommendations();
  }

  async function fetchRecommendations() {
    setScreen("loading");
    const quizInput = `Style: ${style}\nCategory: ${category}\nBudget: ${budget}\nOccasion: ${occasion}`;
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizInput }),
      });
      const data = (await response.json()) as { items?: HalalPickItem[]; error?: string };
      if (!response.ok) throw new Error(data.error ?? "API error");
      if (!Array.isArray(data.items)) throw new Error("Invalid response shape");
      setItems(data.items);
      setScreen("results");
    } catch (err) {
      setError(`Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`);
      setScreen("quiz");
    }
  }

  function shareResults() {
    const text = `I just got my personalised halal fashion picks on HalalStyles! Take the free quiz to get yours ✨\n${window.location.href}`;
    if (navigator.share) {
      void navigator.share({ title: "My HalalStyles Picks", text, url: window.location.href });
    } else {
      void navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  }

  return (
    <>
      {/* SHARE TOAST */}
      {shareToast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-halal-forest px-6 py-3 text-sm font-medium text-white shadow-lg">
          Link copied! Share your HalalStyles picks ✦
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div className="mx-auto max-w-[600px] px-6 py-10">
          <div className="rounded-[20px] border border-halal-border bg-white p-8 shadow-[0_4px_40px_rgba(27,58,45,0.08)] sm:p-10">
            <span className="mb-4 block text-center text-[2.5rem] leading-none">⭐</span>
            <h2 className="font-brand text-center text-[1.8rem] tracking-[0.06em] text-halal-forest">Style Quiz</h2>
            <p className="mb-9 mt-2 text-center text-[0.95rem] text-halal-muted">
              Answer 4 questions to find your perfect halal modest fashion picks.
            </p>
            <div className="space-y-5">
              <Field label="What is your style?">
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select your style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLE_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="What category?">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="What is your budget?">
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select your budget..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="What occasion?">
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select an occasion..." />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASION_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <button type="button" onClick={showEmailGate}
              className="btn-shop-glow mt-8 w-full rounded-xl bg-halal-gold py-4 font-sans text-[1rem] font-semibold tracking-[0.01em] text-halal-forest shadow-gold transition hover:scale-105 hover:bg-halal-gold-light hover:-translate-y-px active:translate-y-0">
              Get My Halal Style Picks →
            </button>
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-[0.9rem] text-red-600" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EMAIL GATE */}
      {screen === "email-gate" && (
        <div className="mx-auto max-w-[600px] px-6 py-10">
          <div className="rounded-[20px] border border-halal-border bg-white p-8 shadow-[0_4px_40px_rgba(27,58,45,0.08)] sm:p-10">
            <span className="mb-4 block text-center text-[3rem] leading-none">✨</span>
            <h2 className="font-brand text-center text-[1.8rem] tracking-[0.06em] text-halal-forest">Your picks are ready!</h2>
            <p className="mb-8 mt-3 text-center text-[0.95rem] leading-relaxed text-halal-muted">
              Enter your email to see your 5 personalised halal style recommendations — plus get our free Friday Drops newsletter with the best modest fashion finds every week.
            </p>
            <div className="space-y-4">
              <Field label="First name">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Fatima"
                  className="w-full rounded-lg border border-halal-border bg-halal-cream px-4 py-3 text-[0.9rem] text-halal-forest placeholder:text-halal-muted focus:outline-none focus:ring-2 focus:ring-halal-gold/40" />
              </Field>
              <Field label="Email address">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-halal-border bg-halal-cream px-4 py-3 text-[0.9rem] text-halal-forest placeholder:text-halal-muted focus:outline-none focus:ring-2 focus:ring-halal-gold/40" />
              </Field>
            </div>
            <button type="button" onClick={() => void submitEmail(false)}
              className="btn-shop-glow mt-6 w-full rounded-xl bg-halal-gold py-4 font-sans text-[1rem] font-semibold text-halal-forest shadow-gold transition hover:scale-105 hover:bg-halal-gold-light hover:-translate-y-px">
              See My Picks →
            </button>
            <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-halal-muted">
              No spam, ever. Unsubscribe anytime. We respect your inbox the way we respect your values.
            </p>
            <button type="button" onClick={() => void submitEmail(true)}
              className="mx-auto mt-4 block text-[0.75rem] text-halal-muted underline underline-offset-2 hover:text-halal-forest">
              Skip — just show me my picks
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {screen === "loading" && (
        <div className="mx-auto max-w-[600px] px-6 py-24 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-6 h-14 w-14 rounded-full border-[3px] border-halal-border border-t-[#D4AF37]"
            aria-hidden
          />
          <motion.div className="min-h-[2.5rem]">
            <AnimatePresence mode="wait">
              <motion.h3
                key={loadLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="font-brand animate-pulse text-[1.45rem] tracking-[0.05em] text-[#D4AF37]"
              >
                {LOADING_LINES[loadLine]}
              </motion.h3>
            </AnimatePresence>
          </motion.div>
          <p className="mt-3 animate-pulse text-[0.9rem] text-halal-muted">
            Curating your five halal-verified picks…
          </p>
        </div>
      )}

      {/* RESULTS */}
      {screen === "results" && (
        <div className="mx-auto max-w-[900px] px-6 py-10">
          <div className="mb-8 text-center">
            <h2 className="font-brand text-[2rem] tracking-[0.05em] text-halal-forest">Your HalalStyles Picks 🤍</h2>
            <p className="mt-2 text-halal-muted">
              Curated for: <span className="font-medium text-halal-forest">{style} · {category} · {budget} · {occasion}</span>
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {items.map((item, i) => (
              <motion.article
                key={`${item.title}-${i}`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 28px rgba(212,175,55,0.45), 0 12px 40px -8px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-halal-border bg-white shadow-[0_2px_20px_rgba(27,58,45,0.06)]"
              >
                <QuizPickImage url={item.image_url} title={item.title} buyLink={item.buy_link} />
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-halal-gold">Pick #{i + 1}</p>
                  <h3 className="font-brand text-[1.1rem] leading-snug tracking-[0.075em] text-halal-forest">{item.title}</h3>
                  <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-halal-muted">{item.description}</p>
                  <div className="mb-4 mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-halal-forest/[0.08] px-2.5 py-1 text-[0.72rem] font-medium text-halal-forest">🌿 {item.why_halal}</span>
                    <span className="rounded-full bg-[rgba(201,168,76,0.15)] px-2.5 py-1 text-[0.72rem] font-medium text-[#8a6a1a]">💰 {item.price_range}</span>
                  </div>
                  <a href={item.buy_link} target="_blank" rel="noopener noreferrer" className="btn-result-shop btn-shop-glow">
                    Shop on Amazon.ca →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mx-auto flex max-w-[400px] flex-col gap-3">
            <button type="button" onClick={shareResults}
              className="btn-shop-glow w-full rounded-xl bg-halal-gold py-4 text-center font-sans text-[1rem] font-semibold text-halal-forest shadow-gold transition hover:scale-105 hover:bg-halal-gold-light hover:-translate-y-px">
              Share My Picks ✦
            </button>
            <button type="button" onClick={startOver}
              className="w-full rounded-xl border border-halal-forest py-4 text-center font-sans text-[1rem] font-medium text-halal-forest transition hover:bg-halal-forest hover:text-white">
              ← Take the Quiz Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[0.9rem] font-medium tracking-[0.01em] text-halal-forest">{label}</label>
      {children}
    </div>
  );
}
