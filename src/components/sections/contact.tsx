import { useTranslations } from "next-intl";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

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
          <h2 className="font-mono text-sm text-accent">// {t("title")}</h2>
          <p className="mt-4 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("subtitle")}
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
          {links.map(({ label, value, href, icon: Icon }) => (
            <RevealItem key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="group flex items-center justify-between rounded-2xl border border-border bg-background-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-accent" />
                  <span>
                    <span className="block font-mono text-[11px] uppercase text-muted">
                      {label}
                    </span>
                    <span className="text-sm">{value}</span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
