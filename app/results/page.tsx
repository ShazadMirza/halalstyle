import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiz results",
  description: "Your HalalStyle quiz selections — modest fashion preferences summary.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/results" },
  openGraph: { url: absoluteUrl("/results") },
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ResultsPage({ searchParams }: Props) {
  const get = (key: string) => {
    const v = searchParams[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const style = get("style");
  const category = get("category");
  const budget = get("budget");
  const occasion = get("occasion");

  const rows = [
    { label: "Style", value: style },
    { label: "Category", value: category },
    { label: "Budget", value: budget },
    { label: "Occasion", value: occasion },
  ];

  return (
    <main className="min-h-dvh bg-gradient-to-b from-[#f7f6f3] to-[#ebe8e2] px-4 py-12">
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/[0.04]">
        <header className="bg-[#1d4d2f] px-6 py-5 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Your picks
          </h1>
          <p className="mt-1 text-sm text-white/85">
            Based on your quiz answers
          </p>
        </header>
        <div className="space-y-4 px-6 py-8 sm:px-8">
          <dl className="space-y-4">
            {rows.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 border-b border-[hsl(var(--border))] pb-4 last:border-0 last:pb-0"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted))]">
                  {label}
                </dt>
                <dd className="text-base text-[hsl(var(--foreground))]">
                  {value?.trim() ? value : "—"}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm font-semibold text-[#1d4d2f] shadow-sm transition hover:bg-[#1d4d2f]/5"
          >
            Back to quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
