-- =====================================================================================
-- CREATE BLOGS TABLE WITH SEO FIELDS
-- =====================================================================================

CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    
    -- SEO Fields
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    canonical_tag TEXT,
    feature_image TEXT,
    og_image TEXT,
    twitter_image TEXT,
    og_tags JSONB DEFAULT '{"title": "", "description": "", "image": ""}'::jsonb,
    twitter_card_tags JSONB DEFAULT '{"title": "", "description": "", "image": ""}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public read blogs that are published
CREATE POLICY "Public read published blogs" ON public.blogs
    FOR SELECT USING (is_published = true);

-- Admins can read all blogs
CREATE POLICY "Admins read all blogs" ON public.blogs
    FOR SELECT USING (public.is_admin());

-- Admins can insert blogs
CREATE POLICY "Admins insert blogs" ON public.blogs
    FOR INSERT WITH CHECK (public.is_admin());

-- Admins can update blogs
CREATE POLICY "Admins update blogs" ON public.blogs
    FOR UPDATE USING (public.is_admin());

-- Admins can delete blogs
CREATE POLICY "Admins delete blogs" ON public.blogs
    FOR DELETE USING (public.is_admin());

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published);
