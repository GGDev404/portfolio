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
          <svg width="36" height="36" viewBox="0 0 120 120">
            <g fill="none" stroke="#EDF0F3" strokeWidth={15} strokeLinejoin="miter">
              <path d="M 96 21 L 46 21 L 26 41 L 26 79 L 46 99 L 96 99 L 96 65 L 68 65" />
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
