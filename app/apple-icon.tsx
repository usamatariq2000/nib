import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191917",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M7 6h12l6 6v14H7V6Z" fill="#e4431b" />
          <path d="M19 6v6h6" fill="#191917" />
        </svg>
      </div>
    ),
    size,
  );
}
