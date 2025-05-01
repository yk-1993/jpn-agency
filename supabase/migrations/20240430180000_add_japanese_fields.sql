-- Add Japanese fields to events table
ALTER TABLE events
ADD COLUMN name_jpn TEXT,
ADD COLUMN description_jpn TEXT;

-- Add comment to explain the new columns
COMMENT ON COLUMN events.name_jpn IS 'Event name in Japanese';
COMMENT ON COLUMN events.description_jpn IS 'Event description in Japanese'; 