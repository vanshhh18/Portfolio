import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: SectionHeadingProps): JSX.Element {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="mb-10 max-w-2xl"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="font-mono text-sm text-accent" aria-hidden="true">
        {index}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-sm text-ink-dim">{subtitle}</p>}
    </motion.div>
  );
}

export default SectionHeading;
