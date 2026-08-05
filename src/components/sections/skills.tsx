import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";

const order = ["frontend", "backend", "iot", "mobile", "cloud", "databases", "payments"] as const;

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm text-accent">// {t("title")}</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {order.map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-border bg-background-elevated p-5"
            >
              <h3 className="font-mono text-xs uppercase tracking-wide text-accent">
                {t(`categories.${category}`)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skills[category].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
