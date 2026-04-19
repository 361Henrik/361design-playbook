import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";
import {
  Map, MapPin, Compass, Route, Layers, Mountain, Anchor,
  Camera, Aperture, Search, Eye, Bookmark, Heart,
  Calendar, Clock, User, Users, MessageSquare, Bell,
  ChevronRight, ArrowRight, ArrowLeft, Plus, Check, X,
  Settings, Download, Upload, ExternalLink, Filter,
  Coffee, UtensilsCrossed, Info, ShoppingBag,
} from "lucide-react";

const spec = [
  { label: "Artboard", value: "24×24px (live area 20×20)" },
  { label: "Stroke", value: "1.5px" },
  { label: "Caps", value: "Round" },
  { label: "Joins", value: "Round" },
  { label: "Color", value: "text-foreground in product UI · text-accent (Bronze) for nav rail and brand surfaces only · never Bronze inside content bodies" },
  { label: "Sizes", value: "16 (inline) · 20 (controls) · 24 (default) · 32 (cards/empty states)" },
];

const groups = [
  {
    label: "Place & Geography",
    icons: [
      { name: "Pin", I: MapPin },
      { name: "Map", I: Map },
      { name: "Compass", I: Compass },
      { name: "Route", I: Route },
      { name: "Layer", I: Layers },
      { name: "Terrain", I: Mountain },
      { name: "Anchor", I: Anchor },
    ],
  },
  {
    label: "Observation & Lens",
    icons: [
      { name: "Camera", I: Camera },
      { name: "Aperture", I: Aperture },
      { name: "Search", I: Search },
      { name: "Eye", I: Eye },
      { name: "Bookmark", I: Bookmark },
      { name: "Save", I: Heart },
    ],
  },
  {
    label: "Time & People",
    icons: [
      { name: "Calendar", I: Calendar },
      { name: "Clock", I: Clock },
      { name: "User", I: User },
      { name: "Group", I: Users },
      { name: "Message", I: MessageSquare },
      { name: "Notify", I: Bell },
    ],
  },
  {
    label: "Navigation & Action",
    icons: [
      { name: "Forward", I: ChevronRight },
      { name: "Next", I: ArrowRight },
      { name: "Back", I: ArrowLeft },
      { name: "Add", I: Plus },
      { name: "Confirm", I: Check },
      { name: "Dismiss", I: X },
      { name: "Settings", I: Settings },
      { name: "Download", I: Download },
      { name: "Upload", I: Upload },
      { name: "Open", I: ExternalLink },
      { name: "Filter", I: Filter },
    ],
  },
  {
    label: "POI Taxonomy (preview)",
    icons: [
      { name: "Hotel", I: Bookmark },
      { name: "Café", I: Coffee },
      { name: "Restaurant", I: UtensilsCrossed },
      { name: "Information", I: Info },
      { name: "Shopping", I: ShoppingBag },
    ],
  },
];

export default function HostAtlasIcons() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Icons — Cartographic Set"
        description="The Host Atlas icon set. Thin, geometric, single-line. Metaphors drawn from cartography, place, observation. Designed to recede inside dense product UI and read clearly inside map markers."
      />

      <section className="mt-space-6">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Specification</h2>
        <div className="rounded-md border border-border bg-card overflow-hidden">
          {spec.map((r, i) => (
            <div key={r.label} className={`flex items-start gap-4 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
              <span className="font-body text-xs uppercase tracking-[0.06em] text-muted-foreground w-32 shrink-0 pt-0.5">
                {r.label}
              </span>
              <span className="font-body text-sm text-foreground flex-1">{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.label} className="mt-space-8">
          <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-3">
            {g.label}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {g.icons.map(({ name, I }) => (
              <div key={name} className="p-3 rounded-md border border-border bg-card flex flex-col items-center text-center">
                <I className="h-6 w-6 text-foreground mb-2" strokeWidth={1.5} />
                <p className="text-[11px] font-body text-muted-foreground">{name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Map marker rule</h2>
        <p className="text-sm font-body text-muted-foreground max-w-prose mb-3">
          Map markers are the only place fills are permitted. Each marker is built in three layers: outer ring, white disk, outline icon centered on the disk.
        </p>
        <ul className="space-y-1 text-sm font-body text-foreground p-5 rounded-md border border-border bg-card">
          <li>• Default: 2px Charcoal ring · white disk · Charcoal outline icon (2–2.5px stroke).</li>
          <li>• Hover: 2.5px Charcoal ring; disk and icon unchanged.</li>
          <li>• Selected: 3px Bronze ring; disk and icon unchanged.</li>
          <li>• Curated: double Bronze ring (operator highlight); disk and icon unchanged.</li>
          <li>• Cluster: count number on white disk in place of the icon.</li>
        </ul>
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Usage</h2>
        <DosDonts
          dos={[
            "Use Cartographic icons across product UI, navigation, content cards, and maps.",
            "Render in text-foreground inside content bodies.",
            "Use Bronze (text-accent) only in the nav rail and on brand surfaces.",
            "Stay on the 16/20/24/32 size ladder.",
          ]}
          donts={[
            "Never use Cartographic icons in offers, decks, or 361 documents.",
            "Never apply fills outside the map-marker disk.",
            "Never use Bronze inside content bodies.",
            "Never combine multiple stroke weights in the same view.",
          ]}
        />
      </section>
    </div>
  );
}
