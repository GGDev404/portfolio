"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { gsap, useGSAP } from "@/lib/gsap";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "es" | "en";
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const track = trackRef.current;
      const pin = pinRef.current;
      if (reduced || coarse || narrow || !track || !pin) return;

      track.dataset.mode = "scroll";
      pin.dataset.mode = "scroll";
      const getDistance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">02</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        </Reveal>

        <div className="gg-divider--hazard mt-10" />
      </div>

      <div ref={pinRef} className="gg-projects-pin mt-10 overflow-hidden">
        <RevealGroup ref={trackRef} className="gg-projects-track grid w-full gap-8 px-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const content = project[locale];
            return (
              <RevealItem
                key={project.slug}
                className="gg-plate--brackets gg-chamfer-sm group relative flex flex-col overflow-hidden border border-border bg-background-elevated transition-all duration-500 hover:-translate-y-1 hover:border-accent"
              >
                <span className="pointer-events-none absolute right-4 top-1 z-10 select-none font-display text-7xl font-light leading-none text-foreground/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-background">
                  <Image
                    src={project.image}
                    alt={content.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{content.role}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">{content.name}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="text-sm leading-relaxed text-muted">{content.summary}</p>

                  <ul className="flex flex-col gap-1.5 text-xs text-muted">
                    {content.impact.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-accent">›</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-4 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
                      >
                        <ExternalLink size={15} />
                        {t("liveLink")}
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
                      >
                        <GithubIcon size={15} />
                        {t("codeLink")}
                      </a>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
