import type { JSX } from "react";
import { Award, BadgeCheck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import BentoCard from "../layout/BentoCard";
import BentoGrid from "../layout/BentoGrid";
import { certifications, achievements } from "../../content/portfolio";

export function CertificationsSection(): JSX.Element {
  return (
    <section
      id="certifications"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16"
    >
      <SectionHeading
        index="05 · Certifications"
        title="Credentials"
        subtitle="Verified certifications from official programs. Dates and issuing organizations come straight from the certificates."
      />
      <BentoGrid>
        {certifications.map((cert) => (
          <div key={cert.name} className="h-full">
            <BentoCard
              ariaLabel={`Certification: ${cert.name}`}
              className="flex h-full flex-col"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface-raised text-violet"
                  aria-hidden="true"
                >
                  <Award size={18} />
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">
                  {cert.name}
                </h3>
              </div>
              <p className="mt-3 text-sm text-ink-dim">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">{cert.date}</p>
              {cert.credentialId && (
                <p className="mt-2 break-all font-mono text-xs text-ink-faint">
                  ID: {cert.credentialId}
                </p>
              )}
              {cert.certificateUrl || cert.verifyUrl ? (
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                  <a
                    href={cert.certificateUrl ?? cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-cyan-300"
                  >
                    <BadgeCheck size={15} aria-hidden="true" />
                    View certificate
                  </a>
                  {cert.certificateUrl && cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-faint transition-colors hover:text-ink-dim"
                    >
                      verify badge ↗
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-auto pt-5 text-xs text-ink-faint">
                  Credential on file; shown in person on request.
                </p>
              )}
            </BentoCard>
          </div>
        ))}
      </BentoGrid>
    </section>
  );
}

export default CertificationsSection;

export function AchievementsSection(): JSX.Element {
  return (
    <section
      id="achievements"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16"
    >
      <SectionHeading index="06 · Achievements" title="Highlights" />
      <BentoGrid>
        {achievements.map((a) => (
          <BentoCard
            key={a.title}
            ariaLabel={`Achievement: ${a.title}`}
            className="sm:col-span-2 lg:col-span-4"
          >
            <h3 className="font-semibold text-ink">{a.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-dim">
              {a.detail}
            </p>
          </BentoCard>
        ))}
      </BentoGrid>
    </section>
  );
}
