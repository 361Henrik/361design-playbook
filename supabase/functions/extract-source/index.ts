import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { source_id } = await req.json();
    if (!source_id) throw new Error("source_id is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: source, error: sourceError } = await supabase
      .from("sources")
      .select("*")
      .eq("id", source_id)
      .single();

    if (sourceError || !source) throw new Error("Source not found");

    // Update status to processing, increment retry count
    await supabase.from("sources").update({
      status: "processing",
      error_message: null,
      retry_count: (source.retry_count || 0) + 1,
    }).eq("id", source_id);

    // Download file content
    let fileContent = "";
    if (source.file_url) {
      try {
        const { data: fileData } = await supabase.storage.from("sources").download(source.file_url);
        if (fileData) fileContent = await fileData.text();
      } catch {
        fileContent = `[File: ${source.title}, Type: ${source.file_type}]`;
      }
    }

    // Extraction prompt
    const extractionPrompt = `You are a design system expert. Analyze the following document and extract structured design entries.

Document title: "${source.title}"
Document type: ${source.file_type}
Content:
${fileContent.slice(0, 8000)}

Extract design system entries from this document. For each entry provide:
- title: A clear, concise name
- entry_type: One of "token", "guideline", "component", "pattern", "example"
- tags: Relevant tags as an array
- summary: A one-sentence summary
- content: The full extracted content/description
- rules: Specific rules or constraints as an array of strings

Return entries that cover colors, typography, spacing, layout, motion, imagery, and any other design decisions found.`;

    // Call AI with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let aiResponse: Response;
    try {
      aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: "You are a design system extraction expert. Always respond with valid JSON." },
            { role: "user", content: extractionPrompt },
          ],
          tools: [{
            type: "function",
            function: {
              name: "extract_entries",
              description: "Extract design system entries from a document",
              parameters: {
                type: "object",
                properties: {
                  entries: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        entry_type: { type: "string", enum: ["token", "guideline", "component", "pattern", "example"] },
                        tags: { type: "array", items: { type: "string" } },
                        summary: { type: "string" },
                        content: { type: "string" },
                        rules: { type: "array", items: { type: "string" } },
                      },
                      required: ["title", "entry_type", "tags", "summary", "content", "rules"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["entries"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "extract_entries" } },
        }),
      });
    } catch (e: any) {
      if (e.name === "AbortError") {
        await supabase.from("sources").update({ status: "failed", error_message: "Extraction timed out after 30 seconds." }).eq("id", source_id);
        return new Response(JSON.stringify({ error: "Timeout" }), { status: 408, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw e;
    } finally {
      clearTimeout(timeout);
    }

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errorMsg = status === 429 ? "Rate limit exceeded. Please try again later."
        : status === 402 ? "Payment required. Please add credits."
        : `AI gateway error: ${status}`;
      await supabase.from("sources").update({ status: "failed", error_message: errorMsg }).eq("id", source_id);
      return new Response(JSON.stringify({ error: errorMsg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    let entries: any[] = [];
    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        entries = parsed.entries || [];
      } catch {
        await supabase.from("sources").update({ status: "failed", error_message: "Failed to parse AI response." }).eq("id", source_id);
        return new Response(JSON.stringify({ error: "Parse error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Insert entries
    const insertData = entries.map((entry: any) => ({
      title: entry.title,
      entry_type: entry.entry_type,
      tags: entry.tags,
      summary: entry.summary,
      content: entry.content,
      rules: entry.rules,
      source_id,
      status: "draft",
    }));

    if (insertData.length > 0) {
      const { error: insertError } = await supabase.from("library_entries").insert(insertData);
      if (insertError) {
        console.error("Insert error:", insertError);
        await supabase.from("sources").update({ status: "partial", error_message: "Some entries failed to save." }).eq("id", source_id);
        return new Response(
          JSON.stringify({ success: true, entries_count: 0, error: "Partial failure" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    await supabase.from("sources").update({ status: "completed", error_message: null }).eq("id", source_id);

    return new Response(
      JSON.stringify({ success: true, entries_count: insertData.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("extract-source error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
