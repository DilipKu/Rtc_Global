-- =====================================================================================
-- RTC GLOBAL UPDATE 1
-- Adds missing SKU column and sets up Supabase Storage for Images
-- =====================================================================================

-- 1. Add SKU to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;

-- 2. Create Storage Bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('rtc-images', 'rtc-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage RLS Policies
-- Allow public read access to images
CREATE POLICY "Public read images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'rtc-images');

-- Allow admins to upload, update, and delete images
CREATE POLICY "Admin upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'rtc-images' 
  AND public.is_admin()
);

CREATE POLICY "Admin update images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'rtc-images' 
  AND public.is_admin()
);

CREATE POLICY "Admin delete images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'rtc-images' 
  AND public.is_admin()
);
