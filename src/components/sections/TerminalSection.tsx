import type { JSX } from "react";
import SectionHeading from "../ui/SectionHeading";
import TerminalPanel from "../terminal/TerminalPanel";

export function TerminalSection(): JSX.Element {
  return (
    <section id="terminal" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-4">
      <SectionHeading
        index="01 · Quick tour"
        title="Interview me in a terminal"
        subtitle="A simulated shell that reads from my portfolio data. Try 'whoami', 'projects', or 'experience'. No live backend behind it."
      />
      <TerminalPanel />
    </section>
  );
}

export default TerminalSection;
