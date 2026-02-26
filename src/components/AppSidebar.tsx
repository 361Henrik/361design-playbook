import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
];

const systemNav = [
  { title: "Components", url: "/components", icon: Component },
  { title: "Guidelines", url: "/guidelines", icon: BookOpen },
  { title: "Guardrails", url: "/guardrails", icon: ShieldCheck },
  { title: "Export", url: "/export", icon: Download },
  { title: "Sources", url: "/sources", icon: Upload },
  { title: "Library", url: "/library", icon: Library },
  { title: "Changelog", url: "/changelog", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const renderItems = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-ui"
            activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span className="font-body text-sm">{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar className="w-60 border-r-0" collapsible="icon">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <h1 className="font-display text-lg font-medium tracking-headline text-sidebar-foreground leading-section">
          Curated Lens
        </h1>
        <p className="text-xs font-body text-sidebar-foreground/50 mt-1">Design System Hub</p>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainNav)}</SidebarMenu>
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
            <button onClick={signOut} className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors" title="Sign out">
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
