import { HALALSTYLE_AMAZON_TAG } from "@/lib/amazon-affiliate";
import { EXCELLENCE_GUIDE_LOOKBOOK_UTM_CAMPAIGN, EXCELLENCE_GUIDE_LOOKBOOK_UTM_QUERY } from "@/lib/excellence-guide-constants";

/** Append lookbook UTMs to same-origin paths (PDF, `/vault`, etc.). */
export function excellenceGuideLookbookLocalHref(path: string): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${EXCELLENCE_GUIDE_LOOKBOOK_UTM_QUERY}`;
}

/** Amazon.ca outbound URL with affiliate tag + lookbook UTMs. */
export function excellenceGuideLookbookAmazonHref(href: string): string {
  try {
    const u = new URL(href);
    if (!/amazon\.(ca|com)/i.test(u.hostname)) return href;
    u.searchParams.set("tag", HALALSTYLE_AMAZON_TAG);
    u.searchParams.set("utm_source", "convertkit");
    u.searchParams.set("utm_medium", "email");
    u.searchParams.set("utm_campaign", EXCELLENCE_GUIDE_LOOKBOOK_UTM_CAMPAIGN);
    return u.toString();
  } catch {
    return href;
  }
}
