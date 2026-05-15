/** Gold-standard high-res Amazon product image URL (SL1500). */
export function getAmazonFullResImage(asin: string): string {
  const normalized = asin.trim().toUpperCase();
  return `https://m.media-amazon.com/images/P/${normalized}.01._SCLZZZZZZZ_AC_SL1500_.jpg`;
}

type ImageResolvable = {
  imageUrl?: string;
  asin?: string;
};

/**
 * Resolve display src: explicit `imageUrl` → automated ASIN CDN → null (use placeholder).
 */
export function resolveVaultItemImageSrc(item: ImageResolvable): string | null {
  const explicit = item.imageUrl?.trim();
  if (explicit) return explicit;

  const asin = item.asin?.trim();
  if (asin) return getAmazonFullResImage(asin);

  return null;
}

/** Ordered candidates for client-side fallback when primary src fails to load. */
export function getVaultItemImageCandidates(item: ImageResolvable): string[] {
  const candidates: string[] = [];
  const explicit = item.imageUrl?.trim();
  if (explicit) candidates.push(explicit);

  const asin = item.asin?.trim();
  if (asin) {
    const amazon = getAmazonFullResImage(asin);
    if (!candidates.includes(amazon)) candidates.push(amazon);
  }

  return candidates;
}
