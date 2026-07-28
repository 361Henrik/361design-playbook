import { useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, Printer, Copy, Download, MapPin } from "lucide-react";

interface Preview {
  hero: { eyebrow: string; headline: string; subhead: string };
  chapters: { title: string; body: string }[];
  signature_details: string[];
  pois: { name: string; kind: string; distance: string; note: string }[];
  social: {
    instagram_caption: string;
    linkedin_post: string;
    email_subject: string;
    email_preview: string;
  };
  meta: { seo_title: string; seo_description: string };
}

const SUGGESTED_TAGS = ["coastal", "mountain", "historic", "modern", "rustic", "minimalist", "family-run", "design-led"];

const SAMPLE = {
  name: "Villa Marea",
  location: "Camogli, Ligurian Coast, Italy",
  propertyType: "boutique seaside villa",
  description: "Restored 19th-century family villa on a headland above Camogli. Six rooms, terraced garden, private stair down to a rock beach.",
  amenities: "sea-view terrace, pool, outdoor kitchen, library, bicycles",
  nearby: "San Fruttuoso abbey by boat, Portofino, Punta Chiappa trail",
};

export default function PreviewEngine() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [nearby, setNearby] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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

  const generate = async () => {
    if (!name || !location) {
      toast.error("Property name and location are required");
      return;
    }
    setLoading(true);
    setPreview(null);
    setHeroImage(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-property-preview", {
        body: { name, location, propertyType, styleTags: tags, description, amenities, nearby },
      });
      if (error) throw error;
      if (data?.copy) {
        setPreview(data.copy);
        setHeroImage(data.heroImage ?? null);
        toast.success("Preview generated");
      } else {
        throw new Error("Malformed response");
      }
    } catch (e: any) {
      toast.error(e.message ?? "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const printPreview = () => {
    window.print();
  };

  const downloadHero = () => {
    if (!heroImage) return;
    const a = document.createElement("a");
    a.href = heroImage;
    a.download = `${name.replace(/\s+/g, "-").toLowerCase()}-hero.png`;
    a.click();
  };

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-[1500px] mx-auto">
      <div className="flex items-center gap-3 mb-space-3 print:hidden">
        <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-[0.08em] font-body font-medium text-muted-foreground">
          Live Preview Engine
        </span>
      </div>
      <div className="print:hidden">
        <PageHeader
          title="Property Preview Engine"
          description="See the Host Atlas design system in action. Enter property details and generate a full editorial microsite, POI list, and social kit ready to share."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* FORM */}
        <aside className="print:hidden space-y-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-auto pr-1">
          <div className="p-5 rounded-md border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-h4 tracking-headline">Property brief</h3>
              <button onClick={fillSample} className="text-xs text-accent hover:underline">
                Load sample
              </button>
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
              <Textarea id="desc" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Restored 19th-century family villa..." />
            </div>
            <div>
              <Label htmlFor="am">Amenities</Label>
              <Textarea id="am" rows={2} value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="pool, library, bicycles..." />
            </div>
            <div>
              <Label htmlFor="near">Nearby</Label>
              <Textarea id="near" rows={2} value={nearby} onChange={(e) => setNearby(e.target.value)} placeholder="Portofino, San Fruttuoso..." />
            </div>

            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> Generate preview</>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Uses Lovable AI · copy + hero image · ~10–20s
            </p>
          </div>

          {preview && (
            <div className="p-5 rounded-md border border-border bg-card space-y-3">
              <h3 className="font-display text-h4 tracking-headline">Export</h3>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={printPreview}>
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
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => copyText("Email subject", `${preview.social.email_subject}\n\n${preview.social.email_preview}`)}>
                <Copy className="h-4 w-4 mr-2" /> Copy Email
              </Button>
            </div>
          )}
        </aside>

        {/* MICROSITE PREVIEW */}
        <div ref={previewRef} className="print:mx-0 rounded-md overflow-hidden border border-border bg-cream min-h-[600px]">
          {!preview && !loading && (
            <div className="p-space-9 text-center">
              <div className="mx-auto max-w-md">
                <Sparkles className="h-8 w-8 mx-auto text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-h3 tracking-headline mb-2">Live editorial preview</h3>
                <p className="font-body text-muted-foreground leading-reading">
                  Fill the brief on the left. In seconds you get a full property page rendered in the Host Atlas system — hero, chapters, signature details, POI list, and a matching social kit.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="p-space-9 text-center">
              <Loader2 className="h-8 w-8 mx-auto text-accent animate-spin mb-4" />
              <p className="font-body text-muted-foreground">Writing copy and painting hero…</p>
            </div>
          )}

          {preview && (
            <article className="microsite">
              {/* HERO */}
              <header className="relative">
                <div
                  className="h-[420px] md:h-[540px] w-full bg-deep-green flex items-end"
                  style={heroImage ? {
                    backgroundImage: `linear-gradient(to bottom, rgba(26,31,26,0.15), rgba(26,31,26,0.75)), url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  } : undefined}
                >
                  <div className="w-full px-8 md:px-12 py-10 md:py-14 text-cream">
                    <div className="text-[11px] uppercase tracking-[0.15em] font-body font-medium text-bronze mb-3">
                      {preview.hero.eyebrow}
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl leading-heading tracking-headline max-w-3xl">
                      {preview.hero.headline}
                    </h1>
                    <p className="mt-4 font-body text-lg leading-reading max-w-xl text-cream/90">
                      {preview.hero.subhead}
                    </p>
                  </div>
                </div>
              </header>

              {/* CHAPTERS */}
              <section className="px-8 md:px-12 py-space-9 max-w-[820px]">
                {preview.chapters?.map((ch, i) => (
                  <div key={i} className="mb-space-8">
                    <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium text-accent mb-2">
                      Chapter {i + 1}
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl tracking-headline leading-heading mb-3">
                      {ch.title}
                    </h2>
                    <p className="font-body text-lg leading-reading text-foreground">
                      {ch.body}
                    </p>
                  </div>
                ))}
              </section>

              {/* SIGNATURE DETAILS */}
              {preview.signature_details?.length > 0 && (
                <section className="bg-warm-stone px-8 md:px-12 py-space-8">
                  <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium text-accent mb-4">
                    Signature details
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {preview.signature_details.map((d, i) => (
                      <li key={i} className="font-display text-xl tracking-headline border-b border-foreground/10 pb-3">
                        {d}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* POIs */}
              <section className="px-8 md:px-12 py-space-9">
                <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium text-accent mb-2">
                  Nearby
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-headline leading-heading mb-6">
                  Places within reach
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {preview.pois?.map((p, i) => (
                    <div key={i} className="p-5 border border-border rounded-md bg-cream">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-9 w-9 rounded-full bg-cream border border-foreground flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-display text-lg tracking-headline">{p.name}</h4>
                            <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground shrink-0">
                              {p.distance}
                            </span>
                          </div>
                          <div className="text-[11px] uppercase tracking-[0.08em] text-accent mb-1.5">
                            {p.kind}
                          </div>
                          <p className="font-body text-sm leading-reading text-muted-foreground">
                            {p.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SOCIAL KIT */}
              <section className="bg-deep-green text-cream px-8 md:px-12 py-space-9 print:break-before-page">
                <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium text-bronze mb-2">
                  Social kit
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-headline leading-heading mb-6 text-cream">
                  Ready to share
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SocialCard label="Instagram" text={preview.social.instagram_caption} onCopy={(t) => copyText("Instagram", t)} />
                  <SocialCard label="LinkedIn" text={preview.social.linkedin_post} onCopy={(t) => copyText("LinkedIn", t)} />
                  <SocialCard
                    label="Email"
                    text={`Subject: ${preview.social.email_subject}\nPreview: ${preview.social.email_preview}`}
                    onCopy={(t) => copyText("Email", t)}
                  />
                  <div className="p-5 rounded-md bg-deep-green/60 border border-cream/20">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-bronze mb-1">SEO</div>
                    <p className="font-display text-lg leading-heading mb-1">{preview.meta.seo_title}</p>
                    <p className="font-body text-sm text-cream/80 leading-reading">{preview.meta.seo_description}</p>
                  </div>
                </div>
              </section>
            </article>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          .microsite { border: none; }
          aside, header nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function SocialCard({ label, text, onCopy }: { label: string; text: string; onCopy: (t: string) => void }) {
  return (
    <div className="p-5 rounded-md bg-cream text-foreground">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-[10px] uppercase tracking-[0.1em]">{label}</Badge>
        <button
          onClick={() => onCopy(text)}
          className="text-xs text-accent hover:underline flex items-center gap-1 print:hidden"
        >
          <Copy className="h-3 w-3" /> Copy
        </button>
      </div>
      <pre className="font-body text-sm leading-reading text-foreground whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
