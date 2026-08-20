import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#14171C",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 200 120">
          <g fill="none" stroke="#EDF0F3" strokeWidth={20} strokeLinejoin="miter">
            <path d="M 84 22 L 40 22 L 22 40 L 22 80 L 40 98 L 84 98 L 84 66 L 62 66" />
            <path d="M 116 98 L 160 98 L 178 80 L 178 40 L 160 22 L 116 22 L 116 54 L 138 54" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
