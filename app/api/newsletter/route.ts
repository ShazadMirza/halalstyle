import { NextResponse } from "next/server";
import { EXCELLENCE_GUIDE_DOWNLOAD_PATH, EXCELLENCE_GUIDE_WEB_PATH } from "@/lib/excellence-guide-constants";

export const runtime = "nodejs";

/** Optional second tag for broad newsletter segmentation (legacy). */
const NEWSLETTER_SEGMENT_TAG = "newsletter-subscriber";

/**
 * Tag that must drive the ConvertKit Visual Automation:
 * "When subscriber is added to this tag → send *Your 2026 Excellence Guide* (with PDF link)."
 * Create this exact tag in ConvertKit and attach the automation to it.
 * Post–Email 2 engagement split (tags + alternate copy): `CONVERTKIT_TAG_*` in excellence-guide-constants.ts.
 */
function excellenceAutomationTagName(): string {
  return (
    process.env.CONVERTKIT_EXCELLENCE_GUIDE_TAG?.trim() ||
    process.env.CONVERTKIT_EXCELLENCE_AUTOMATION_TAG?.trim() ||
    "Excellence Guide 2026"
  );
}

type Body = { email?: string };

async function resolveTagIdByName(apiKey: string, tagName: string): Promise<number | null> {
  const res = await fetch(`https://api.convertkit.com/v3/tags?api_key=${encodeURIComponent(apiKey)}`);
  if (!res.ok) return null;
  const data = (await res.json()) as { tags?: { id: number; name: string }[] };
  const match = data.tags?.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
  return match?.id ?? null;
}

async function subscribeEmailToTag(apiKey: string, tagId: number, email: string): Promise<boolean> {
  const res = await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const apiKey = process.env.CONVERTKIT_API_KEY?.trim();
    const formId =
      process.env.CONVERTKIT_NEWSLETTER_FORM_ID?.trim() || process.env.CONVERTKIT_FORM_ID?.trim();

    if (!apiKey || !formId) {
      console.log("[newsletter] lead captured (ConvertKit not configured):", { email, source: "excellence-guide" });
      return NextResponse.json({
        success: true,
        persistence: "demo" as const,
        downloadUrl: EXCELLENCE_GUIDE_DOWNLOAD_PATH,
        redirectUrl: EXCELLENCE_GUIDE_WEB_PATH,
        redirect: EXCELLENCE_GUIDE_WEB_PATH,
      });
    }

    const subRes = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
      }),
    });

    if (!subRes.ok) {
      const text = await subRes.text();
      return NextResponse.json(
        { error: text || "Could not subscribe right now. Please try again." },
        { status: 502 },
      );
    }

    const automationTagName = excellenceAutomationTagName();
    const automationTagId = await resolveTagIdByName(apiKey, automationTagName);

    if (automationTagId == null) {
      console.error(
        `[newsletter] ConvertKit: no tag named "${automationTagName}". ` +
          'Create it in ConvertKit, then add a Visual Automation: trigger "Tag added" → send "Your 2026 Excellence Guide" (include PDF link). ' +
          "Set CONVERTKIT_EXCELLENCE_GUIDE_TAG if your tag name differs.",
      );
    } else {
      const tagged = await subscribeEmailToTag(apiKey, automationTagId, email);
      if (!tagged) {
        console.error(
          `[newsletter] ConvertKit: failed to apply automation tag "${automationTagName}" for ${email} — automation may not send.`,
        );
      }
    }

    const segmentTagId = await resolveTagIdByName(apiKey, NEWSLETTER_SEGMENT_TAG);
    if (segmentTagId != null && segmentTagId !== automationTagId) {
      const ok = await subscribeEmailToTag(apiKey, segmentTagId, email);
      if (!ok) {
        console.warn(`[newsletter] ConvertKit: optional segment tag "${NEWSLETTER_SEGMENT_TAG}" failed for ${email}`);
      }
    }

    return NextResponse.json({
      success: true,
      downloadUrl: EXCELLENCE_GUIDE_DOWNLOAD_PATH,
      redirectUrl: EXCELLENCE_GUIDE_WEB_PATH,
      redirect: EXCELLENCE_GUIDE_WEB_PATH,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
