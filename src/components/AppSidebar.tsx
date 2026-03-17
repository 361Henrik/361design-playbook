import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { NotificationCenter } from "@/components/NotificationCenter";
import { WelcomePanel } from "@/components/WelcomePanel";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
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
} from "lucide-react";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
];

const tokenNav = [
  { title: "Colors", url: "/tokens/colors", icon: Palette },
  { title: "Typography", url: "/tokens/typography", icon: Type },
  { title: "Spacing", url: "/tokens/spacing", icon: Ruler },
  { title: "Layout", url: "/tokens/layout", icon: LayoutGrid },
  { title: "Motion", url: "/tokens/motion", icon: Zap },
  { title: "Icons", url: "/tokens/icons", icon: Hexagon },
  { title: "Voice", url: "/tokens/voice", icon: MessageSquare },
];

const mapsNav = [
  { title: "Map Principles", url: "/maps/principles", icon: Map },
  { title: "Scenic Corridor", url: "/maps/corridor", icon: Map },
  { title: "Map Layers", url: "/maps/layers", icon: Map },
  { title: "Map Visual Style", url: "/maps/visual-style", icon: Map },
  { title: "Labels & Geography", url: "/maps/labels", icon: Map },
  { title: "Route & Position", url: "/maps/route-position", icon: Map },
  { title: "Map Interaction", url: "/maps/interaction", icon: Map },
  { title: "Filtering & Categories", url: "/maps/filtering", icon: Map },
  { title: "Guest Experience", url: "/maps/guest-experience", icon: Map },
  { title: "Map Examples", url: "/maps/examples", icon: Map },
];

const systemNav = [
  { title: "Components", url: "/components", icon: Component },
  { title: "Guidelines", url: "/guidelines", icon: BookOpen },
  { title: "Narrative Patterns", url: "/narrative-patterns", icon: Route },
  { title: "Guardrails", url: "/guardrails", icon: ShieldCheck },
  { title: "Export", url: "/export", icon: Download },
  { title: "Studio", url: "/studio", icon: PanelTop },
  { title: "Sources", url: "/sources", icon: Upload },
  { title: "Library", url: "/library", icon: Library },
  { title: "Changelog", url: "/changelog", icon: History },
  { title: "Copilot", url: "/copilot", icon: Sparkles },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();
  const [tourOpen, setTourOpen] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.onboarding_completed) setOnboardingCompleted(true);
      });
  }, [user]);

  const handleTourComplete = () => {
    setOnboardingCompleted(true);
    try { localStorage.setItem("welcome_panel_collapsed", "true"); } catch {}
  };

  const renderItems = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/"}
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-sidebar-accent transition-colors duration-ui"
            activeClassName="bg-sidebar-accent text-primary font-medium [&_.nav-icon]:text-primary [&_.nav-icon]:opacity-100"
          >
            <item.icon className="nav-icon h-4 w-4 shrink-0 text-primary/55 group-hover:text-primary/80 transition-colors duration-ui" strokeWidth={1.5} />
            <span className="font-body text-sm">{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar className="w-full border-r-0" collapsible="none">
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
            <p className="text-xs font-body text-sidebar-foreground/50 mt-1">Design System Hub</p>
          </>
        )}
      </div>

      <WelcomePanel onStartTour={() => setTourOpen(true)} onboardingCompleted={onboardingCompleted} />

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-body font-medium mb-1">
            Maps
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mapsNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-body font-medium mb-1">
            Tokens
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(tokenNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-body font-medium mb-1">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(systemNav)}</SidebarMenu>
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
          <p className="text-[10px] font-mono text-sidebar-foreground/30 mt-2">⌘K to search</p>
        </div>
      )}
      <OnboardingTour forceOpen={tourOpen} onClose={() => setTourOpen(false)} onTourComplete={handleTourComplete} />
    </Sidebar>
  );
}
