import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Condensed component registry for the system prompt
const COMPONENT_INDEX = [
  { name: "Primary Button", category: "buttons", dos: ["Single most important action per page", "1-3 word labels"], donts: ["No more than one per section", "No scale/bounce hover"] },
  { name: "Secondary Button", category: "buttons", dos: ["Pair with primary CTA"], donts: ["Not for destructive actions"] },
  { name: "Text Link Button", category: "buttons", dos: ["Inline navigation"], donts: ["Never as primary CTA"] },
  { name: "Destructive Button", category: "buttons", dos: ["Delete/remove only", "Always with confirmation"], donts: ["Not for cancel/dismiss"] },
  { name: "Primary Context Card", category: "cards", dos: ["Warm Off-White bg", "One idea per card"], donts: ["No nested cards", "No colored backgrounds"] },
  { name: "Anchor Context Panel", category: "cards", dos: ["Deep Green bg", "One per major section"], donts: ["Never stack two back-to-back"] },
  { name: "Panel Pairing", category: "cards", dos: ["Hero sections", "50/50 or 60/40 split"], donts: ["Max one per page section", "No third panel"] },
  { name: "Text Input", category: "forms", dos: ["Always with visible Label"], donts: ["No placeholder-only labels"] },
  { name: "Textarea", category: "forms", dos: ["Multi-line freeform text"], donts: ["Not for single-line"] },
  { name: "Select", category: "forms", dos: ["3-10 options"], donts: ["Not for 2 options (use radio)"] },
  { name: "Checkbox / Switch", category: "forms", dos: ["Binary toggles"], donts: ["Don't mix in same form"] },
  { name: "Data Table", category: "data-display", dos: ["Structured tabular data"], donts: ["No nested tables"] },
  { name: "Badge", category: "data-display", dos: ["Status indicators"], donts: ["No long text"] },
  { name: "Tabs", category: "navigation", dos: ["2-5 tabs max"], donts: ["No nested tabs"] },
];

// Guardrail rules for the system prompt
const GUARDRAIL_RULES = [
  { id: "color-bronze-ratio", name: "Bronze accent ≤ 8%", description: "Antique Bronze must remain an accent — never exceeding 8% of total visible area." },
  { id: "color-no-gradients", name: "No gradients", description: "Gradients are prohibited. Use flat, solid color fills only." },
  { id: "color-approved-palette", name: "Approved palette only", description: "Only approved colors: Base Canvas (#F6F3EE), Warm Stone (#E8E2D9), Deep Charcoal (#1A1F1A), Deep Green (#1F4A3A), Terracotta (#C35C3C), Champagne Bronze (#C9A962)." },
  { id: "color-neutral-dominant", name: "Neutral base dominant", description: "Neutral surfaces (canvas, stone) dominant. Deep green for structure only. Terracotta for interaction and emphasis surfaces only — never text, labels, icons, map elements, or borders. Bronze for highlights only. No blue tones." },
  { id: "color-terracotta-usage", name: "Terracotta interaction only", description: "Terracotta restricted to buttons, CTAs, active/selected states, highlight panels, callout sections. Prohibited for typography, map elements, icons, borders, dividers." },
  { id: "color-contrast", name: "WCAG AA contrast", description: "All text/background pairs must meet WCAG AA (4.5:1 body, 3:1 large)." },
  { id: "type-no-weight-300", name: "No weight 300", description: "Font weight 300 is never permitted." },
  { id: "type-headlines-playfair", name: "Headlines use Playfair Display", description: "All headlines (h1–h6) must use Playfair Display." },
  { id: "type-body-inter", name: "Body text uses Inter", description: "All body text, labels, UI copy must use Inter." },
  { id: "type-headline-tracking", name: "Headline letter-spacing −0.01em", description: "Headlines should use tracking-headline." },
  { id: "type-body-line-height", name: "Body line-height 1.6–1.75", description: "Body text line-height should be 1.6–1.75." },
  { id: "layout-max-52ch", name: "Max paragraph width 52ch", description: "Paragraph text capped at 48–52 characters." },
  { id: "layout-no-full-width-text", name: "No full-width text blocks", description: "Text must never span the full viewport width." },
  { id: "layout-top-padding", name: "Section top padding 120–160px", description: "Major sections need 120–160px top padding." },
  { id: "layout-no-nested-cards", name: "No nested cards", description: "Cards must never be nested inside other cards." },
  { id: "motion-no-bounce", name: "No bouncing animations", description: "Bouncing/spring physics prohibited." },
  { id: "motion-no-parallax", name: "No parallax scrolling", description: "Parallax effects not permitted." },
  { id: "motion-no-scale-hover", name: "No scale on hover", description: "No hover:scale transforms. Use opacity/color shifts." },
  { id: "motion-ui-duration", name: "UI transitions 300–400ms", description: "Standard transitions 300–400ms ease-out." },
  { id: "motion-hero-loop", name: "Hero loops 8–20s", description: "Ambient hero animations loop at 8–20s." },
  { id: "imagery-no-corporate-stock", name: "No corporate stock imagery", description: "Generic corporate stock photos prohibited." },
  { id: "consistency-type-hierarchy", name: "Consistent type hierarchy", description: "h1 → h2 → h3, no skipping levels." },
  { id: "consistency-spacing-scale", name: "Use spacing scale only", description: "All spacing from defined scale, no arbitrary pixels." },
  { id: "consistency-icon-style", name: "Icons: thin stroke, no fills", description: "Stroke width 1.5–2px, geometric, no fills/gradients." },
];

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

  return `You are the Design Copilot for the "Curated Lens" design system. You answer design questions EXCLUSIVELY using the workspace's own tokens, components, guidelines, and library entries provided below. You MUST cite sources in every answer.

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
- Base Canvas: HSL 37 31% 95% (#F6F3EE) — primary background. Neutral foundation, always dominant.
- Warm Stone: HSL 33 16% 89% (#E8E2D9) — secondary surfaces (cards, panels).
- Deep Charcoal: HSL 120 9% 11% (#1A1F1A) — text only. No pure black.
- Muted: HSL 45 8% 40% (#6E6A5E) — secondary text, captions, de-emphasized labels.
- Deep Green: HSL 158 41% 21% (#1F4A3A) — structure / identity (section backgrounds, emphasis panels). Not for buttons.
- Terracotta: HSL 14 53% 50% (#C35C3C) — interaction accent (buttons, CTAs, active states).
- Champagne Bronze: HSL 40 46% 53% (#C9A962) — highlight accent (≤ subtle). Jewelry, never paint. Not for buttons or backgrounds.

### Typography
- Display/Headlines: Playfair Display (font-display)
- Body/UI: Inter (font-body)
- Monospace: JetBrains Mono (font-mono)

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

    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
    const searchTerms = message.split(/\s+/).filter((t: string) => t.length > 2).slice(0, 5);
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
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
