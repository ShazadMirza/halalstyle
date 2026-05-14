"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STYLE_OPTIONS = [
  "Classic modest",
  "Modern minimal",
  "Casual everyday",
  "Elevated occasion",
] as const;

const CATEGORY_OPTIONS = [
  "Abayas & outerwear",
  "Dresses & sets",
  "Tops & bottoms",
  "Hijabs & accessories",
] as const;

const BUDGET_OPTIONS = [
  "Under $50",
  "$50 – $100",
  "$100 – $200",
  "$200+",
] as const;

const OCCASION_OPTIONS = [
  "Everyday",
  "Work / school",
  "Wedding / formal",
  "Travel",
] as const;

export type QuizSelections = {
  style: string;
  category: string;
  budget: string;
  occasion: string;
};

export function HalalStyleQuiz() {
  const router = useRouter();
  const [style, setStyle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const selections: QuizSelections = {
      style,
      category,
      budget,
      occasion,
    };

    console.log("[Halal Style Quiz] selections:", selections);

    const params = new URLSearchParams({
      ...(style && { style }),
      ...(category && { category }),
      ...(budget && { budget }),
      ...(occasion && { occasion }),
    });

    router.push(`/results?${params.toString()}`);
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      <div className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/[0.04]">
        <header className="bg-[#1d4d2f] px-6 py-5 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
            Halal Style
          </h1>
          <p className="mt-1 text-sm font-medium text-white/85">Style Quiz</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-6 pb-8 pt-7 sm:px-8 sm:pb-10"
        >
          <p className="text-center text-[15px] leading-relaxed text-[hsl(var(--muted))]">
            Tell us what you’re looking for—we’ll tailor your modest fashion
            picks.
          </p>

          <div className="space-y-5">
            <Field label="Style">
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger aria-label="Choose style">
                  <SelectValue placeholder="Select your style" />
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

            <Field label="Category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Choose category">
                  <SelectValue placeholder="Select a category" />
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

            <Field label="Budget">
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger aria-label="Choose budget">
                  <SelectValue placeholder="Select your budget" />
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

            <Field label="Occasion">
              <Select value={occasion} onValueChange={setOccasion}>
                <SelectTrigger aria-label="Choose occasion">
                  <SelectValue placeholder="Select an occasion" />
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
            type="submit"
            className="group relative mt-2 w-full overflow-hidden rounded-lg px-4 py-3.5 text-[15px] font-semibold text-neutral-900 shadow-sm transition hover:brightness-[1.02] active:scale-[0.99] active:brightness-[0.98]"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300"
              aria-hidden
            />
            <span className="relative">Get My Halal Style Picks</span>
          </button>
        </form>
      </div>
    </div>
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
    <div className="space-y-2">
      <label className="block text-sm font-medium tracking-tight text-[hsl(var(--foreground))]">
        {label}
      </label>
      {children}
    </div>
  );
}
