/** True when src is served from Amazon product CDNs (skip Vercel image optimization). */
export function isAmazonImageUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return (
      host.includes("media-amazon.com") ||
      host.includes("ssl-images-amazon.com") ||
      host.endsWith(".amazon.com")
    );
  } catch {
    return false;
  }
}
