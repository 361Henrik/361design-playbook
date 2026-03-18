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
  LayoutDashboard,
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
  ChevronsUpDown,
  Sparkles,
  MessageSquare,
  PanelTop,
  HelpCircle,
  Route,
  Map,
  Camera,
  ChevronRight,
  MousePointer,
} from "lucide-react";

const tokenNav = [
  { title: "Colors", url: "/tokens/colors", icon: Palette },
  { title: "Typography", url: "/tokens/typography", icon: Type },
  { title: "Spacing", url: "/tokens/spacing", icon: Ruler },
  { title: "Layout", url: "/tokens/layout", icon: LayoutGrid },
  { title: "Motion", url: "/tokens/motion", icon: Zap },
  { title: "Icons", url: "/tokens/icons", icon: Hexagon },
  { title: "Voice", url: "/tokens/voice", icon: MessageSquare },
];

const mapsItems = [
  { title: "Map Principles", url: "/maps/principles", icon: Map },
  { title: "Map Structure", url: "/maps/structure", icon: Map },
  { title: "Map Visual Style", url: "/maps/visual-style", icon: Map },
  { title: "Map Interaction", url: "/maps/interaction", icon: Map },
  { title: "Navigation Logic", url: "/maps/navigation-logic", icon: Map },
  { title: "Experience Design", url: "/maps/experience-design", icon: Map },
  { title: "Map Examples", url: "/maps/examples", icon: Map },
];

const systemNav = [
  { title: "Components", url: "/components", icon: Component },
  { title: "Guidelines", url: "/guidelines", icon: BookOpen },
  { title: "Image System", url: "/image-system", icon: Camera },
  { title: "Narrative Patterns", url: "/narrative-patterns", icon: Route },
  { title: "Guardrails", url: "/guardrails", icon: ShieldCheck },
];

const toolsNav = [
  { title: "Handbook Viewer", url: "/handbook", icon: BookOpen },
  { title: "Export", url: "/export", icon: Download },
  { title: "Studio", url: "/studio", icon: PanelTop },
  { title: "Sources", url: "/sources", icon: Upload },
  { title: "Library", url: "/library", icon: Library },
  { title: "Changelog", url: "/changelog", icon: History },
  { title: "Copilot", url: "/copilot", icon: Sparkles },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

const behaviorNav = [
  { title: "Signifiers & Clarity", url: "/behavior/signifiers", icon: MousePointer },
  { title: "Interaction States", url: "/behavior/interaction-states", icon: MousePointer },
  { title: "Feedback & Micro-interactions", url: "/behavior/feedback", icon: MousePointer },
  { title: "Motion & Transitions", url: "/behavior/motion", icon: MousePointer },
  { title: "Semantic Colour Usage", url: "/behavior/semantic-color", icon: MousePointer },
  { title: "Depth & Surfaces", url: "/behavior/depth", icon: MousePointer },
  { title: "Dark Mode Principles", url: "/behavior/dark-mode", icon: MousePointer },
];

function MapsAccordionNav(): JSX.Element {
  const location = useLocation();
  const hasActive = mapsItems.some((i) => location.pathname === i.url);
  const [isOpen, setIsOpen] = useState(() => hasActive);

  return (
    <SidebarGroup>
        <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4">
        Maps
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsOpen((prev) => !prev)}
              className={`group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors duration-ui ${
                hasActive
                  ? "text-foreground font-semibold border-l-2 border-sidebar-primary"
                  : "text-sidebar-foreground hover:text-foreground"
              }`}
            >
              <Map className="nav-icon h-4 w-4 shrink-0 text-accent group-hover:text-accent transition-colors duration-ui" strokeWidth={1.5} />
              <span className="font-body text-sm flex-1">MAP</span>
              <ChevronRight
                className={`h-3 w-3 text-sidebar-primary/60 transition-transform duration-ui ${
                  isOpen ? "rotate-90" : ""
                }`}
                strokeWidth={1.5}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
          {isOpen && (
            <div className="ml-4 border-l border-sidebar-border pl-1">
              {mapsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="group flex items-center gap-3 px-3 py-1.5 rounded-md text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
                      activeClassName="bg-sidebar-accent text-foreground font-semibold"
                    >
                      <span className="font-body text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();

  const renderItems = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
            <NavLink
            to={item.url}
            end={item.url === "/"}
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
            activeClassName="text-foreground font-semibold border-l-2 border-sidebar-primary [&_.nav-icon]:opacity-100"
          >
            <item.icon className="nav-icon h-4 w-4 shrink-0 text-accent group-hover:text-accent transition-colors duration-ui" strokeWidth={1.5} />
            <span className="font-body text-sm">{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

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
              {activeWorkspace?.name || "The Curated Lens"}
            </h1>
            <p className="text-sm font-body font-medium text-accent tracking-[0.03em] mt-1.5">Design System Hub</p>
            
          </>
        )}
      </div>

      <SidebarContent className="px-3 py-4">

        <MapsAccordionNav />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4 pt-4 border-t border-border/60">
            Foundations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(tokenNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4 pt-4 border-t border-border/60">
            Interaction
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(behaviorNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4 pt-4 border-t border-border/60">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(systemNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[13px] uppercase tracking-[0.05em] text-foreground font-medium mb-2 mt-4 pt-4 border-t border-border/60">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(toolsNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
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
          <p className="text-[10px] font-mono text-sidebar-primary/50 mt-2">⌘K to search</p>
        </div>
      )}
      
    </Sidebar>
  );
}
