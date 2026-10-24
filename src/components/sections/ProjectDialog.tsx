import { useEffect, useRef } from "react";
import type { JSX } from "react";
import { X } from "lucide-react";
import GitHubMark from "../ui/GitHubMark";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../content/portfolio";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps): JSX.Element | null {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="project-dialog-title" className="text-xl font-semibold text-ink">
              {project.title}
            </h3>
            {project.sourceNote && (
              <p className="mt-1 font-mono text-xs text-ink-faint">
                {project.sourceNote}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-lg border border-line p-2 text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {project.problem && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                Problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {project.problem}
              </p>
            </div>
          )}

          {project.approach && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                Approach
              </h4>
              <ul className="mt-2 space-y-2.5">
                {project.approach.map((step) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet"
                      aria-hidden="true"
                    />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.evaluation && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-violet">
                Evaluation & outcomes
              </h4>
              <ul className="mt-2 space-y-2.5">
                {project.evaluation.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              Technologies
            </h4>
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-xs text-ink-dim"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-5 border-t border-line pt-5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
            >
              <GitHubMark width={15} height={15} />
              View code on GitHub ({project.title})
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
              >
                <ExternalLink size={15} aria-hidden="true" />
                Open live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDialog;
