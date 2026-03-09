

# Update POI Icons to Match Reference Images

Replace several POI icons with custom SVG components that match the uploaded reference images. The reference shows specific icon styles inside circular map markers.

## Icons to Update

| POI | Current Icon | New Approach |
|-----|-------------|-------------|
| **Nature Sight** | `Waves` (Lucide) | Custom: two mountain peaks with jagged ridgeline (matching reference) |
| **Island / Islet** | Custom triangle + 2 waves | Custom: small land mound with tiny house + flag on top, wavy water line below (matching reference) |
| **Hotel** | `Hotel` (Lucide) | Keep as-is — Lucide `Hotel` already shows a bed icon matching the reference |
| **Historic Site** | `Landmark` (Lucide) | Custom: castle tower/turret with crenellations (matching reference) |
| **Gallery** | `GalleryVerticalEnd` (Lucide) | Custom: framed portrait on wall with rope stanchions below (matching reference) |
| **Bridge** | Custom arch + water line | Custom: wider flatter arch bridge with visible deck surface (matching reference — current is close but needs the flat top deck added back) |

## File Changes

### `src/pages/tokens/TokensIcons.tsx`

1. **Add 4 new custom SVG components** (same pattern as `BeachParasol`/`BridgeIcon`):
   - `NatureSightIcon` — two mountain peaks with connecting ridgeline
   - `HistoricSiteIcon` — castle turret with crenellations on top, rectangular base
   - `GalleryIcon` — framed picture on wall + rope barrier with two stanchion posts
   - Update `IslandIcon` — small rounded land mass with tiny house and flag, single wavy water line below

2. **Update `BridgeIcon`** — add a flat deck/road surface on top of the arch (reference shows a flat-topped bridge profile with arch underneath)

3. **Update POI groups** to use new custom icons instead of Lucide ones:
   - `"Nature Sight"` → `NatureSightIcon`
   - `"Historic Site"` → `HistoricSiteIcon`
   - `"Gallery"` → `GalleryIcon`

4. **Remove unused Lucide imports**: `Landmark`, `GalleryVerticalEnd`, `Waves` (if no longer used elsewhere)

All custom icons follow the established pattern: 24x24 viewBox, `stroke="currentColor"`, no fills, `strokeLinecap="round"`, `strokeLinejoin="round"`, 1.5-2px stroke weight.

