import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import {
  Circle, Square, Triangle, Star, ArrowRight, ArrowLeft, ArrowUp,
  Search, Menu, X, Plus, Minus, Check, ChevronDown, ChevronRight,
  Settings, User, Mail, Calendar, Download, Upload, Eye, EyeOff,
  Palette, Type, Ruler, LayoutGrid, Zap, Hexagon, Copy, ExternalLink,
} from "lucide-react";

const iconGroups = [
  {
    label: "Navigation",
    icons: [
      { name: "Menu", icon: Menu },
      { name: "Close", icon: X },
      { name: "Chevron Down", icon: ChevronDown },
      { name: "Chevron Right", icon: ChevronRight },
      { name: "Arrow Right", icon: ArrowRight },
      { name: "Arrow Left", icon: ArrowLeft },
      { name: "Arrow Up", icon: ArrowUp },
      { name: "External Link", icon: ExternalLink },
    ],
  },
  {
    label: "Actions",
    icons: [
      { name: "Search", icon: Search },
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Check", icon: Check },
      { name: "Copy", icon: Copy },
      { name: "Download", icon: Download },
      { name: "Upload", icon: Upload },
      { name: "Settings", icon: Settings },
    ],
  },
  {
    label: "Content",
    icons: [
      { name: "User", icon: User },
      { name: "Mail", icon: Mail },
      { name: "Calendar", icon: Calendar },
      { name: "Eye", icon: Eye },
      { name: "Eye Off", icon: EyeOff },
      { name: "Palette", icon: Palette },
      { name: "Type", icon: Type },
      { name: "Layout", icon: LayoutGrid },
    ],
  },
  {
    label: "Shapes",
    icons: [
      { name: "Circle", icon: Circle },
      { name: "Square", icon: Square },
      { name: "Triangle", icon: Triangle },
      { name: "Star", icon: Star },
      { name: "Hexagon", icon: Hexagon },
      { name: "Ruler", icon: Ruler },
      { name: "Zap", icon: Zap },
    ],
  },
];

const TokensIcons = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Icon System"
        description="Thin stroke (1.5–2px), geometric, no fills, no gradients. Lucide icons aligned with the system's architectural sensibility."
      />

      {/* Spec card */}
      <div className="mb-10 p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Icon Specifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Stroke Width", value: "1.5–2px" },
            { label: "Default Size", value: "24×24px (h-6 w-6)" },
            { label: "Small Size", value: "16×16px (h-4 w-4)" },
            { label: "Style", value: "Outline only" },
          ].map((spec) => (
            <div key={spec.label} className="text-center">
              <p className="text-xs font-body text-muted-foreground mb-1">{spec.label}</p>
              <p className="text-sm font-body font-medium text-card-foreground">{spec.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton value='<Icon className="h-6 w-6" strokeWidth={1.5} />' label="Default usage" />
          <CopyButton value='<Icon className="h-4 w-4" strokeWidth={2} />' label="Small usage" />
        </div>
      </div>

      {/* Icon groups */}
      {iconGroups.map((group) => (
        <section key={group.label} className="mb-8">
          <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">
            {group.label}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {group.icons.map(({ name, icon: Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-md border border-border bg-card hover:border-primary/20 transition-colors duration-ui">
                <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span className="text-[10px] font-body text-muted-foreground text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Size comparison */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">
          Size & Stroke Comparison
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <div className="flex items-end gap-8">
            {[
              { size: "h-4 w-4", stroke: 2, label: "16px / 2px stroke" },
              { size: "h-5 w-5", stroke: 1.5, label: "20px / 1.5px stroke" },
              { size: "h-6 w-6", stroke: 1.5, label: "24px / 1.5px stroke" },
              { size: "h-8 w-8", stroke: 1.5, label: "32px / 1.5px stroke" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <Search className={`${item.size} text-foreground`} strokeWidth={item.stroke} />
                <span className="text-[10px] font-body text-muted-foreground text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Do / Don't
        </h2>
        <DosDonts
          dos={[
            "Use thin-stroke (1.5–2px) geometric icons from Lucide.",
            "Keep icons functional and minimal — they serve navigation and clarity.",
            "Use consistent sizing: 24px default, 16px for compact contexts.",
            "Color icons with text-foreground or text-muted-foreground only.",
          ]}
          donts={[
            "No filled icons — always use outline/stroke variants.",
            "No gradients on icons under any circumstances.",
            "No decorative or illustrative icon styles.",
            "Don't use icons larger than 32px except in hero/empty states.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensIcons;
