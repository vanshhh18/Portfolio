import { useState } from "react";
import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Plus } from "lucide-react";
import GitHubMark from "../ui/GitHubMark";
import SectionHeading from "../ui/SectionHeading";
import BentoCard from "../layout/BentoCard";
import BentoGrid from "../layout/BentoGrid";
import ProjectDialog from "./ProjectDialog";
import { projects, type Project } from "../../content/portfolio";

interface ProjectCardProps {
  project: Project;
  className?: string;
  featured?: boolean;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard({
  project,
  className = "",
  featured = false,
  index,
  onOpenDetails,
}: ProjectCardProps): JSX.Element {
  const reduced = useReducedMotion();
  const hasDetails = Boolean(project.problem ?? project.approach ?? project.evaluation);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className={className}
    >
      <BentoCard featured={featured} className="flex h-full flex-col">
        {featured && (
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Featured: evaluated & deployed
          </p>
        )}
        {project.sourceNote && (
          <p className="font-mono text-xs text-ink-faint">{project.sourceNote}</p>
        )}
        <h3
          className={`font-semibold text-ink ${featured ? "mt-2 text-xl" : "mt-1 text-base"}`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-ink-dim ${
            featured ? "text-sm" : "text-sm line-clamp-4"
          }`}
        >
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-xs text-ink-faint"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
            >
              <GitHubMark width={15} height={15} />
              Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo of ${project.title}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
              >
                <ExternalLink size={15} aria-hidden="true" />
                Live demo
              </a>
            )}
          </span>
          {hasDetails && (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              aria-label={`Show more details about ${project.title}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink-dim transition-colors hover:border-accent hover:text-accent"
            >
              <Plus size={14} aria-hidden="true" />
              Details
            </button>
          )}
        </div>
      </BentoCard>
    </motion.article>
  );
}

export default ProjectCard;

export function ProjectsSection(): JSX.Element {
  const [featured, ...rest] = projects;
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
      <SectionHeading
        index="03 · Projects"
        title="Selected work"
        subtitle="Chosen for technical depth and documented engineering decisions, each one inspection-ready on GitHub."
      />
      <div className="grid gap-4">
        <ProjectCard
          project={featured}
          index={0}
          featured
          onOpenDetails={setOpenProject}
        />
        <BentoGrid>
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 1}
              className="h-full"
              onOpenDetails={setOpenProject}
            />
          ))}
        </BentoGrid>
      </div>
      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
