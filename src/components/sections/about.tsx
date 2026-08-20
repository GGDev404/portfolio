"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { MagneticBlock } from "@/components/motion/magnetic-block";
import { useMagneticReveal } from "@/components/crystal/CrystalScene";
import { gsap, useGSAP } from "@/lib/gsap";

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageMagneticRef = useMagneticReveal();
  const bodyMagneticRef = useMagneticReveal();
  const listMagneticRef = useMagneticReveal();
  const [avatarMissing, setAvatarMissing] = useState(false);

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
    <section id="about" ref={sectionRef} className="border-t border-border">
      <div className="mx-auto max-w-[1360px] px-[40px] pt-[clamp(64px,12vw,100px)] pb-[clamp(80px,16vw,140px)]">
        <MagneticBlock>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">01</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
        </MagneticBlock>
        <div className="mt-8 grid gap-10 md:grid-cols-[auto_1.4fr_1fr]">
          <div ref={imageMagneticRef} className="mx-auto md:mx-0">
            <div
              ref={imageRef}
              className="gg-plate--brackets is-active relative h-48 w-48 shrink-0 overflow-hidden border border-border bg-background-elevated"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
                }}
              />
              {!avatarMissing ? (
                <Image
                  src="/avatar.png"
                  alt="Geovany González"
                  width={320}
                  height={320}
                  className="relative h-full w-full object-contain object-center"
                  priority
                  onError={() => setAvatarMissing(true)}
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center">
                  <svg viewBox="0 0 120 120" width="72" height="72" aria-hidden="true" className="text-foreground/70">
                    <g fill="none" stroke="currentColor" strokeWidth="9" strokeLinejoin="miter">
                      <path d="M 96 21 L 46 21 L 26 41 L 26 79 L 46 99 L 96 99 L 96 65 L 68 65" />
                    </g>
                  </svg>
                </div>
              )}
              <span className="gg-badge gg-badge--live absolute bottom-2 right-2">{t("status")}</span>
            </div>
          </div>
          <p ref={bodyMagneticRef} className="text-lg leading-relaxed text-muted">
            {t("body")}
          </p>
          <ul ref={listMagneticRef} className="flex flex-col gap-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
