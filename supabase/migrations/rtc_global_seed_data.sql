-- =====================================================================================
-- SEED DATA FOR RTC GLOBAL
-- Run this script in the Supabase SQL Editor to populate dummy data.
-- =====================================================================================

-- 1. Brands
INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('5G Jeans', '5g-jeans', 1)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Black Jack', 'black-jack', 2)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Denis Park', 'denis-park', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('FLU', 'flu', 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Izaro', 'izaro', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Spark', 'spark', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('H S', 'h-s', 7)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('H S Kids', 'h-s-kids', 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Happy Boy', 'happy-boy', 9)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Hello Brother', 'hello-brother', 10)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Munkey', 'munkey', 11)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Tejoo', 'tejoo', 12)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Tejoo Premium', 'tejoo-premium', 13)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Toxy', 'toxy', 14)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.brands (name, slug, sort_order) 
VALUES ('Vipin', 'vipin', 15)
ON CONFLICT (slug) DO NOTHING;

-- 2. Categories
INSERT INTO public.categories (name, slug) VALUES ('Ladies'' Wear', 'ladies-wear') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.categories (name, slug) VALUES ('Men''s Wear', 'men-s-wear') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.categories (name, slug) VALUES ('Kids'' Wear', 'kids-wear') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.categories (name, slug) VALUES ('Saree', 'saree') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.categories (name, slug) VALUES ('Blanket', 'blanket') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.categories (name, slug) VALUES ('Ethnic Wear', 'ethnic-wear') ON CONFLICT (slug) DO NOTHING;

-- 3. Branches
INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br1', 'Gandhi Nagar (Delhi Hub)', 'HEAD_OFFICE', '{"street":"X/2210, Gali No. 10, Kailash Nagar, Gandhi Nagar, Delhi-110031","city":"Gandhi Nagar (Delhi Hub)"}'::jsonb, 'Satendra Shaky / Ravi Shankar / Manoj Sharma / Sunil Tomar', '{"9560992821","9654038842","9582746695","8800474252"}'::text[], 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br2', 'Chandni Chowk Desk', 'BRANCH', '{"street":"Chandni Chowk Sourcing Market, Delhi-110006","city":"Chandni Chowk Desk"}'::jsonb, 'Ravi Shankar', '{"9654038842"}'::text[], 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br3', 'Tank Road & Raghubir Nagar', 'BRANCH', '{"street":"Tank Road Garment Cluster, Karol Bagh, Delhi-110005","city":"Tank Road & Raghubir Nagar"}'::jsonb, 'Mohit Kumar', '{"8386000171"}'::text[], 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br4', 'Jafrabad & Panipat Hub', 'BRANCH', '{"street":"Sector 29, Industrial Area, Panipat, Haryana-132103","city":"Jafrabad & Panipat Hub"}'::jsonb, 'Vicky Verma', '{"9213222728"}'::text[], 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br5', 'Amroha, Hathras & Kanth', 'BRANCH', '{"street":"Main Bazar Road, Hathras, Uttar Pradesh-204101","city":"Amroha, Hathras & Kanth"}'::jsonb, 'Vimal Singh', '{"9999353587"}'::text[], 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br6', 'Ludhiana Textile Office', 'BRANCH', '{"street":"Industrial Area-A, Ludhiana, Punjab-141003","city":"Ludhiana Textile Office"}'::jsonb, 'Monu Jain / Naresh Sharma', '{"9877934022","7743069779"}'::text[], 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br7', 'Bengaluru Hub', 'BRANCH', '{"street":"Chickpet Commercial Cross, Bengaluru, Karnataka-560053","city":"Bengaluru Hub"}'::jsonb, 'Arihant Bhandari', '{"9043125401"}'::text[], 'https://images.unsplash.com/photo-1568249896077-ae954d890612?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br8', 'Kolkata Hub', 'BRANCH', '{"street":"Barabazar Sourcing Block, Kolkata, West Bengal-700007","city":"Kolkata Hub"}'::jsonb, 'Santosh Bothra', '{"9910746184"}'::text[], 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br9', 'Tirupur Sourcing Center', 'BRANCH', '{"street":"Avinashi Road Knitwear Cluster, Tirupur, Tamil Nadu-641602","city":"Tirupur Sourcing Center"}'::jsonb, 'Naveen Kashyap / Jaiveer Singh', '{"9042080166","8588069623"}'::text[], 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br10', 'Ahmedabad & Bhavnagar', 'BRANCH', '{"street":"Maskati Cloth Market, Ahmedabad, Gujarat-380002","city":"Ahmedabad & Bhavnagar"}'::jsonb, 'Sanjay Parihar', '{"9601038230"}'::text[], 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br11', 'Jaipur Sourcing Office', 'BRANCH', '{"street":"Johari Bazar, Jaipur, Rajasthan-302003","city":"Jaipur Sourcing Office"}'::jsonb, 'Dilip Kothari', '{"9664314475"}'::text[], 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br12', 'Nagpur & Amravati', 'BRANCH', '{"street":"Itwari Cloth Market, Nagpur, Maharashtra-440002","city":"Nagpur & Amravati"}'::jsonb, 'Ankit Jain', '{"9975978629"}'::text[], 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br13', 'Indore & Jabalpur', 'BRANCH', '{"street":"MT Cloth Market, Indore, Madhya Pradesh-452002","city":"Indore & Jabalpur"}'::jsonb, 'Narendra (Kake) / Praveen Sharma / Hemant', '{"9643950382","7987084109","9718361756"}'::text[], 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br14', 'Kanpur Hub', 'BRANCH', '{"street":"General Ganj, Kanpur, Uttar Pradesh-208001","city":"Kanpur Hub"}'::jsonb, 'Ashish Tiwari', '{"9560769206"}'::text[], 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br15', 'Mumbai Hub', 'BRANCH', '{"street":"Mangaldas Market, Kalbadevi, Mumbai-400002","city":"Mumbai Hub"}'::jsonb, 'Pankaj Prajapat', '{"8696448492"}'::text[], 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br16', 'Ulhas Nagar', 'BRANCH', '{"street":"Ulhasnagar Garment Market, Thane, Maharashtra-421001","city":"Ulhas Nagar"}'::jsonb, 'Hemant Kumar', '{"7701983140"}'::text[], 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br17', 'Surat Sourcing Desk', 'BRANCH', '{"street":"Ring Road Textile Market, Surat, Gujarat-395002","city":"Surat Sourcing Desk"}'::jsonb, 'Ram Prasad Sharma', '{"8619195709"}'::text[], 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)
VALUES ('br18', 'Erode & Madurai Desk', 'BRANCH', '{"street":"Erode Textile Market, Erode, Tamil Nadu-638001","city":"Erode & Madurai Desk"}'::jsonb, 'Raghuveer Singh', '{"9315617931"}'::text[], 'https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?w=600&q=80')
ON CONFLICT (code) DO NOTHING;


-- 4. Products
INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Summer Florals',
  'LDS-2026-001',
  'summer-florals-lds-2026-001',
  ARRAY['/ladies_1.png'],
  'BEST_SELLER',
  'Best Seller',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = '5g-jeans' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Boutique Fusion',
  'LDS-2026-002',
  'boutique-fusion-lds-2026-002',
  ARRAY['/ladies_2.png'],
  'NEW',
  'New Arrival',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'black-jack' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Cotton Comfort',
  'LDS-2026-003',
  'cotton-comfort-lds-2026-003',
  ARRAY['/ladies_3.png'],
  'NONE',
  'Bulk available',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'denis-park' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Designer Kurtis',
  'LDS-2026-004',
  'designer-kurtis-lds-2026-004',
  ARRAY['/ladies_4.png'],
  'HOT',
  'Hot Choice',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'flu' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Festive Special',
  'LDS-2026-005',
  'festive-special-lds-2026-005',
  ARRAY['/ladies_5.png'],
  'NONE',
  'Trending',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'izaro' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Casual Denim',
  'LDS-2026-006',
  'casual-denim-lds-2026-006',
  ARRAY['/ladies_6.png'],
  'NONE',
  'Popular',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'spark' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Couple Couture',
  'LDS-2026-007',
  'couple-couture-lds-2026-007',
  ARRAY['/ladies_7.png'],
  'NONE',
  'Premium Match',
  (SELECT id FROM public.categories WHERE name = 'Ladies'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'h-s' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Casual Everyday',
  'MEN-2026-001',
  'casual-everyday-men-2026-001',
  ARRAY['/men_1.png'],
  'NEW',
  'New Arrival',
  (SELECT id FROM public.categories WHERE name = 'Men''s Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'h-s-kids' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Linen Collection',
  'MEN-2026-002',
  'linen-collection-men-2026-002',
  ARRAY['/men_2.png'],
  'NONE',
  'Premium',
  (SELECT id FROM public.categories WHERE name = 'Men''s Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'happy-boy' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Office Formal',
  'MEN-2026-003',
  'office-formal-men-2026-003',
  ARRAY['/men_3.png'],
  'BEST_SELLER',
  'Best Seller',
  (SELECT id FROM public.categories WHERE name = 'Men''s Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'hello-brother' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Denim Series',
  'MEN-2026-004',
  'denim-series-men-2026-004',
  ARRAY['/men_4.png'],
  'HOT',
  'Hot',
  (SELECT id FROM public.categories WHERE name = 'Men''s Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'munkey' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Weekend Vibes',
  'MEN-2026-005',
  'weekend-vibes-men-2026-005',
  ARRAY['/men_5.png'],
  'NONE',
  'Bulk Price',
  (SELECT id FROM public.categories WHERE name = 'Men''s Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'tejoo' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Young Trendsetter',
  'KDS-2026-001',
  'young-trendsetter-kds-2026-001',
  ARRAY['/kids_1.png'],
  'NONE',
  'Bulk Available',
  (SELECT id FROM public.categories WHERE name = 'Kids'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'tejoo-premium' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Playful Prints',
  'KDS-2026-002',
  'playful-prints-kds-2026-002',
  ARRAY['/kids_2.png'],
  'NEW',
  'New Arrival',
  (SELECT id FROM public.categories WHERE name = 'Kids'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'toxy' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Little Explorer',
  'KDS-2026-003',
  'little-explorer-kds-2026-003',
  ARRAY['/kids_3.png'],
  'NONE',
  'Best Offer',
  (SELECT id FROM public.categories WHERE name = 'Kids'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'vipin' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Holiday Wear',
  'KDS-2026-004',
  'holiday-wear-kds-2026-004',
  ARRAY['/kids_4.png'],
  'NONE',
  'Trending',
  (SELECT id FROM public.categories WHERE name = 'Kids'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = '5g-jeans' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Smart Casuals',
  'KDS-2026-005',
  'smart-casuals-kds-2026-005',
  ARRAY['/kids_5.png'],
  'HOT',
  'Hot Seller',
  (SELECT id FROM public.categories WHERE name = 'Kids'' Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'black-jack' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Silk Kanjivaram',
  'SARE-2026-001',
  'silk-kanjivaram-sare-2026-001',
  ARRAY['/saree_1.png'],
  'NONE',
  'Elite',
  (SELECT id FROM public.categories WHERE name = 'Saree' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'denis-park' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Banarasi Weave',
  'SARE-2026-002',
  'banarasi-weave-sare-2026-002',
  ARRAY['/saree_2.png'],
  'NONE',
  'Bulk Available',
  (SELECT id FROM public.categories WHERE name = 'Saree' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'flu' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Chiffon Elegance',
  'SARE-2026-003',
  'chiffon-elegance-sare-2026-003',
  ARRAY['/saree_3.png'],
  'BEST_SELLER',
  'Best Seller',
  (SELECT id FROM public.categories WHERE name = 'Saree' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'izaro' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Cotton Daily',
  'SARE-2026-004',
  'cotton-daily-sare-2026-004',
  ARRAY['/ethnic_6.png'],
  'NONE',
  'Value Pack',
  (SELECT id FROM public.categories WHERE name = 'Saree' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'spark' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Zari Border',
  'SARE-2026-005',
  'zari-border-sare-2026-005',
  ARRAY['/ethnic_7.png'],
  'HOT',
  'Hot Choice',
  (SELECT id FROM public.categories WHERE name = 'Saree' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'h-s' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Plush Comfort',
  'BLK-2026-001',
  'plush-comfort-blk-2026-001',
  ARRAY['/blanket_1.png'],
  'NONE',
  'Winter King',
  (SELECT id FROM public.categories WHERE name = 'Blanket' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'h-s-kids' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Velvet Soft',
  'BLK-2026-002',
  'velvet-soft-blk-2026-002',
  ARRAY['/blanket_2.png'],
  'NONE',
  'Premium',
  (SELECT id FROM public.categories WHERE name = 'Blanket' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'happy-boy' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Dual Sided',
  'BLK-2026-003',
  'dual-sided-blk-2026-003',
  ARRAY['/blanket_3.png'],
  'HOT',
  'Hot Seller',
  (SELECT id FROM public.categories WHERE name = 'Blanket' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'hello-brother' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Fleece Warmth',
  'BLK-2026-004',
  'fleece-warmth-blk-2026-004',
  ARRAY['/blanket_4.png'],
  'NONE',
  'Bulk Price',
  (SELECT id FROM public.categories WHERE name = 'Blanket' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'munkey' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Luxury Mink',
  'BLK-2026-005',
  'luxury-mink-blk-2026-005',
  ARRAY['/blanket_5.png'],
  'NONE',
  'Trending',
  (SELECT id FROM public.categories WHERE name = 'Blanket' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'tejoo' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Festive Ethnic',
  'ETH-2026-001',
  'festive-ethnic-eth-2026-001',
  ARRAY['/ethnic_1.png'],
  'NEW',
  'New Style',
  (SELECT id FROM public.categories WHERE name = 'Ethnic Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'tejoo-premium' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Traditional Lehnga',
  'ETH-2026-002',
  'traditional-lehnga-eth-2026-002',
  ARRAY['/ethnic_2.png'],
  'NONE',
  'Bulk Only',
  (SELECT id FROM public.categories WHERE name = 'Ethnic Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'toxy' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Designer Anarkali',
  'ETH-2026-003',
  'designer-anarkali-eth-2026-003',
  ARRAY['/ethnic_3.png'],
  'NONE',
  'Trending',
  (SELECT id FROM public.categories WHERE name = 'Ethnic Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'vipin' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Wedding Gallery',
  'ETH-2026-004',
  'wedding-gallery-eth-2026-004',
  ARRAY['/ethnic_4.png'],
  'HOT',
  'Hot',
  (SELECT id FROM public.categories WHERE name = 'Ethnic Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = '5g-jeans' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)
VALUES (
  'Ceremonial Silk',
  'ETH-2026-005',
  'ceremonial-silk-eth-2026-005',
  ARRAY['/ethnic_5.png'],
  'NONE',
  'Premium',
  (SELECT id FROM public.categories WHERE name = 'Ethnic Wear' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'black-jack' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

