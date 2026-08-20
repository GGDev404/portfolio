import { useTranslations } from "next-intl";
import { SITE } from "@/data/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 font-mono text-xs uppercase tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 normal-case tracking-normal">
          <svg width="14" height="14" viewBox="0 0 120 120" aria-hidden="true" className="text-muted">
            <g fill="none" stroke="currentColor" strokeWidth={16} strokeLinejoin="miter">
              <path d="M 96 21 L 46 21 L 26 41 L 26 79 L 46 99 L 96 99 L 96 65 L 68 65" />
            </g>
          </svg>
          © {year} {SITE.name}. {t("rights")}
        </p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
