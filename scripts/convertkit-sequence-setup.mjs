#!/usr/bin/env node
/**
 * Kit (ConvertKit) — create sequence + 4 onboarding emails from repo copy.
 *
 * IMPORTANT — “v3” vs what actually works
 * - Your brief references ConvertKit v3 (api.convertkit.com). That API does not
 *   expose create-sequence or create-sequence-email endpoints (subscribe/list only).
 * - This script uses Kit API v4 (https://api.kit.com) with X-Kit-Api-Key — the supported
 *   way to create sequences and sequence emails programmatically today.
 *
 * Auth
 * - `CONVERTKIT_API_SECRET` — use your **V4 API key** from Kit → Account → Developer
 *   (“Add a new key”). It is sent as `X-Kit-Api-Key` (same value the UI calls an API key;
 *   the env name reflects “secret” vs the public subscribe key `CONVERTKIT_API_KEY`).
 *
 * Delays (Kit: days after the previous email → calendar day from sign-up)
 * - Email 1: 0d → day 0 | Email 2: 2d → day 2 | Email 3: 5d → day 7 | Email 4: 7d → day 14
 *
 * Usage: `node scripts/convertkit-sequence-setup.mjs`
 *
 * Source-of-truth copy (inlined, no @/ imports): `lib/excellence-guide-constants.ts`,
 * `lib/excellence-guide-email-liquid.ts`, `lib/site.ts` (`SITE_URL`).
 */

import process from "node:process";

/** @see lib/site.ts */
const SITE_URL = "https://halalstyle.vercel.app";

/** @see lib/excellence-guide-constants.ts */
const EXCELLENCE_GUIDE_EMAIL_SUBJECT = "Your 2026 Excellence Guide is here ✦";
const EXCELLENCE_GUIDE_EMAIL_PREVIEW_TEXT = "The Circle is open. Your guide + a note from Deen.";

const EXCELLENCE_GUIDE_EMAIL_2_SUBJECT = "The Friday Standard: dress the part ✦";
const EXCELLENCE_GUIDE_EMAIL_2_PREVIEW_TEXT = "Jummah is two days away. Here's the edit.";

const EXCELLENCE_GUIDE_EMAIL_3_SUBJECT = "The Doha Edit: what the Gulf gets right ✦";
const EXCELLENCE_GUIDE_EMAIL_3_PREVIEW_TEXT = "Quiet luxury isn't a trend there. It's the default.";

const EXCELLENCE_GUIDE_EMAIL_4_SUBJECT_TEMPLATE = "Editor's Picks: [Month] [Year] ✦";
const EXCELLENCE_GUIDE_EMAIL_4_PREVIEW_TEXT = "4 pieces. All halal-verified. All worth it.";

/** @see lib/excellence-guide-email-liquid.ts — AMAZON_UTM */
const AMAZON_UTM = "utm_source=convertkit&utm_medium=email&utm_campaign=friday_standard";
/** DOHA_EDIT_W2_UTM */
const DOHA_EDIT_W2_UTM = "utm_source=convertkit&utm_medium=email&utm_campaign=doha_edit_w2";

const EXCELLENCE_GUIDE_EMAIL_1_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

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

— Deen Ali Mirza, Founder, HalalStyles

What's inside the guide:
  · The Doha Minimalism vs. Dubai Opulence trend report
  · The Friday Standard — dressed for Jummah, ready for anything
  · The Tech Edit — tools for the modern Muslim achiever

Bookmark the lookbook. The Vault updates weekly.

→ Explore the Vault now:
${SITE_URL}/vault

With excellence,
The HalalStyles Team

---
You're receiving this because you requested the 2026 Excellence Guide
at halalstyles55.com. We respect your inbox.
Unsubscribe: {{ unsubscribe_url }}
HalalStyles · Shelburne, Ontario, Canada
`;

const EXCELLENCE_GUIDE_EMAIL_2_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

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

Every link is halal-verified. Every purchase supports HalalStyles
at no extra cost to you — barakah in the transaction.

Jumu'ah Mubarak in advance.

— The HalalStyles Edit Desk

---
Unsubscribe: {{ unsubscribe_url }}
`;

const EXCELLENCE_GUIDE_EMAIL_3_BODY_TEXT = `Salaam {{ subscriber.first_name | default: "friend" }},

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
The HalalStyles Edit Desk

---
Unsubscribe: {{ unsubscribe_url }}
`;

const EXCELLENCE_GUIDE_EMAIL_4_BODY_TEMPLATE = `Salaam {{ subscriber.first_name | default: "friend" }},

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

— Deen + The HalalStyles Edit Desk

---
You're on the HalalStyles Circle list. We send when it's worth sending.
Unsubscribe: {{ unsubscribe_url }}
HalalStyles · Shelburne, Ontario, Canada
`;

const API_BASE = "https://api.kit.com/v4";
const SEQUENCE_NAME = "Excellence Guide 2026 — Onboarding";

const EMAIL_STEPS = [
  {
    step: "Create sequence email 1 (delay after previous: 0 days → calendar day 0)",
    subject: EXCELLENCE_GUIDE_EMAIL_SUBJECT,
    preview_text: EXCELLENCE_GUIDE_EMAIL_PREVIEW_TEXT,
    content: EXCELLENCE_GUIDE_EMAIL_1_BODY_TEXT,
    delay_value: 0,
    delay_unit: "days",
    calendarDay: 0,
  },
  {
    step: "Create sequence email 2 (delay after previous: 2 days → calendar day 2)",
    subject: EXCELLENCE_GUIDE_EMAIL_2_SUBJECT,
    preview_text: EXCELLENCE_GUIDE_EMAIL_2_PREVIEW_TEXT,
    content: EXCELLENCE_GUIDE_EMAIL_2_BODY_TEXT,
    delay_value: 2,
    delay_unit: "days",
    calendarDay: 2,
  },
  {
    step: "Create sequence email 3 (delay after previous: 5 days → calendar day 7)",
    subject: EXCELLENCE_GUIDE_EMAIL_3_SUBJECT,
    preview_text: EXCELLENCE_GUIDE_EMAIL_3_PREVIEW_TEXT,
    content: EXCELLENCE_GUIDE_EMAIL_3_BODY_TEXT,
    delay_value: 5,
    delay_unit: "days",
    calendarDay: 7,
  },
  {
    step: "Create sequence email 4 (delay after previous: 7 days → calendar day 14)",
    subject: EXCELLENCE_GUIDE_EMAIL_4_SUBJECT_TEMPLATE,
    preview_text: EXCELLENCE_GUIDE_EMAIL_4_PREVIEW_TEXT,
    content: EXCELLENCE_GUIDE_EMAIL_4_BODY_TEMPLATE,
    delay_value: 7,
    delay_unit: "days",
    calendarDay: 14,
  },
];

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plainToKitHtml(plain) {
  return `<div style="white-space:pre-wrap;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.55;color:#1a1a1a;">${escapeHtml(plain)}</div>`;
}

function getSecret() {
  const s = process.env.CONVERTKIT_API_SECRET?.trim();
  if (!s) {
    throw new Error(
      "Missing CONVERTKIT_API_SECRET. Set it to your Kit V4 API key (Account → Developer), sent as X-Kit-Api-Key.",
    );
  }
  return s;
}

async function kitRequest(stepName, path, { method = "GET", body } = {}) {
  const secret = getSecret();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Kit-Api-Key": secret,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { _parseError: true, raw: text };
  }
  if (!res.ok) {
    console.error(`[${stepName}] FAILED HTTP ${res.status}`);
    console.error(typeof text === "string" ? text : JSON.stringify(json, null, 2));
    throw new Error(`${stepName}: HTTP ${res.status}`);
  }
  return { status: res.status, json, text };
}

function logSuccess(stepName, status, idInfo) {
  const parts = [`[${stepName}]`, `HTTP ${status}`];
  if (idInfo) parts.push(idInfo);
  console.log(parts.join(" | "));
}

async function main() {
  const createdEmails = [];

  const { status: createStatus, json: createJson } = await kitRequest(
    "Create sequence",
    "/sequences",
    {
      method: "POST",
      body: { name: SEQUENCE_NAME, active: true },
    },
  );

  const sequenceId = createJson?.sequence?.id;
  logSuccess("Create sequence", createStatus, sequenceId != null ? `sequence_id=${sequenceId}` : "");
  if (sequenceId == null) {
    console.error("Unexpected response:", JSON.stringify(createJson, null, 2));
    throw new Error("Create sequence: missing sequence.id");
  }

  for (const step of EMAIL_STEPS) {
    const { status, json } = await kitRequest(step.step, `/sequences/${sequenceId}/emails`, {
      method: "POST",
      body: {
        subject: step.subject,
        preview_text: step.preview_text,
        content: plainToKitHtml(step.content),
        delay_value: step.delay_value,
        delay_unit: step.delay_unit,
        published: true,
      },
    });
    const emailId = json?.email?.id;
    logSuccess(step.step, status, emailId != null ? `email_id=${emailId}` : "");
    if (emailId == null) {
      console.error("Unexpected response:", JSON.stringify(json, null, 2));
      throw new Error(`${step.step}: missing email.id`);
    }
    createdEmails.push({
      id: emailId,
      calendarDay: step.calendarDay,
      delay_value: step.delay_value,
      delay_unit: step.delay_unit,
    });
  }

  console.log("\n========== SUMMARY ==========");
  console.log(`Sequence ID: ${sequenceId}`);
  console.log("Sequence emails:");
  for (const e of createdEmails) {
    console.log(
      `  - email_id=${e.id} | delay after previous: ${e.delay_value} days → calendar day ${e.calendarDay}`,
    );
  }
  console.log("\n--- Next step in Kit UI ---");
  console.log(
    `Go to ConvertKit → Automations → New Visual Automation →\n` +
      `  Trigger: Tag added = 'Excellence Guide 2026'\n` +
      `  → Action: Subscribe to sequence [${sequenceId}]`,
  );
  console.log("==============================\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
