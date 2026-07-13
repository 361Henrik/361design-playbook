import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BRAND_NAME, COMPONENT_INDEX, GUARDRAIL_RULES, PALETTE_BLOCK, TYPOGRAPHY_BLOCK } from "../_shared/brand.ts";
import { requireUser, requireWorkspaceMember, requireSessionOwner } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    // 0. Authenticate: caller must own the session and belong to the workspace.
    const { userId, errorResponse } = await requireUser(req, corsHeaders);
    if (errorResponse) return errorResponse;

    const membershipError = await requireWorkspaceMember(adminClient, userId!, workspace_id, corsHeaders);
    if (membershipError) return membershipError;

    const sessionError = await requireSessionOwner(adminClient, userId!, session_id, corsHeaders, workspace_id);
    if (sessionError) return sessionError;

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

    const systemPrompt = `You are a Design System Reviewer for "${BRAND_NAME}". You audit extracted design entries against the workspace's guardrail rules and produce a structured review.

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
${PALETTE_BLOCK}

## TYPOGRAPHY
${TYPOGRAPHY_BLOCK}

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
    let parsedOk = false;

    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        violations = parsed.violations || [];
        fixPlan = parsed.fix_plan || [];
        codeSnippet = parsed.code_snippet || "";
        riskNotes = parsed.risk_notes || [];
        parsedOk = true;
      } catch (e) {
        console.error("Failed to parse review response:", e);
      }
    }

    // A missing/unparseable tool call must read as a failed review,
    // not as a clean "no violations" result.
    if (!parsedOk) {
      const failMsg = "⚠️ Review failed: the AI response could not be parsed. Please retry the review.";
      await adminClient.from("chat_messages").insert({
        session_id,
        role: "assistant",
        content: failMsg,
      });
      return new Response(JSON.stringify({ error: "Unparseable AI response" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
