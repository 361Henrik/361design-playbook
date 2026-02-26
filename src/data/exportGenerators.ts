/* ------------------------------------------------------------------ */
/*  Token export generators                                            */
/* ------------------------------------------------------------------ */

const tokens = {
  colors: {
    primary: { name: "Deep Forest Green", hsl: "153 38% 17%", hex: "#1B3D2F", css: "--primary", tw: "primary" },
    background: { name: "Warm White", hsl: "40 33% 97%", hex: "#FBFAF8", css: "--background", tw: "background" },
    secondary: { name: "Warm Off-White", hsl: "37 21% 95%", hex: "#F5F3EF", css: "--secondary", tw: "secondary" },
    foreground: { name: "Near Black", hsl: "240 29% 14%", hex: "#1A1A2E", css: "--foreground", tw: "foreground" },
    accent: { name: "Antique Bronze", hsl: "36 42% 56%", hex: "#C49A5C", css: "--accent", tw: "accent" },
  },
  typography: {
    display: { family: "Playfair Display", fallback: "Georgia, serif", weight: "500", letterSpacing: "-0.01em" },
    body: { family: "Inter", fallback: "system-ui, sans-serif", weight: "400", lineHeight: "1.65" },
  },
  spacing: {
    sectionTop: "10rem",
    sectionGap: "4.5rem",
    headlineGap: "2.5rem",
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

/* ---- CSS Custom Properties ---- */
export function generateCSS(): string {
  return `:root {
  /* Colors */
  --primary: ${tokens.colors.primary.hsl};
  --primary-foreground: ${tokens.colors.background.hsl};
  --background: ${tokens.colors.background.hsl};
  --foreground: ${tokens.colors.foreground.hsl};
  --secondary: ${tokens.colors.secondary.hsl};
  --secondary-foreground: ${tokens.colors.primary.hsl};
  --accent: ${tokens.colors.accent.hsl};
  --accent-foreground: ${tokens.colors.background.hsl};
  --muted: ${tokens.colors.secondary.hsl};
  --muted-foreground: 240 10% 44%;
  --destructive: 0 72% 51%;
  --destructive-foreground: ${tokens.colors.background.hsl};
  --card: ${tokens.colors.secondary.hsl};
  --card-foreground: ${tokens.colors.foreground.hsl};
  --popover: ${tokens.colors.background.hsl};
  --popover-foreground: ${tokens.colors.foreground.hsl};
  --border: 37 18% 88%;
  --input: 37 18% 88%;
  --ring: ${tokens.colors.primary.hsl};
  --radius: ${tokens.layout.radius};

  /* Typography */
  --font-display: "${tokens.typography.display.family}", ${tokens.typography.display.fallback};
  --font-body: "${tokens.typography.body.family}", ${tokens.typography.body.fallback};

  /* Spacing */
  --section-top: ${tokens.spacing.sectionTop};
  --section-gap: ${tokens.spacing.sectionGap};
  --headline-gap: ${tokens.spacing.headlineGap};

  /* Layout */
  --max-prose: ${tokens.layout.maxProse};

  /* Motion */
  --duration-ui: ${tokens.motion.uiDuration};
}`;
}

/* ---- Tailwind Config ---- */
export function generateTailwind(): string {
  return `// tailwind.config.ts — Curated Lens Design System
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      maxWidth: {
        prose: "52ch",
      },
      letterSpacing: {
        headline: "-0.01em",
      },
      lineHeight: {
        hero: "1.05",
        section: "1.1",
        reading: "1.65",
      },
      spacing: {
        "section-top": "10rem",
        "section-gap": "4.5rem",
        "headline-gap": "2.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
export function generateJSON(): string {
  return JSON.stringify(
    {
      colors: Object.fromEntries(
        Object.entries(tokens.colors).map(([key, val]) => [
          key,
          { name: val.name, hsl: val.hsl, hex: val.hex, cssVariable: val.css, tailwindKey: val.tw },
        ])
      ),
      typography: tokens.typography,
      spacing: tokens.spacing,
      layout: tokens.layout,
      motion: tokens.motion,
    },
    null,
    2
  );
}

/* ---- TypeScript Constants ---- */
export function generateTypeScript(): string {
  const colorEntries = Object.entries(tokens.colors)
    .map(
      ([key, val]) =>
        `  ${key}: {\n    name: "${val.name}",\n    hsl: "${val.hsl}",\n    hex: "${val.hex}",\n    cssVariable: "${val.css}",\n    tailwindKey: "${val.tw}",\n  }`
    )
    .join(",\n");

  return `// Curated Lens Design System — Token Constants
// Auto-generated. Do not edit manually.

export const colors = {
${colorEntries},
} as const;

export const typography = {
  display: {
    family: "${tokens.typography.display.family}",
    fallback: "${tokens.typography.display.fallback}",
    weight: "${tokens.typography.display.weight}",
    letterSpacing: "${tokens.typography.display.letterSpacing}",
  },
  body: {
    family: "${tokens.typography.body.family}",
    fallback: "${tokens.typography.body.fallback}",
    weight: "${tokens.typography.body.weight}",
    lineHeight: "${tokens.typography.body.lineHeight}",
  },
} as const;

export const spacing = {
  sectionTop: "${tokens.spacing.sectionTop}",
  sectionGap: "${tokens.spacing.sectionGap}",
  headlineGap: "${tokens.spacing.headlineGap}",
} as const;

export const layout = {
  maxProse: "${tokens.layout.maxProse}",
  radius: "${tokens.layout.radius}",
} as const;

export const motion = {
  uiDuration: "${tokens.motion.uiDuration}",
  uiEasing: "${tokens.motion.uiEasing}",
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
  { id: "tailwind", label: "Tailwind Config", filename: "tailwind.config.ts", description: "Drop-in Tailwind CSS configuration file." },
  { id: "json", label: "JSON", filename: "tokens.json", description: "Machine-readable token definitions for tooling." },
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
