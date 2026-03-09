

## Plan: POI Map Icons Section + Narrative Patterns Page

### 1. Extend Icons Page with "POI Map Icons" Tab

**File:** `src/pages/tokens/TokensIcons.tsx`

Add a third tab "POI Map Icons" to the existing Tabs component containing:

**A) Marker Anatomy** -- diagram showing circular body, center icon, outer ring, pointer tip. Built with inline SVG/CSS circles and labels.

**B) Marker Style Rules** -- short spec card reiterating outline-only, 2px stroke, no fills/gradients, geometric. References existing icon system rules.

**C) Marker States** -- visual examples of 5 states rendered as CSS circles:
- **Default**: white bg, black icon, thin black ring
- **Hover/Focus**: white bg, black icon, bronze ring (`hsl(var(--bronze))`)
- **Selected**: black bg, white icon, bronze ring
- **Cluster**: white bg, black number, bronze ring
- **Curated Highlight**: white bg, black icon, double bronze ring

All markers use only black (`near-black`), white, and bronze -- no green.

**D) Marker Size Tokens** -- spec grid showing `marker-sm` (32px), `marker-md` (40px), `marker-lg` (48px) with live circle previews at each size.

**E) POI Icon Taxonomy** -- 5 groups displayed in marker preview circles:
- Essentials: Hotel, Coffee, UtensilsCrossed, Info (Lucide)
- Culture & Heritage: Landmark, Building2, GalleryVerticalEnd
- Scenic & Landscape: Eye, Palmtree/Mountain, Waves, Binoculars
- Nature Experiences: TreePine, Umbrella
- Urban & Exploration: BridgeIcon (custom or Waypoints), ShoppingBag

Each icon shown inside a 40px marker circle preview.

**F) Example Map Markers** -- a neutral grey rectangle simulating a map with 4 markers placed on it demonstrating default, hover, selected, and cluster states.

### 2. Create Narrative Patterns Page

**File:** `src/pages/NarrativePatterns.tsx` (new)

Move the narrative path content currently on the Guidelines page into a dedicated page. Content includes:
- Purpose section (storytelling, explanations, journeys, onboarding)
- Graphic principles (flowing path lines, modular information, spacing rules)
- Do/Don't checklist
- Keep the Guidelines page but remove the narrative section from it

### 3. Update Navigation

**File:** `src/components/AppSidebar.tsx`

Add "Narrative Patterns" to the System nav group with a `Route` icon.

### 4. Update Routing

**File:** `src/App.tsx`

Add route for `/narrative-patterns` pointing to the new page.

### Summary of Files Changed
- `src/pages/tokens/TokensIcons.tsx` -- add POI Map Icons tab
- `src/pages/NarrativePatterns.tsx` -- new page (content extracted from Guidelines)
- `src/pages/Guidelines.tsx` -- remove narrative path section
- `src/components/AppSidebar.tsx` -- add nav item
- `src/App.tsx` -- add route

