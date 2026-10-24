import { useState } from "react";
import type { JSX } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../../content/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#top"
          className="font-mono text-base font-semibold text-ink transition-colors hover:text-accent"
        >
          <span className="text-accent">~/</span>
          {profile.name.toLowerCase().replace(" ", "")}
        </a>

        <ul className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#terminal"
              className="rounded-lg border border-accent/50 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-base"
            >
              <span className="font-mono">&gt;_</span> Terminal
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg border border-line p-2 text-ink-dim transition-colors hover:border-line-strong hover:text-ink sm:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line sm:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-6 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-dim transition-colors hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
