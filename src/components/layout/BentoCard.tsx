import type { JSX, ReactNode } from "react";

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  /** visually emphasize this card versus its neighbors */
  featured?: boolean;
  ariaLabel?: string;
  /** element id, used by the hero navigation graph anchors */
  id?: string;
}

export function BentoCard({
  className = "",
  children,
  featured = false,
  ariaLabel,
  id,
}: BentoCardProps): JSX.Element {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`group relative rounded-2xl border bg-surface p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] transition-colors duration-200 hover:border-line-strong ${
        featured
          ? "border-accent/40 bg-surface-raised"
          : "border-line"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export default BentoCard;
