import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are the Host Atlas copywriter. You write in a natural European editorial voice for senior travelers (50-85). No urgency, no scarcity, no instructional language, no exclamation marks. No Oxford comma. Short, calm, specific. Concrete sensory detail over generic marketing adjectives. Never use words like "unforgettable", "unique experience", "hidden gem", "nestled", "boasts", "world-class".`;

interface PropertyInput {
  name: string;
  location: string;
  propertyType: string;
  styleTags: string[];
  description: string;
  amenities: string;
  nearby: string;
}

function buildUserPrompt(input: PropertyInput) {
  return `Create the editorial copy for a Host Atlas property page.

Property: ${input.name}
Location: ${input.location}
Type: ${input.propertyType}
Style tags: ${input.styleTags.join(", ")}
Operator description: ${input.description}
Amenities the operator mentioned: ${input.amenities}
Nearby (operator notes): ${input.nearby}

Return STRICT JSON matching this shape exactly:
{
  "hero": {
    "eyebrow": "2-3 word location tag, uppercase words separated by middle-dot, e.g. 'Ligurian Coast · Italy'",
    "headline": "8-12 words, evocative, place-specific, no exclamation",
    "subhead": "18-28 words, one sentence, calm editorial"
  },
  "chapters": [
    { "title": "3-5 word chapter title", "body": "60-90 words, one paragraph, specific sensory detail" }
  ],
  "signature_details": ["4-6 short 3-6 word phrases naming concrete features (materials, views, rituals)"],
  "pois": [
    { "name": "real or plausible nearby place", "kind": "village|viewpoint|beach|trail|restaurant|museum|market", "distance": "e.g. '8 min walk'", "note": "12-20 word editorial description" }
  ],
  "social": {
    "instagram_caption": "60-90 words, 2 short paragraphs, no hashtags mid-text, end with 3-5 tasteful hashtags",
    "linkedin_post": "80-120 words, professional editorial tone, one line break between paragraphs",
    "email_subject": "5-8 words",
    "email_preview": "12-18 words, complements the subject"
  },
  "meta": {
    "seo_title": "under 60 chars",
    "seo_description": "under 155 chars"
  }
}

Provide exactly 3 chapters and exactly 5 POIs. No markdown, no code fences, JSON only.`;
}

async function generateCopy(input: PropertyInput, apiKey: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3.6-flash",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: buildUserPrompt(input) },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`copy_gen ${res.status}: ${t}`);
  }
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(raw);
}

async function generateHero(input: PropertyInput, apiKey: string): Promise<string | null> {
  const prompt = `Editorial travel photograph for a premium property page. ${input.propertyType} in ${input.location}. Style: ${input.styleTags.join(", ")}. Warm natural light, golden hour, cinematic wide composition, no people, no text, no watermark. Muted earth palette (deep green, terracotta, warm stone, base canvas #F6F3EE). Film-still feel, calm editorial, magazine cover quality. 16:9.`;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      console.error("image gen failed", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    return url ?? null;
  } catch (e) {
    console.error("image gen error", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const input = await req.json() as PropertyInput;
    if (!input?.name || !input?.location) {
      return new Response(JSON.stringify({ error: "name and location required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [copy, heroImage] = await Promise.all([
      generateCopy(input, apiKey),
      generateHero(input, apiKey),
    ]);

    return new Response(JSON.stringify({ copy, heroImage }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-property-preview error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = /429/.test(msg) ? 429 : /402/.test(msg) ? 402 : 500;
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
