-- =====================================================================================
-- CREATE ENQUIRIES TABLE
-- =====================================================================================

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contact_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT,
    phone TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    status TEXT DEFAULT 'New', -- Options: New, In Progress, Completed, Rejected
    source TEXT DEFAULT 'Website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can insert an enquiry (public route)
CREATE POLICY "Anyone can insert an enquiry" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Only admins can view enquiries
CREATE POLICY "Admins can view enquiries" ON public.enquiries
    FOR SELECT USING (public.is_admin());

-- Only admins can update enquiries
CREATE POLICY "Admins can update enquiries" ON public.enquiries
    FOR UPDATE USING (public.is_admin());

-- Only admins can delete enquiries
CREATE POLICY "Admins can delete enquiries" ON public.enquiries
    FOR DELETE USING (public.is_admin());
