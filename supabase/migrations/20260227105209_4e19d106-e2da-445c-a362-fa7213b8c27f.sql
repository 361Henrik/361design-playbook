
-- Modify handle_new_user to also assign initial role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INT;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));

  -- Assign role: first user gets admin, others get editor
  SELECT count(*) INTO user_count FROM public.user_roles;
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'editor');
  END IF;

  RETURN NEW;
END;
$$;

-- Assign admin role to existing user
INSERT INTO public.user_roles (user_id, role)
VALUES ('3905065d-33fe-4446-977c-a50dfd111e81', 'admin')
ON CONFLICT DO NOTHING;
