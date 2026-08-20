"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { SITE } from "@/data/site";
import { SplitHeading } from "@/components/motion/split-heading";
import { SystemReadout } from "@/components/hero/system-readout";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { gsap, useGSAP } from "@/lib/gsap";

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
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (reduced || coarse || !sectionRef.current) return;

      const row1 = sectionRef.current.querySelector('[data-hero-bg-row="1"]');
      const row2 = sectionRef.current.querySelector('[data-hero-bg-row="2"]');
      if (!row1 || !row2) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=60%",
            pin: true,
            scrub: true,
          },
        })
        .to(row1, { xPercent: -22, ease: "none" }, 0)
        .to(row2, { xPercent: 22, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -6, opacity: 0.35, ease: "none" }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      <HeroBackdrop />
      <div
        ref={contentRef}
        className="relative z-10 mx-auto grid max-w-5xl gap-12 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
      >
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.p variants={item} className="flex items-center gap-1 font-mono text-sm uppercase tracking-[0.14em] text-accent">
            {t("kicker")}
            <span className="gg-caret" />
          </motion.p>

          <SplitHeading
            as="h1"
            trigger="load"
            className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            {t("title")}
          </SplitHeading>

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

        <div className="lg:mt-1">
          <SystemReadout />
        </div>
      </div>
    </section>
  );
}
