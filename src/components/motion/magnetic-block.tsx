"use client";

import type { ReactNode } from "react";
import { useMagneticReveal } from "@/components/crystal/CrystalScene";

export function MagneticBlock({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useMagneticReveal();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
