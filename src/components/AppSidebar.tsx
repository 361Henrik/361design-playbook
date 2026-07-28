import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Compass,
  Workflow,
  Palette,
  Type,
  Ruler,
  LayoutGrid,
  Zap,
  Hexagon,
  Component,
  BookOpen,
  ShieldCheck,
  Download,
  Settings,
  Upload,
  Library,
  History,
  LogOut,
  Sparkles,
  MessageSquare,
  PanelTop,
  HelpCircle,
  Route,
  Map,
  Camera,
  ChevronRight,
  MousePointer,
  Presentation,
  FileText,
  Network,
  PenTool,
  Wrench,
} from "lucide-react";

type NavItem = { title: string; url: string; icon: typeof Map };
type NavGroup = { label: string; items: NavItem[] };

// ───────── HOST ATLAS ─────────
const hostAtlasGroups: NavGroup[] = [
  {
    label: "Foundations",
    items: [
      { title: "Colors", url: "/tokens/colors", icon: Palette },
      { title: "Typography", url: "/tokens/typography", icon: Type },
      { title: "Spacing", url: "/tokens/spacing", icon: Ruler },
      { title: "Layout", url: "/tokens/layout", icon: LayoutGrid },
      { title: "Motion", url: "/tokens/motion", icon: Zap },
      { title: "Voice", url: "/tokens/voice", icon: MessageSquare },
      { title: "Logo System", url: "/tokens/logo-system", icon: Camera },
      { title: "Icons — Cartographic", url: "/host-atlas/icons", icon: Hexagon },
    ],
  },
  {
    label: "Interaction",
    items: [
      { title: "CTA System", url: "/behavior/cta-system", icon: MousePointer },
      { title: "Signifiers & Clarity", url: "/behavior/signifiers", icon: MousePointer },
      { title: "Interaction States", url: "/behavior/interaction-states", icon: MousePointer },
      { title: "Feedback & Micro", url: "/behavior/feedback", icon: MousePointer },
      { title: "Motion & Transitions", url: "/behavior/motion", icon: MousePointer },
      { title: "Semantic Colour", url: "/behavior/semantic-color", icon: MousePointer },
      { title: "Depth & Surfaces", url: "/behavior/depth", icon: MousePointer },
      { title: "Dark Mode", url: "/behavior/dark-mode", icon: MousePointer },
    ],
  },
  {
    label: "Components",
    items: [
      { title: "Components", url: "/components", icon: Component },
      { title: "Guardrails", url: "/guardrails", icon: ShieldCheck },
    ],
  },
  {
    label: "Maps",
    items: [
      { title: "Map Principles", url: "/maps/principles", icon: Map },
      { title: "Map Structure", url: "/maps/structure", icon: Map },
      { title: "Map Visual Style", url: "/maps/visual-style", icon: Map },
      { title: "Map Interaction", url: "/maps/interaction", icon: Map },
      { title: "Navigation Logic", url: "/maps/navigation-logic", icon: Map },
      { title: "Experience Design", url: "/maps/experience-design", icon: Map },
      { title: "Map Examples", url: "/maps/examples", icon: Map },
    ],
  },
  {
    label: "Patterns",
    items: [
      { title: "Narrative Patterns", url: "/narrative-patterns", icon: Route },
      { title: "Image System", url: "/image-system", icon: Camera },
      { title: "Guidelines", url: "/guidelines", icon: BookOpen },
    ],
  },
];

// ───────── 361 AI DEVELOPMENT ─────────
const threeSixtyOneGroups: NavGroup[] = [
  {
    label: "Brand & Voice",
    items: [
      { title: "361 Identity", url: "/361/brand", icon: PenTool },
    ],
  },
  {
    label: "Delivery Surfaces",
    items: [
      { title: "Offer & Pitch System", url: "/361/offers", icon: Presentation },
      { title: "Documentation System", url: "/361/docs", icon: FileText },
      { title: "Delivery Assets", url: "/361/delivery", icon: Network },
      { title: "Prototype Kit", url: "/361/prototype-kit", icon: Wrench },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Guardrails (Delivery)", url: "/361/guardrails", icon: ShieldCheck },
      { title: "Icons — Mechanical", url: "/361/icons", icon: Hexagon },
    ],
  },
];

// ───────── TOOLS ─────────
const toolsItems: NavItem[] = [
  { title: "Preview Engine", url: "/preview-engine", icon: Sparkles },
  { title: "Studio", url: "/studio", icon: PanelTop },
  { title: "Export", url: "/export", icon: Download },
  { title: "Copilot", url: "/copilot", icon: MessageSquare },
  { title: "Sources", url: "/sources", icon: Upload },
  { title: "Library", url: "/library", icon: Library },
  { title: "Handbook", url: "/handbook", icon: BookOpen },
  { title: "Changelog", url: "/changelog", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

function DomainSection({
  label,
  rootUrl,
  rootIcon: RootIcon,
  groups,
  defaultOpen,
}: {
  label: string;
  rootUrl: string;
  rootIcon: typeof Map;
  groups: NavGroup[];
  defaultOpen?: boolean;
}) {
  const location = useLocation();
  const allUrls = groups.flatMap((g) => g.items.map((i) => i.url)).concat(rootUrl);
  const hasActive = allUrls.some((u) => location.pathname === u || location.pathname.startsWith(u + "/"));
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen ?? hasActive);

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setIsOpen((p) => !p)}
            className="group flex items-center gap-3 px-3 py-2 mt-3 rounded-md cursor-pointer transition-colors duration-ui text-foreground hover:bg-sidebar-accent"
          >
            <RootIcon className="nav-icon h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
            <span className="font-body text-[13px] uppercase tracking-[0.05em] font-medium flex-1">
              {label}
            </span>
            <ChevronRight
              className={`h-3 w-3 text-sidebar-primary/60 transition-transform duration-ui ${isOpen ? "rotate-90" : ""}`}
              strokeWidth={1.5}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {isOpen && (
        <div className="ml-2 mt-1 border-l border-sidebar-border pl-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to={rootUrl}
                end
                className="group flex items-center gap-3 px-3 py-1.5 rounded-md text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
                activeClassName="text-foreground font-semibold"
              >
                <span className="font-body text-sm italic opacity-80">Overview</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {groups.map((group) => (
            <SidebarGroup key={group.label} className="py-0">
              <SidebarGroupLabel className="px-3 pt-3 pb-1 text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="group flex items-center gap-3 px-3 py-1.5 rounded-md text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
                          activeClassName="text-foreground font-semibold border-l-2 border-sidebar-primary [&_.nav-icon]:opacity-100"
                        >
                          <item.icon className="nav-icon h-3.5 w-3.5 shrink-0 text-accent transition-colors duration-ui" strokeWidth={1.5} />
                          <span className="font-body text-sm">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      )}
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();

  return (
    <Sidebar className="w-full border-r-0" collapsible={isMobile ? "offcanvas" : "none"}>
      <div className="px-5 py-6 border-b border-sidebar-border">
        {workspaces.length > 1 ? (
          <Select value={activeWorkspace?.id || ""} onValueChange={setActiveWorkspaceId}>
            <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm h-9">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map((w) => (
                <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <>
            <h1 className="font-display text-lg font-medium tracking-headline text-sidebar-foreground leading-section">
              {activeWorkspace?.name || "Host Atlas"}
            </h1>
            <p className="text-sm font-body font-medium text-sidebar-foreground tracking-[0.03em] mt-1.5">
              Host Atlas · Design System
            </p>
          </>
        )}
      </div>

      <SidebarContent className="px-3 py-2">
        <DomainSection
          label="Host Atlas"
          rootUrl="/host-atlas"
          rootIcon={Compass}
          groups={hostAtlasGroups}
          defaultOpen
        />

        <DomainSection
          label="361 AI Development"
          rootUrl="/361"
          rootIcon={Workflow}
          groups={threeSixtyOneGroups}
        />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4 pt-4 border-t border-border/60">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="group flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
                      activeClassName="text-foreground font-semibold border-l-2 border-sidebar-primary [&_.nav-icon]:opacity-100"
                    >
                      <item.icon className="nav-icon h-4 w-4 shrink-0 text-accent transition-colors duration-ui" strokeWidth={1.5} />
                      <span className="font-body text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <div className="mt-auto px-5 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-body text-sidebar-foreground truncate">{user.email}</p>
            </div>
            <NotificationCenter />
            <button onClick={signOut} className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors" title="Sign out">
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-[10px] font-mono text-sidebar-foreground/50 mt-2">⌘K to search</p>
        </div>
      )}
    </Sidebar>
  );
}
