import { useTranslations } from "next-intl";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function Contact() {
  const t = useTranslations("contact");

  const links = [
    { label: t("emailLabel"), value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
    {
      label: t("linkedinLabel"),
      value: "linkedin.com/in/geovany-gonzalez",
      href: SITE.linkedin,
      icon: LinkedinIcon,
    },
    { label: t("githubLabel"), value: "GGDev404", href: SITE.github, icon: GithubIcon },
  ];

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="gg-index">05</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{"// "}{t("title")}</h2>
          </div>
        </Reveal>
        <SplitHeading
          as="p"
          className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t("subtitle")}
        </SplitHeading>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
          {links.map(({ label, value, href, icon: Icon }) => (
            <RevealItem key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="gg-link-slide group border border-border bg-background-elevated p-5"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-accent" />
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wide text-muted">
                      {label}
                    </span>
                    <span className="text-sm">{value}</span>
                  </span>
                </span>
                <ArrowUpRight size={16} className="shrink-0" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
