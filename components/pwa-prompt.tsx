"use client";

import { useEffect, useState } from "react";
import { Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const DISMISS_KEY = "halalstyle-pwa-prompt-dismissed";

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function isStandalonePwa(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true ||
    document.referrer.includes("android-app://")
  );
}

function isIosSafari(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
  return isIos && isSafari;
}

export function PwaPrompt() {
  const [visible, setVisible] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (!isMobileDevice() || isStandalonePwa()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      setShowIosHint(isIosSafari());
      setVisible(true);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="pwa-install-prompt fixed left-4 right-4 z-[48] mx-auto max-w-md rounded-2xl border-2 border-halal-gold/45 bg-gradient-to-br from-halal-forest via-halal-forest-2 to-halal-surface p-4 shadow-[0_8px_40px_rgba(212,175,55,0.2)] backdrop-blur-md sm:left-auto sm:right-6"
          aria-label="Install HalalStyle"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-full p-1 text-halal-muted transition hover:text-halal-gold"
            aria-label="Dismiss install prompt"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex gap-3 pr-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-halal-gold/40 bg-halal-gold/15">
              <span className="font-brand text-lg text-halal-gold" aria-hidden>
                ✦
              </span>
            </div>
            <div>
              <p className="font-brand text-[0.9rem] leading-snug tracking-[0.05em] text-halal-cream">
                Install HalalStyle to your home screen for the full Excellence experience.
              </p>
              {showIosHint && (
                <p className="mt-2 flex items-start gap-2 text-[0.72rem] leading-relaxed text-halal-muted">
                  <Share2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-halal-gold" aria-hidden />
                  <span>
                    Tap <strong className="text-halal-gold/90">Share</strong>, then{" "}
                    <strong className="text-halal-gold/90">Add to Home Screen</strong>.
                  </span>
                </p>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
