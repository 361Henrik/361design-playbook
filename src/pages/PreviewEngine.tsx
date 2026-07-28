import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { toast } from "sonner";
import { Loader2, Sparkles, Printer, Copy, Download, Share2, Check } from "lucide-react";
import { Microsite, PreviewData, ACCENT_THEMES, AccentTheme } from "@/components/preview/Microsite";

const SUGGESTED_TAGS = ["coastal", "mountain", "historic", "modern", "rustic", "minimalist", "family-run", "design-led"];

const SAMPLE = {
  name: "Villa Marea",
  location: "Camogli, Ligurian Coast, Italy",
  propertyType: "boutique seaside villa",
  description: "Restored 19th-century family villa on a headland above Camogli. Six rooms, terraced garden, private stair down to a rock beach.",
  amenities: "sea-view terrace, pool, outdoor kitchen, library, bicycles",
  nearby: "San Fruttuoso abbey by boat, Portofino, Punta Chiappa trail",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) +
    "-" + Math.random().toString(36).slice(2, 7);
}

export default function PreviewEngine() {
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [nearby, setNearby] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [theme, setTheme] = useState<AccentTheme>(ACCENT_THEMES[0]);
  const [regenIndex, setRegenIndex] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const fillSample = () => {
    setName(SAMPLE.name);
    setLocation(SAMPLE.location);
    setPropertyType(SAMPLE.propertyType);
    setTags(["coastal", "historic", "design-led"]);
    setDescription(SAMPLE.description);
    setAmenities(SAMPLE.amenities);
    setNearby(SAMPLE.nearby);
  };

  const inputPayload = () => ({
    name, location, propertyType, styleTags: tags, description, amenities, nearby,
  });

  const generate = async () => {
    if (!name || !location) { toast.error("Property name and location are required"); return; }
    setLoading(true);
    setPreview(null);
    setHeroImage(null);
    setGalleryImages([]);
    setShareUrl(null);
    setSavedId(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-property-preview", {
        body: { mode: "full", ...inputPayload() },
      });
      if (error) throw error;
      if (!data?.copy) throw new Error("Malformed response");
      setPreview(data.copy);
      setHeroImage(data.heroImage ?? null);
      setGalleryImages(data.galleryImages ?? []);
      toast.success("Preview generated");
    } catch (e: any) {
      toast.error(e.message ?? "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const regenChapter = async (index: number) => {
    if (!preview) return;
    setRegenIndex(index);
    try {
      const { data, error } = await supabase.functions.invoke("generate-property-preview", {
        body: { mode: "chapter", input: inputPayload(), chapterTitle: preview.chapters[index].title },
      });
      if (error) throw error;
      if (data?.chapter) {
        setPreview({
          ...preview,
          chapters: preview.chapters.map((c, i) => (i === index ? data.chapter : c)),
        });
        toast.success(`Chapter ${index + 1} rewritten`);
      }
    } catch (e: any) {
      toast.error(e.message ?? "Rewrite failed");
    } finally {
      setRegenIndex(null);
    }
  };

  const saveAndShare = async () => {
    if (!preview || !user || !activeWorkspace) return;
    setSaving(true);
    try {
      const slug = slugify(name);
      const { data, error } = await supabase
        .from("property_previews")
        .insert({
          workspace_id: activeWorkspace.id,
          created_by: user.id,
          name,
          location,
          style_tags: tags,
          input: inputPayload(),
          output: { copy: preview, theme: theme.key, galleryImages },
          hero_image_url: heroImage,
          slug,
          is_public: true,
        })
        .select("id, slug")
        .single();
      if (error) throw error;
      setSavedId(data.id);
      const url = `${window.location.origin}/share/${data.slug}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
      toast.success("Public link copied to clipboard");
    } catch (e: any) {
      toast.error(e.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const copyText = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const downloadHero = () => {
    if (!heroImage) return;
    const a = document.createElement("a");
    a.href = heroImage;
    a.download = `${name.replace(/\s+/g, "-").toLowerCase() || "hero"}-hero.png`;
    a.click();
  };

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-space-3 print:hidden">
        <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-[0.08em] font-body font-medium text-muted-foreground">
          Live Preview Engine
        </span>
      </div>
      <div className="print:hidden">
        <PageHeader
          title="Property Preview Engine"
          description="See the Host Atlas design system in action. Enter property details and generate a full editorial microsite with hero, gallery, cartographic mini-map, POIs and a matching social kit — instantly shareable."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* FORM */}
        <aside className="print:hidden space-y-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-auto pr-1">
          <div className="p-5 rounded-md border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-h4 tracking-headline">Property brief</h3>
              <button onClick={fillSample} className="text-xs text-accent hover:underline">Load sample</button>
            </div>

            <div>
              <Label htmlFor="name">Property name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Villa Marea" />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Camogli, Ligurian Coast, Italy" />
            </div>
            <div>
              <Label htmlFor="type">Property type</Label>
              <Input id="type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} placeholder="boutique seaside villa" />
            </div>

            <div>
              <Label>Style tags</Label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SUGGESTED_TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      tags.includes(t)
                        ? "bg-deep-green text-cream border-deep-green"
                        : "bg-transparent border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="am">Amenities</Label>
              <Textarea id="am" rows={2} value={amenities} onChange={(e) => setAmenities(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="near">Nearby</Label>
              <Textarea id="near" rows={2} value={nearby} onChange={(e) => setNearby(e.target.value)} />
            </div>

            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…</>) :
                (<><Sparkles className="h-4 w-4 mr-2" /> Generate preview</>)}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Lovable AI · copy + 1 hero + 3 gallery images · ~20–35s
            </p>
          </div>

          {preview && (
            <>
              <div className="p-5 rounded-md border border-border bg-card space-y-3">
                <h3 className="font-display text-h4 tracking-headline">Accent theme</h3>
                <div className="grid grid-cols-5 gap-1.5">
                  {ACCENT_THEMES.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTheme(t)}
                      title={t.label}
                      className={`aspect-square rounded-md border-2 transition-all ${
                        theme.key === t.key ? "border-foreground scale-95" : "border-transparent hover:border-border"
                      }`}
                      style={{ background: t.accent }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">{theme.label}</p>
              </div>

              <div className="p-5 rounded-md border border-border bg-card space-y-2">
                <h3 className="font-display text-h4 tracking-headline">Share & export</h3>
                <Button
                  variant={shareUrl ? "outline" : "default"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={saveAndShare}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : copiedShare ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                  {savedId ? "Copy public link" : "Save & publish share link"}
                </Button>
                {shareUrl && (
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[11px] font-mono text-muted-foreground truncate hover:text-accent"
                  >
                    {shareUrl}
                  </a>
                )}
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" /> Print / Save as PDF
                </Button>
                {heroImage && (
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={downloadHero}>
                    <Download className="h-4 w-4 mr-2" /> Download hero image
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => copyText("Instagram caption", preview.social.instagram_caption)}>
                  <Copy className="h-4 w-4 mr-2" /> Copy Instagram
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => copyText("LinkedIn post", preview.social.linkedin_post)}>
                  <Copy className="h-4 w-4 mr-2" /> Copy LinkedIn
                </Button>
              </div>
            </>
          )}
        </aside>

        {/* PREVIEW */}
        <div className="print:mx-0 rounded-md overflow-hidden border border-border bg-cream min-h-[600px]">
          {!preview && !loading && (
            <div className="p-space-9 text-center">
              <div className="mx-auto max-w-md">
                <Sparkles className="h-8 w-8 mx-auto text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-h3 tracking-headline mb-2">Live editorial preview</h3>
                <p className="font-body text-muted-foreground leading-reading">
                  Fill the brief on the left. In under a minute you get a full property page rendered in the Host Atlas system — hero, chapters, gallery, cartographic mini-map, POIs and social kit — with a public link ready to share.
                </p>
              </div>
            </div>
          )}
          {loading && (
            <div className="p-space-9 text-center">
              <Loader2 className="h-8 w-8 mx-auto text-accent animate-spin mb-4" />
              <p className="font-body text-muted-foreground">Writing copy, painting hero + gallery…</p>
              <p className="text-[11px] text-muted-foreground mt-2">Four images in parallel — takes about 25 seconds.</p>
            </div>
          )}
          {preview && (
            <Microsite
              data={preview}
              heroImage={heroImage}
              galleryImages={galleryImages}
              theme={theme}
              onCopy={copyText}
              onRegenChapter={regenChapter}
              regenIndex={regenIndex}
            />
          )}
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          aside, header nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
