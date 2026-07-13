import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireUser, requireWorkspaceMember, sanitizeSearchTerm } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query, filters, workspace_id } = await req.json();
    if (!query || !workspace_id) {
      return new Response(JSON.stringify({ error: "query and workspace_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Authenticate: caller must be a signed-in member of the workspace.
    const { userId, errorResponse } = await requireUser(req, corsHeaders);
    if (errorResponse) return errorResponse;

    const membershipError = await requireWorkspaceMember(supabase, userId!, workspace_id, corsHeaders);
    if (membershipError) return membershipError;

    // Generate embedding for the query using AI
    // For now, do a text-based search since embedding generation needs a separate model
    // We'll do a smart keyword + AI-ranked search
    const safeQuery = sanitizeSearchTerm(String(query));
    let dbQuery = supabase
      .from("library_entries")
      .select("*")
      .eq("status", "approved")
      .eq("workspace_id", workspace_id)
      .or(`title.ilike.%${safeQuery}%,summary.ilike.%${safeQuery}%,content.ilike.%${safeQuery}%`);

    if (filters?.entry_type) {
      dbQuery = dbQuery.eq("entry_type", filters.entry_type);
    }
    if (filters?.tags && filters.tags.length > 0) {
      dbQuery = dbQuery.overlaps("tags", filters.tags);
    }

    const { data: results, error } = await dbQuery.limit(20);
    if (error) throw error;

    // Use AI to rank and summarize results
    if (results && results.length > 0) {
      const rankingResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: "You are a design system search assistant. Given a query and results, provide a brief answer synthesizing the most relevant information.",
            },
            {
              role: "user",
              content: `Query: "${query}"\n\nResults:\n${results.map((r: any) => `- ${r.title}: ${r.summary}`).join("\n")}\n\nProvide a concise answer to the query based on these results.`,
            },
          ],
        }),
      });

      let aiSummary = "";
      if (rankingResponse.ok) {
        const rankData = await rankingResponse.json();
        aiSummary = rankData.choices?.[0]?.message?.content || "";
      }

      return new Response(
        JSON.stringify({ results, ai_summary: aiSummary }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ results: results || [], ai_summary: "" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("search-library error:", e);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
