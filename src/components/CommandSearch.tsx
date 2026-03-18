import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Palette, Type, Ruler, LayoutGrid, Zap, Hexagon,
  Component, BookOpen, ShieldCheck, Download, Upload,
  Library, History, Settings, LayoutDashboard, FileText, Sparkles, PanelTop, HelpCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const pages = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Colors", href: "/tokens/colors", icon: Palette },
  { title: "Typography", href: "/tokens/typography", icon: Type },
  { title: "Spacing", href: "/tokens/spacing", icon: Ruler },
  { title: "Layout", href: "/tokens/layout", icon: LayoutGrid },
  { title: "Motion", href: "/tokens/motion", icon: Zap },
  { title: "Icons", href: "/tokens/icons", icon: Hexagon },
  { title: "Voice", href: "/tokens/voice", icon: FileText },
  { title: "Components", href: "/components", icon: Component },
  { title: "Guidelines", href: "/guidelines", icon: BookOpen },
  { title: "Guardrails", href: "/guardrails", icon: ShieldCheck },
  { title: "Export", href: "/export", icon: Download },
  { title: "Studio", href: "/studio", icon: PanelTop },
  { title: "Sources", href: "/sources", icon: Upload },
  { title: "Library", href: "/library", icon: Library },
  { title: "Changelog", href: "/changelog", icon: History },
  { title: "Copilot", href: "/copilot", icon: Sparkles },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help", href: "/help", icon: HelpCircle },
];

type LibraryResult = { id: string; title: string; entry_type: string };

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [libraryResults, setLibraryResults] = useState<LibraryResult[]>([]);
  const navigate = useNavigate();

  // Global keyboard listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Debounced library search
  useEffect(() => {
    if (query.length < 2) {
      setLibraryResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("library_entries")
        .select("id, title, entry_type")
        .ilike("title", `%${query}%`)
        .limit(8);
      setLibraryResults((data as LibraryResult[]) || []);
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      navigate(href);
    },
    [navigate]
  );

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search pages, foundations, library entries…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {filteredPages.length > 0 && (
          <CommandGroup heading="Pages">
            {filteredPages.map((p) => (
              <CommandItem key={p.href} onSelect={() => go(p.href)}>
                <p.icon className="mr-2 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>{p.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {libraryResults.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Library Entries">
              {libraryResults.map((entry) => (
                <CommandItem
                  key={entry.id}
                  onSelect={() => go("/library")}
                >
                  <FileText className="mr-2 h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>{entry.title}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                    {entry.entry_type}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
