import { useEffect, useMemo, useState } from "react";
import type { JSX, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";
import { portfolioSections } from "../../content/portfolio";

/* Single coordinate system: everything lives in this 640x640 viewBox. */
const VB = 640;
const HUB = { x: 320, y: 320 };
const HUB_R = 52;
const NODE_R = 230; // ring radius
const NODE_W = 128;
const NODE_H = 40;

/** Order clockwise from the top so related sections sit next to each other. */
const spokeOrder = [
  "about",
  "skills",
  "projects",
  "experience",
  "certifications",
  "education",
  "achievements",
  "contact",
].filter((id) => portfolioSections.some((s) => s.id === id));

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const nodes: GraphNode[] = spokeOrder.map((id, i) => {
  const angle = (2 * Math.PI / spokeOrder.length) * i - Math.PI / 2;
  return {
    id,
    label: portfolioSections.find((s) => s.id === id)?.label ?? id,
    x: HUB.x + NODE_R * Math.cos(angle),
    y: HUB.y + NODE_R * Math.sin(angle),
  };
});

const hubNode: GraphNode = { id: "top", label: "Home", x: HUB.x, y: HUB.y };

/** Straight hub->node vector geometry (used for trimming both endpoints). */
function trimStart(from: GraphNode, to: GraphNode): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: from.x + (dx / len) * HUB_R, y: from.y + (dy / len) * HUB_R };
}

function trimEnd(from: GraphNode, to: GraphNode): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // intersection of the straight line with the node's 128x40 rounded rect
  const t =
    Math.min(
      NODE_W / 2 / Math.max(Math.abs(ux), 0.0001),
      NODE_H / 2 / Math.max(Math.abs(uy), 0.0001),
    ) + 0;
  return { x: to.x - ux * t, y: to.y - uy * t };
}

function edgeD(from: GraphNode, to: GraphNode, bend: number): string {
  const s = trimStart(from, to);
  const e = trimEnd(from, to);
  const dx = e.x - s.x;
  const dy = e.y - s.y;
  const len = Math.hypot(dx, dy) || 1;
  const qx = (s.x + e.x) / 2 + (-dy / len) * bend;
  const qy = (s.y + e.y) / 2 + (dx / len) * bend;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

const radialEdges = nodes.map((n, i) => ({
  node: n,
  d: edgeD(hubNode, n, (i % 2 === 0 ? 1 : -1) * 22),
}));

/* faint ring connecting adjacent outer nodes, read as one network */
const ringEdges = nodes.map((n, i) => {
  const next = nodes[(i + 1) % nodes.length];
  return { id: `ring-${n.id}`, d: edgeD(n, next, 12) };
});

interface PortfolioGraphProps {
  active: string | null;
  onNavigate: (id: string) => void;
}

export function PortfolioGraph({
  active,
  onNavigate,
}: PortfolioGraphProps): JSX.Element {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, [reduced]);

  // once the entrance has played, remove stagger delays so hover feels instant
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(t);
  }, [ready]);

  const enterDelay = (i: number) => (settled ? 0 : Math.min(i * 60, 420));

  const focusId = hovered ?? active;

  const radial = useMemo(
    () =>
      radialEdges.map(({ node, d }, i) => {
        const isHot = focusId === node.id;
        const dim = focusId !== null && !isHot;
        return { node, d, isHot, dim, i };
      }),
    [focusId],
  );

  const activate = (id: string) => {
    onNavigate(id);
  };

  const onKey = (e: ReactKeyboardEvent<SVGGElement>, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate(id);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      width="100%"
      className="block h-auto w-full"
      role="group"
      aria-label="Portfolio map: select a section to jump to it"
    >
      {/* faint ring edges between adjacent outer nodes */}
      <g>
        {ringEdges.map((r) => (
          <path
            key={r.id}
            d={r.d}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeOpacity={0.5}
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}
      </g>

      {/* radial hub edges (always visible) */}
      {radial.map(({ node, d, isHot, dim, i }) => (
        <g
          key={`edge-${node.id}`}
          opacity={!ready ? 0 : dim ? 0.3 : 1}
          className="transition-opacity duration-300"
        >
          <path
            d={d}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity={isHot ? 1 : 0.35}
            strokeWidth={isHot ? 2 : 1.5}
            strokeDasharray={isHot ? undefined : "5 4"}
            className="transition-all duration-200"
          />
          {isHot && !reduced && (
            <circle
              r={3}
              fill="#22d3ee"
              style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }}
            >
              <animateMotion
                dur="1.6s"
                repeatCount="indefinite"
                begin={`${i * 0.2}s`}
                path={d}
              />
            </circle>
          )}
        </g>
      ))}

      {/* outer nodes */}
      {radial.map(({ node, isHot, dim, i }) => {
        const isActive = active === node.id;
        const half = NODE_W / 2;
        const halfH = NODE_H / 2;
        return (
          <g
            key={node.id}
            tabIndex={0}
            role="link"
            aria-label={`Go to ${node.label} section`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => activate(node.id)}
            onKeyDown={(e) => onKey(e, node.id)}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(node.id)}
            onBlur={() => setHovered(null)}
            className="graph-node cursor-pointer outline-none"
            opacity={!ready ? 0 : dim ? 0.5 : 1}
            style={{ transitionDelay: `${enterDelay(i)}ms` }}
          >
            {/* entrance: nodes fade in with a stagger via CSS animation on load */}
            {/* node pill */}
            <rect
              x={node.x - half}
              y={node.y - halfH}
              width={NODE_W}
              height={NODE_H}
              rx={12}
              fill="rgba(20, 26, 35, 0.88)"
              stroke={
                isActive || isHot ? "#22d3ee" : "rgba(112, 132, 158, 0.45)"
              }
              strokeWidth={isActive || isHot ? 1.5 : 1}
              className={`node-pill transition-colors duration-200 ${reduced ? "" : "node-float"}`}
              style={{ ["--i" as string]: i }}
            />
            <text
              x={node.x}
              y={node.y + 4.5}
              textAnchor="middle"
              fontSize={13}
              fontWeight={500}
              fill={isActive || isHot ? "#22d3ee" : "#9aa7b8"}
              className="select-none transition-colors duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {node.label}
            </text>
            <title>{node.label}</title>
          </g>
        );
      })}

      {/* hub */}
      <g
        tabIndex={0}
        role="link"
        aria-label="Home, back to top"
        aria-current={active === "top" ? "true" : undefined}
        onClick={() => activate("top")}
        onKeyDown={(e) => onKey(e, "top")}
        onMouseEnter={() => setHovered("top")}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered("top")}
        onBlur={() => setHovered(null)}
        className="graph-node cursor-pointer outline-none"
      >
        {!reduced && <circle className="hub-ring-svg" cx={HUB.x} cy={HUB.y} r={HUB_R} />}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={HUB_R}
          fill="rgba(20,26,35,0.92)"
          stroke="#22d3ee"
          strokeWidth={1.8}
          style={{ filter: "drop-shadow(0 0 14px rgba(34,211,238,0.35))" }}
        />
        <text
          x={HUB.x}
          y={HUB.y - 4}
          textAnchor="middle"
          fontSize={11}
          fill="#647082"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ~/
        </text>
        <text
          x={HUB.x}
          y={HUB.y + 12}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          fill="#22d3ee"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Home
        </text>
      </g>
    </svg>
  );
}

export default PortfolioGraph;
