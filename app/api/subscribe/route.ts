import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, first_name, style, category, budget, occasion } = body as {
      email?: string;
      first_name?: string;
      style?: string;
      category?: string;
      budget?: string;
      occasion?: string;
    };

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const CK_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CK_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CK_API_KEY || !CK_FORM_ID) {
      return NextResponse.json({ success: true, skipped: true });
    }

    await fetch(`https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: CK_API_KEY,
        email,
        first_name: first_name ?? "",
        fields: { style: style ?? "", category: category ?? "", budget: budget ?? "", occasion: occasion ?? "" },
        tags: ["halalstyle-quiz"],
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true, skipped: true });
  }
}
