import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PartnerBody = {
  name?: string;
  social_handle?: string;
  email?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PartnerBody;
    const name          = typeof body.name          === "string" ? body.name.trim()                        : "";
    const social_handle = typeof body.social_handle === "string" ? body.social_handle.trim()               : "";
    const email         = typeof body.email         === "string" ? body.email.trim().toLowerCase()         : "";

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    // ── 1. Supabase (optional) ───────────────────────────────────────────────
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (sbUrl && sbKey) {
      const res = await fetch(`${sbUrl}/rest/v1/partners`, {
        method: "POST",
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name, social_handle: social_handle || null, email }),
      });
      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json({ error: detail || "Could not save application." }, { status: 502 });
      }
    }

    // ── 2. Resend email notification ─────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "HalalStyle <onboarding@resend.dev>",
          to: ["shazad.mirza@gmail.com"],
          subject: `✦ New Partner Application — ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px">
              <h2 style="color:#C9A84C;margin-bottom:16px">New Excellence Circle Application</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Social Handle</td><td style="padding:8px 0">${social_handle || "Not provided"}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
              <p style="color:#aaa;font-size:12px">Submitted via halalstyle.vercel.app/partners</p>
            </div>
          `,
        }),
      }).catch(() => { /* non-fatal */ });
    }

    // ── 3. Console fallback ──────────────────────────────────────────────────
    if (!sbUrl && !resendKey) {
      console.log("[partners] application (no integrations configured):", { name, social_handle, email });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
