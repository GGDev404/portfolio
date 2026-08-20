"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const t = useTranslations("hero");
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
            end: "+=70%",
            pin: true,
            scrub: true,
          },
        })
        .to(row1, { xPercent: -28, ease: "none" }, 0)
        .to(row2, { xPercent: 28, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -10, opacity: 0.15, ease: "none" }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      <HeroBackdrop />
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <p className="flex items-center gap-1 font-mono text-sm uppercase tracking-[0.14em] text-accent">
          {t("kicker")}
          <span className="gg-caret" />
        </p>

        <div className="gg-scroll-cue mt-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <ArrowDown size={14} className="text-accent" />
          {t("scrollCue")}
        </div>
      </div>
    </section>
  );
}
