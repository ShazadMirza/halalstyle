import { track } from "@vercel/analytics";
import type { VaultCategory } from "@/lib/vault-items";

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
export function trackGuideDownload(source: "modal_success" | "pdf_download") {
  track("Guide Download", { source });
}
