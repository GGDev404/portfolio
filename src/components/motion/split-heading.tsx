"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  trigger = "scroll",
  delay = 0,
}: {
  as?: "h1" | "h2" | "p";
  children: ReactNode;
  className?: string;
  trigger?: "scroll" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: reduced ? 0 : 110,
            opacity: reduced ? 1 : 0,
            duration: reduced ? 0.01 : 0.9,
            ease: "power3.out",
            stagger: reduced ? 0 : 0.07,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" }
                : undefined,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
