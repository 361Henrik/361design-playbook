import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Workspace = {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
};

type WorkspaceContextType = {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  setActiveWorkspaceId: (id: string) => void;
  loading: boolean;
  refreshWorkspaces: () => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaces: [],
  activeWorkspace: null,
  setActiveWorkspaceId: () => {},
  loading: true,
  refreshWorkspaces: async () => {},
});

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("workspaces")
      .select("*")
      .order("created_at");
    const list = (data as Workspace[]) || [];
    setWorkspaces(list);

    // Restore saved or pick first
    const saved = localStorage.getItem("active_workspace_id");
    const match = list.find((w) => w.id === saved);
    setActiveId(match ? match.id : list[0]?.id || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [user]);

  const setActiveWorkspaceId = (id: string) => {
    setActiveId(id);
    localStorage.setItem("active_workspace_id", id);
  };

  const activeWorkspace = workspaces.find((w) => w.id === activeId) || null;

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, activeWorkspace, setActiveWorkspaceId, loading, refreshWorkspaces: fetchWorkspaces }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
