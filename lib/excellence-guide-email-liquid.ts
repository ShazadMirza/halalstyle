import { SITE_URL } from "@/lib/site";

/**
 * ConvertKit **Email 1 (Day 0)** — plain-text body with Liquid.
 * Paste into ConvertKit (HTML editor can wrap these paragraphs; keep Liquid tags verbatim).
 * URLs use `SITE_URL` so production stays canonical; swap to your Vercel preview host only when testing.
 */
export const EXCELLENCE_GUIDE_EMAIL_1_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

Welcome to the Circle.

Your 2026 Excellence Guide is ready — curated for the Muslim who
refuses to choose between faith and excellence.

→ Download the PDF:
${SITE_URL}/guides/halalstyle-2026-excellence.pdf

→ Browse the full digital lookbook:
${SITE_URL}/excellence-guide

A note from Deen, our founder:

"This guide is your first step toward a wardrobe of barakah and
excellence. Every piece was chosen with one question: does this
reflect who we're meant to be?"

— Deen Ali Mirza, Founder, HalalStyle

What's inside the guide:
  · The Doha Minimalism vs. Dubai Opulence trend report
  · The Friday Standard — dressed for Jummah, ready for anything
  · The Tech Edit — tools for the modern Muslim achiever

Bookmark the lookbook. The Vault updates weekly.

→ Explore the Vault now:
${SITE_URL}/vault

With excellence,
The HalalStyle Team

---
You're receiving this because you requested the 2026 Excellence Guide
at halalstyles55.com. We respect your inbox.
Unsubscribe: {{ unsubscribe_url }}
HalalStyle · Shelburne, Ontario, Canada
`;

/**
 * ConvertKit **Email 2 (Day 2)** — Friday Standard / Jummah prep; menswear Vault + Amazon.ca picks.
 * Amazon links mirror Vault search-style affiliate URLs (no fixed ASIN in data); tag + UTMs appended.
 */
const AMAZON_UTM = "utm_source=convertkit&utm_medium=email&utm_campaign=friday_standard";

export const EXCELLENCE_GUIDE_EMAIL_2_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

Jummah is the best day of the week.

Most men treat it like any other Friday. The Muslim high-achiever
treats it like a statement — because it is.

The Friday Standard is simple: one clean thobe, one excellent scent,
a prayer rug that reflects your home's standard. That's it. Effortless,
intentional, excellent.

This week's curated picks from the Vault:

→ Shop the full Menswear edit:
${SITE_URL}/vault/menswear?utm_source=convertkit&utm_medium=email&utm_campaign=reengage_w1

Directly on Amazon (ships to Canada):

  · Al-Watania Classic Thobe
    https://www.amazon.ca/s?k=premium+men+thobe+linen&tag=halalstyle50d-20&${AMAZON_UTM}

  · Swiss Arabian Shaghaf Oud — the Jummah standard
    https://www.amazon.ca/s?k=swiss+arabian+shaghaf+oud&tag=halalstyle50d-20&${AMAZON_UTM}

  · Sejadah Premium Prayer Rug
    https://www.amazon.ca/s?k=luxury+velvet+prayer+rug+compass&tag=halalstyle50d-20&${AMAZON_UTM}

Every link is halal-verified. Every purchase supports HalalStyle
at no extra cost to you — barakah in the transaction.

Jumu'ah Mubarak in advance.

— The HalalStyle Edit Desk

---
Unsubscribe: {{ unsubscribe_url }}
`;

/**
 * ConvertKit **Email 3 (Day 7)** — Doha Minimalism; full Vault + Amazon.ca picks + /about.
 * Amazon links use Vault-aligned search URLs where applicable (`tag` + `doha_edit_w2` UTMs).
 */
const DOHA_EDIT_W2_UTM = "utm_source=convertkit&utm_medium=email&utm_campaign=doha_edit_w2";

export const EXCELLENCE_GUIDE_EMAIL_3_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

There's a reason Doha doesn't follow trends.

It sets the standard — then waits for the world to catch up.

Doha Minimalism is the aesthetic of the confident Muslim: no logos,
no noise, no compromise. Neutral tones. Immaculate fabric. A silhouette
that says "I arrived" without saying anything at all.

This week we're pulling from the Doha end of the Vault — the pieces
that will read correctly in a boardroom, a masjid, or a Michelin table.

→ Explore the full Doha Edit:
${SITE_URL}/vault?${DOHA_EDIT_W2_UTM}

Selected pieces, direct to Amazon:

  · Luxury Crepe Abaya — neutral silhouette
    https://www.amazon.ca/s?k=luxury+crepe+abaya+women&tag=halalstyle50d-20&${DOHA_EDIT_W2_UTM}

  · Slim Leather Card Wallet — quiet carry
    https://www.amazon.ca/s?k=minimalist+slim+leather+wallet+rfid&tag=halalstyle50d-20&${DOHA_EDIT_W2_UTM}

  · Brass Islamic Geometry Wall Sculpture
    https://www.amazon.ca/s?k=islamic+geometry+wall+art+brass&tag=halalstyle50d-20&${DOHA_EDIT_W2_UTM}

The Excellence Filter says: buy once, buy correctly.

→ Read our curation philosophy:
${SITE_URL}/about?${DOHA_EDIT_W2_UTM}

With excellence,
The HalalStyle Edit Desk

---
Unsubscribe: {{ unsubscribe_url }}
`;

/**
 * ConvertKit **Email 3 (alternate)** — soft re-engagement after Email 2 non-click; one hero pick.
 */
const SOFT_REENGAGE_UTM = "utm_source=convertkit&utm_medium=email&utm_campaign=soft_reengage";

export const EXCELLENCE_GUIDE_EMAIL_3_ALT_REENGAGEMENT_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

Inbox noise is real — so this is the opposite of noise.

One piece from the Vault that keeps selling out in spirit if not in
shelves: our Luxury Crepe Abaya edit. Neutral, boardroom-clean,
masjid-appropriate. The kind of item you buy once and reach for for years.

→ See the full halal-verified breakdown (no cart required):
${SITE_URL}/vault/fashion?${SOFT_REENGAGE_UTM}

If you're ready to shop it on Amazon (Canada):
https://www.amazon.ca/s?k=luxury+crepe+abaya+women&tag=halalstyle50d-20&${SOFT_REENGAGE_UTM}

Still with us? Hit reply with "here" — we'd love to know.

— The HalalStyle Edit Desk

---
Unsubscribe: {{ unsubscribe_url }}
`;

/**
 * ConvertKit **Email 4** — monthly / weekly “Editor’s Picks” broadcast shell.
 * Bracket tokens are intentional for find-replace in ConvertKit; Vault URL uses `SITE_URL`.
 */
export const EXCELLENCE_GUIDE_EMAIL_4_BODY_TEMPLATE = `Salaam {{ subscriber.first_name | default: "friend" }},

Every month, the Edit Desk pulls 4 pieces from the Vault that are
performing — in quality, in demand, and in barakah.

No padding. No filler. Just the filter.

━━━━━━━━━━━━━━━━━━━━━━
01 / [PRODUCT NAME]
[One sentence editorial blurb — what it is, why it earns its place]
→ https://www.amazon.ca/dp/[ASIN]?tag=halalstyle50d-20&utm_source=convertkit&utm_medium=email&utm_campaign=editors_picks_[MONTH]

02 / [PRODUCT NAME]
[One sentence editorial blurb]
→ https://www.amazon.ca/dp/[ASIN]?tag=halalstyle50d-20&utm_source=convertkit&utm_medium=email&utm_campaign=editors_picks_[MONTH]

03 / [PRODUCT NAME]
[One sentence editorial blurb]
→ https://www.amazon.ca/dp/[ASIN]?tag=halalstyle50d-20&utm_source=convertkit&utm_medium=email&utm_campaign=editors_picks_[MONTH]

04 / [PRODUCT NAME]
[One sentence editorial blurb]
→ https://www.amazon.ca/dp/[ASIN]?tag=halalstyle50d-20&utm_source=convertkit&utm_medium=email&utm_campaign=editors_picks_[MONTH]
━━━━━━━━━━━━━━━━━━━━━━

All four are live in the Vault with the full halal-verified breakdown:
→ ${SITE_URL}/vault?utm_source=convertkit&utm_medium=email&utm_campaign=editors_picks_[MONTH]

Reply and tell us which one you bought. We read every reply.

— Deen + The HalalStyle Edit Desk

---
You're on the HalalStyle Circle list. We send when it's worth sending.
Unsubscribe: {{ unsubscribe_url }}
HalalStyle · Shelburne, Ontario, Canada
`;
