-- Create dynamic pages content table
CREATE TABLE IF NOT EXISTS public.dynamic_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key VARCHAR(100) UNIQUE NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies
ALTER TABLE public.dynamic_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.dynamic_pages
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated admin users only" ON public.dynamic_pages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated admin users only" ON public.dynamic_pages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    author VARCHAR(100),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create fairs (Garment Fairs/Events) table
CREATE TABLE IF NOT EXISTS public.fairs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_range VARCHAR(100),
    location VARCHAR(255),
    image_urls JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add video_url to hero_slides
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS video_url TEXT;

-- RLS for blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated admin users blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- RLS for fairs
ALTER TABLE public.fairs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users fairs" ON public.fairs FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated admin users fairs" ON public.fairs FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial values for about and contact
INSERT INTO public.dynamic_pages (page_key, content) VALUES
('about_us', '{
  "story_heading": "Our Journey: Redefining B2B Apparel Distribution",
  "story_paragraphs": [
    "RTC Global Apparels Pvt. Ltd. emerged as a structured B2B distributor focused on bridging international-quality manufacturing with local retailers. Founded on a commitement to transparency and reliability, we have grown into a nationwide network connecting top textile mills with wholesale buyers.",
    "Today, we operate a strategic distribution framework covering over <strong>800+ District Headquarters</strong>. We are proud to serve as a trusted <strong>B2B bridge</strong>, enabling retailers to access top-tier apparel brands with flexible procurement options and verified quality controls."
  ],
  "founder_quote": "At RTC Global Apparels Pvt. Ltd., we believe strong partnerships are built on trust, quality, and consistency. Inspired by Rajasthan’s rich textile heritage and powered by Delhi’s business excellence, we are committed to delivering premium fashion solutions with transparency, timely delivery, and long-term value for our partners across India.",
  "founder_name": "Mr. Abhay Ranka",
  "founder_title": "Founder and Managing Director",
  "why_choose_heading": "THE RTC GLOBAL ADVANTAGE"
}'::jsonb),
('contact', '{
  "phone_number": "9818598651, 8860498651",
  "whatsapp_number": "+919818598651",
  "email": "rtcglobalapparelspvt.ltd@gmail.com",
  "business_address": "X/2210, Gali No. 10, Kailash Nagar, Gandhi Nagar, Delhi-110031",
  "business_hours": "Tue–Sun: 9 AM – 7 PM (Monday Closed)"
}'::jsonb)
ON CONFLICT (page_key) DO NOTHING;
