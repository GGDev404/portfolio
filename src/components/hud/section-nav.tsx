"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const sections = ["top", "about", "projects", "experience", "skills", "contact"] as const;

export function SectionNav() {
  const t = useTranslations("nav");
  const [active, setActive] = useState<(typeof sections)[number]>("top");
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const targets = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id as (typeof sections)[number];
          setActive(id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={containerRef}
      aria-label={t("sectionNav")}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map((id, i) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-border-strong transition-colors hover:text-accent"
          >
            <span
              className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ${
                isActive ? "max-w-[7rem] opacity-100 text-accent" : "max-w-0 opacity-0 group-hover:max-w-[7rem] group-hover:opacity-100 group-hover:text-muted"
              }`}
            >
              {id === "top" ? t("home") : t(id)}
            </span>
            <span
              className={`h-px shrink-0 bg-current transition-all duration-300 ${
                isActive ? "w-6 text-accent" : "w-3"
              }`}
            />
            <span className="tabular-nums">{String(i).padStart(2, "0")}</span>
          </a>
        );
      })}
    </nav>
  );
}
