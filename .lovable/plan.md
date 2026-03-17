

# Image System — New Design System Page

## What We're Building
A dedicated **Image System** page within the design system that documents the three-layered image philosophy (Hero, Experience, Product in Use), complete with guidelines, do's/don'ts, mode-specific direction, and example prompts. This becomes the authoritative reference for anyone producing or selecting imagery for the brand.

## Changes

### 1. New page: `src/pages/ImageSystem.tsx`
A structured documentation page with three main sections, each in a card layout consistent with the existing Guidelines page style:

- **Core Principle** — introductory statement about the image philosophy
- **Layer 1: Hero (Emotion & Place)** — guidelines, example prompts, do's/don'ts
- **Layer 2: Experience (Human Presence)** — guidelines, mode-specific direction (Train / Fjord cruise / River cruise), example prompts
- **Layer 3: Product in Use (Curated Lens Visible)** — guidelines for subtle device integration

Each layer will use the existing card (`bg-card`, `border-border`) and `DosDonts` component pattern where applicable. Example prompts will be displayed in styled quote blocks with the left-border accent treatment already defined in the design system.

### 2. New playbook entry: `src/playbook/principles/image-system.ts`
Structured playbook data mirroring the three layers so that the Copilot and export tools can reference the image guidelines programmatically.

### 3. Route registration: `src/App.tsx`
Add route `/image-system` pointing to the new page.

### 4. Sidebar navigation: `src/components/AppSidebar.tsx`
Add an "Image System" nav item under the existing navigation group (near Guidelines), using the `Hexagon` or a camera-related Lucide icon.

### 5. Update `src/playbook/principles.ts`
Replace the short "Imagery Philosophy" text block with a reference/link to the full Image System page, keeping the brief summary but noting the detailed page exists.

## No changes to
- Typography, spacing, layout, or color tokens
- Existing pages or components beyond adding the nav item and route

