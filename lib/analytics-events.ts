import { track } from "@vercel/analytics";
import type { VaultCategory } from "@/lib/vault-items";

const FIRST_SHOP_NOW_SESSION_KEY = "halalstyle_first_shop_now_v1";
let firstShopNowMemoryGate = false;

/**
 * Best-effort ASIN for analytics: real `B0…` from `/dp/` URLs, else `"search"` for discovery links.
 */
export function amazonAffiliateUrlToAsinLabel(url: string): string {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:\/|$|\?)/i);
    if (m?.[1]) return m[1].toUpperCase();
    return "search";
  } catch {
    return "unknown";
  }
}

/** Hero “Get the Guide ✦” (above the fold) — scroll to `#newsletter`. */
export const trackHeroCTAClick = () => track("hero_cta_click", { destination: "#newsletter" });

/** Newsletter email field received focus (intent). */
export const trackNewsletterFormFocus = () => track("newsletter_form_focus");

/** Form submit fired with a non-empty email, before `/api/newsletter`. */
export const trackNewsletterSubmitAttempt = () => track("newsletter_submit_attempt");

/** Post-success Vault CTA (`/vault` from newsletter section or excellence modal). */
export const trackVaultClickFromSuccess = (source: "newsletter" | "modal") =>
  track("vault_click_from_success", { source });

/**
 * First Amazon affiliate outbound click in the browser session (any “Shop” CTA).
 * Later clicks in the same session are ignored for this event.
 */
export function trackFirstShopNow(asin: string, productName: string) {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(FIRST_SHOP_NOW_SESSION_KEY)) return;
    window.sessionStorage.setItem(FIRST_SHOP_NOW_SESSION_KEY, "1");
  } catch {
    if (firstShopNowMemoryGate) return;
    firstShopNowMemoryGate = true;
  }
  track("first_shop_now", { asin, product_name: productName });
}

/** Affiliate click-through (Shop Now) for ACTR reporting */
export function trackAffiliateShopNow(payload: {
  productId: string;
  productTitle: string;
  category: VaultCategory;
  priceCAD: number;
}) {
  track("Affiliate Shop Now", {
    productId: payload.productId,
    productTitle: payload.productTitle,
    category: payload.category,
    priceCAD: payload.priceCAD,
  });
}

/** Excellence Guide conversion — email capture or PDF download */
export function trackGuideDownload(
  source:
    | "modal_success"
    | "pdf_download"
    | "newsletter_success"
    | "newsletter_pdf_auto"
    | "newsletter_pdf_cta"
    | "modal_pdf_auto",
) {
  track("Guide Download", { source });
}
