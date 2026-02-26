import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import Dashboard from "./pages/Dashboard";
import TokensColors from "./pages/tokens/TokensColors";
import TokensTypography from "./pages/tokens/TokensTypography";
import TokensSpacing from "./pages/tokens/TokensSpacing";
import TokensLayout from "./pages/tokens/TokensLayout";
import TokensMotion from "./pages/tokens/TokensMotion";
import TokensIcons from "./pages/tokens/TokensIcons";
import ComponentsPage from "./pages/Components";
import GuidelinesPage from "./pages/Guidelines";
import GuardrailsPage from "./pages/Guardrails";
import ExportPage from "./pages/Export";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tokens/colors" element={<TokensColors />} />
            <Route path="/tokens/typography" element={<TokensTypography />} />
            <Route path="/tokens/spacing" element={<TokensSpacing />} />
            <Route path="/tokens/layout" element={<TokensLayout />} />
            <Route path="/tokens/motion" element={<TokensMotion />} />
            <Route path="/tokens/icons" element={<TokensIcons />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/guardrails" element={<GuardrailsPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
