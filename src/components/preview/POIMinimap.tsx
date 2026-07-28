interface MinimapProps {
  pois: { name: string; kind: string; distance: string }[];
  accent?: string;
}

/**
 * Editorial cartographic mini-map in Host Atlas style.
 * Deterministic layout: sinusoidal scenic corridor with markers placed along it.
 */
export function POIMinimap({ pois, accent = "hsl(14, 53%, 50%)" }: MinimapProps) {
  const W = 800;
  const H = 320;
  const path = "M 40 220 C 160 60, 260 320, 400 180 S 620 40, 760 160";
  // Sample the path at even t values by placing markers along an easing curve
  const n = pois.length;
  const points = pois.map((_, i) => {
    const t = (i + 0.5) / n;
    const x = 40 + t * 720;
    // approximate a wave shape matching the cubic bezier feel
    const y = 200 - Math.sin(t * Math.PI * 1.8) * 90 - t * 20;
    return { x, y };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto rounded-md border border-foreground/10"
      style={{ background: "hsl(37, 31%, 95%)" }}
      role="img"
      aria-label="Nearby places mini-map"
    >
      {/* land tint */}
      <path
        d="M 0 260 Q 200 240 400 260 T 800 260 L 800 320 L 0 320 Z"
        fill="hsl(33, 16%, 89%)"
      />
      {/* corridor halo */}
      <path
        d={path}
        stroke="hsl(158, 41%, 21%)"
        strokeOpacity="0.12"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      {/* route line */}
      <path
        d={path}
        stroke="hsl(158, 41%, 21%)"
        strokeWidth="2"
        strokeDasharray="1 6"
        strokeLinecap="round"
        fill="none"
      />
      {/* start pin */}
      <g transform="translate(40 220)">
        <circle r="9" fill="hsl(37, 31%, 95%)" stroke="hsl(120, 9%, 11%)" strokeWidth="1.5" />
        <circle r="3" fill={accent} />
      </g>
      {/* end pin */}
      <g transform="translate(760 160)">
        <circle r="9" fill="hsl(37, 31%, 95%)" stroke="hsl(120, 9%, 11%)" strokeWidth="1.5" />
        <circle r="3" fill="hsl(158, 41%, 21%)" />
      </g>

      {/* markers */}
      {points.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r="14" fill="hsl(37, 31%, 95%)" stroke="hsl(120, 9%, 11%)" strokeWidth="1.5" />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontFamily="Lexend, sans-serif"
            fontWeight="600"
            fill="hsl(120, 9%, 11%)"
          >
            {i + 1}
          </text>
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            fontSize="10"
            fontFamily="Lexend, sans-serif"
            fill="hsl(120, 9%, 11%)"
            style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            {pois[i]?.name.length > 18 ? pois[i].name.slice(0, 16) + "…" : pois[i]?.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
