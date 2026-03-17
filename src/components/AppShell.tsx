import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandSearch } from "@/components/CommandSearch";
import { OnboardingTour } from "@/components/OnboardingTour";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SIDEBAR_STORAGE_KEY = "sidebar-panel-size";
const DEFAULT_SIZE = 15;
const MIN_SIZE = 12;
const MAX_SIZE = 25;

function getStoredSize(): number {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored) {
      const val = parseFloat(stored);
      if (val >= MIN_SIZE && val <= MAX_SIZE) return val;
    }
  } catch {}
  return DEFAULT_SIZE;
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const isMobile = useIsMobile();

  const handleResize = useCallback((size: number) => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(size));
    } catch {}
  }, []);

  const mainContent = (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      <header className="h-14 flex items-center border-b border-border px-6 bg-card shrink-0">
        <SidebarTrigger className={isMobile ? "mr-4" : "mr-4 hidden"} />
        <div className="flex-1" />
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );

  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          {mainContent}
        </div>
        <CommandSearch />
        <OnboardingTour />
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
        <ResizablePanel
          defaultSize={getStoredSize()}
          minSize={MIN_SIZE}
          maxSize={MAX_SIZE}
          onResize={handleResize}
        >
          <AppSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-px bg-border hover:bg-primary/20 active:bg-primary/30 transition-colors" />
        <ResizablePanel defaultSize={100 - getStoredSize()} minSize={60}>
          {mainContent}
        </ResizablePanel>
      </ResizablePanelGroup>
      <CommandSearch />
      <OnboardingTour />
    </SidebarProvider>
  );
}
