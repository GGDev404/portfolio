import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { SITE } from "@/data/site";

export function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pt-28">
      <p className="font-mono text-sm text-accent">{t("kicker")}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t("subtitle")}</p>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted">
        <MapPin size={16} className="text-accent" />
        {t("location")}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          {t("ctaProjects")}
          <ArrowDown size={16} />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {t("ctaContact")}
        </a>
      </div>

      <a
        href={SITE.resumeUrl[locale]}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 hover:text-accent"
      >
        <Download size={14} />
        {tNav("resume")}
      </a>
    </section>
  );
}
