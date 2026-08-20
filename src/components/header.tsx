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
    <header className="gg-divider--fade sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.08em]">
          <svg width="22" height="22" viewBox="0 0 120 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth={15} strokeLinejoin="miter" className="text-accent">
              <path d="M 96 21 L 46 21 L 26 41 L 26 79 L 46 99 L 96 99 L 96 65 L 68 65" />
            </g>
          </svg>
          GONZÁLEZ
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
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
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
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
              className="py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              {t(key)}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-4">
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-accent">
              <GithubIcon size={18} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-accent">
              <LinkedinIcon size={18} />
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
