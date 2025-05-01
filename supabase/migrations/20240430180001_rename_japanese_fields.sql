-- Rename Japanese fields from jpn to ja
ALTER TABLE events RENAME COLUMN name_jpn TO name_ja;
ALTER TABLE events RENAME COLUMN description_jpn TO description_ja;

-- Update column comments
COMMENT ON COLUMN events.name_ja IS 'Event name in Japanese';
COMMENT ON COLUMN events.description_ja IS 'Event description in Japanese'; 