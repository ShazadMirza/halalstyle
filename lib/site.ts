/** Canonical production URL — swap when custom domain goes live. */
export const SITE_URL = "https://halalstyle.vercel.app" as const;

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
