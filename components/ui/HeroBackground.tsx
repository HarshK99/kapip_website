// Static atmosphere layer for the Home hero. Purely decorative patent-sheet
// motifs — drafting grid, dimension lines, a figure label, a reference-
// numeral leader, a chemical ring, PCB-style traces — rendered in the
// panel's own `paper` tone at very low opacity so they read as texture, not
// content. No state, no client boundary: this never needs to re-render or
// animate, so it stays a plain server component sitting behind
// HeroIllustration and the hero copy.
export default function HeroBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-paper"
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>

      {/* Drafting grid — full-bleed, near-invisible */}
      <rect width="1600" height="700" fill="url(#hero-grid)" opacity="0.045" />

      {/* Top-left: blueprint fragment (a drawing-sheet corner) */}
      <rect
        x="60"
        y="56"
        width="220"
        height="140"
        rx="6"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.1"
        vectorEffect="non-scaling-stroke"
      />
      <text x="64" y="228" fontSize="13" letterSpacing="3" opacity="0.16" className="font-mono uppercase">
        Fig. 1
      </text>

      {/* Dimension line beneath the fragment */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.14" vectorEffect="non-scaling-stroke">
        <line x1="64" y1="270" x2="280" y2="270" vectorEffect="non-scaling-stroke" />
        <line x1="64" y1="262" x2="64" y2="278" vectorEffect="non-scaling-stroke" />
        <line x1="280" y1="262" x2="280" y2="278" vectorEffect="non-scaling-stroke" />
      </g>
      <text x="130" y="256" fontSize="11" letterSpacing="1" opacity="0.14" className="font-mono">
        216.0
      </text>

      {/* Lower-left: construction line + a circled reference numeral */}
      <line
        x1="40"
        y1="636"
        x2="300"
        y2="558"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="40" cy="636" r="2.5" fill="currentColor" opacity="0.16" />

      <g opacity="0.15">
        <circle cx="336" cy="536" r="14" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line
          x1="322"
          y1="538"
          x2="284"
          y2="556"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <text x="336" y="540" fontSize="11" textAnchor="middle" className="font-mono">
          12
        </text>
      </g>

      {/* Small chemical ring, upper right */}
      <g opacity="0.11" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <polygon points="1202,120 1191,139 1169,139 1158,120 1169,101 1191,101" vectorEffect="non-scaling-stroke" />
        <line x1="1158" y1="120" x2="1122" y2="112" vectorEffect="non-scaling-stroke" />
      </g>
      <text x="1094" y="116" fontSize="11" opacity="0.15" className="font-mono">
        OH
      </text>

      {/* PCB-style trace, right side */}
      <g opacity="0.09" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke">
        <path d="M1260 260 H1340 V320 H1420 V260 H1500" vectorEffect="non-scaling-stroke" />
      </g>
      <g opacity="0.16" fill="currentColor">
        <circle cx="1340" cy="260" r="2.5" />
        <circle cx="1340" cy="320" r="2.5" />
        <circle cx="1420" cy="320" r="2.5" />
        <circle cx="1420" cy="260" r="2.5" />
      </g>

      {/* Bottom-right figure label */}
      <text x="1416" y="604" fontSize="13" letterSpacing="3" opacity="0.16" className="font-mono uppercase">
        Fig. 2A
      </text>

      {/* Long dimension line across the lower panel */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.08" vectorEffect="non-scaling-stroke">
        <line x1="440" y1="656" x2="1160" y2="656" vectorEffect="non-scaling-stroke" />
        <line x1="440" y1="648" x2="440" y2="664" vectorEffect="non-scaling-stroke" />
        <line x1="1160" y1="648" x2="1160" y2="664" vectorEffect="non-scaling-stroke" />
      </g>

      {/* Drafting crosshair registration ticks, scattered */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.12" vectorEffect="non-scaling-stroke">
        <path d="M980 460 h14 M987 453 v14" vectorEffect="non-scaling-stroke" />
        <path d="M560 480 h12 M566 474 v12" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
