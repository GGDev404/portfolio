"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Cloud, CreditCard, Database, LayoutGrid, type LucideIcon, Radio, Server, Smartphone } from "lucide-react";
import { skills } from "@/data/skills";
import { MagneticBlock } from "@/components/motion/magnetic-block";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const order = ["frontend", "backend", "iot", "mobile", "cloud", "databases", "payments"] as const;

const icons: Record<(typeof order)[number], LucideIcon> = {
  frontend: LayoutGrid,
  backend: Server,
  iot: Radio,
  mobile: Smartphone,
  cloud: Cloud,
  databases: Database,
  payments: CreditCard,
};

// lg column spans tuned per category so the grid reads as a bento layout — big
// tiles for stacks with more tools, small companion tiles beside them.
const span: Record<(typeof order)[number], string> = {
  frontend: "",
  backend: "lg:col-span-2",
  iot: "",
  mobile: "",
  cloud: "",
  databases: "",
  payments: "lg:col-span-2",
};

export function Skills() {
  const t = useTranslations("skills");
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>("[data-skill-card]");

      cards.forEach((card) => {
        const chips = card.querySelectorAll<HTMLElement>("[data-skill-chip]");
        const counter = card.querySelector<HTMLElement>("[data-skill-count]");
        const count = Number(card.dataset.count ?? "0");

        if (reduced) {
          if (counter) counter.textContent = String(count).padStart(2, "0");
          return;
        }

        gsap.set(chips, { opacity: 0, y: 8, scale: 0.9 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(chips, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.6)",
              stagger: { each: 0.035, from: "start" },
            });
            if (counter) {
              const c = { val: 0 };
              gsap.to(c, {
                val: count,
                duration: 0.8,
                ease: "power2.out",
                onUpdate: () => {
                  counter.textContent = String(Math.round(c.val)).padStart(2, "0");
                },
              });
            }
          },
        });
      });
    },
    { scope: gridRef },
  );

  return (
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-[1360px] px-[40px] pt-[clamp(64px,12vw,100px)] pb-[clamp(80px,16vw,140px)]">
        <MagneticBlock>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">04</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        </MagneticBlock>

        <div ref={gridRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {order.map((category) => {
            const Icon = icons[category];
            const items = skills[category];
            return (
              <MagneticBlock key={category} className={`h-full ${span[category]}`}>
                <div
                  data-skill-card
                  data-count={items.length}
                  className="gg-plate--brackets group relative flex h-full flex-col overflow-hidden border border-border bg-background-elevated p-5 transition-colors"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-foreground/[0.05] transition-colors duration-500 group-hover:text-accent/[0.08]"
                  />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="shrink-0 text-accent" strokeWidth={1.75} />
                      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                        {t(`categories.${category}`)}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tabular-nums tracking-[0.1em] text-muted">
                      <span data-skill-count>00</span> {t("unit")}
                    </span>
                  </div>

                  <div className="gg-divider relative mt-4" />

                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        data-skill-chip
                        className="border border-border px-2.5 py-1 font-mono text-xs text-muted transition-colors group-hover:border-border-strong"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </MagneticBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}
