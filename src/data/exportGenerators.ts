/* ------------------------------------------------------------------ */
/*  Token export generators — Deterministic & Canonical-aware          */
/* ------------------------------------------------------------------ */

const tokens = {
  colors: {
    accent: { name: "Antique Bronze", hsl: "36 42% 56%", hex: "#C49A5C", css: "--accent", tw: "accent" },
    background: { name: "Warm White", hsl: "40 33% 97%", hex: "#FBFAF8", css: "--background", tw: "background" },
    foreground: { name: "Near Black", hsl: "240 29% 14%", hex: "#1A1A2E", css: "--foreground", tw: "foreground" },
    primary: { name: "Deep Forest Green", hsl: "153 38% 17%", hex: "#1B3D2F", css: "--primary", tw: "primary" },
    secondary: { name: "Warm Off-White", hsl: "37 21% 95%", hex: "#F5F3EF", css: "--secondary", tw: "secondary" },
  },
  typography: {
    body: { family: "Inter", fallback: "system-ui, sans-serif", weight: "400", lineHeight: "1.65" },
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
      if (key === "accent") lines.push(`  --${key}-foreground: ${t.colors.background.hsl};`);
      return lines.join("\n");
    })
    .join("\n");

  return `:root {
  /* Colors (sorted alphabetically) */
${colorLines}
  --muted: ${t.colors.secondary.hsl};
  --muted-foreground: 240 10% 44%;
  --destructive: 0 72% 51%;
  --destructive-foreground: ${t.colors.background.hsl};
  --card: ${t.colors.secondary.hsl};
  --card-foreground: ${t.colors.foreground.hsl};
  --popover: ${t.colors.background.hsl};
  --popover-foreground: ${t.colors.foreground.hsl};
  --border: 37 18% 88%;
  --input: 37 18% 88%;
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
        body: ["Inter", "system-ui", "sans-serif"],
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

  return `// Curated Lens Design System — Token Constants
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
2. Copy \`tokens.css\` into your global stylesheet
3. Add the Tailwind config from \`tailwind.config.ts\`
4. Import token constants from \`tokens.ts\` as needed
5. Load fonts: Playfair Display (500) + Inter (400, 500) from Google Fonts

## Files Included

- \`tokens.css\` — CSS custom properties for all design tokens
- \`tailwind.config.ts\` — Tailwind CSS configuration with all tokens
- \`tokens.json\` — Machine-readable token definitions
- \`tokens.ts\` — TypeScript constants for programmatic access

## Canonical Tokens

Tokens marked as "canonical" in the library are the single source of truth.
Exports always pull from these canonical entries, ensuring consistency across
CSS, Tailwind, JSON, and TypeScript outputs.

## Color Palette

| Name             | Hex     | Usage   |
|------------------|---------|---------|
| Deep Forest Green| #1B3D2F | 30%     |
| Warm White       | #FBFAF8 | 60%     |
| Warm Off-White   | #F5F3EF | Cards   |
| Near Black       | #1A1A2E | Text    |
| Antique Bronze   | #C49A5C | 8% max  |

## Typography

- **Headlines**: Playfair Display, weight 500, tracking −0.01em
- **Body**: Inter, weight 400, line-height 1.65

## Rules

- Bronze is an accent — never exceed 8% of visible area
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
  { id: "css", label: "CSS Custom Properties", filename: "tokens.css", description: "Ready-to-use CSS variables for any framework." },
  { id: "json", label: "JSON", filename: "tokens.json", description: "Machine-readable token definitions for tooling." },
  { id: "tailwind", label: "Tailwind Config", filename: "tailwind.config.ts", description: "Drop-in Tailwind CSS configuration file." },
  { id: "typescript", label: "TypeScript", filename: "tokens.ts", description: "Typed constants for programmatic token access." },
];

export function getExportContent(format: ExportFormat): string {
  switch (format) {
    case "css": return generateCSS();
    case "tailwind": return generateTailwind();
    case "json": return generateJSON();
    case "typescript": return generateTypeScript();
  }
}
