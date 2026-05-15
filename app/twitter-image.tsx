import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HalalStyle — The Excellence Filter for Modest Fashion";

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
          background: "linear-gradient(155deg, #041a12 0%, #0A4D32 42%, #062C1D 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 100,
            bottom: 60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            fontSize: 86,
            fontWeight: 600,
            color: "#D4AF37",
            letterSpacing: "0.1em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            textShadow: "0 4px 24px rgba(0,0,0,0.35)",
          }}
        >
          HalalStyle
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,248,240,0.9)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          The Excellence Filter
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 24,
            color: "rgba(255,248,240,0.72)",
            maxWidth: 880,
            textAlign: "center",
            lineHeight: 1.45,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Modest luxury · Halal-verified picks · Muslim families in Canada
        </div>
      </div>
    ),
    { ...size },
  );
}
