import { Badge } from "@/components/ui/badge";
import { Copy, MapPin, RefreshCw } from "lucide-react";
import { POIMinimap } from "./POIMinimap";

export interface PreviewData {
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

export type AccentTheme = {
  key: string;
  label: string;
  accent: string;      // CSS color
  accentSoft: string;  // for eyebrows on dark
  heroTint: string;    // rgba overlay
};

export const ACCENT_THEMES: AccentTheme[] = [
  { key: "terracotta", label: "Terracotta", accent: "hsl(14, 53%, 50%)", accentSoft: "hsl(40, 46%, 63%)", heroTint: "rgba(26,31,26,0.75)" },
  { key: "deep-green", label: "Forest",     accent: "hsl(158, 41%, 21%)", accentSoft: "hsl(40, 46%, 63%)", heroTint: "rgba(31,74,58,0.65)" },
  { key: "bronze",     label: "Bronze",     accent: "hsl(40, 46%, 45%)",  accentSoft: "hsl(40, 46%, 63%)", heroTint: "rgba(60,45,20,0.72)" },
  { key: "slate",      label: "Slate",      accent: "hsl(210, 15%, 30%)", accentSoft: "hsl(210, 15%, 70%)", heroTint: "rgba(30,35,40,0.75)" },
  { key: "ochre",      label: "Ochre",      accent: "hsl(28, 62%, 48%)",  accentSoft: "hsl(40, 46%, 63%)", heroTint: "rgba(50,30,15,0.70)" },
];

interface MicrositeProps {
  data: PreviewData;
  heroImage?: string | null;
  galleryImages?: string[];
  theme?: AccentTheme;
  onCopy?: (label: string, text: string) => void;
  onRegenChapter?: (index: number) => void;
  regenIndex?: number | null;
}

export function Microsite({
  data,
  heroImage,
  galleryImages = [],
  theme = ACCENT_THEMES[0],
  onCopy,
  onRegenChapter,
  regenIndex,
}: MicrositeProps) {
  const readingWords = data.chapters.reduce((a, c) => a + c.body.split(/\s+/).length, 0);
  const readingMin = Math.max(1, Math.round(readingWords / 200));

  return (
    <article className="microsite" style={{ ["--ms-accent" as string]: theme.accent, ["--ms-accent-soft" as string]: theme.accentSoft }}>
      {/* HERO */}
      <header className="relative">
        <div
          className="h-[420px] md:h-[560px] w-full bg-deep-green flex items-end"
          style={heroImage ? {
            backgroundImage: `linear-gradient(to bottom, rgba(26,31,26,0.10), ${theme.heroTint}), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          } : undefined}
        >
          <div className="w-full px-8 md:px-12 py-10 md:py-14 text-cream">
            <div className="text-[11px] uppercase tracking-[0.15em] font-body font-medium mb-3" style={{ color: theme.accentSoft }}>
              {data.hero.eyebrow}
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-heading tracking-headline max-w-3xl">
              {data.hero.headline}
            </h1>
            <p className="mt-4 font-body text-lg leading-reading max-w-xl text-cream/90">
              {data.hero.subhead}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-cream/70 font-body">
              <span>{readingMin} min read</span>
              <span aria-hidden>·</span>
              <span>{data.pois.length} places nearby</span>
            </div>
          </div>
        </div>
      </header>

      {/* CHAPTERS with interleaved gallery */}
      <section className="px-8 md:px-12 py-space-9 max-w-[820px]">
        {data.chapters?.map((ch, i) => (
          <div key={i} className="mb-space-8 group/chapter">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium" style={{ color: theme.accent }}>
                Chapter {i + 1}
              </div>
              {onRegenChapter && (
                <button
                  onClick={() => onRegenChapter(i)}
                  disabled={regenIndex === i}
                  className="opacity-0 group-hover/chapter:opacity-100 transition-opacity print:hidden text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <RefreshCw className={`h-3 w-3 ${regenIndex === i ? "animate-spin" : ""}`} />
                  Rewrite
                </button>
              )}
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

      {/* GALLERY */}
      {galleryImages.length > 0 && (
        <section className="px-8 md:px-12 pb-space-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {galleryImages.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-cover bg-center rounded-md border border-foreground/10"
                style={{ backgroundImage: `url(${src})` }}
                role="img"
                aria-label={`Property photo ${i + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* SIGNATURE DETAILS */}
      {data.signature_details?.length > 0 && (
        <section className="bg-warm-stone px-8 md:px-12 py-space-8">
          <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium mb-4" style={{ color: theme.accent }}>
            Signature details
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {data.signature_details.map((d, i) => (
              <li key={i} className="font-display text-xl tracking-headline border-b border-foreground/10 pb-3">
                {d}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* MAP + POIs */}
      <section className="px-8 md:px-12 py-space-9">
        <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium mb-2" style={{ color: theme.accent }}>
          Nearby
        </div>
        <h2 className="font-display text-3xl md:text-4xl tracking-headline leading-heading mb-6">
          Places within reach
        </h2>

        <div className="mb-8">
          <POIMinimap pois={data.pois} accent={theme.accent} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.pois?.map((p, i) => (
            <div key={i} className="p-5 border border-border rounded-md bg-cream">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-full bg-cream border border-foreground flex items-center justify-center shrink-0">
                  <span className="font-body font-semibold text-[13px]">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display text-lg tracking-headline">{p.name}</h4>
                    <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground shrink-0">
                      {p.distance}
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: theme.accent }}>
                    {p.kind}
                  </div>
                  <p className="font-body text-sm leading-reading text-muted-foreground">
                    {p.note}
                  </p>
                </div>
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL KIT */}
      <section className="bg-deep-green text-cream px-8 md:px-12 py-space-9 print:break-before-page">
        <div className="text-[11px] uppercase tracking-[0.12em] font-body font-medium mb-2" style={{ color: theme.accentSoft }}>
          Social kit
        </div>
        <h2 className="font-display text-3xl md:text-4xl tracking-headline leading-heading mb-6 text-cream">
          Ready to share
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SocialCard label="Instagram" text={data.social.instagram_caption} onCopy={onCopy} />
          <SocialCard label="LinkedIn" text={data.social.linkedin_post} onCopy={onCopy} />
          <SocialCard
            label="Email"
            text={`Subject: ${data.social.email_subject}\nPreview: ${data.social.email_preview}`}
            onCopy={onCopy}
          />
          <div className="p-5 rounded-md bg-deep-green/60 border border-cream/20">
            <div className="text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: theme.accentSoft }}>SEO</div>
            <p className="font-display text-lg leading-heading mb-1">{data.meta.seo_title}</p>
            <p className="font-body text-sm text-cream/80 leading-reading">{data.meta.seo_description}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

function SocialCard({ label, text, onCopy }: { label: string; text: string; onCopy?: (l: string, t: string) => void }) {
  return (
    <div className="p-5 rounded-md bg-cream text-foreground">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-[10px] uppercase tracking-[0.1em]">{label}</Badge>
        {onCopy && (
          <button
            onClick={() => onCopy(label, text)}
            className="text-xs text-accent hover:underline flex items-center gap-1 print:hidden"
          >
            <Copy className="h-3 w-3" /> Copy
          </button>
        )}
      </div>
      <pre className="font-body text-sm leading-reading text-foreground whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
