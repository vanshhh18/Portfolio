import { useEffect, useRef, useState } from "react";
import type { JSX, KeyboardEvent } from "react";
import { RotateCcw } from "lucide-react";
import { profile, skillGroups, experience, projects } from "../../content/portfolio";

interface Line {
  kind: "cmd" | "out";
  text: string;
}

const prompt = "$";

const helpText = [
  "Available commands:",
  "  whoami       · who I am in one line",
  "  skills       · current technical toolkit",
  "  projects     · list of documented builds",
  "  projects -v  · with one-line summaries",
  "  experience   · where I've worked",
  "  contact      · how to reach me",
  "  clear        · reset the terminal",
];

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return helpText;
    case "whoami":
      return [
        `${profile.name}: ${profile.role}. Final-year CSE (Data Science) undergrad.`,
        `Focus: agentic AI, RAG pipelines, and LLM systems with human-in-the-loop guardrails.`,
      ];
    case "skills":
      return skillGroups.map(
        (g) => `${g.label.padEnd(28, " ")} ${g.skills.join(", ")}`,
      );
    case "projects":
      return projects.map((p) => `${p.title.padEnd(42, " ")} → github.com/vanshhh18/${p.id}`);
    case "projects -v":
      return projects.flatMap((p) => [`${p.title}`, `   ${p.summary}`, ""]);
    case "experience":
      return [
        `${experience[0].org}: ${experience[0].role} (${experience[0].period})`,
        ...experience[0].points.map((pt) => `  • ${pt}`),
        "",
      ];
    case "contact":
      return [
        `email:    ${profile.email}`,
        `github:   ${profile.github}`,
        `linkedin: ${profile.linkedin}`,
        `location: ${profile.location}`,
      ];
    default:
      return [`command not found: ${cmd.split(" ")[0]} (type 'help')`];
  }
}

const commandsByTitle = projects.map((p) => p.title.toLowerCase());

function hintFor(cmd: string): string | null {
  const hit = commandsByTitle.find((t) => cmd.includes(t.split(" ")[0].toLowerCase()));
  return hit ? `hint: run 'projects' to see the full project list` : null;
}

export function TerminalPanel(): JSX.Element {
  const [lines, setLines] = useState<Line[]>([
    { kind: "cmd", text: "help" },
    ...runCommand("help").map((t): Line => ({ kind: "out", text: t })),
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const cmd = value.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === "clear") {
      setLines([{ kind: "out", text: "terminal reset. Type 'help'" }]);
      setValue("");
      return;
    }
    const out = runCommand(cmd).map((t): Line => ({ kind: "out", text: t }));
    const hint = hintFor(cmd.toLowerCase());
    const extra: Line[] =
      cmd.toLowerCase() === "projects"
        ? [
            { kind: "out", text: "" },
            { kind: "out", text: "tip: run 'projects -v' for one-line summaries" },
          ]
        : hint
          ? ([{ kind: "out", text: hint }] as Line[])
          : [];
    setLines((cur) => [...cur, { kind: "cmd", text: cmd }, ...out, ...extra]);
    setValue("");
  };

  const reset = () => {
    setLines([{ kind: "out", text: "terminal reset. Type 'help'" }]);
    setValue("");
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface">
      {/* window chrome */}
      <div
        className="flex items-center justify-between border-b border-line px-4 py-2.5"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
        </div>
        <p className="font-mono text-[10px] text-ink-faint">
          vansh@portfolio (simulated)
        </p>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset terminal"
          className="rounded-md border border-line p-1.5 text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-72 flex-1 overflow-y-auto px-4 py-3 font-mono text-xs sm:text-[13px]"
        aria-label="Simulated terminal output"
        role="log"
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.kind === "cmd"
                ? "text-accent"
                : "whitespace-pre text-ink-dim"
            }
          >
            {line.kind === "cmd" ? `${prompt} ${line.text}` : line.text}
          </p>
        ))}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-accent" aria-hidden="true">
            {prompt}
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={submit}
            className="w-full bg-transparent text-ink caret-accent outline-none placeholder:text-ink-faint"
            placeholder="type 'help' and press Enter"
            aria-label="Terminal input (simulated commands only)"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <p className="border-t border-line px-4 py-2 font-mono text-[10px] text-ink-faint">
        Simulated interface. Reads from portfolio data only, no shell access.
      </p>
    </div>
  );
}

export default TerminalPanel;
