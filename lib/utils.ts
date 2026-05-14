import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Reject deprecated / unreliable image hosts so UI can fall back to placeholders. */
export function sanitizeRemoteImageUrl(url: string | undefined | null): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "https:") return null;
    if (u.hostname === "source.unsplash.com") return null;
    return trimmed;
  } catch {
    return null;
  }
}
