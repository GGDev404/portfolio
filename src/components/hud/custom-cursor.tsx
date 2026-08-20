"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced || !rootRef.current) return;

    rootRef.current.style.display = "flex";

    const quickX = gsap.quickTo(rootRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const quickY = gsap.quickTo(rootRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      quickX(e.clientX + 16);
      quickY(e.clientY + 20);
      if (labelRef.current) {
        const x = String(Math.round(e.clientX)).padStart(4, "0");
        const y = String(Math.round(e.clientY)).padStart(4, "0");
        labelRef.current.textContent = `X:${x} Y:${y}`;
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={rootRef} className="gg-cursor" aria-hidden="true" style={{ display: "none" }}>
      <span className="gg-cursor__tick" />
      <span ref={labelRef} className="gg-cursor__label">
        X:0000 Y:0000
      </span>
    </div>
  );
}
