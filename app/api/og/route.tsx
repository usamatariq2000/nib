import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || site.tagline).slice(0, 90);
  const subtitle = (searchParams.get("subtitle") || site.description).slice(0, 150);
  const kicker = (searchParams.get("kicker") || site.name).slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f7f6f2",
          backgroundImage:
            "linear-gradient(#e5e3db 1px, transparent 1px), linear-gradient(90deg, #e5e3db 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="42" height="42" viewBox="0 0 32 32">
            <path d="M7 6h12l6 6v14H7V6Z" fill="#e4431b" />
            <path d="M19 6v6h6" fill="#f7f6f2" />
          </svg>
          <span style={{ fontSize: "30px", fontWeight: 600, color: "#191917" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#e4431b",
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#191917",
              maxWidth: "1000px",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: "30px",
              lineHeight: 1.35,
              color: "#6b6a63",
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </span>
        </div>

        <div style={{ display: "flex", height: "8px" }}>
          <div style={{ flex: 1, background: "#e4431b" }} />
          <div style={{ flex: 1, background: "#191917" }} />
          <div style={{ width: "200px", background: "#d6d3c8" }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
