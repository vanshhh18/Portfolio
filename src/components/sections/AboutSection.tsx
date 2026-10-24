import type { JSX } from "react";
import { Briefcase, ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import BentoGrid from "../layout/BentoGrid";
import BentoCard from "../layout/BentoCard";
import {
  profile,
  skillGroups,
  experience,
  experienceExtra,
  projects,
} from "../../content/portfolio";

export function AboutSection(): JSX.Element {
  const featuredProject = projects[0];
  const drdo = experience[0];

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
      <SectionHeading
        index="02 · About"
        title="What I actually build"
        subtitle="Around retrieval you can audit, agents you can override, and evaluations you can rerun."
      />

      <BentoGrid>
        {/* Professional focus: large card */}
        <BentoCard
          featured
          ariaLabel="Professional focus"
          className="sm:col-span-2 lg:col-span-2 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-ink">Professional focus</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-dim">
            {profile.about[1]}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">
            {profile.about[2]}
          </p>
          <a
            href="#projects"
            className="mt-auto pt-5 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
          >
            See the evidence in projects →
          </a>
        </BentoCard>

        {/* Featured project preview */}
        <BentoCard
          ariaLabel="Featured project preview"
          className="sm:col-span-2 flex flex-col"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Featured project
          </p>
          <h3 className="mt-3 text-lg font-semibold text-ink">
            {featuredProject.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-dim">
            {featuredProject.summary}
          </p>
          <a
            href="#projects"
            className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
          >
            View all projects <ExternalLink size={14} aria-hidden="true" />
          </a>
        </BentoCard>

        {/* Skills */}
        <BentoCard
          id="skills"
          className="scroll-mt-28 sm:col-span-2"
          ariaLabel="Core technical skills"
        >
          <h3 className="text-lg font-semibold text-ink">Core skills</h3>
          <div className="mt-4 space-y-4">
            {skillGroups.slice(0, 2).map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {group.label}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-xs text-ink-dim"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a
            href="#projects"
            className="mt-5 inline-block text-sm text-ink-faint transition-colors hover:text-ink-dim"
          >
            Full tech toolkit in the grid below
          </a>
        </BentoCard>

        {/* Experience snapshot */}
        <BentoCard
          ariaLabel="Experience snapshot"
          className="sm:col-span-1 flex flex-col"
        >
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-accent" aria-hidden="true" />
            <h3 className="font-semibold text-ink">Experience</h3>
          </div>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="text-sm font-medium text-ink">{drdo.org}</p>
              <p className="text-xs text-ink-faint">{drdo.role}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                {drdo.period}
              </p>
            </li>
            <li>
              <p className="text-sm font-medium text-ink">
                {experienceExtra.org}
              </p>
              <p className="text-xs text-ink-faint">{experienceExtra.role}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                {experienceExtra.period}
              </p>
            </li>
          </ul>
          <a
            href="#experience"
            className="mt-auto pt-5 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
          >
            Details →
          </a>
        </BentoCard>
      </BentoGrid>

      <BentoGrid className="mt-4">
        {/* Skills part 2 */}
        <BentoCard ariaLabel="LLM and agentic skills" className="sm:col-span-2">
          <h3 className="font-semibold text-ink">LLM & agentic tooling</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {skillGroups.slice(2).map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {group.label}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-xs text-ink-dim"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-faint">
            Education, certifications, and achievements have their own sections
            below.
          </p>
        </BentoCard>
      </BentoGrid>
    </section>
  );
}

export default AboutSection;
