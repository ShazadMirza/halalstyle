import type { VaultItem } from "@/lib/vault-items";

/**
 * Category-matched **local SVG** previews — always render, no stock-photo roulette.
 * Replace files in `/public/vault-previews/` when a designer ships final art.
 */
const CARD_PREVIEW_BY_ID: Record<string, string> = {
  v1: "/vault-previews/abaya.svg",
  v4: "/vault-previews/maxi-dress.svg",
  v10: "/vault-previews/kimono-layer.svg",
  v11: "/vault-previews/palazzo-suit.svg",
  v12: "/vault-previews/pleated-skirt.svg",
  v2: "/vault-previews/hijab-set.svg",
  v13: "/vault-previews/hijab-chiffon.svg",
  v14: "/vault-previews/undercap.svg",
  v3: "/vault-previews/thobe.svg",
  v15: "/vault-previews/kufi.svg",
  v16: "/vault-previews/qamis.svg",
  v5: "/vault-previews/prayer-rug.svg",
  v7: "/vault-previews/geometry-brass.svg",
  v8: "/vault-previews/candles.svg",
  v17: "/vault-previews/frame-calligraphy.svg",
  v6: "/vault-previews/kids-dress.svg",
  v18: "/vault-previews/boys-thobe.svg",
  v9: "/vault-previews/speaker.svg",
  v19: "/vault-previews/tasbeeh.svg",
  v20: "/vault-previews/book-open.svg",
  v21: "/vault-previews/lantern.svg",
};

export function getVaultCardImageUrl(item: VaultItem): string {
  return CARD_PREVIEW_BY_ID[item.id] ?? "/vault-previews/abaya.svg";
}

export function isVaultVectorPreview(url: string): boolean {
  return url.endsWith(".svg");
}
