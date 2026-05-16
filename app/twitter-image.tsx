import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HalalStyles — The Excellence Filter for Modest Fashion";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function TwitterImage() {
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
            top: 100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            fontSize: 86,
            fontWeight: 600,
            color: "#D4AF37",
            letterSpacing: "0.08em",
            fontFamily: "Georgia, serif",
          }}
        >
          HalalStyles
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "rgba(255,248,240,0.92)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          The Excellence Filter for Modest Fashion
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            color: "rgba(255,248,240,0.68)",
            maxWidth: 880,
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Curated modest luxury · 100% Halal-verified
        </div>
      </div>
    ),
    { ...size },
  );
}
