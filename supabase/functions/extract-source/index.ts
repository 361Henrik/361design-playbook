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
    const { source_id, continue_from } = await req.json();
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

    // Large source chunking
    const CHUNK_SIZE = 8000;
    const startOffset = continue_from || 0;
    const totalLength = fileContent.length;
    const chunk = fileContent.slice(startOffset, startOffset + CHUNK_SIZE);
    const hasMore = startOffset + CHUNK_SIZE < totalLength;

    // Update pages info
    const totalPages = Math.ceil(totalLength / CHUNK_SIZE) || 1;
    const currentPage = Math.floor(startOffset / CHUNK_SIZE) + 1;
    await supabase.from("sources").update({
      pages_processed: currentPage,
      total_pages: totalPages,
    }).eq("id", source_id);

    // Step 1: Relevance classification (only on first chunk)
    if (startOffset === 0) {
      const classifyResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: "You classify documents. Respond with JSON only." },
            { role: "user", content: `Is this a design system document (brand guidelines, style guide, design tokens, UI specs, etc.)? Rate confidence 0-1.\n\nTitle: "${source.title}"\nType: ${source.file_type}\nContent preview:\n${chunk.slice(0, 2000)}\n\nRespond with: {"is_design": true/false, "confidence": 0.0-1.0}` },
          ],
        }),
      });

      if (classifyResponse.ok) {
        const classifyData = await classifyResponse.json();
        const content = classifyData.choices?.[0]?.message?.content || "";
        try {
          const jsonMatch = content.match(/\{[^}]+\}/);
          if (jsonMatch) {
            const classification = JSON.parse(jsonMatch[0]);
            if (classification.confidence < 0.3 && !classification.is_design) {
              await supabase.from("sources").update({
                status: "not_relevant",
                error_message: `Low design relevance (confidence: ${(classification.confidence * 100).toFixed(0)}%). This doesn't appear to be a design document. You can force extraction if needed.`,
              }).eq("id", source_id);
              return new Response(
                JSON.stringify({ success: false, not_relevant: true, confidence: classification.confidence }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } }
              );
            }
          }
        } catch { /* classification parse failed, continue anyway */ }
      }
    }

    // Step 2: Extraction
    const extractionPrompt = `You are a design system expert. Analyze the following document and extract structured design entries.

Document title: "${source.title}"
Document type: ${source.file_type}
${startOffset > 0 ? `(Continuation from offset ${startOffset})` : ""}
Content:
${chunk}

Extract design system entries from this document. For each entry provide:
- title: A clear, concise name
- entry_type: One of "token", "guideline", "component", "pattern", "example"
- tags: Relevant tags as an array
- summary: A one-sentence summary
- content: The full extracted content/description
- rules: Specific rules or constraints as an array of strings
- confidence: A float 0-1 indicating how confident you are this is a real design system entry (1 = very confident, 0.5 = uncertain)

Return entries that cover colors, typography, spacing, layout, motion, imagery, and any other design decisions found.`;

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
                        confidence: { type: "number", description: "0-1 confidence score" },
                      },
                      required: ["title", "entry_type", "tags", "summary", "content", "rules", "confidence"],
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

    // Step 3: Conflict detection — check new entries against existing approved entries
    const { data: existingEntries } = await supabase
      .from("library_entries")
      .select("id, title, entry_type, tags")
      .eq("status", "approved");

    const conflicts: { newTitle: string; existingId: string; existingTitle: string }[] = [];

    const insertData = entries.map((entry: any) => {
      // Check for conflicts by title similarity
      let conflictWith: string[] = [];
      if (existingEntries) {
        const normalizedTitle = entry.title.toLowerCase().trim();
        for (const existing of existingEntries) {
          const existingNormalized = existing.title.toLowerCase().trim();
          // Exact or near match by title
          if (normalizedTitle === existingNormalized ||
              (normalizedTitle.length > 5 && existingNormalized.includes(normalizedTitle)) ||
              (existingNormalized.length > 5 && normalizedTitle.includes(existingNormalized))) {
            conflictWith.push(existing.id);
            conflicts.push({ newTitle: entry.title, existingId: existing.id, existingTitle: existing.title });
          }
          // Also check overlapping tags for same entry_type
          else if (entry.entry_type === existing.entry_type && entry.tags?.length > 0 && existing.tags?.length > 0) {
            const overlap = entry.tags.filter((t: string) => existing.tags!.includes(t));
            if (overlap.length >= 2) {
              conflictWith.push(existing.id);
              conflicts.push({ newTitle: entry.title, existingId: existing.id, existingTitle: existing.title });
            }
          }
        }
      }

      return {
        title: entry.title,
        entry_type: entry.entry_type,
        tags: entry.tags,
        summary: entry.summary,
        content: entry.content,
        rules: entry.rules,
        confidence: typeof entry.confidence === "number" ? entry.confidence : null,
        source_id,
        status: conflictWith.length > 0 ? "conflict" : "draft",
        related_entry_ids: conflictWith.length > 0 ? conflictWith : [],
      };
    });

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

    // Set final status
    const finalStatus = hasMore ? "partial" : "completed";
    const conflictMsg = conflicts.length > 0
      ? `${conflicts.length} potential conflict(s) detected with existing entries.`
      : null;

    await supabase.from("sources").update({
      status: finalStatus,
      error_message: conflictMsg,
      pages_processed: currentPage,
    }).eq("id", source_id);

    return new Response(
      JSON.stringify({
        success: true,
        entries_count: insertData.length,
        conflicts_count: conflicts.length,
        has_more: hasMore,
        next_offset: hasMore ? startOffset + CHUNK_SIZE : null,
      }),
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
