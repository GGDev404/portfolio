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
          background: "#0a0e0d",
          color: "#e7ece9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#00e5a0", fontFamily: "monospace" }}>
          {t("kicker")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {t("title")}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#8a938f" }}>
          Geovany González — {t("location")}
        </div>
      </div>
    ),
    size,
  );
}
