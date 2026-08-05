import { useTranslations } from "next-intl";
import { SITE } from "@/data/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE.name}. {t("rights")}
        </p>
        <p className="font-mono">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
