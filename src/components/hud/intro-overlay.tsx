"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/data/site";
import { shouldRunIntro, markIntroSeen } from "@/lib/intro";

const INTRO_DURATION = 3200;
const SCROLL_LOCK_DURATION = 2500;

export function IntroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !shouldRunIntro()) return;

    el.style.display = "grid";
    markIntroSeen();

    const removeTimer = setTimeout(() => {
      el.style.display = "none";
    }, INTRO_DURATION);

    let unlockTimer: ReturnType<typeof setTimeout> | undefined;
    if (window.scrollY < 40) {
      document.body.style.overflow = "hidden";
      unlockTimer = setTimeout(() => {
        document.body.style.overflow = "";
      }, SCROLL_LOCK_DURATION);
    }

    return () => {
      clearTimeout(removeTimer);
      if (unlockTimer) clearTimeout(unlockTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const [first, ...rest] = SITE.name.toUpperCase().split(" ");
  const last = rest.join(" ");

  return (
    <div ref={rootRef} aria-hidden="true" className="gg-intro" style={{ display: "none" }}>
      <span className="gg-intro__name font-display">{first}</span>
      <span className="gg-intro__line" />
      <span className="gg-intro__sub font-display">{last}</span>
    </div>
  );
}
