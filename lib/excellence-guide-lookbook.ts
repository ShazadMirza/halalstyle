import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";

function byIds(ids: readonly string[]): VaultItem[] {
  return ids.map((id) => VAULT_ITEMS.find((v) => v.id === id)).filter((v): v is VaultItem => Boolean(v));
}

/** Executive wardrobe — premium thobe + abaya + boardroom modest set. */
export const EXECUTIVE_WARDROBE_LOOKS = byIds(["v3", "v1", "v11"]);

/** Doha edit — tech, prayer rug, and gold-accented home / desk. */
export const DOHA_EDIT_LOOKS = byIds(["v9", "v22", "v5", "v7", "v8"]);
