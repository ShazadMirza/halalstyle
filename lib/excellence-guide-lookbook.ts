import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";

function byIds(ids: readonly string[]): VaultItem[] {
  return ids.map((id) => VAULT_ITEMS.find((v) => v.id === id)).filter((v): v is VaultItem => Boolean(v));
}

/** Doha minimalism vs. Dubai opulence — five executive-tier Vault picks. */
export const TREND_REPORT_LOOKS = byIds(["v11", "v1", "v4", "v3", "v9"]);

/** Jummah-forward silhouettes + prayer essentials. */
export const FRIDAY_STANDARD_LOOKS = byIds(["v3", "v1", "v2", "v5"]);

/** Faith-forward tools and gold-accented carry. */
export const TECH_EDIT_LOOKS = byIds(["v9", "v22", "v19", "v21"]);
