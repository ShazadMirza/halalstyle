import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";
import { excellenceGuideLookbookAmazonHref } from "@/lib/excellence-guide-lookbook-attribution";

function byIds(ids: readonly string[]): VaultItem[] {
  return ids.map((id) => VAULT_ITEMS.find((v) => v.id === id)).filter((v): v is VaultItem => Boolean(v));
}

/** Thobe + abaya + executive modest set — “The Doha Executive”. */
export const DOHA_EXECUTIVE_LOOKS = byIds(["v3", "v1", "v11"]);

/** @deprecated Use `DOHA_EXECUTIVE_LOOKS` */
export const EXECUTIVE_WARDROBE_LOOKS = DOHA_EXECUTIVE_LOOKS;

/** Two prayer rugs + luxury miswak — “The Friday Standard”. */
export const FRIDAY_STANDARD_LOOKS = byIds(["v5", "v23", "v24"]);

/** Laptop sleeve, faith-forward desk tech, dhikr wearable — “The Tech Edit”. */
export const TECH_EDIT_LOOKS = byIds(["v22", "v9", "v19"]);

/** @deprecated Split into `FRIDAY_STANDARD_LOOKS` + `TECH_EDIT_LOOKS` for the lookbook v2 layout. */
export const DOHA_EDIT_LOOKS = byIds(["v9", "v22", "v5", "v7", "v8"]);

/** Vault rows with lookbook Amazon attribution (UTM + tag). */
export function vaultItemsWithLookbookAttribution(items: VaultItem[]): VaultItem[] {
  return items.map((item) => ({
    ...item,
    affiliateUrl: excellenceGuideLookbookAmazonHref(item.affiliateUrl),
  }));
}
