"use client";

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { SITE } from "@/data/site";

const PlateCluster = dynamic(() => import("@/components/three/plate-cluster"), {
  ssr: false,
});

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.p variants={item} className="flex items-center gap-1 font-mono text-sm uppercase tracking-[0.14em] text-accent">
            {t("kicker")}
            <span className="gg-caret" />
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            {t("title")}
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            <MapPin size={14} className="text-accent" />
            {t("location")}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
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
          </motion.div>

          <motion.a
            variants={item}
            href={SITE.resumeUrl[locale]}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 hover:text-accent"
          >
            <Download size={14} />
            {tNav("resume")}
          </motion.a>
        </motion.div>

        <div className="hidden h-[420px] lg:block" aria-hidden="true">
          <PlateCluster />
        </div>
      </div>
    </section>
  );
}
