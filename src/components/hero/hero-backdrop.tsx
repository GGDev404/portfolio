"use client";

import { useRef } from "react";
import { SITE } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { shouldRunIntro, INTRO_EXIT_DELAY } from "@/lib/intro";

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [first, ...rest] = SITE.name.toUpperCase().split(" ");
  const last = rest.join(" ");

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const row1 = rootRef.current?.querySelector('[data-hero-bg-row="1"]');
      const row2 = rootRef.current?.querySelector('[data-hero-bg-row="2"]');
      if (reduced || !row1 || !row2) return;

      // El mismo nombre que el intro deja partir termina de formarse aquí:
      // si el intro va a correr, estas filas entran justo cuando el intro
      // empieza a desvanecerse (58%), como si el texto central se abriera
      // en dos mitades que caen a sus esquinas. Sin intro, solo aparecen.
      const willIntro = shouldRunIntro();
      const delay = willIntro ? INTRO_EXIT_DELAY / 1000 : 0;
      const duration = willIntro ? 1.15 : 0.7;

      gsap.fromTo(
        row1,
        { opacity: 0, yPercent: 22, scale: 1.05, filter: "blur(14px)" },
        { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration, delay, ease: "power3.out" },
      );
      gsap.fromTo(
        row2,
        { opacity: 0, yPercent: -22, scale: 1.05, filter: "blur(14px)" },
        { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration, delay, ease: "power3.out" },
      );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden sm:block"
    >
      <div
        data-hero-bg-row="1"
        className="absolute left-0 top-[14%] whitespace-nowrap font-display text-[17vw] font-light leading-none tracking-tight text-foreground/[0.14]"
      >
        {first}
      </div>
      <div
        data-hero-bg-row="2"
        className="absolute right-0 bottom-[10%] whitespace-nowrap font-display text-[17vw] font-light leading-none tracking-tight text-foreground/[0.14]"
      >
        {last}
      </div>
    </div>
  );
}
