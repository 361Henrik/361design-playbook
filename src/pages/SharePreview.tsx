import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Compass } from "lucide-react";
import { Microsite, PreviewData, ACCENT_THEMES, AccentTheme } from "@/components/preview/Microsite";

export default function SharePreview() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [theme, setTheme] = useState<AccentTheme>(ACCENT_THEMES[0]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("property_previews")
        .select("name, location, output, hero_image_url")
        .eq("slug", slug)
        .eq("is_public", true)
        .maybeSingle();
      if (error || !data) {
        setError("Preview not found");
        setLoading(false);
        return;
      }
      const out = data.output as any;
      setPreview(out?.copy ?? null);
      setGallery(out?.galleryImages ?? []);
      setHeroImage(data.hero_image_url ?? null);
      setName(data.name);
      const themeKey = out?.theme;
      const t = ACCENT_THEMES.find((x) => x.key === themeKey);
      if (t) setTheme(t);
      document.title = `${data.name} — ${data.location}`;
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !preview) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-center px-6">
        <Compass className="h-8 w-8 text-accent mb-4" strokeWidth={1.5} />
        <h1 className="font-display text-h2 tracking-headline">Preview not found</h1>
        <p className="mt-2 font-body text-muted-foreground">This link may have been unpublished or never existed.</p>
        <Link to="/" className="mt-6 text-sm text-accent hover:underline">Return home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Microsite data={preview} heroImage={heroImage} galleryImages={gallery} theme={theme} />
      <footer className="border-t border-foreground/10 py-6 text-center bg-warm-stone">
        <p className="font-body text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {name} · Generated with Host Atlas
        </p>
      </footer>
    </div>
  );
}
