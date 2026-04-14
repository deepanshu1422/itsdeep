// Programmatically generated SVG graphics for itsdeep.io
// No external images needed — pure code visuals

interface PatternProps {
  seed?: number;
  className?: string;
}

// Deterministic "random" from seed
function seeded(seed: number, i: number) {
  const x = Math.sin(seed * 9301 + i * 49297) * 0.5 + 0.5;
  return x;
}

/* ---------- Hero background pattern ---------- */
export function HeroPattern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Grid dots */}
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 40 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 20 + 10}
            cy={row * 20 + 10}
            r={1}
            fill="var(--color-border)"
            opacity={0.5}
          />
        ))
      )}
      {/* Gold accent circles */}
      <circle cx="680" cy="80" r="60" fill="var(--color-accent)" opacity="0.15" />
      <circle cx="120" cy="320" r="40" fill="var(--color-accent)" opacity="0.1" />
      <circle cx="400" cy="200" r="100" fill="var(--color-accent)" opacity="0.08" />
      {/* Connecting lines */}
      <line x1="200" y1="100" x2="600" y2="100" stroke="var(--color-accent)" strokeWidth="1" opacity="0.2" />
      <line x1="200" y1="300" x2="600" y2="300" stroke="var(--color-accent)" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

/* ---------- Topic card illustration ---------- */
export function TopicIllustration({ seed = 1, className }: PatternProps) {
  const shapes = Array.from({ length: 6 }).map((_, i) => ({
    x: seeded(seed, i * 3) * 80 + 10,
    y: seeded(seed, i * 3 + 1) * 60 + 10,
    r: seeded(seed, i * 3 + 2) * 12 + 4,
    opacity: seeded(seed, i * 5) * 0.3 + 0.1,
  }));

  return (
    <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {shapes.map((s, i) =>
        i % 3 === 0 ? (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--color-accent)" opacity={s.opacity} />
        ) : i % 3 === 1 ? (
          <rect key={i} x={s.x - s.r} y={s.y - s.r} width={s.r * 2} height={s.r * 2} rx={3} fill="var(--color-primary)" opacity={s.opacity * 0.7} />
        ) : (
          <polygon key={i} points={`${s.x},${s.y - s.r} ${s.x + s.r},${s.y + s.r} ${s.x - s.r},${s.y + s.r}`} fill="var(--color-accent)" opacity={s.opacity * 0.8} />
        )
      )}
    </svg>
  );
}

/* ---------- Abstract nodes/network graph ---------- */
export function NetworkGraph({ className }: { className?: string }) {
  const nodes = [
    { x: 50, y: 30 }, { x: 150, y: 60 }, { x: 100, y: 120 },
    { x: 200, y: 40 }, { x: 250, y: 100 }, { x: 180, y: 140 },
    { x: 80, y: 80 }, { x: 220, y: 160 }, { x: 30, y: 140 },
  ];
  const edges = [
    [0, 1], [1, 3], [0, 6], [6, 2], [1, 4], [4, 5], [2, 5], [5, 7], [2, 8], [3, 4],
  ];

  return (
    <svg className={className} viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.3" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={i === 0 || i === 4 ? 10 : 6} fill={i === 0 || i === 4 ? 'var(--color-accent)' : 'var(--color-primary)'} opacity={i === 0 || i === 4 ? 0.8 : 0.3} />
          <circle cx={n.x} cy={n.y} r={3} fill="var(--color-bg-white)" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Bar chart graphic ---------- */
export function BarChart({ className }: { className?: string }) {
  const bars = [40, 65, 50, 85, 70, 95, 60, 80];
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 24 + 4}
          y={120 - h}
          width={18}
          height={h}
          rx={3}
          fill={i === 5 ? 'var(--color-accent)' : 'var(--color-primary)'}
          opacity={i === 5 ? 0.9 : 0.15 + (i * 0.05)}
        />
      ))}
      <line x1="0" y1="119" x2="200" y2="119" stroke="var(--color-border)" strokeWidth="1" />
    </svg>
  );
}

/* ---------- Funnel graphic ---------- */
export function FunnelGraphic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 10 L180 10 L150 50 L50 50 Z" fill="var(--color-primary)" opacity="0.12" />
      <path d="M50 55 L150 55 L130 95 L70 95 Z" fill="var(--color-primary)" opacity="0.2" />
      <path d="M70 100 L130 100 L115 130 L85 130 Z" fill="var(--color-accent)" opacity="0.7" />
      <text x="100" y="35" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10" fontWeight="600">TRAFFIC</text>
      <text x="100" y="78" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10" fontWeight="600">LEADS</text>
      <text x="100" y="120" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="700">SALES</text>
    </svg>
  );
}

/* ---------- Circular progress / pie ---------- */
export function CircularMetric({ value = 75, label = "", className }: { value?: number; label?: string; className?: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r={r} stroke="var(--color-border)" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} stroke="var(--color-accent)" strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)" />
      <text x="50" y="48" textAnchor="middle" fill="var(--color-text)" fontSize="18" fontWeight="700">{value}%</text>
      {label && <text x="50" y="62" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">{label}</text>}
    </svg>
  );
}

/* ---------- Isometric blocks ---------- */
export function IsometricBlocks({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Block 1 */}
      <path d="M80 100 L120 80 L160 100 L120 120 Z" fill="var(--color-accent)" opacity="0.6" />
      <path d="M80 100 L80 70 L120 50 L120 80 Z" fill="var(--color-accent)" opacity="0.4" />
      <path d="M120 80 L120 50 L160 70 L160 100 Z" fill="var(--color-accent)" opacity="0.8" />
      {/* Block 2 */}
      <path d="M140 90 L180 70 L220 90 L180 110 Z" fill="var(--color-primary)" opacity="0.15" />
      <path d="M140 90 L140 60 L180 40 L180 70 Z" fill="var(--color-primary)" opacity="0.1" />
      <path d="M180 70 L180 40 L220 60 L220 90 Z" fill="var(--color-primary)" opacity="0.2" />
      {/* Block 3 */}
      <path d="M20 110 L60 90 L100 110 L60 130 Z" fill="var(--color-primary)" opacity="0.12" />
      <path d="M20 110 L20 85 L60 65 L60 90 Z" fill="var(--color-primary)" opacity="0.08" />
      <path d="M60 90 L60 65 L100 85 L100 110 Z" fill="var(--color-primary)" opacity="0.15" />
    </svg>
  );
}

/* ---------- Wave divider ---------- */
export function WaveDivider({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 V60 H0Z"
        fill="var(--color-bg-white)"
      />
    </svg>
  );
}
