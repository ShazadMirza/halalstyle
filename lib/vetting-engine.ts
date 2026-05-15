/**
 * Central Excellence Filter / vetting logic — shared contract for the site and future Chrome extension.
 * Combines heuristics used by the vault (ratings, badges, whyHalal) with ASIN resolution from `amazon-utils`.
 */
import { getAmazonFullResImage } from "@/lib/amazon-utils";
import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";

const ASIN_PATTERN = /^B[0-9A-Z]{9}$/i;

/** Suspicious product-name signals — require human review, never auto-"verified" off name alone. */
const NAME_REVIEW_TRIGGERS = [
  // Alcohol & intoxicants
  /\balcohol\b/i,
  /\bwine\b/i,
  /\bbeer\b/i,
  /\bliquor\b/i,
  /\bwhiskey\b/i,
  /\bwhisky\b/i,
  /\bvodka\b/i,
  /\brum\b/i,
  // Non-halal animal products
  /\bpork\b/i,
  /\bbacon\b/i,
  /\bham\b/i,
  /\bprosciutto\b/i,
  /\blard\b/i,
  /\bpepperoni\b/i,
  /\bgelatin\b/i,
  // Immodest apparel
  /\bbikini\b/i,
  /\blingerie\b/i,
  /\bswim\s*brief/i,
  /\bthong\b/i,
  /\bbralette\b/i,
  // Gambling / prohibited entertainment
  /\bcasino\b/i,
  /\bgambling\b/i,
  /\blottery\b/i,
];

export type HalalStatus = "verified" | "review" | "unknown";

export type VettingSource = "vault_match" | "asin_resolved" | "heuristic" | "none";

export type VettingResult = {
  excellenceScore: number;
  halalStatus: HalalStatus;
  source: VettingSource;
  /** When matched to The Vault */
  vaultItemId?: string;
  /** CDN URL when ASIN is valid (extension / preview use) */
  resolvedImageUrl?: string;
};

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function findVaultByAsin(asin: string): VaultItem | undefined {
  const u = asin.trim().toUpperCase();
  return VAULT_ITEMS.find((i) => i.asin?.trim().toUpperCase() === u);
}

function findVaultByName(name: string): VaultItem | undefined {
  const n = normalize(name);
  if (n.length < 6) return undefined;

  // 1. Exact match
  const exact = VAULT_ITEMS.find((i) => normalize(i.title) === n);
  if (exact) return exact;

  // 2. One string fully contains the other (strong signal)
  const contains = VAULT_ITEMS.find((i) => {
    const t = normalize(i.title);
    return (t.length > 10 && n.includes(t)) || (n.length > 10 && t.includes(n));
  });
  if (contains) return contains;

  // 3. Multi-token overlap — require ≥2 meaningful tokens to match (≥5 chars each)
  //    to prevent single-word false positives ("gold", "modest", "wrap", etc.)
  const queryTokens = n.split(/\s+/).filter((w) => w.length >= 5);
  if (queryTokens.length === 0) return undefined;

  const multiTokenHit = VAULT_ITEMS.find((i) => {
    const t = normalize(i.title);
    const hits = queryTokens.filter((w) => t.includes(w));
    // Need at least 2 token hits, or 1 hit if the matched token is long (≥8 chars = highly specific)
    return hits.length >= 2 || hits.some((w) => w.length >= 8);
  });
  return multiTokenHit;
}

/** Map editorial rating + badge to 1–10 Excellence score (quiz / vault alignment). */
export function excellenceScoreFromVaultItem(item: VaultItem): number {
  let score = Math.round(item.rating * 2);
  if (item.badge === "Editor's Pick") score += 1;
  if (item.badge === "Bestseller") score += 1;
  if (item.badge === "New") score += 0;
  return Math.min(10, Math.max(1, score));
}

/**
 * Vet a product by display name and/or ASIN.
 * - Vault match → verified + score from editorial data (same brain as product cards).
 * - Valid ASIN only → review + resolved Amazon image URL (asset resolver).
 * - Name heuristics → review or unknown.
 */
export function vetProduct(input: { productName?: string; asin?: string }): VettingResult {
  const name = input.productName?.trim();
  const asin = input.asin?.trim();

  if (name && NAME_REVIEW_TRIGGERS.some((re) => re.test(name))) {
    return { excellenceScore: 2, halalStatus: "review", source: "heuristic" };
  }

  const byAsin = asin ? findVaultByAsin(asin) : undefined;
  const byName = name ? findVaultByName(name) : undefined;
  const vault = byAsin ?? byName;

  if (vault) {
    const asinForImage = (vault.asin?.trim() ?? (asin && ASIN_PATTERN.test(asin) ? asin : "")) || "";
    const resolvedImageUrl =
      asinForImage && ASIN_PATTERN.test(asinForImage)
        ? getAmazonFullResImage(asinForImage)
        : vault.imageUrl?.trim() || undefined;

    return {
      excellenceScore: excellenceScoreFromVaultItem(vault),
      halalStatus: "verified",
      source: "vault_match",
      vaultItemId: vault.id,
      resolvedImageUrl,
    };
  }

  if (asin && ASIN_PATTERN.test(asin)) {
    return {
      excellenceScore: 6,
      halalStatus: "review",
      source: "asin_resolved",
      resolvedImageUrl: getAmazonFullResImage(asin),
    };
  }

  if (name && name.length >= 8) {
    return { excellenceScore: 5, halalStatus: "review", source: "heuristic" };
  }

  return { excellenceScore: 3, halalStatus: "unknown", source: "none" };
}
