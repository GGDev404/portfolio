import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const order = ["frontend", "backend", "iot", "mobile", "cloud", "databases", "payments"] as const;

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">04</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {order.map((category) => (
            <RevealItem
              key={category}
              className="gg-plate--brackets border border-border bg-background-elevated p-5 transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {t(`categories.${category}`)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skills[category].map((skill) => (
                  <span
                    key={skill}
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
