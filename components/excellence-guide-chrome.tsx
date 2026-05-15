"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { EXCELLENCE_GUIDE_WELCOME_STORAGE_KEY } from "@/lib/excellence-guide-constants";

export function ExcellenceGuideWelcomeToast() {
  const [email, setEmail] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(EXCELLENCE_GUIDE_WELCOME_STORAGE_KEY);
      if (raw?.trim()) setEmail(raw.trim());
    } catch {
      /* private mode */
    }
  }, []);

  if (!email || dismissed) return null;

  return (
    <div
      className="fixed left-4 right-4 top-24 z-[70] mx-auto max-w-lg rounded-2xl border border-halal-gold/30 bg-black/80 px-4 py-3 shadow-[0_0_28px_rgba(212,175,55,0.2)] backdrop-blur-md print:hidden sm:left-auto sm:right-6 sm:mx-0"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-serif text-[0.95rem] leading-snug text-halal-cream">
          <span className="text-halal-gold">Welcome,</span>{" "}
          <span className="break-all text-halal-cream/95">{email}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.removeItem(EXCELLENCE_GUIDE_WELCOME_STORAGE_KEY);
            } catch {
              /* ignore */
            }
            setDismissed(true);
          }}
          className="shrink-0 rounded-lg p-1 text-halal-muted transition hover:bg-halal-gold/10 hover:text-halal-gold"
          aria-label="Dismiss welcome message"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p className="mt-1 text-[0.7rem] text-halal-muted">Your private lookbook is unlocked below.</p>
    </div>
  );
}

export function ExcellenceGuidePrintBar() {
  return (
    <div className="mx-auto mt-16 max-w-2xl border-t border-halal-gold/20 px-5 pb-12 pt-10 text-center print:hidden">
      <p className="font-serif text-lg text-halal-gold">Keep a hard copy</p>
      <p className="mt-2 text-[0.85rem] text-halal-muted">
        Use your browser&apos;s print dialog and choose &quot;Save as PDF&quot; for an archival copy — optimized for
        portrait reading on mobile.
      </p>
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-outline mt-6 inline-flex border-halal-gold/45 px-8 py-3 text-[0.88rem] text-halal-cream hover:border-halal-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
      >
        Print to PDF
      </button>
    </div>
  );
}
