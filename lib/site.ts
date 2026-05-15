/** Canonical production URL */
export const SITE_URL = "https://www.halalstyles55.com" as const;

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
