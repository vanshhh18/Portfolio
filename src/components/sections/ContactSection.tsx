import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText, Phone } from "lucide-react";
import GitHubMark from "../ui/GitHubMark";
import SectionHeading from "../ui/SectionHeading";
import BentoCard from "../layout/BentoCard";
import { profile } from "../../content/portfolio";

export function ContactSection(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
      <SectionHeading
        index="07 · Contact"
        title="Get in touch"
        subtitle="Open to AI/ML engineering collaborations, internships, and conversations about agent systems."
      />
      <BentoCard featured ariaLabel="Contact details" className="sm:text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 py-6"
        >
          <p className="max-w-xl text-base text-ink-dim">
            The fastest way to reach me is email. I also keep my work and
            profile updated on GitHub and LinkedIn.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-base transition-colors hover:bg-cyan-300"
            >
              {profile.email}
            </a>
            <a
              href="/assets/Vansh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View my resume (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={16} aria-hidden="true" />
              View my Resume
            </a>
          </div>
          <a
            href={`tel:+919557288779`}
            aria-label="Call me at +91 9557288779"
            className="inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
          >
            <Phone size={15} aria-hidden="true" />
            +91 9557288779
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              <GitHubMark width={16} height={16} />
              github.com/vanshhh18
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              linkedin.com/in/vanshmittal18
            </a>
          </div>
          <p className="pt-2 font-mono text-xs text-ink-faint">
            Based in {profile.location}
          </p>
        </motion.div>
      </BentoCard>
    </section>
  );
}

export default ContactSection;
