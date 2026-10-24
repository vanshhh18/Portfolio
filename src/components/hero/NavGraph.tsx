import { useCallback, useEffect, useState } from "react";
import type { JSX } from "react";
import PortfolioGraph from "./PortfolioGraph";
import { portfolioSections } from "../../content/portfolio";

export function NavGraph(): JSX.Element {
  const [active, setActive] = useState<string | null>("top");

  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const watchable = portfolioSections
      .filter((s) => s.id !== "top" && document.getElementById(s.id))
      .map((s) => s.id);

    if (reduced || watchable.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const id of watchable) {
      observer.observe(document.getElementById(id) as HTMLElement);
    }
    return () => observer.disconnect();
  }, []);

  const go = useCallback(
    (id: string) => {
      setActive(id);
      const reduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;
      document.getElementById(id)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
      });
      history.replaceState(null, "", `#${id}`);
    },
    [],
  );

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-ink">Explore my portfolio</p>
      <p className="mb-4 text-xs text-ink-faint select-none">
        Select a node (mouse or Tab + Enter) to jump to that section.
      </p>

      {/* circular graph: desktop / tablet */}
      <div className="hidden sm:block">
        <div className="mx-auto aspect-square w-full max-w-[560px] overflow-hidden">
          <PortfolioGraph active={active} onNavigate={go} />
        </div>
      </div>

      {/* vertical list fallback: mobile */}
      <nav
        aria-label="Portfolio sections"
        className="grid grid-cols-2 gap-2 sm:hidden"
      >
        {portfolioSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
              active === s.id
                ? "border-accent bg-surface-raised text-ink"
                : "border-line-strong bg-surface text-ink-dim"
            }`}
          >
            <span
              className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${
                active === s.id ? "bg-accent" : "bg-violet/70"
              }`}
              aria-hidden="true"
            />
            {s.label}
          </a>
        ))}
      </nav>

      {/* screen-reader fallback navigation */}
      <nav aria-label="Portfolio sections (text fallback)" className="sr-only">
        <ul>
          {portfolioSections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavGraph;
