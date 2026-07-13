/**
 * Auth helpers shared by all edge functions.
 *
 * Every function must authenticate the caller and verify workspace
 * membership / resource ownership before touching data with the
 * service-role client (which bypasses RLS).
 */
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface AuthResult {
  userId: string | null;
  errorResponse: Response | null;
}

function unauthorized(corsHeaders: Record<string, string>, message = "Unauthorized"): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function forbidden(corsHeaders: Record<string, string>, message = "Forbidden"): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 403,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Validate the caller's JWT. Returns the user id, or an error Response to return as-is. */
export async function requireUser(
  req: Request,
  corsHeaders: Record<string, string>,
): Promise<AuthResult> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { userId: null, errorResponse: unauthorized(corsHeaders) };
  }

  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await userClient.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    return { userId: null, errorResponse: unauthorized(corsHeaders) };
  }
  return { userId: data.claims.sub as string, errorResponse: null };
}

/** Verify the user belongs to the workspace. Returns null on success, or an error Response. */
export async function requireWorkspaceMember(
  adminClient: SupabaseClient,
  userId: string,
  workspaceId: string,
  corsHeaders: Record<string, string>,
): Promise<Response | null> {
  const { data, error } = await adminClient
    .from("workspace_members")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) {
    return forbidden(corsHeaders, "Not a member of this workspace");
  }
  return null;
}

/** Verify the chat session belongs to the user (and workspace, when given). */
export async function requireSessionOwner(
  adminClient: SupabaseClient,
  userId: string,
  sessionId: string,
  corsHeaders: Record<string, string>,
  workspaceId?: string,
): Promise<Response | null> {
  const { data, error } = await adminClient
    .from("chat_sessions")
    .select("id, user_id, workspace_id")
    .eq("id", sessionId)
    .maybeSingle();
  if (error || !data || data.user_id !== userId) {
    return forbidden(corsHeaders, "Session not found or not owned by caller");
  }
  if (workspaceId && data.workspace_id !== workspaceId) {
    return forbidden(corsHeaders, "Session does not belong to this workspace");
  }
  return null;
}

/** Escape characters that would alter a PostgREST .or()/.ilike filter expression. */
export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[,()\\%_]/g, " ").trim();
}
