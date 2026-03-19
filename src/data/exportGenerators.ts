/* ------------------------------------------------------------------ */
/*  Design foundation export generators — Deterministic & Canonical-aware */
/* ------------------------------------------------------------------ */

const tokens = {
  colors: {
    accent: { name: "Champagne Bronze", hsl: "40 42% 60%", hex: "#C6A96B", css: "--accent", tw: "accent" },
    background: { name: "Warm Canvas", hsl: "36 33% 90%", hex: "#EEE7DD", css: "--background", tw: "background" },
    foreground: { name: "Deep Charcoal", hsl: "120 9% 11%", hex: "#1A1F1A", css: "--foreground", tw: "foreground" },
    primary: { name: "Terracotta", hsl: "14 53% 50%", hex: "#C35C3C", css: "--primary", tw: "primary" },
    secondary: { name: "Warm Stone", hsl: "33 16% 89%", hex: "#E8E2D9", css: "--secondary", tw: "secondary" },
  },
  typography: {
    body: { family: "Lexend", fallback: "system-ui, sans-serif", weight: "400", lineHeight: "1.6" },
    display: { family: "Playfair Display", fallback: "Georgia, serif", weight: "500", letterSpacing: "-0.01em" },
  },
  spacing: {
    headlineGap: "2.5rem",
    sectionGap: "4.5rem",
    sectionTop: "10rem",
  },
  layout: {
    maxProse: "52ch",
    radius: "0.375rem",
  },
  motion: {
    uiDuration: "350ms",
    uiEasing: "ease-out",
  },
};

/**
 * Merge canonical library entries on top of built-in tokens.
 * Canonical entries override defaults by matching css variable name or title.
 */
export function mergeCanonicalTokens(
  canonicalEntries: { title: string; content: string | null; entry_type: string; tags: string[] | null }[]
): typeof tokens {
  // Deep clone
  const merged = JSON.parse(JSON.stringify(tokens));

  for (const entry of canonicalEntries) {
    if (entry.entry_type !== "token" || !entry.content) continue;

    // Try to extract key-value from content (e.g. "hex: #FF0000" or "hsl: 0 100% 50%")
    const title = entry.title.toLowerCase().replace(/\s+/g, "-");

    // Match against known color keys
    for (const [key, val] of Object.entries(merged.colors)) {
      const colorVal = val as typeof merged.colors.primary;
      if (
        colorVal.name.toLowerCase().replace(/\s+/g, "-") === title ||
        colorVal.css === `--${title}` ||
        key === title
      ) {
        // Extract hex or hsl from content
        const hexMatch = entry.content.match(/#[0-9A-Fa-f]{6}/);
        const hslMatch = entry.content.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
        if (hexMatch) colorVal.hex = hexMatch[0];
        if (hslMatch) colorVal.hsl = hslMatch[0];
      }
    }
  }

  return merged;
}

/* Sort helper for deterministic output */
function sortedEntries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));
}

/* ---- CSS Custom Properties ---- */
export function generateCSS(overrideTokens?: typeof tokens): string {
  const t = overrideTokens || tokens;
  const colorLines = sortedEntries(t.colors)
    .map(([key, val]) => {
      const lines: string[] = [];
      lines.push(`  --${key}: ${val.hsl};`);
      if (key === "primary") lines.push(`  --${key}-foreground: ${t.colors.background.hsl};`);
      if (key === "secondary") lines.push(`  --${key}-foreground: ${t.colors.primary.hsl};`);
      if (key === "accent") lines.push(`  --${key}-foreground: ${t.colors.foreground.hsl};`);
      return lines.join("\n");
    })
    .join("\n");

  return `:root {
  /* Colors (sorted alphabetically) */
${colorLines}
  --muted: ${t.colors.secondary.hsl};
  --muted-foreground: 0 0% 36%;
  --destructive: 0 72% 51%;
  --destructive-foreground: ${t.colors.background.hsl};
  --card: ${t.colors.secondary.hsl};
  --card-foreground: ${t.colors.foreground.hsl};
  --popover: ${t.colors.background.hsl};
  --popover-foreground: ${t.colors.foreground.hsl};
  --border: 36 10% 83%;
  --input: 36 10% 83%;
  --ring: ${t.colors.primary.hsl};
  --radius: ${t.layout.radius};

  /* Typography */
  --font-display: "${t.typography.display.family}", ${t.typography.display.fallback};
  --font-body: "${t.typography.body.family}", ${t.typography.body.fallback};

  /* Spacing */
  --section-top: ${t.spacing.sectionTop};
  --section-gap: ${t.spacing.sectionGap};
  --headline-gap: ${t.spacing.headlineGap};

  /* Layout */
  --max-prose: ${t.layout.maxProse};

  /* Motion */
  --duration-ui: ${t.motion.uiDuration};
}`;
}

/* ---- Tailwind Config ---- */
export function generateTailwind(): string {
  return `// tailwind.config.ts — Curated Lens Design System
// Auto-generated. Deterministic output — safe to commit.
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Lexend", "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      letterSpacing: {
        headline: "-0.01em",
      },
      lineHeight: {
        hero: "1.05",
        reading: "1.65",
        section: "1.1",
      },
      maxWidth: {
        prose: "52ch",
      },
      spacing: {
        "headline-gap": "2.5rem",
        "section-gap": "4.5rem",
        "section-top": "10rem",
      },
      transitionDuration: {
        ui: "350ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`;
}

/* ---- JSON ---- */
export function generateJSON(overrideTokens?: typeof tokens): string {
  const t = overrideTokens || tokens;
  const output = {
    colors: Object.fromEntries(
      sortedEntries(t.colors).map(([key, val]) => [
        key,
        { name: val.name, hsl: val.hsl, hex: val.hex, cssVariable: val.css, tailwindKey: val.tw },
      ])
    ),
    layout: t.layout,
    motion: t.motion,
    spacing: t.spacing,
    typography: t.typography,
  };
  return JSON.stringify(output, null, 2);
}

/* ---- TypeScript Constants ---- */
export function generateTypeScript(overrideTokens?: typeof tokens): string {
  const t = overrideTokens || tokens;
  const colorEntries = sortedEntries(t.colors)
    .map(
      ([key, val]) =>
        `  ${key}: {\n    name: "${val.name}",\n    hsl: "${val.hsl}",\n    hex: "${val.hex}",\n    cssVariable: "${val.css}",\n    tailwindKey: "${val.tw}",\n  }`
    )
    .join(",\n");

  return `// Curated Lens Design System — Foundation Constants
// Auto-generated. Deterministic output — safe to commit.

export const colors = {
${colorEntries},
} as const;

export const typography = {
  body: {
    family: "${t.typography.body.family}",
    fallback: "${t.typography.body.fallback}",
    weight: "${t.typography.body.weight}",
    lineHeight: "${t.typography.body.lineHeight}",
  },
  display: {
    family: "${t.typography.display.family}",
    fallback: "${t.typography.display.fallback}",
    weight: "${t.typography.display.weight}",
    letterSpacing: "${t.typography.display.letterSpacing}",
  },
} as const;

export const spacing = {
  headlineGap: "${t.spacing.headlineGap}",
  sectionGap: "${t.spacing.sectionGap}",
  sectionTop: "${t.spacing.sectionTop}",
} as const;

export const layout = {
  maxProse: "${t.layout.maxProse}",
  radius: "${t.layout.radius}",
} as const;

export const motion = {
  uiDuration: "${t.motion.uiDuration}",
  uiEasing: "${t.motion.uiEasing}",
} as const;

export type ColorKey = keyof typeof colors;
export type TypographyKey = keyof typeof typography;
`;
}

/* ---- Starter Kit README ---- */
export function generateStarterReadme(): string {
  return `# Curated Lens — Starter Kit

## Quick Start

1. Install dependencies: \`npm install\`
2. Copy \`foundations.css\` into your global stylesheet
3. Add the Tailwind config from \`tailwind.config.ts\`
4. Import foundation constants from \`foundations.ts\` as needed
5. Load fonts: Playfair Display (500) + Lexend (400, 500) from Google Fonts

## Files Included

- \`foundations.css\` — CSS custom properties for all design foundations
- \`tailwind.config.ts\` — Tailwind CSS configuration with all system values
- \`foundations.json\` — Machine-readable design definitions for tooling
- \`foundations.ts\` — TypeScript constants for programmatic access

## Canonical Entries

Entries marked as "canonical" in the library are the single source of truth.
Exports always pull from these canonical entries, ensuring consistency across
CSS, Tailwind, JSON, and TypeScript outputs.

## Color Palette

| Name              | Hex     | Role            |
|-------------------|---------|-----------------|
| Cream             | #F7F4EF | Background      |
| Warm Stone         | #E8E2D9 | Cards / panels  |
| Deep Charcoal      | #1A1F1A | Text            |
| Deep Green         | #1F4A3A | Structure       |
| Terracotta         | #C35C3C | Interaction     |
| Champagne Bronze   | #C9A962 | Highlight       |
| Warm Border        | #CCC4B8 | Borders         |

## Typography

- **Headlines**: Playfair Display, weight 500, tracking −0.01em
- **Body**: Lexend, weight 400, line-height 1.65

## Rules

- Neutral base always dominant — no colored backgrounds
- Terracotta for interaction only — buttons, CTAs, active states
- Deep green for structural emphasis — section backgrounds, identity panels
- Bronze is a highlight accent — never exceed subtle usage
- No gradients, no parallax, no bouncing animations
- Max paragraph width: 52 characters
- UI transitions: 300–400ms, ease-out

## Deterministic Output

All exports are sorted alphabetically and contain no timestamps.
Running the export twice produces byte-identical output.
`;
}

/* ---- Download helper ---- */
export function downloadFile(content: string, filename: string, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type ExportFormat = "css" | "tailwind" | "json" | "typescript";

export const exportFormats: { id: ExportFormat; label: string; filename: string; description: string }[] = [
  { id: "css", label: "CSS Custom Properties", filename: "foundations.css", description: "Ready-to-use CSS variables for any framework." },
  { id: "json", label: "JSON", filename: "foundations.json", description: "Machine-readable design definitions for tooling." },
  { id: "tailwind", label: "Tailwind Config", filename: "tailwind.config.ts", description: "Drop-in Tailwind CSS configuration file." },
  { id: "typescript", label: "TypeScript", filename: "foundations.ts", description: "Typed constants for programmatic access." },
];

export function getExportContent(format: ExportFormat): string {
  switch (format) {
    case "css": return generateCSS();
    case "tailwind": return generateTailwind();
    case "json": return generateJSON();
    case "typescript": return generateTypeScript();
  }
}
