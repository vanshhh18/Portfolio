import type { JSX } from "react";
import { profile } from "../../content/portfolio";

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <p className="font-mono text-xs text-ink-faint">
          {profile.name} · {profile.tagline}
        </p>
        <p className="font-mono text-xs text-ink-faint">
          Built with React, TypeScript & Tailwind
        </p>
      </div>
    </footer>
  );
}

export default Footer;
