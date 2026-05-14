"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BUDGET_OPTIONS,
  CATEGORY_OPTIONS,
  OCCASION_OPTIONS,
  STYLE_OPTIONS,
} from "@/lib/quiz-options";
import type { HalalPickItem } from "@/lib/types";

type Screen = "quiz" | "loading" | "results";

export function HalalStyleApp() {
  const [screen, setScreen] = useState<Screen>("quiz");
  const [style, setStyle] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HalalPickItem[]>([]);

  function startOver() {
    setScreen("quiz");
    setError(null);
    setItems([]);
    setStyle("");
    setCategory("");
    setBudget("");
    setOccasion("");
  }

  async function submitQuiz() {
    setError(null);

    if (!style || !category || !budget || !occasion) {
      setError("Please answer all questions before continuing.");
      return;
    }

    const quizInput = `Style: ${style}\nCategory: ${category}\nBudget: ${budget}\nOccasion: ${occasion}`;

    setScreen("loading");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizInput }),
      });

      const data = (await response.json()) as {
        items?: HalalPickItem[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "API error");
      }

      const list = data.items;
      if (!Array.isArray(list)) {
        throw new Error("Invalid response shape");
      }

      setItems(list);
      setScreen("results");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(`Something went wrong: ${message}. Please try again.`);
      setScreen("quiz");
    }
  }

  return (
    <>
      <header className="bg-halal-forest px-6 py-5 text-center">
        <h1 className="font-display text-[2rem] tracking-[0.02em] text-halal-gold sm:text-[2rem]">
          Halal Style
        </h1>
        <p className="mt-1 text-[0.9rem] font-light text-white/75">
          Discover Your Perfect Halal Look
        </p>
      </header>

      {screen === "quiz" && (
        <div className="mx-auto max-w-[600px] px-6 py-12">
          <div className="rounded-[20px] border border-halal-border bg-white p-8 shadow-[0_4px_40px_rgba(27,58,45,0.08)] sm:p-10">
            <span className="mb-4 block text-center text-[2.5rem] leading-none">
              ⭐
            </span>
            <h2 className="font-display text-center text-[1.8rem] text-halal-forest">
              Style Quiz
            </h2>
            <p className="mb-9 mt-2 text-center text-[0.95rem] text-halal-muted">
              Answer a few questions to find your perfect halal modest fashion
              picks.
            </p>

            <div className="space-y-5">
              <Field label="What is your style?">
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select your style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="What category?">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="What is your budget?">
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select your budget..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="What occasion?">
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="border-halal-border bg-halal-cream focus:ring-halal-gold/40">
                    <SelectValue placeholder="Select an occasion..." />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASION_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <button
              type="button"
              onClick={() => void submitQuiz()}
              className="mt-3 w-full rounded-xl bg-halal-gold py-4 font-sans text-[1rem] font-semibold tracking-[0.01em] text-halal-forest transition hover:bg-halal-gold-light hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              Get My Halal Style Picks →
            </button>

            {error && (
              <div
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-center text-[0.9rem] text-red-600"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {screen === "loading" && (
        <div className="mx-auto max-w-[600px] px-6 py-24 text-center">
          <div
            className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-[3px] border-halal-border border-t-halal-gold"
            aria-hidden
          />
          <h3 className="font-display text-[1.5rem] text-halal-forest">
            ✨ Finding your perfect halal picks...
          </h3>
          <p className="mt-2 text-[0.9rem] text-halal-muted">
            This may take a few seconds
          </p>
        </div>
      )}

      {screen === "results" && (
        <div className="mx-auto max-w-[900px] px-6 py-10">
          <div className="mb-10 text-center">
            <h2 className="font-display text-[2rem] text-halal-forest">
              Your HalalStyle Picks
            </h2>
            <p className="mt-2 text-halal-muted">
              Curated just for you — modest, beautiful, and halal-certified
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {items.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                className="flex flex-col rounded-2xl border border-halal-border bg-white p-7 shadow-[0_2px_20px_rgba(27,58,45,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(27,58,45,0.12)]"
              >
                <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-halal-gold">
                  Pick #{i + 1}
                </p>
                <h3 className="font-display text-[1.15rem] leading-snug text-halal-forest">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-halal-muted">
                  {item.description}
                </p>
                <div className="mb-5 mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-halal-forest/[0.08] px-2.5 py-1 text-[0.75rem] font-medium text-halal-forest">
                    🌿 {item.why_halal}
                  </span>
                  <span className="rounded-full bg-[rgba(201,168,76,0.15)] px-2.5 py-1 text-[0.75rem] font-medium text-[#8a6a1a]">
                    💰 {item.price_range}
                  </span>
                </div>
                <a
                  className="block w-full rounded-[10px] bg-halal-forest py-3 text-center text-[0.875rem] font-medium text-white transition hover:bg-[#2a5243]"
                  href={item.buy_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop on Amazon.ca →
                </a>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={startOver}
            className="mx-auto block w-full max-w-[400px] rounded-xl bg-halal-forest py-4 text-center font-sans text-[1rem] font-medium text-white transition hover:bg-[#2a5243]"
          >
            ← Start Over
          </button>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.9rem] font-medium tracking-[0.01em] text-halal-forest">
        {label}
      </label>
      {children}
    </div>
  );
}
