import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { WorkspaceProvider } from "@/hooks/useWorkspace";
import { AppShell } from "@/components/AppShell";
import Dashboard from "./pages/Dashboard";
import TokensColors from "./pages/tokens/TokensColors";
import TokensTypography from "./pages/tokens/TokensTypography";
import TokensSpacing from "./pages/tokens/TokensSpacing";
import TokensLayout from "./pages/tokens/TokensLayout";
import TokensMotion from "./pages/tokens/TokensMotion";
import TokensIcons from "./pages/tokens/TokensIcons";
import TokensVoice from "./pages/tokens/TokensVoice";
import ComponentsPage from "./pages/Components";
import ComponentDetailPage from "./pages/ComponentDetail";
import GuidelinesPage from "./pages/Guidelines";
import GuardrailsPage from "./pages/Guardrails";
import ExportPage from "./pages/Export";
import SettingsPage from "./pages/Settings";
import SourcesPage from "./pages/Sources";
import LibraryPage from "./pages/Library";
import ChangelogPage from "./pages/Changelog";
import CopilotPage from "./pages/Copilot";
import ChannelKitsPage from "./pages/ChannelKits";
import StudioPage from "./pages/Studio";
import HelpPage from "./pages/Help";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <WorkspaceProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tokens/colors" element={<TokensColors />} />
          <Route path="/tokens/typography" element={<TokensTypography />} />
          <Route path="/tokens/spacing" element={<TokensSpacing />} />
          <Route path="/tokens/layout" element={<TokensLayout />} />
          <Route path="/tokens/motion" element={<TokensMotion />} />
          <Route path="/tokens/icons" element={<TokensIcons />} />
          <Route path="/tokens/voice" element={<TokensVoice />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/:id" element={<ComponentDetailPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/guardrails" element={<GuardrailsPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/channel-kits" element={<Navigate to="/studio" replace />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </WorkspaceProvider>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;
  return <AuthPage />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthGate />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
