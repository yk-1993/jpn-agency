-- ================================================
-- Migration: Remove name/description, add location_ja/location_zh
-- ================================================
BEGIN;

-- 1. Drop obsolete columns
ALTER TABLE public.events
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS description;

-- 2. Add new localization columns
ALTER TABLE public.events
  ADD COLUMN location_ja TEXT,
  ADD COLUMN location_zh TEXT;

-- 3. Add comments to explain the new columns
COMMENT ON COLUMN public.events.location_ja IS 'Event location in Japanese';
COMMENT ON COLUMN public.events.location_zh IS 'Event location in Chinese';

COMMIT;
