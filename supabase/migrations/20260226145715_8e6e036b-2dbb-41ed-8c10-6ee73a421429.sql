
-- App role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: admins can manage, users can read their own
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sources table additions
ALTER TABLE public.sources
  ADD COLUMN file_hash TEXT,
  ADD COLUMN duplicate_of UUID REFERENCES public.sources(id),
  ADD COLUMN error_message TEXT,
  ADD COLUMN retry_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN pages_processed INTEGER,
  ADD COLUMN total_pages INTEGER;

-- Tag vocabulary table
CREATE TABLE public.tag_vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  aliases TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tag_vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags" ON public.tag_vocabulary
  FOR SELECT USING (true);

CREATE POLICY "Authenticated can insert tags" ON public.tag_vocabulary
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update tags" ON public.tag_vocabulary
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can delete tags" ON public.tag_vocabulary
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Pre-seed tag vocabulary
INSERT INTO public.tag_vocabulary (name, category) VALUES
  ('color', 'tokens'),
  ('typography', 'tokens'),
  ('spacing', 'tokens'),
  ('layout', 'tokens'),
  ('motion', 'tokens'),
  ('imagery', 'tokens'),
  ('icons', 'tokens'),
  ('brand', 'guidelines'),
  ('accessibility', 'guidelines'),
  ('responsive', 'guidelines'),
  ('button', 'components'),
  ('card', 'components'),
  ('navigation', 'components'),
  ('form', 'components'),
  ('modal', 'components'),
  ('pattern', 'patterns'),
  ('interaction', 'patterns');

-- Guardrail exceptions table
CREATE TABLE public.guardrail_exceptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  approved_by UUID REFERENCES auth.users(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.guardrail_exceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exceptions" ON public.guardrail_exceptions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Editors can insert exceptions" ON public.guardrail_exceptions
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete exceptions" ON public.guardrail_exceptions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Update existing RLS policies for library_entries to be role-aware
-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can delete library entries" ON public.library_entries;
DROP POLICY IF EXISTS "Anyone can insert library entries" ON public.library_entries;
DROP POLICY IF EXISTS "Anyone can update library entries" ON public.library_entries;
DROP POLICY IF EXISTS "Anyone can view library entries" ON public.library_entries;

-- New role-based policies for library_entries
CREATE POLICY "Authenticated can view library entries" ON public.library_entries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Editors can insert library entries" ON public.library_entries
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update library entries" ON public.library_entries
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete library entries" ON public.library_entries
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Also allow service role (edge functions) to insert
CREATE POLICY "Service can insert library entries" ON public.library_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service can update library entries" ON public.library_entries
  FOR UPDATE USING (true);

-- Update sources policies
DROP POLICY IF EXISTS "Anyone can insert sources" ON public.sources;
DROP POLICY IF EXISTS "Anyone can update sources" ON public.sources;
DROP POLICY IF EXISTS "Anyone can view sources" ON public.sources;

CREATE POLICY "Authenticated can view sources" ON public.sources
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Editors can insert sources" ON public.sources
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Service can update sources" ON public.sources
  FOR UPDATE USING (true);

CREATE POLICY "Service can insert sources" ON public.sources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can delete sources" ON public.sources
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Versions: keep open for reading, service for writing
DROP POLICY IF EXISTS "Anyone can view versions" ON public.versions;
DROP POLICY IF EXISTS "Anyone can insert versions" ON public.versions;

CREATE POLICY "Authenticated can view versions" ON public.versions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service can insert versions" ON public.versions
  FOR INSERT WITH CHECK (true);

-- Add delete policy for sources
CREATE POLICY "Service can delete sources" ON public.sources
  FOR DELETE USING (true);
