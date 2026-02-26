import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Gather stats
    const [entriesRes, sourcesRes, versionsRes] = await Promise.all([
      supabase.from("library_entries").select("id, status, created_at").gte("created_at", sevenDaysAgo),
      supabase.from("sources").select("id, status, created_at").gte("created_at", sevenDaysAgo),
      supabase.from("versions").select("id").gte("created_at", sevenDaysAgo),
    ]);

    const entries = entriesRes.data || [];
    const sources = sourcesRes.data || [];
    const versions = versionsRes.data || [];

    const digest = {
      period: "Last 7 days",
      newEntries: entries.length,
      drafts: entries.filter((e) => e.status === "draft").length,
      conflicts: entries.filter((e) => e.status === "conflict").length,
      sourcesUploaded: sources.length,
      sourcesProcessed: sources.filter((s) => s.status === "processed").length,
      sourcesFailed: sources.filter((s) => s.status === "failed").length,
      versionChanges: versions.length,
    };

    // For now, return the digest as JSON. Email sending requires a configured email service.
    return new Response(JSON.stringify({ ok: true, digest }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
