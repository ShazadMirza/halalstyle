import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HalalStyles — The Excellence Filter for Modest Fashion";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/** Emerald / gold hero — matches live homepage vault aesthetic */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 90% 70% at 50% 28%, #0b5234 0%, #022c22 55%, #03160f 100%)",
          position: "relative",
        }}
      >
        {/* Gold wash overlay — using linear-gradient (Satori-safe, no repeating-linear-gradient) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            background: "linear-gradient(135deg, #D4AF37 0%, transparent 50%, #D4AF37 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            fontSize: 22,
            color: "rgba(212,175,55,0.85)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 20,
          }}
        >
          AI-Powered Modest Fashion
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            color: "#D4AF37",
            letterSpacing: "0.08em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            textShadow: "0 4px 32px rgba(0,0,0,0.4)",
          }}
        >
          HalalStyles
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "rgba(255,248,240,0.95)",
            letterSpacing: "0.06em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
          }}
        >
          The Excellence Filter
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            color: "rgba(255,248,240,0.88)",
            letterSpacing: "0.04em",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          for Modest Fashion
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "rgba(255,248,240,0.65)",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Curated modest luxury · 100% Halal-verified · Canada
        </div>
      </div>
    ),
    { ...size },
  );
}
