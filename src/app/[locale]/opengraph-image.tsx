import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07080A",
          backgroundImage:
            "linear-gradient(#141A20 1px, transparent 1px), linear-gradient(90deg, #141A20 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "#EDF0F3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="54" height="32" viewBox="0 0 200 120">
            <g fill="none" stroke="#EDF0F3" strokeWidth={13} strokeLinejoin="miter">
              <path d="M 84 22 L 40 22 L 22 40 L 22 80 L 40 98 L 84 98 L 84 66 L 62 66" />
              <path d="M 116 98 L 160 98 L 178 80 L 178 40 L 160 22 L 116 22 L 116 54 L 138 54" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#2FE6E6", textTransform: "uppercase" }}>
            {t("kicker")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          {t("title")}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#9AA3AD" }}>
          Geovany González — {t("location")}
        </div>
      </div>
    ),
    size,
  );
}
