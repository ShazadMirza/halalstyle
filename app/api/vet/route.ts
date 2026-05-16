/**
 * POST /api/vet
 *
 * Lightweight vetting endpoint for the HalalStyles Chrome extension.
 * The extension calls this instead of bundling vault-items.ts (~437 lines of data).
 *
 * Body: { productName?: string; asin?: string }
 * Returns: VettingResult
 *
 * CORS: allows the extension origin — replace with your published extension ID.
 */
import { NextResponse, type NextRequest } from "next/server";
import { vetProduct } from "@/lib/vetting-engine";

export const runtime = "edge"; // Fast cold start — no Node.js APIs needed

const ALLOWED_ORIGINS = [
  "chrome-extension://",  // prefix match — any Chrome extension
  "https://halalstyle.vercel.app",
  "https://www.halalstyles55.com",
];

function corsHeaders(origin: string | null) {
  const allowed =
    origin && ALLOWED_ORIGINS.some((o) => origin.startsWith(o))
      ? origin
      : ALLOWED_ORIGINS[1]; // fallback to production domain
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const body = await req.json() as { productName?: string; asin?: string };

    if (!body?.productName && !body?.asin) {
      return NextResponse.json(
        { error: "Provide at least one of: productName, asin" },
        { status: 400, headers }
      );
    }

    // Sanitise inputs
    const productName = typeof body.productName === "string"
      ? body.productName.slice(0, 200).trim()
      : undefined;
    const asin = typeof body.asin === "string"
      ? body.asin.slice(0, 12).trim()
      : undefined;

    const result = vetProduct({ productName, asin });

    return NextResponse.json(result, { status: 200, headers });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers }
    );
  }
}
