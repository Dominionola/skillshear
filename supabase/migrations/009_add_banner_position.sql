-- Add banner_position field to profiles table
-- This stores the vertical position (0-100%) for banner image repositioning

ALTER TABLE public.profiles
ADD COLUMN banner_position DECIMAL(5,2) DEFAULT 50.00 CHECK (banner_position >= 0 AND banner_position <= 100);

COMMENT ON COLUMN public.profiles.banner_position IS 'Vertical position percentage (0-100) for banner image display. 0 = top, 50 = center, 100 = bottom';
