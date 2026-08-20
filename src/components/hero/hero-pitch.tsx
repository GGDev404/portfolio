"use client";

import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { SITE } from "@/data/site";
import { SplitHeading } from "@/components/motion/split-heading";
import { SystemReadout } from "@/components/hero/system-readout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function HeroPitch() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "es" | "en";

  return (
    <section className="relative overflow-hidden border-t border-border py-20">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <RevealGroup>
          <SplitHeading
            as="h1"
            className="max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            {t("title")}
          </SplitHeading>

          <RevealItem className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </RevealItem>

          <RevealItem className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            <MapPin size={14} className="text-accent" />
            {t("location")}
          </RevealItem>

          <RevealItem className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="gg-chamfer-sm inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("ctaProjects")}
              <ArrowDown size={14} />
            </a>
            <a
              href="#contact"
              className="gg-plate--brackets inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent"
            >
              {t("ctaContact")}
            </a>
          </RevealItem>

          <RevealItem className="mt-8">
            <a
              href={SITE.resumeUrl[locale]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              <Download size={14} />
              {tNav("resume")}
            </a>
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.15} className="lg:mt-1">
          <SystemReadout />
        </Reveal>
      </div>
    </section>
  );
}
