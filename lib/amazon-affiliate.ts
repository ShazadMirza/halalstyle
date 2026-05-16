/** HalalStyles Amazon.ca affiliate programme tag — must appear on outbound Amazon links. */
export const HALALSTYLE_AMAZON_TAG = "halalstyle50d-20";

/**
 * Ensures `tag=` is set on Amazon URLs (amazon.ca / amazon.com search or product links).
 */
export function withHalalStyleAffiliateTag(url: string): string {
  try {
    const u = new URL(url);
    if (!/amazon\.(ca|com)/i.test(u.hostname)) return url;
    u.searchParams.set("tag", HALALSTYLE_AMAZON_TAG);
    return u.toString();
  } catch {
    return url;
  }
}
