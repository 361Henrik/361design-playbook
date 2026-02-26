import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AppRole = "admin" | "editor" | "viewer";

interface AuthContext {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  hasRole: (role: AppRole) => boolean;
  isAdmin: boolean;
  isEditor: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  session: null,
  loading: true,
  roles: [],
  hasRole: () => false,
  isAdmin: false,
  isEditor: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Fetch roles with setTimeout to avoid deadlock
          setTimeout(async () => {
            const { data } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id);
            setRoles((data || []).map((r: any) => r.role as AppRole));
            setLoading(false);
          }, 0);
        } else {
          setRoles([]);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasRole = (role: AppRole) => roles.includes(role);
  const isAdmin = hasRole("admin");
  const isEditor = isAdmin || hasRole("editor");

  const signOut = async () => {
    await supabase.auth.signOut();
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, roles, hasRole, isAdmin, isEditor, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
