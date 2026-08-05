import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as string[];

  return (
    <section id="about" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm text-accent">// {t("title")}</h2>
        <div className="mt-6 grid gap-10 md:grid-cols-[auto_1.4fr_1fr]">
          <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-border bg-background-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)]" />
            <Image
              src="/profile.png"
              alt="Geovany González"
              width={288}
              height={352}
              className="relative h-full w-full object-contain object-bottom"
              priority
            />
          </div>
          <p className="text-lg leading-relaxed text-muted">{t("body")}</p>
          <ul className="flex flex-col gap-4">
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
