"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { experience } from "@/data/experience";
import { MagneticBlock } from "@/components/motion/magnetic-block";
import { gsap, useGSAP } from "@/lib/gsap";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as "es" | "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !lineRef.current || !containerRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll<HTMLElement>("[data-node-plate]");
    if (!nodes || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="border-t border-border">
      <div className="mx-auto max-w-[1360px] px-[40px] pt-[clamp(64px,12vw,100px)] pb-[clamp(80px,16vw,140px)]">
        <MagneticBlock>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">03</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        </MagneticBlock>

        <div ref={containerRef} className="relative mt-14">
          <div className="pointer-events-none absolute left-[172px] top-2 bottom-2 hidden w-px bg-border sm:block" />
          <div
            ref={lineRef}
            className="pointer-events-none absolute left-[172px] top-2 bottom-2 hidden w-px origin-top bg-accent sm:block"
          />

          <div className="flex flex-col gap-10">
            {experience.map((item) => {
              const content = item[locale];
              return (
                <MagneticBlock
                  key={item.id}
                  className="relative grid gap-3 border-l border-border pl-6 sm:grid-cols-[160px_1fr] sm:gap-x-6 sm:border-0 sm:pl-0"
                >
                  <span className="absolute left-[166px] top-1.5 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background sm:block" />

                  <div className="font-mono text-xs uppercase tracking-wide text-muted">
                    {item.start} — {item.end}
                  </div>

                  <div
                    data-node-plate
                    className="gg-plate--brackets border border-border bg-background-elevated/50 p-5 transition-colors duration-300"
                  >
                    <h3 className="font-display text-base font-semibold">
                      {content.role}{" "}
                      <span className="font-sans font-normal text-muted">· {content.company}</span>
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {content.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-muted">
                          <span className="text-accent">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MagneticBlock>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
