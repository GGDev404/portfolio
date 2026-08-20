import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="projects" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">02</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        </Reveal>

        <div className="gg-divider--hazard mt-10" />

        <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => {
            const content = project[locale];
            return (
              <RevealItem
                key={project.slug}
                className="gg-plate--brackets group flex flex-col overflow-hidden border border-border bg-background-elevated transition-colors duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-background">
                  <Image
                    src={project.image}
                    alt={content.name}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{content.name}</h3>
                    <p className="mt-1 font-mono text-xs text-accent">{content.role}</p>
                  </div>

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
