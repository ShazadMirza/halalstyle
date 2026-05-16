"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  EXCELLENCE_GUIDE_CK_WELCOME_FLAG_KEY,
  EXCELLENCE_GUIDE_DOWNLOAD_PATH,
} from "@/lib/excellence-guide-constants";
import { excellenceGuideLookbookLocalHref } from "@/lib/excellence-guide-lookbook-attribution";

const BANNER_MS = 6000;

/** One-time banner after newsletter → lookbook; reads `ck_welcome` then clears it. */
export function ExcellenceGuideWelcomeBanner() {
  const [show, setShow] = useState(false);
  const pdfHref = excellenceGuideLookbookLocalHref(EXCELLENCE_GUIDE_DOWNLOAD_PATH);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem(EXCELLENCE_GUIDE_CK_WELCOME_FLAG_KEY) === "1") {
        sessionStorage.removeItem(EXCELLENCE_GUIDE_CK_WELCOME_FLAG_KEY);
        setShow(true);
        timer = setTimeout(() => setShow(false), BANNER_MS);
      }
    } catch {
      /* private mode */
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="animate-fade-in fixed left-1/2 top-20 z-[70] flex max-w-[min(100vw-2rem,28rem)] -translate-x-1/2 items-center gap-4 rounded-lg border border-halal-gold/40 bg-[#0a0a0a]/95 px-5 py-4 shadow-[0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-md print:hidden sm:top-24"
      role="status"
      aria-live="polite"
    >
      <span className="text-halal-gold text-lg" aria-hidden>
        ✦
      </span>
      <div className="min-w-0">
        <p className="font-serif text-sm font-semibold text-halal-cream">Welcome to the Circle.</p>
        <p className="mt-0.5 text-xs text-halal-muted">
          Your guide is ready —{" "}
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-halal-gold underline underline-offset-2 hover:text-halal-gold-2"
          >
            download the PDF ↗
          </a>
        </p>
      </div>
    </div>
  );
}

export function ExcellenceGuideStickyVault() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 1;
      setVisible(ratio >= 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href={excellenceGuideLookbookLocalHref("/vault")}
      /**
       * Mobile  (<sm): full-width bottom bar — prevents overlap with product cards on narrow viewports.
       * Desktop (sm+): original pill button fixed bottom-right.
       */
      className={[
        "btn-gold btn-shop-glow z-[65] print:hidden",
        // mobile — flush bottom bar
        "fixed bottom-0 left-0 right-0 flex items-center justify-center",
        "min-h-[3rem] w-full rounded-none py-3 text-[0.85rem] font-semibold tracking-wide",
        "shadow-[0_-4px_24px_rgba(0,0,0,0.5)]",
        // desktop — pill button bottom-right
        "sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto sm:rounded-lg",
        "sm:min-h-[2.75rem] sm:px-5 sm:py-2.5 sm:text-[0.78rem]",
        "sm:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
      ].join(" ")}
    >
      Shop the Full Vault
    </Link>
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
