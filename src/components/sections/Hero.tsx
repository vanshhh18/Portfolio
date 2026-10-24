import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import BentoCard from "../layout/BentoCard";
import NavGraph from "../hero/NavGraph";
import { profile } from "../../content/portfolio";

const specialties = ["Agentic AI", "RAG Pipelines", "NLP", "Human-in-the-loop"];

export function Hero(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-6 pb-16 pt-18 scroll-mt-24 sm:pt-20"
      aria-label="Introduction"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-8">
        {/* introduction, top-aligned: no dead space above */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:pt-2"
        >
          <p className="flex items-center gap-2 font-mono text-sm text-accent">
            <MapPin size={14} aria-hidden="true" />
            {profile.location}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-ink-dim sm:text-xl">
            {profile.role}: building LLM systems that verify before they act.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specialties">
            {specialties.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-line bg-surface px-3 py-1 font-mono text-xs text-ink-dim"
              >
                {s}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim">
            {profile.about[0]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-colors hover:bg-cyan-300"
            >
              Explore projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
            >
              Contact me
            </a>
            <a
              href="/assets/Vansh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View my resume (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-dim transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={16} aria-hidden="true" />
              View my Resume
            </a>
          </div>
        </motion.div>

        {/* interactive portfolio navigation graph, first viewport on desktop */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <BentoCard featured ariaLabel="Interactive portfolio navigation map">
            <NavGraph />
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
