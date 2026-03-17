import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandSearch } from "@/components/CommandSearch";
import { OnboardingTour } from "@/components/OnboardingTour";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-6 bg-card shrink-0">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1" />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
        <CommandSearch />
        <OnboardingTour />
      </div>
    </SidebarProvider>
  );
}
