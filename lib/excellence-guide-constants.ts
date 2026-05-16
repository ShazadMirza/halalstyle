// TODO: Replace /guides/halalstyle-2026-excellence.pdf with a print-ready Vogue-Arabia export
// before any paid traffic is sent. Drop the file at public/guides/halalstyle-2026-excellence.pdf
// (same filename — no code change needed).

/** Canonical PDF for the 2026 Excellence Guide (lead magnet fulfillment). */
export const EXCELLENCE_GUIDE_DOWNLOAD_PATH = "/guides/halalstyle-2026-excellence.pdf";

/** Rich web lookbook (mobile-optimized typography vs. static PDF). */
export const EXCELLENCE_GUIDE_WEB_PATH = "/excellence-guide";

/**
 * UTM campaign slug — auto-derived from current month/year at runtime so broadcasts
 * stay correctly namespaced in Amazon Associates + Vercel without manual edits.
 * Format: `editors_picks_may2026`, `editors_picks_jun2026`, etc.
 */
const _d = new Date();
const _mo = _d.toLocaleString("en-US", { month: "short" }).toLowerCase(); // "may"
const _yr = _d.getFullYear(); // 2026
export const EXCELLENCE_GUIDE_LOOKBOOK_UTM_CAMPAIGN = `editors_picks_${_mo}${_yr}`;

/** UTM bundle appended to lookbook PDF, Vault, and Amazon outbound links. */
export const EXCELLENCE_GUIDE_LOOKBOOK_UTM_QUERY = `utm_source=convertkit&utm_medium=email&utm_campaign=${EXCELLENCE_GUIDE_LOOKBOOK_UTM_CAMPAIGN}`;

/** sessionStorage flag (`"1"`) — lookbook shows a one-time welcome banner after newsletter capture. */
export const EXCELLENCE_GUIDE_CK_WELCOME_FLAG_KEY = "ck_welcome";

/**
 * Visual Automation segment tags (create these exact names in ConvertKit).
 * Flow after Email 2 (Day 2): **Wait 48h** → if subscriber **clicked any link** in Email 2, add
 * `CONVERTKIT_TAG_ENGAGED_WEEK_1`; else add `CONVERTKIT_TAG_NEEDS_RE_ENGAGEMENT`.
 * Engaged path: send standard Email 3 → Email 4. Re-engagement path: send the alternate Email 3
 * (`EXCELLENCE_GUIDE_EMAIL_3_ALT_REENGAGEMENT_*`), then merge back before Email 4 or match your sequence design.
 */
export const CONVERTKIT_TAG_ENGAGED_WEEK_1 = "Engaged Week 1";
export const CONVERTKIT_TAG_NEEDS_RE_ENGAGEMENT = "Needs Re-engagement";

/**
 * ConvertKit Email 1 (Day 0, tag "Excellence Guide 2026") — paste into broadcast / sequence editor.
 * Preheader: insert as "Preview text" / inbox snippet (first line hidden preheader trick optional in CK).
 */
export const EXCELLENCE_GUIDE_EMAIL_SUBJECT = "Your 2026 Excellence Guide is here ✦";
export const EXCELLENCE_GUIDE_EMAIL_PREVIEW_TEXT = "The Circle is open. Your guide + a note from Deen.";

/** ConvertKit Email 2 (Day 2, Wednesday — "Friday Standard" / menswear + Amazon picks). */
export const EXCELLENCE_GUIDE_EMAIL_2_SUBJECT = "The Friday Standard: dress the part ✦";
export const EXCELLENCE_GUIDE_EMAIL_2_PREVIEW_TEXT =
  "Jummah is two days away. Here's the edit.";

/** ConvertKit Email 3 (Day 7) — Doha Minimalism / Vault + philosophy link. */
export const EXCELLENCE_GUIDE_EMAIL_3_SUBJECT = "The Doha Edit: what the Gulf gets right ✦";
export const EXCELLENCE_GUIDE_EMAIL_3_PREVIEW_TEXT =
  "Quiet luxury isn't a trend there. It's the default.";

/**
 * Alternate Email 3 for subscribers tagged `CONVERTKIT_TAG_NEEDS_RE_ENGAGEMENT`
 * (no link click after Email 2 + 48h wait). Single hero product, lower friction.
 */
export const EXCELLENCE_GUIDE_EMAIL_3_ALT_REENGAGEMENT_SUBJECT =
  "Still there? One piece worth seeing ✦";
export const EXCELLENCE_GUIDE_EMAIL_3_ALT_REENGAGEMENT_PREVIEW_TEXT =
  "No essay. One Vault pick. Halal-verified.";

/**
 * ConvertKit Email 4 — recurring broadcast ("Editor's Picks"). Replace `[Month]`, `[Year]`,
 * `[MONTH]` (UTM slug, e.g. `may2026`), product fields, and `[ASIN]` each send.
 */
export const EXCELLENCE_GUIDE_EMAIL_4_SUBJECT_TEMPLATE = "Editor's Picks: [Month] [Year] ✦";
export const EXCELLENCE_GUIDE_EMAIL_4_PREVIEW_TEXT =
  "4 pieces. All halal-verified. All worth it.";
