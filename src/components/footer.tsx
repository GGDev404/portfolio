import { useTranslations } from "next-intl";
import { SITE } from "@/data/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 font-mono text-xs uppercase tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 normal-case tracking-normal">
          <svg width="20" height="12" viewBox="0 0 200 120" aria-hidden="true" className="text-muted">
            <g fill="none" stroke="currentColor" strokeWidth={13} strokeLinejoin="miter">
              <path d="M 84 22 L 40 22 L 22 40 L 22 80 L 40 98 L 84 98 L 84 66 L 62 66" />
              <path d="M 116 98 L 160 98 L 178 80 L 178 40 L 160 22 L 116 22 L 116 54 L 138 54" />
            </g>
          </svg>
          © {year} {SITE.name}. {t("rights")}
        </p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
