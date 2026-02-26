
-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create sources table for uploaded files
CREATE TABLE public.sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'image', 'markdown', 'url')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  uploaded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create library_entries table
CREATE TABLE public.library_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('token', 'guideline', 'component', 'pattern', 'example')),
  tags TEXT[] DEFAULT '{}',
  summary TEXT,
  content TEXT,
  rules TEXT[] DEFAULT '{}',
  related_entry_ids UUID[] DEFAULT '{}',
  source_id UUID REFERENCES public.sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'rejected')),
  version INTEGER NOT NULL DEFAULT 1,
  embedding vector(768),
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_entries ENABLE ROW LEVEL SECURITY;

-- Public read access (small team, internal app)
CREATE POLICY "Anyone can view sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sources" ON public.sources FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sources" ON public.sources FOR UPDATE USING (true);

CREATE POLICY "Anyone can view library entries" ON public.library_entries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert library entries" ON public.library_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update library entries" ON public.library_entries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete library entries" ON public.library_entries FOR DELETE USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_library_entries_updated_at
  BEFORE UPDATE ON public.library_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create similarity search function
CREATE OR REPLACE FUNCTION public.match_library_entries(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  entry_type TEXT,
  tags TEXT[],
  summary TEXT,
  content TEXT,
  rules TEXT[],
  status TEXT,
  similarity float
)
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    le.id,
    le.title,
    le.entry_type,
    le.tags,
    le.summary,
    le.content,
    le.rules,
    le.status,
    1 - (le.embedding <=> query_embedding) AS similarity
  FROM public.library_entries le
  WHERE le.status = 'approved'
    AND 1 - (le.embedding <=> query_embedding) > match_threshold
  ORDER BY le.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create storage bucket for source uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('sources', 'sources', true);

CREATE POLICY "Anyone can view source files" ON storage.objects FOR SELECT USING (bucket_id = 'sources');
CREATE POLICY "Anyone can upload source files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sources');

-- Index for vector similarity search
CREATE INDEX ON public.library_entries USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
