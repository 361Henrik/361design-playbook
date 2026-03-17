

## Simplifying the Handbook Viewer

### Current pain points

1. **Three view modes are confusing** — Overview shows 1 block, Full shows all blocks, Image is a separate canvas. The difference between Overview and Full is subtle, and switching between them adds friction.
2. **Selection-first workflow is backwards** — Users must check boxes before seeing anything. The default should show everything, with filtering as the refinement step.
3. **Mobile is broken** — The selection panel is `hidden lg:block`, so on the current 440px viewport the user has no way to select/deselect items.
4. **Too many toolbar controls** — Search, 3 view buttons, Selected Only switch, Expand/Collapse, plus conditional Export/Fullscreen buttons. This feels like an admin panel.
5. **"Selected only" toggle is redundant** — If you've already selected items, why would you want to see unselected ones cluttering the sidebar?

### Proposed simplifications

**A. Merge Overview and Full into one view with inline expand**
- Remove the Overview/Full toggle entirely
- Each card starts collapsed (title + description + status)
- Click a card to expand it and see all content blocks
- "Expand All" / "Collapse All" remain as utility buttons
- This is more intuitive — one interaction model instead of a global mode switch

**B. Default to "show all" and use the sidebar as a filter**
- On first load, all items are selected (already the case)
- Rename the left panel from "selection" to "filter" — it filters what's visible, not what's "selected"
- Remove the "Selected only" toggle — the sidebar always shows all items, checked ones appear in the preview

**C. Mobile: use a drawer for the filter panel**
- On small screens, show a floating filter button that opens a bottom Drawer (already have the `drawer.tsx` component)
- The drawer contains the same section/checkbox list
- This makes the feature fully usable on mobile

**D. Flatten the toolbar**
- Row 1: Search input + View toggle (List / Image) + filter drawer trigger (mobile only)
- Row 2 (contextual): Expand/Collapse (list view) or Export/Fullscreen (image view)
- Remove the Switch component for "Selected only" entirely

**E. Keep Image view as-is**
- Image mode is a distinct use case (presentation/export) and stays separate
- But simplify the toggle to just two buttons: **Browse** and **Present**

### Summary of changes

| File | What changes |
|------|-------------|
| `HandbookViewer.tsx` | Remove `overview`/`full` split → single list view with collapsible cards. Remove `showSelectedOnly` state. Simplify toolbar. Add mobile drawer for filter panel. Rename view modes to "Browse" / "Present". |
| New: mobile filter using `Drawer` | Wrap the filter panel in a Drawer on small screens, triggered by a filter icon button visible only on mobile. |

### What stays the same
- Visual identity, typography, spacing, colour palette
- Image canvas and export functionality
- localStorage persistence
- Section grouping and checkbox interaction
- PlaybookBlockRenderer and ImageCanvas components

