"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 border border-border p-1 font-mono text-xs">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`px-2.5 py-1 uppercase transition-colors ${
            loc === locale
              ? "bg-accent text-accent-foreground"
              : "text-muted hover:text-foreground"
          }`}
          aria-current={loc === locale}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
