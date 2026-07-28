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

interface ChapterOnly {
  chapter: { title: string; body: string };
}

function buildFullPrompt(input: PropertyInput) {
  return `Create the editorial copy for a Host Atlas property page.

Property: ${input.name}
Location: ${input.location}
Type: ${input.propertyType}
Style tags: ${input.styleTags.join(", ")}
Operator description: ${input.description}
Amenities: ${input.amenities}
Nearby: ${input.nearby}

Return STRICT JSON matching this shape exactly:
{
  "hero": {
    "eyebrow": "2-3 word location tag, uppercase words separated by middle-dot",
    "headline": "8-12 words, evocative, place-specific, no exclamation",
    "subhead": "18-28 words, one sentence, calm editorial"
  },
  "chapters": [
    { "title": "3-5 word chapter title", "body": "60-90 words, one paragraph, specific sensory detail" }
  ],
  "signature_details": ["4-6 short 3-6 word phrases naming concrete features"],
  "gallery_prompts": ["3 short image direction phrases (7-12 words) describing distinct scenes for supporting photos — one interior detail, one exterior/landscape, one lifestyle moment. No people faces close-up."],
  "pois": [
    { "name": "real or plausible nearby place", "kind": "village|viewpoint|beach|trail|restaurant|museum|market", "distance": "e.g. '8 min walk'", "note": "12-20 word editorial description" }
  ],
  "social": {
    "instagram_caption": "60-90 words, 2 short paragraphs, end with 3-5 tasteful hashtags",
    "linkedin_post": "80-120 words, professional editorial tone",
    "email_subject": "5-8 words",
    "email_preview": "12-18 words"
  },
  "meta": { "seo_title": "under 60 chars", "seo_description": "under 155 chars" }
}

Exactly 3 chapters, exactly 3 gallery_prompts, exactly 5 pois. No markdown or code fences.`;
}

function buildChapterPrompt(input: PropertyInput, existingTitle: string) {
  return `Rewrite one chapter for the Host Atlas property page below. Return STRICT JSON: {"chapter":{"title":"3-5 words","body":"60-90 words, single paragraph, concrete sensory detail"}}

Property: ${input.name}, ${input.location}
Type: ${input.propertyType}
Style: ${input.styleTags.join(", ")}
Existing chapter to replace (write something clearly different): "${existingTitle}"
Context: ${input.description}`;
}

async function callGeminiJson(prompt: string, apiKey: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3.6-flash",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`copy_gen ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
}

async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  const fullPrompt = `Editorial travel photograph, premium magazine quality. ${prompt}. Warm natural light, film-still cinematic feel, no text, no watermark, no faces close-up. Muted earth palette (deep green #1F4A3A, terracotta #C35C3C, warm stone #E8E2D9, base canvas #F6F3EE). Calm, editorial, timeless. 16:9.`;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: fullPrompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      console.error("image gen failed", res.status);
      return null;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.images?.[0]?.image_url?.url ?? null;
  } catch (e) {
    console.error("image gen error", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const mode = body?.mode ?? "full";

    // Regenerate one chapter only
    if (mode === "chapter") {
      const { input, chapterTitle } = body;
      const result = await callGeminiJson(buildChapterPrompt(input, chapterTitle), apiKey);
      return new Response(JSON.stringify(result), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Full generation
    const input = body as PropertyInput;
    if (!input?.name || !input?.location) {
      return new Response(JSON.stringify({ error: "name and location required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 1: get copy first so we can key gallery images off the model's own prompts
    const copy = await callGeminiJson(buildFullPrompt(input), apiKey);

    // Step 2: generate 1 hero + 3 gallery images in parallel
    const heroPrompt = `${input.propertyType} in ${input.location}, style: ${input.styleTags.join(", ")}. Wide establishing hero shot, golden hour.`;
    const galleryPrompts: string[] = Array.isArray(copy.gallery_prompts) ? copy.gallery_prompts.slice(0, 3) : [];

    const [heroImage, ...galleryImages] = await Promise.all([
      generateImage(heroPrompt, apiKey),
      ...galleryPrompts.map((p) => generateImage(p, apiKey)),
    ]);

    return new Response(JSON.stringify({
      copy,
      heroImage,
      galleryImages: galleryImages.filter(Boolean),
    }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-property-preview error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = /429/.test(msg) ? 429 : /402/.test(msg) ? 402 : 500;
    return new Response(JSON.stringify({ error: msg }), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
