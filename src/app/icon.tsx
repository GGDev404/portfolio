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
        <svg width="32" height="32" viewBox="0 0 32 32">
          <g
            fill="none"
            stroke="#EDF0F3"
            strokeWidth={18}
            strokeLinejoin="miter"
            transform="translate(4.8,4.8) scale(0.185)"
          >
            <path d="M 96 21 L 46 21 L 26 41 L 26 79 L 46 99 L 96 99 L 96 65 L 68 65" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
