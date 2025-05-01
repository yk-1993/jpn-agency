-- 20250502123000_remove_venue.sql
BEGIN;

-- 会場情報は location 系フィールドと重複するため削除
ALTER TABLE public.events
  DROP COLUMN IF EXISTS venue;

COMMIT;
