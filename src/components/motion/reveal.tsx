"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: reduced ? 0.2 : 0.55, delay: reduced ? 0 : delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useStaggerVariants() {
  const reduced = useReducedMotion();

  const staggerContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.08 },
    },
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease: easeOut } },
  };

  return { staggerContainer, staggerItem };
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { staggerContainer } = useStaggerVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { staggerItem } = useStaggerVariants();

  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
