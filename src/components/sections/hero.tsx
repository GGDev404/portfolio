"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { SITE } from "@/data/site";

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
    <motion.section
      id="top"
      initial="hidden"
      animate="show"
      variants={container}
      className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pt-28"
    >
      <motion.p variants={item} className="flex items-center gap-1 font-mono text-sm text-accent">
        {t("kicker")}
        <span className="inline-block h-4 w-[2px] animate-blink bg-accent" />
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
      >
        {t("title")}
      </motion.h1>
      <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted">
        {t("subtitle")}
      </motion.p>

      <motion.div variants={item} className="mt-4 flex items-center gap-2 text-sm text-muted">
        <MapPin size={16} className="text-accent" />
        {t("location")}
      </motion.div>

      <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
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
    </motion.section>
  );
}
