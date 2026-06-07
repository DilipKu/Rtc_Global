-- Add image_url to categories table
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS image_url TEXT;
