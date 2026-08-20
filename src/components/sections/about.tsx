"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { gsap, useGSAP } from "@/lib/gsap";

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !imageRef.current || !sectionRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef} className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">01</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-[auto_1.4fr_1fr]">
          <Reveal delay={0.1} className="mx-auto md:mx-0">
            <div
              ref={imageRef}
              className="relative h-56 w-44 shrink-0 overflow-hidden border border-border bg-background-elevated sm:h-52 sm:w-40"
            >
              <Image
                src="/profile.png"
                alt="Geovany González"
                width={288}
                height={352}
                className="relative h-full w-full object-contain object-bottom"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-muted">{t("body")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="flex flex-col gap-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
