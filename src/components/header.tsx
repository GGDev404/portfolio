"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SITE } from "@/data/site";

const navKeys = ["about", "projects", "experience", "skills", "playground", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="gg-divider--fade sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-[40px] py-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.08em]">
          <svg width="34" height="20" viewBox="0 0 200 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth={13} strokeLinejoin="miter" className="text-accent">
              <path d="M 84 22 L 40 22 L 22 40 L 22 80 L 40 98 L 84 98 L 84 66 L 62 66" />
              <path d="M 116 98 L 160 98 L 178 80 L 178 40 L 160 22 L 116 22 L 116 54 L 138 54" />
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
