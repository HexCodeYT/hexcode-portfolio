import { ImageResponse } from "next/og";

export const alt = "HexCode — Software that survives production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#10b981",
          letterSpacing: "6px",
          marginBottom: 48,
        }}
      >
        HEXCODE · PRODUCTION ENGINEERING
      </div>
      <div
        style={{
          fontSize: 88,
          fontWeight: 600,
          lineHeight: 1.04,
          letterSpacing: "-4px",
          maxWidth: 950,
        }}
      >
        Software that survives production.
      </div>
      <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 40 }}>
        Build. Harden. Rescue. · hexcode.au
      </div>
    </div>,
    size,
  );
}
