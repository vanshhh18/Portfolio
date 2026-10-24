import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Building2, GraduationCap, FileImage } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import BentoCard from "../layout/BentoCard";
import {
  experience,
  experienceExtra,
  education,
} from "../../content/portfolio";
import type { ExperienceItem } from "../../content/portfolio";

interface ExperienceBlockProps {
  item: ExperienceItem;
}

function ExperienceBlock({ item }: ExperienceBlockProps): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <BentoCard className="flex h-full flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-accent" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-ink">{item.org}</h3>
          </div>
          {item.period && (
            <p className="font-mono text-xs text-ink-faint">{item.period}</p>
          )}
        </div>
        <p className="mt-2 text-sm font-medium text-ink-dim">
          {item.role}
          {item.location && <span className="text-ink-faint"> · {item.location}</span>}
        </p>
        <ul className="mt-4 space-y-3">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        {item.certificateUrl && (
          <a
            href={item.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
          >
            <FileImage size={15} aria-hidden="true" />
            View certificate
          </a>
        )}
      </BentoCard>
    </motion.div>
  );
}

export function ExperienceSection(): JSX.Element {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
      <SectionHeading
        index="04 · Experience & Education"
        title="Where the work happened"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ExperienceBlock item={experience[0]} />
        <ExperienceBlock item={experienceExtra} />
      </div>
      <div className="mt-4">
        <BentoCard id="education" className="scroll-mt-28" ariaLabel="Education">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-violet" aria-hidden="true" />
            <h3 className="font-semibold text-ink">Education</h3>
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <li key={item.institution} className="border-l border-line pl-4">
                <p className="text-sm font-medium text-ink">{item.degree}</p>
                <p className="text-xs text-ink-dim">{item.institution}</p>
                <p className="mt-1 font-mono text-xs text-ink-faint">
                  {item.period} · {item.result}
                </p>
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </section>
  );
}

export default ExperienceSection;
