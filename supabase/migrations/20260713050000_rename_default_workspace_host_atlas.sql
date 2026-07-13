-- Rebrand: the default workspace carried the legacy "The Curated Lens" name,
-- which surfaces as the sidebar title. Rename to the current product brand.
UPDATE workspaces
SET name = 'Host Atlas', description = 'Host Atlas · Design System'
WHERE id = '00000000-0000-0000-0000-000000000001';
