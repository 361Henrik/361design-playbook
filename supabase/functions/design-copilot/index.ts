import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BRAND_NAME, COMPONENT_INDEX, GUARDRAIL_RULES, PALETTE_BLOCK, TYPOGRAPHY_BLOCK } from "../_shared/brand.ts";
import { requireUser, requireWorkspaceMember, requireSessionOwner, sanitizeSearchTerm } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildSystemPrompt(contextEntries: any[]) {
  const canonicalEntries = contextEntries.filter((e) => e.is_canonical);
  const otherEntries = contextEntries.filter((e) => !e.is_canonical);

  let contextBlock = "";

  if (canonicalEntries.length > 0) {
    contextBlock += "\n\n## CANONICAL SOURCES OF TRUTH (highest authority)\n";
    canonicalEntries.forEach((e, i) => {
      contextBlock += `\n[CANONICAL-${i + 1}] "${e.title}" (${e.entry_type})\n`;
      if (e.summary) contextBlock += `Summary: ${e.summary}\n`;
      if (e.content) contextBlock += `Content: ${e.content.slice(0, 1500)}\n`;
      if (e.tags?.length) contextBlock += `Tags: ${e.tags.join(", ")}\n`;
      if (e.rules?.length) contextBlock += `Rules: ${e.rules.join(", ")}\n`;
    });
  }

  if (otherEntries.length > 0) {
    contextBlock += "\n\n## LIBRARY ENTRIES\n";
    otherEntries.forEach((e, i) => {
      contextBlock += `\n[ENTRY-${i + 1}] "${e.title}" (${e.entry_type}, status: ${e.status})\n`;
      if (e.summary) contextBlock += `Summary: ${e.summary}\n`;
      if (e.content) contextBlock += `Content: ${e.content.slice(0, 1000)}\n`;
      if (e.tags?.length) contextBlock += `Tags: ${e.tags.join(", ")}\n`;
    });
  }

  return `You are the Design Copilot for the "${BRAND_NAME}" design system. You answer design questions EXCLUSIVELY using the workspace's own tokens, components, guidelines, and library entries provided below. You MUST cite sources in every answer.

## STRICT RULES
1. You may ONLY recommend tokens, colors, components, patterns, and guidelines that exist in the provided context. If the answer is not in the context, say "I don't have information about this in the current design system."
2. NEVER invent new color values, font names, spacing values, or component names. Only reference what exists.
3. If the user asks about something not covered, respond with a clearly labeled [OUTSIDE SYSTEM] prefix and suggest creating a new library entry or uploading a source document.
4. Every factual claim must include a citation marker [N] referencing a specific library entry, component, or guardrail rule from the context.
5. You must NEVER reference data from other workspaces or external design systems.
6. You are read-only — you cannot modify library entries, approve drafts, or change settings.

## ANSWER FORMAT
Always structure your response with these sections:

**Recommendation**
[Direct answer using only system-known tokens/components, with inline [N] citations]

**Rules Applied**
- [Rule name]: [How it applies]

**References**
[1] Type: "Title" (source)
[2] Type: "Title" (source)

**Risks**
- [Any caveats or unknowns]

**Code Snippet** (only if the user asks for implementation)

## DESIGN SYSTEM CONTEXT

### Approved Color Palette
${PALETTE_BLOCK}

### Typography
${TYPOGRAPHY_BLOCK}

### Component Registry
${COMPONENT_INDEX.map((c, i) => `[COMPONENT-${i + 1}] ${c.name} (${c.category})\n  Dos: ${c.dos.join("; ")}\n  Don'ts: ${c.donts.join("; ")}`).join("\n")}

### Guardrail Rules
${GUARDRAIL_RULES.map((r) => `- ${r.name} [${r.id}]: ${r.description}`).join("\n")}

${contextBlock}

Remember: Cite every claim. Use [N] markers that map to References. Never invent tokens.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, message, workspace_id } = await req.json();

    if (!message || !workspace_id) {
      return new Response(JSON.stringify({ error: "message and workspace_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate auth: caller must be a signed-in member of the workspace,
    // and may only continue their own chat sessions.
    const { userId, errorResponse } = await requireUser(req, corsHeaders);
    if (errorResponse) return errorResponse;

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const membershipError = await requireWorkspaceMember(adminClient, userId!, workspace_id, corsHeaders);
    if (membershipError) return membershipError;

    if (session_id) {
      const sessionError = await requireSessionOwner(adminClient, userId!, session_id, corsHeaders, workspace_id);
      if (sessionError) return sessionError;
    }

    // Create or reuse session
    let currentSessionId = session_id;
    if (!currentSessionId) {
      const { data: newSession, error: sessionErr } = await adminClient
        .from("chat_sessions")
        .insert({ workspace_id, user_id: userId, title: message.slice(0, 60) })
        .select("id")
        .single();
      if (sessionErr) throw sessionErr;
      currentSessionId = newSession.id;
    }

    // Persist user message
    await adminClient.from("chat_messages").insert({
      session_id: currentSessionId,
      role: "user",
      content: message,
    });

    // Load conversation history
    const { data: history } = await adminClient
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", currentSessionId)
      .order("created_at", { ascending: true })
      .limit(30);

    // Keyword retrieval from library_entries scoped to workspace
    const searchTerms = message
      .split(/\s+/)
      .map((t: string) => sanitizeSearchTerm(t))
      .filter((t: string) => t.length > 2)
      .slice(0, 5);
    const searchQuery = searchTerms.map((t: string) => `%${t}%`);

    let contextEntries: any[] = [];
    for (const term of searchQuery) {
      const { data } = await adminClient
        .from("library_entries")
        .select("id, title, entry_type, summary, content, tags, rules, status, is_canonical")
        .eq("workspace_id", workspace_id)
        .or(`title.ilike.${term},summary.ilike.${term},content.ilike.${term}`)
        .limit(5);
      if (data) contextEntries.push(...data);
    }

    // Also fetch all canonical entries for this workspace
    const { data: canonicals } = await adminClient
      .from("library_entries")
      .select("id, title, entry_type, summary, content, tags, rules, status, is_canonical")
      .eq("workspace_id", workspace_id)
      .eq("is_canonical", true)
      .limit(10);
    if (canonicals) contextEntries.push(...canonicals);

    // Deduplicate by id
    const seen = new Set<string>();
    contextEntries = contextEntries.filter((e) => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });

    // Sort: canonical first, then by relevance
    contextEntries.sort((a, b) => (b.is_canonical ? 1 : 0) - (a.is_canonical ? 1 : 0));
    contextEntries = contextEntries.slice(0, 15);

    // Build messages for AI
    const systemPrompt = buildSystemPrompt(contextEntries);
    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((m: any) => ({ role: m.role, content: m.content })),
    ];

    // Call Lovable AI with streaming
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // We need to collect the full response to persist it, while also streaming
    const reader = aiResponse.body!.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullContent = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // First, send session_id as a special SSE event
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ session_id: currentSessionId })}\n\n`));

          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            let newlineIndex: number;
            while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, newlineIndex);
              buffer = buffer.slice(newlineIndex + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullContent += content;
                }
              } catch { /* partial JSON */ }
              // Forward the raw SSE line
              controller.enqueue(encoder.encode(line + "\n\n"));
            }
          }

          // Persist assistant message
          if (fullContent) {
            await adminClient.from("chat_messages").insert({
              session_id: currentSessionId,
              role: "assistant",
              content: fullContent,
            });
          }

          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("design-copilot error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
