"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { computeStats } from "@/lib/stats";

export function SystemReadout() {
  const t = useTranslations("hero.readout");
  const tHero = useTranslations("hero");
  const locale = useLocale() as "es" | "en";
  const stats = computeStats();

  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const stackRef = useRef<HTMLSpanElement>(null);

  const formatClock = (loc: string) =>
    new Intl.DateTimeFormat(loc, {
      timeZone: "America/Merida",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

  // Empty on the server so SSR/client markup match; filled in after mount since a
  // wall-clock reading is inherently client-only and would otherwise mismatch on hydration.
  const [clock, setClock] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with a live external clock, not derivable from props/state
    setClock(formatClock(locale));
    const id = setInterval(() => setClock(formatClock(locale)), 1000);
    return () => clearInterval(id);
  }, [locale]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        if (projectsRef.current) projectsRef.current.textContent = String(stats.projectCount).padStart(2, "0");
        if (stackRef.current) stackRef.current.textContent = String(stats.stackCount);
        return;
      }

      gsap.from(containerRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.3,
      });

      [
        { ref: projectsRef, value: stats.projectCount, pad: 2 },
        { ref: stackRef, value: stats.stackCount, pad: 0 },
      ].forEach(({ ref, value, pad }) => {
        if (!ref.current) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 1.4,
          delay: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = String(Math.round(counter.val)).padStart(pad, "0");
          },
        });
      });
    },
    { scope: containerRef },
  );

  const current = stats.current[locale];

  return (
    <div ref={containerRef} className="gg-plate--brackets border border-border bg-background-elevated p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t("title")}</span>
        <span className="gg-badge gg-badge--live tabular-nums">{clock || "00:00:00"}</span>
      </div>

      <div className="gg-divider mt-4" />

      <dl className="mt-4 flex flex-col gap-3 font-mono text-xs">
        <Row label={t("experience")} value={`${stats.years}${t("years")} ${stats.months}${t("months")}`} />
        <Row label={t("projects")} value={<span ref={projectsRef}>00</span>} />
        <Row
          label={t("stack")}
          value={
            <>
              <span ref={stackRef}>0</span> {t("tech")}
            </>
          }
        />
        <Row label={t("role")} value={`${current.role} · ${current.company}`} />
        <Row label={t("location")} value={tHero("location")} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-3 first:border-0 first:pt-0">
      <dt className="uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
