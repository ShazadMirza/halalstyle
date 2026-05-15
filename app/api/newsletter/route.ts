import { NextResponse } from "next/server";
import { EXCELLENCE_GUIDE_DOWNLOAD_PATH } from "@/lib/excellence-guide-constants";

export const runtime = "nodejs";

const TAG_NAME = "newsletter-subscriber";

type Body = { email?: string };

async function resolveTagId(apiKey: string): Promise<number | null> {
  const res = await fetch(`https://api.convertkit.com/v3/tags?api_key=${encodeURIComponent(apiKey)}`);
  if (!res.ok) return null;
  const data = (await res.json()) as { tags?: { id: number; name: string }[] };
  const match = data.tags?.find((t) => t.name.toLowerCase() === TAG_NAME.toLowerCase());
  return match?.id ?? null;
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

    const tagId = await resolveTagId(apiKey);
    if (tagId != null) {
      await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
        }),
      }).catch(() => {
        /* tag attach is best-effort */
      });
    }

    return NextResponse.json({ success: true, downloadUrl: EXCELLENCE_GUIDE_DOWNLOAD_PATH });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
