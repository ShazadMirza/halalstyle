"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Timestamp (ms) when user dismissed — prompt may show again after 7 days */
const DISMISS_AT_KEY = "halalstyle-pwa-prompt-dismissed-at";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 5000;

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

function shouldShowPrompt(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_AT_KEY);
    if (!raw) return true;
    const dismissedAt = Number.parseInt(raw, 10);
    if (Number.isNaN(dismissedAt)) return true;
    return Date.now() - dismissedAt >= WEEK_MS;
  } catch {
    return true;
  }
}

function isIos(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
}

function isAndroid(): boolean {
  if (typeof window === "undefined") return false;
  return /Android/i.test(window.navigator.userAgent);
}

export function PwaPrompt() {
  const [visible, setVisible] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Capture Android native install prompt — must be registered early
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    if (!isMobileDevice() || isStandalonePwa()) return;
    if (!shouldShowPrompt()) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_AT_KEY, String(Date.now()));
    } catch {
      /* private mode */
    }
  }

  async function handleAndroidInstall() {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    if (outcome === "accepted") dismiss();
  }

  const showIos = isIos();
  const showAndroid = isAndroid() && !showIos;
  const canNativeInstall = showAndroid && typeof window !== "undefined";

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="pwa-install-prompt fixed inset-x-0 bottom-0 z-[48] mx-auto max-w-lg border-t-2 border-halal-gold/60 bg-gradient-to-t from-halal-forest via-halal-forest-2 to-halal-surface/98 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_48px_rgba(212,175,55,0.18)] backdrop-blur-md sm:left-auto sm:right-4 sm:rounded-t-2xl sm:border-x sm:border-t"
          aria-label="Add HalalStyles to home screen"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-full p-1.5 text-halal-muted transition hover:text-halal-gold"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="pr-10">
            <div className="mb-3 flex items-center gap-2 border-b border-halal-gold/25 pb-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-halal-gold/45 bg-halal-gold/10 font-brand text-base text-halal-gold">
                ✦
              </span>
              <p className="font-brand text-[0.92rem] leading-snug tracking-[0.04em] text-halal-cream">
                Experience Excellence. Add HalalStyles to your home screen for an app-like experience.
              </p>
            </div>

            {showIos && (
              <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-halal-muted">
                <Share2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-halal-gold" aria-hidden />
                <span>
                  <strong className="text-halal-gold/90">iOS:</strong> Tap{" "}
                  <strong className="text-halal-cream/90">Share</strong>{" "}
                  <span className="whitespace-nowrap">(□↑)</span>, then{" "}
                  <strong className="text-halal-cream/90">Add to Home Screen</strong>.
                </span>
              </p>
            )}

            {showAndroid && (
              <div className="mt-2">
                {canNativeInstall && deferredPrompt.current ? (
                  <button
                    type="button"
                    onClick={handleAndroidInstall}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-halal-gold px-4 py-2.5 font-brand text-[0.78rem] font-semibold tracking-[0.12em] text-halal-forest shadow-gold transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <Menu className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Add to Home Screen
                  </button>
                ) : (
                  <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-halal-muted">
                    <Menu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-halal-gold" aria-hidden />
                    <span>
                      <strong className="text-halal-gold/90">Android:</strong> Tap the{" "}
                      <strong className="text-halal-cream/90">⋮ menu</strong> in Chrome, then{" "}
                      <strong className="text-halal-cream/90">Add to Home screen</strong> or{" "}
                      <strong className="text-halal-cream/90">Install app</strong>.
                    </span>
                  </p>
                )}
              </div>
            )}

            {!showIos && !showAndroid && (
              <p className="text-[0.72rem] leading-relaxed text-halal-muted">
                Use your browser&apos;s menu to <strong className="text-halal-cream/90">install</strong> or{" "}
                <strong className="text-halal-cream/90">add this site</strong> to your home screen.
              </p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
