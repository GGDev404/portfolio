import { useLocale, useTranslations } from "next-intl";
import { experience } from "@/data/experience";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="experience" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-mono text-sm text-accent">// {t("title")}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        </Reveal>

        <RevealGroup className="mt-12 flex flex-col gap-10">
          {experience.map((item) => {
            const content = item[locale];
            return (
              <RevealItem key={item.id} className="grid gap-2 sm:grid-cols-[160px_1fr]">
                <div className="font-mono text-xs text-muted">
                  {item.start} — {item.end}
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    {content.role}{" "}
                    <span className="font-normal text-muted">· {content.company}</span>
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
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
