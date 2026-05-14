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
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const social_handle =
      typeof body.social_handle === "string" ? body.social_handle.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Name and a valid email are required." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (url && key) {
      const res = await fetch(`${url}/rest/v1/partners`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          social_handle: social_handle || null,
          email,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json(
          { error: detail || "Could not save application." },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, saved: true });
    }

    console.log("[partners] application (Supabase not configured):", {
      name,
      social_handle,
      email,
    });

    return NextResponse.json({ ok: true, logged: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
