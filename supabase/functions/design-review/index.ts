import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Duplicated from design-copilot (edge functions can't share imports)
const COMPONENT_INDEX = [
  { name: "Primary Button", category: "buttons", dos: ["Single most important action per page", "1-3 word labels"], donts: ["No more than one per section", "No scale/bounce hover"] },
  { name: "Secondary Button", category: "buttons", dos: ["Pair with primary CTA"], donts: ["Not for destructive actions"] },
  { name: "Text Link Button", category: "buttons", dos: ["Inline navigation"], donts: ["Never as primary CTA"] },
  { name: "Destructive Button", category: "buttons", dos: ["Delete/remove only", "Always with confirmation"], donts: ["Not for cancel/dismiss"] },
  { name: "Primary Context Card", category: "cards", dos: ["Warm Off-White bg", "One idea per card"], donts: ["No nested cards", "No colored backgrounds"] },
  { name: "Anchor Context Panel", category: "cards", dos: ["Deep Forest Green bg", "One per major section"], donts: ["Never stack two back-to-back"] },
  { name: "Panel Pairing", category: "cards", dos: ["Hero sections", "50/50 or 60/40 split"], donts: ["Max one per page section", "No third panel"] },
  { name: "Text Input", category: "forms", dos: ["Always with visible Label"], donts: ["No placeholder-only labels"] },
  { name: "Textarea", category: "forms", dos: ["Multi-line freeform text"], donts: ["Not for single-line"] },
  { name: "Select", category: "forms", dos: ["3-10 options"], donts: ["Not for 2 options (use radio)"] },
  { name: "Checkbox / Switch", category: "forms", dos: ["Binary toggles"], donts: ["Don't mix in same form"] },
  { name: "Data Table", category: "data-display", dos: ["Structured tabular data"], donts: ["No nested tables"] },
  { name: "Badge", category: "data-display", dos: ["Status indicators"], donts: ["No long text"] },
  { name: "Tabs", category: "navigation", dos: ["2-5 tabs max"], donts: ["No nested tabs"] },
];

const GUARDRAIL_RULES = [
  { id: "color-bronze-ratio", name: "Bronze accent ≤ 8%", severity: "error", description: "Antique Bronze must remain an accent — never exceeding 8% of total visible area." },
  { id: "color-no-gradients", name: "No gradients", severity: "error", description: "Gradients are prohibited. Use flat, solid color fills only." },
  { id: "color-approved-palette", name: "Approved palette only", severity: "error", description: "Only five approved colors: Deep Forest Green, Warm White, Warm Off-White, Near Black, Antique Bronze." },
  { id: "color-60-30-8", name: "60/30/8 distribution", severity: "warning", description: "60% Warm White / 30% Forest Green / 8% Bronze." },
  { id: "color-contrast", name: "WCAG AA contrast", severity: "error", description: "All text/background pairs must meet WCAG AA (4.5:1 body, 3:1 large)." },
  { id: "type-no-weight-300", name: "No weight 300", severity: "error", description: "Font weight 300 is never permitted." },
  { id: "type-headlines-playfair", name: "Headlines use Playfair Display", severity: "error", description: "All headlines (h1–h6) must use Playfair Display." },
  { id: "type-body-inter", name: "Body text uses Inter", severity: "error", description: "All body text, labels, UI copy must use Inter." },
  { id: "type-headline-tracking", name: "Headline letter-spacing −0.01em", severity: "warning", description: "Headlines should use tracking-headline." },
  { id: "type-body-line-height", name: "Body line-height 1.6–1.75", severity: "warning", description: "Body text line-height should be 1.6–1.75." },
  { id: "layout-max-52ch", name: "Max paragraph width 52ch", severity: "warning", description: "Paragraph text capped at 48–52 characters." },
  { id: "layout-no-full-width-text", name: "No full-width text blocks", severity: "warning", description: "Text must never span the full viewport width." },
  { id: "layout-top-padding", name: "Section top padding 120–160px", severity: "warning", description: "Major sections need 120–160px top padding." },
  { id: "layout-no-nested-cards", name: "No nested cards", severity: "error", description: "Cards must never be nested inside other cards." },
  { id: "motion-no-bounce", name: "No bouncing animations", severity: "error", description: "Bouncing/spring physics prohibited." },
  { id: "motion-no-parallax", name: "No parallax scrolling", severity: "error", description: "Parallax effects not permitted." },
  { id: "motion-no-scale-hover", name: "No scale on hover", severity: "error", description: "No hover:scale transforms. Use opacity/color shifts." },
  { id: "motion-ui-duration", name: "UI transitions 300–400ms", severity: "warning", description: "Standard transitions 300–400ms ease-out." },
  { id: "motion-hero-loop", name: "Hero loops 8–20s", severity: "warning", description: "Ambient hero animations loop at 8–20s." },
  { id: "imagery-no-corporate-stock", name: "No corporate stock imagery", severity: "error", description: "Generic corporate stock photos prohibited." },
  { id: "consistency-type-hierarchy", name: "Consistent type hierarchy", severity: "warning", description: "h1 → h2 → h3, no skipping levels." },
  { id: "consistency-spacing-scale", name: "Use spacing scale only", severity: "warning", description: "All spacing from defined scale, no arbitrary pixels." },
  { id: "consistency-icon-style", name: "Icons: thin stroke, no fills", severity: "warning", description: "Stroke width 1.5–2px, geometric, no fills/gradients." },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { source_id, session_id, workspace_id } = await req.json();
    if (!source_id || !session_id || !workspace_id) {
      return new Response(JSON.stringify({ error: "source_id, session_id, and workspace_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Fetch extracted entries for this source
    const { data: extractedEntries, error: entriesErr } = await adminClient
      .from("library_entries")
      .select("id, title, entry_type, summary, content, tags, rules, confidence, status")
      .eq("source_id", source_id);

    if (entriesErr) throw entriesErr;

    if (!extractedEntries || extractedEntries.length === 0) {
      // No entries extracted - persist message and return
      const noEntriesMsg = "No design entries were extracted from this document. The file may not contain recognizable design system content.";
      await adminClient.from("chat_messages").insert({
        session_id,
        role: "assistant",
        content: noEntriesMsg,
      });
      return new Response(JSON.stringify({ success: true, message: noEntriesMsg }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Fetch canonical/approved entries for context
    const { data: canonicalEntries } = await adminClient
      .from("library_entries")
      .select("id, title, entry_type, summary, content, tags, rules, is_canonical")
      .eq("workspace_id", workspace_id)
      .eq("is_canonical", true)
      .limit(15);

    const { data: approvedEntries } = await adminClient
      .from("library_entries")
      .select("id, title, entry_type, summary, tags")
      .eq("workspace_id", workspace_id)
      .eq("status", "approved")
      .eq("is_canonical", false)
      .limit(15);

    // 3. Build prompt
    const extractedBlock = extractedEntries.map((e, i) => {
      let block = `[EXTRACTED-${i + 1}] "${e.title}" (${e.entry_type}, confidence: ${e.confidence ?? "N/A"})`;
      if (e.summary) block += `\n  Summary: ${e.summary}`;
      if (e.content) block += `\n  Content: ${e.content.slice(0, 800)}`;
      if (e.tags?.length) block += `\n  Tags: ${e.tags.join(", ")}`;
      if (e.rules?.length) block += `\n  Rules: ${e.rules.join("; ")}`;
      return block;
    }).join("\n\n");

    let canonicalBlock = "";
    if (canonicalEntries?.length) {
      canonicalBlock = "\n\n## CANONICAL TOKENS (source of truth)\n" +
        canonicalEntries.map((e, i) => {
          let b = `[CANONICAL-${i + 1}] "${e.title}" (${e.entry_type})`;
          if (e.summary) b += `\n  Summary: ${e.summary}`;
          if (e.content) b += `\n  Content: ${e.content?.slice(0, 500)}`;
          return b;
        }).join("\n\n");
    }

    let approvedBlock = "";
    if (approvedEntries?.length) {
      approvedBlock = "\n\n## APPROVED ENTRIES\n" +
        approvedEntries.map((e, i) => `[APPROVED-${i + 1}] "${e.title}" (${e.entry_type}) Tags: ${e.tags?.join(", ") || "none"}`).join("\n");
    }

    const systemPrompt = `You are a Design System Reviewer for "Curated Lens". You audit extracted design entries against the workspace's guardrail rules and produce a structured review.

## YOUR TASK
Analyze the EXTRACTED ENTRIES below and check each one against the GUARDRAIL RULES. Produce:
1. A list of violations (each mapped to a specific rule ID)
2. A concrete fix plan with token substitutions and component recommendations
3. Optional code snippets using approved components
4. Risk notes for items needing manual review

## GUARDRAIL RULES
${GUARDRAIL_RULES.map(r => `- [${r.id}] ${r.name} (${r.severity}): ${r.description}`).join("\n")}

## COMPONENT CATALOG
${COMPONENT_INDEX.map(c => `- ${c.name} (${c.category}): Dos: ${c.dos.join("; ")} | Don'ts: ${c.donts.join("; ")}`).join("\n")}

## APPROVED COLOR PALETTE
- Deep Forest Green: HSL 153 38% 17% (#1B3D2F) — primary
- Warm White: HSL 40 33% 97% (#FBFAF8) — background
- Warm Off-White: HSL 37 21% 95% (#F5F3EF) — card bg
- Near Black: HSL 240 29% 14% (#1A1A2E) — text
- Antique Bronze: HSL 36 42% 56% (#C49A5C) — accent only (≤8%)

## TYPOGRAPHY
- Display/Headlines: Playfair Display
- Body/UI: Inter
- Monospace: JetBrains Mono

${canonicalBlock}
${approvedBlock}

## EXTRACTED ENTRIES TO AUDIT
${extractedBlock}

## INSTRUCTIONS
- Flag entries with confidence < 0.5 as "uncertain — recommend manual verification"
- For each violation, specify the exact rule_id, the affected entry title, and severity
- Fix plan items must use concrete token values from the approved palette (not generic suggestions)
- Code snippets should use React/Tailwind with the component catalog above
- Be thorough but concise`;

    // 4. Call AI with tool calling for structured output
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Perform a complete guardrail audit on all extracted entries. Return structured violations, fix plan, code snippet if applicable, and risk notes." },
        ],
        tools: [{
          type: "function",
          function: {
            name: "design_review",
            description: "Return a structured design review with violations, fix plan, code, and risks",
            parameters: {
              type: "object",
              properties: {
                violations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      rule_id: { type: "string" },
                      rule_name: { type: "string" },
                      severity: { type: "string", enum: ["error", "warning"] },
                      description: { type: "string" },
                      affected_entries: { type: "array", items: { type: "string" } },
                    },
                    required: ["rule_id", "rule_name", "severity", "description", "affected_entries"],
                    additionalProperties: false,
                  },
                },
                fix_plan: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      action: { type: "string" },
                      target: { type: "string" },
                      from_value: { type: "string" },
                      to_value: { type: "string" },
                      component_recommendation: { type: "string" },
                    },
                    required: ["action", "target"],
                    additionalProperties: false,
                  },
                },
                code_snippet: { type: "string", description: "Optional React/Tailwind code using approved components" },
                risk_notes: { type: "array", items: { type: "string" } },
              },
              required: ["violations", "fix_plan", "risk_notes"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "design_review" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errMsg = status === 429 ? "Rate limit exceeded. Please try again later."
        : status === 402 ? "AI credits depleted. Please add credits in Settings."
        : `AI gateway error: ${status}`;
      
      await adminClient.from("chat_messages").insert({
        session_id,
        role: "assistant",
        content: `⚠️ Review failed: ${errMsg}`,
      });
      
      return new Response(JSON.stringify({ error: errMsg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    let violations: any[] = [];
    let fixPlan: any[] = [];
    let codeSnippet = "";
    let riskNotes: string[] = [];

    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        violations = parsed.violations || [];
        fixPlan = parsed.fix_plan || [];
        codeSnippet = parsed.code_snippet || "";
        riskNotes = parsed.risk_notes || [];
      } catch (e) {
        console.error("Failed to parse review response:", e);
      }
    }

    // 5. Format as markdown for chat message
    let markdown = `## 📋 Design Review: ${extractedEntries.length} entries audited\n\n`;

    // Violations
    if (violations.length > 0) {
      markdown += `### ⚠️ Violations Found (${violations.length})\n\n`;
      violations.forEach((v) => {
        const icon = v.severity === "error" ? "🔴" : "🟡";
        markdown += `${icon} **[${v.rule_id}] ${v.rule_name}** (${v.severity})\n`;
        markdown += `${v.description}\n`;
        if (v.affected_entries?.length) {
          markdown += `Affected: ${v.affected_entries.join(", ")}\n`;
        }
        markdown += "\n";
      });
    } else {
      markdown += "### ✅ No violations found\n\n";
    }

    // Fix plan
    if (fixPlan.length > 0) {
      markdown += `### 🔧 Fix Plan\n\n`;
      fixPlan.forEach((f, i) => {
        markdown += `${i + 1}. **${f.action}**: ${f.target}`;
        if (f.from_value && f.to_value) markdown += `\n   Replace \`${f.from_value}\` → \`${f.to_value}\``;
        if (f.component_recommendation) markdown += `\n   Component: ${f.component_recommendation}`;
        markdown += "\n\n";
      });
    }

    // Code snippet
    if (codeSnippet) {
      markdown += `### 💻 Recommended Code\n\n\`\`\`tsx\n${codeSnippet}\n\`\`\`\n\n`;
    }

    // Risk notes
    if (riskNotes.length > 0) {
      markdown += `### ⚡ Risks & Manual Review Items\n\n`;
      riskNotes.forEach((r) => {
        markdown += `- ${r}\n`;
      });
      markdown += "\n";
    }

    // Flag low confidence entries
    const lowConfidence = extractedEntries.filter((e) => e.confidence != null && e.confidence < 0.5);
    if (lowConfidence.length > 0) {
      markdown += `### 🔍 Low Confidence Entries (manual verification recommended)\n\n`;
      lowConfidence.forEach((e) => {
        markdown += `- "${e.title}" (confidence: ${((e.confidence || 0) * 100).toFixed(0)}%)\n`;
      });
    }

    // 6. Persist assistant message
    await adminClient.from("chat_messages").insert({
      session_id,
      role: "assistant",
      content: markdown,
    });

    // 7. Create review_decisions row
    const { data: session } = await adminClient
      .from("chat_sessions")
      .select("user_id")
      .eq("id", session_id)
      .single();

    await adminClient.from("review_decisions").insert({
      session_id,
      workspace_id,
      source_id,
      title: `Review: ${extractedEntries.length} entries`,
      violations,
      fix_plan: fixPlan,
      code_snippet: codeSnippet || null,
      status: "draft",
      created_by: session?.user_id || null,
    });

    return new Response(JSON.stringify({
      success: true,
      violations_count: violations.length,
      fix_plan_count: fixPlan.length,
      entries_audited: extractedEntries.length,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("design-review error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
