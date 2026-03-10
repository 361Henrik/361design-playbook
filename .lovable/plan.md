

# Maps Section — Implementation Plan

## Overview

Add a new "Maps" sidebar group with 10 documentation pages to the design system hub. Each page follows the existing page pattern (PageHeader + card sections). No changes to icons or markers.

## Structure

### Sidebar (AppSidebar.tsx)

Add a new nav group "Maps" between Tokens and System, using the `Map` icon from lucide-react:

```text
Tokens
  Colors, Typography, ...

Maps                        ← NEW GROUP
  Map Principles
  Dynamic Scenic Corridor
  Map Layers
  Map Visual Style
  Map Labels & Geography
  Route & Position
  Map Interaction
  Filtering & Categories
  Guest Experience
  Map Examples

System
  Components, Guidelines, ...
```

Routes: `/maps/principles`, `/maps/corridor`, `/maps/layers`, `/maps/visual-style`, `/maps/labels`, `/maps/route-position`, `/maps/interaction`, `/maps/filtering`, `/maps/guest-experience`, `/maps/examples`

### Files to Create (10 pages)

All pages follow the existing pattern: `PageHeader` + content sections in cards with `font-display` headings, `font-body` text, and `max-w-5xl` layout.

**1. `src/pages/maps/MapPrinciples.tsx`**
- Purpose statement: landscape awareness and storytelling tool, not navigation
- Six principle cards: Route First, Landscape Before Data, Calm Base Map, Corridor Only, Curated Discovery, Readable at a Glance
- Visual feeling reference (Apple Maps clarity)

**2. `src/pages/maps/DynamicScenicCorridor.tsx`**
- Three corridor states with specs: Standard (3–6km river / 5–10km coastal), Scenic Expansion (landmark widening), Tight Corridor (clutter reduction)
- Corridor Editing section for operator controls

**3. `src/pages/maps/MapLayers.tsx`**
- Five layers documented: Base Geography, Landscape Labels, Route Layer, POI Layer, Interaction Layer
- Layer stack diagram

**4. `src/pages/maps/MapVisualStyle.tsx`**
- Color palette for map elements (water, land, route, markers)
- Typography rules for map labels
- Styling constraints

**5. `src/pages/maps/MapLabelsGeography.tsx`**
- Label hierarchy and sizing rules
- Geographic feature naming conventions
- Visibility rules per zoom level

**6. `src/pages/maps/RoutePosition.tsx`**
- Route line styling (completed, upcoming, active)
- Vessel position marker behavior
- Progress indication

**7. `src/pages/maps/MapInteraction.tsx`**
- Tap/click behavior on markers and map
- Pan and zoom constraints
- Information card behavior

**8. `src/pages/maps/FilteringCategories.tsx`**
- POI category system
- Filter UI behavior
- Default visibility rules

**9. `src/pages/maps/GuestExperience.tsx`**
- Accessibility for 65–85 age group
- Touch target sizes, font sizes, contrast
- Simplified interaction model

**10. `src/pages/maps/MapExamples.tsx`**
- Example scenarios: river cruise, coastal voyage, fjord navigation
- Corridor behavior illustrations per scenario

### Files to Modify

**`src/components/AppSidebar.tsx`**
- Import `Map` from lucide-react
- Add `mapsNav` array with 10 items
- Add new SidebarGroup "Maps" between Tokens and System

**`src/App.tsx`**
- Import all 10 map pages
- Add 10 routes under `/maps/*`

### Content Approach

Each page uses the same visual language as existing pages (Guidelines, NarrativePatterns):
- Card containers with `border-border bg-card`
- Section headings in `font-display text-lg`
- Body text in `font-body text-sm text-muted-foreground`
- Principle/rule cards in grids
- Do/Don't patterns where appropriate
- Badge components for labels and categories

