

# Make Sidebar Expandable / Resizable

## Problem
The sidebar is fixed at 16rem (256px) wide. With the number of navigation items (especially Maps section with longer labels like "Filtering & Categories"), text gets truncated and there's no way to widen the panel.

## Solution
Replace the fixed-width sidebar with a **resizable** sidebar using `react-resizable-panels` (already installed -- see `src/components/ui/resizable.tsx`). This adds a subtle drag handle on the sidebar's right edge that lets users widen or narrow it.

## Changes

### 1. `src/components/ui/sidebar.tsx`
- Update `SIDEBAR_WIDTH` from `"16rem"` to `"16rem"` (keep as default/minimum)
- Add a new constant `SIDEBAR_WIDTH_MAX = "24rem"` 
- Store the user's preferred width in localStorage so it persists across sessions

### 2. `src/components/AppShell.tsx`
- Wrap the layout in a `ResizablePanelGroup` (horizontal direction)
- Place `AppSidebar` inside a `ResizablePanel` with `minSize` and `maxSize` constraints
- Add a `ResizableHandle` between sidebar and main content (styled as a thin, subtle line -- no grip icon, just a hover-visible drag zone)
- Remove the current rigid flex layout in favor of the resizable panel system

### 3. `src/components/AppSidebar.tsx`
- Remove the hardcoded `w-60` class from the `<Sidebar>` component so it fills its resizable panel container
- Change `collapsible="icon"` to `collapsible="none"` since resize handles the width control (or keep icon collapse as a separate toggle)

### Behavior
- **Default width**: 16rem (unchanged from current)
- **Min width**: 14rem (prevents content from being too cramped)
- **Max width**: 28rem (enough to show all nav text comfortably)
- **Drag handle**: A subtle vertical line on the sidebar's right edge, visible on hover with a cursor change
- **Persistence**: Width preference saved to localStorage
- **Mobile**: No change -- continues using the Sheet overlay approach

### Visual Style
- The resize handle replaces the current sidebar border-right
- On hover: handle shows a slightly more visible line (matching the editorial, understated feel)
- No grip dots or heavy visual indicators

