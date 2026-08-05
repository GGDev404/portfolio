"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SITE } from "@/data/site";

const navKeys = ["about", "projects", "experience", "skills", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">{"~/"}</span>geovany.dev
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
          <LanguageSwitcher />
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(key)}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-4">
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
