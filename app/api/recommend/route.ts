import { NextResponse } from "next/server";

export const runtime = "nodejs";

const AFFILIATE_TAG = "halalstyle50d-20";

type AnthropicContent = { type: string; text?: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const quizInput = body?.quizInput as string | undefined;

    if (!quizInput?.trim()) {
      return NextResponse.json({ error: "Missing quizInput" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server missing ANTHROPIC_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: `You are a halal modest fashion recommender for Muslim families in Canada. Only suggest modest, ethical, halal items. Give exactly 5 product recommendations based on the quiz answers. You MUST return ONLY a raw JSON array — no markdown, no backticks, no code fences, no \`\`\`json, no extra text. Start with [ and end with ]. Each item must have exactly these keys: title, description, why_halal, price_range, buy_link, image_url. For buy_link: https://www.amazon.ca/s?k=SEARCH+TERMS&tag=${AFFILIATE_TAG} with relevant keywords. For image_url: use ONLY (1) a real Amazon CDN URL on https://m.media-amazon.com/ when you are confident it matches the product, OR (2) a valid https://images.unsplash.com/photo-... URL with query params auto=format&fit=crop&w=600&h=450&q=80. Never use source.unsplash.com. If unsure, use an empty string for image_url.`,
        messages: [{ role: "user", content: quizInput }],
      }),
    });

    const data = (await response.json()) as {
      content?: AnthropicContent[];
      error?: { message?: string };
    };

    if (!response.ok) {
      const msg =
        data?.error?.message ||
        (typeof data === "object" ? JSON.stringify(data) : "Anthropic API error");
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const raw = data.content?.[0]?.text;
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 }
      );
    }

    const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
    const items = JSON.parse(cleaned) as unknown;

    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
