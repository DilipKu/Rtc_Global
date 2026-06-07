const fs = require('fs');

// We have to mock the imports or just parse the JS. 
// It's easier to just read the file and extract the data if it was JSON, 
// but it's JS with `export const`. Let's just use ES module import if possible, 
// or I'll copy the arrays directly here.

const categories = [
  "Ladies' Wear",
  "Men's Wear",
  "Kids' Wear",
  "Saree",
  "Blanket",
  "Ethnic Wear"
];

const products = [
  { sku: 'LDS-2026-001', collection: 'Summer Florals', category: "Ladies' Wear", badge: 'Best Seller', image: '/ladies_1.png' },
  { sku: 'LDS-2026-002', collection: 'Boutique Fusion', category: "Ladies' Wear", badge: 'New Arrival', image: '/ladies_2.png' },
  { sku: 'LDS-2026-003', collection: 'Cotton Comfort', category: "Ladies' Wear", badge: 'Bulk available', image: '/ladies_3.png' },
  { sku: 'LDS-2026-004', collection: 'Designer Kurtis', category: "Ladies' Wear", badge: 'Hot Choice', image: '/ladies_4.png' },
  { sku: 'LDS-2026-005', collection: 'Festive Special', category: "Ladies' Wear", badge: 'Trending', image: '/ladies_5.png' },
  { sku: 'LDS-2026-006', collection: 'Casual Denim', category: "Ladies' Wear", badge: 'Popular', image: '/ladies_6.png' },
  { sku: 'LDS-2026-007', collection: 'Couple Couture', category: "Ladies' Wear", badge: 'Premium Match', image: '/ladies_7.png' },
  { sku: 'MEN-2026-001', collection: 'Casual Everyday', category: "Men's Wear", badge: 'New Arrival', image: '/men_1.png' },
  { sku: 'MEN-2026-002', collection: 'Linen Collection', category: "Men's Wear", badge: 'Premium', image: '/men_2.png' },
  { sku: 'MEN-2026-003', collection: 'Office Formal', category: "Men's Wear", badge: 'Best Seller', image: '/men_3.png' },
  { sku: 'MEN-2026-004', collection: 'Denim Series', category: "Men's Wear", badge: 'Hot', image: '/men_4.png' },
  { sku: 'MEN-2026-005', collection: 'Weekend Vibes', category: "Men's Wear", badge: 'Bulk Price', image: '/men_5.png' },
  { sku: 'KDS-2026-001', collection: 'Young Trendsetter', category: "Kids' Wear", badge: 'Bulk Available', image: '/kids_1.png' },
  { sku: 'KDS-2026-002', collection: 'Playful Prints', category: "Kids' Wear", badge: 'New Arrival', image: '/kids_2.png' },
  { sku: 'KDS-2026-003', collection: 'Little Explorer', category: "Kids' Wear", badge: 'Best Offer', image: '/kids_3.png' },
  { sku: 'KDS-2026-004', collection: 'Holiday Wear', category: "Kids' Wear", badge: 'Trending', image: '/kids_4.png' },
  { sku: 'KDS-2026-005', collection: 'Smart Casuals', category: "Kids' Wear", badge: 'Hot Seller', image: '/kids_5.png' },
  { sku: 'SARE-2026-001', collection: 'Silk Kanjivaram', category: "Saree", badge: 'Elite', image: '/saree_1.png' },
  { sku: 'SARE-2026-002', collection: 'Banarasi Weave', category: "Saree", badge: 'Bulk Available', image: '/saree_2.png' },
  { sku: 'SARE-2026-003', collection: 'Chiffon Elegance', category: "Saree", badge: 'Best Seller', image: '/saree_3.png' },
  { sku: 'SARE-2026-004', collection: 'Cotton Daily', category: "Saree", badge: 'Value Pack', image: '/ethnic_6.png' },
  { sku: 'SARE-2026-005', collection: 'Zari Border', category: "Saree", badge: 'Hot Choice', image: '/ethnic_7.png' },
  { sku: 'BLK-2026-001', collection: 'Plush Comfort', category: "Blanket", badge: 'Winter King', image: '/blanket_1.png' },
  { sku: 'BLK-2026-002', collection: 'Velvet Soft', category: "Blanket", badge: 'Premium', image: '/blanket_2.png' },
  { sku: 'BLK-2026-003', collection: 'Dual Sided', category: "Blanket", badge: 'Hot Seller', image: '/blanket_3.png' },
  { sku: 'BLK-2026-004', collection: 'Fleece Warmth', category: "Blanket", badge: 'Bulk Price', image: '/blanket_4.png' },
  { sku: 'BLK-2026-005', collection: 'Luxury Mink', category: "Blanket", badge: 'Trending', image: '/blanket_5.png' },
  { sku: 'ETH-2026-001', collection: 'Festive Ethnic', category: 'Ethnic Wear', badge: 'New Style', image: '/ethnic_1.png' },
  { sku: 'ETH-2026-002', collection: 'Traditional Lehnga', category: 'Ethnic Wear', badge: 'Bulk Only', image: '/ethnic_2.png' },
  { sku: 'ETH-2026-003', collection: 'Designer Anarkali', category: 'Ethnic Wear', badge: 'Trending', image: '/ethnic_3.png' },
  { sku: 'ETH-2026-004', collection: 'Wedding Gallery', category: 'Ethnic Wear', badge: 'Hot', image: '/ethnic_4.png' },
  { sku: 'ETH-2026-005', collection: 'Ceremonial Silk', category: 'Ethnic Wear', badge: 'Premium', image: '/ethnic_5.png' }
];

const branchLocations = [
  {
    id: "br1",
    city: "Gandhi Nagar (Delhi Hub)",
    person: "Satendra Shaky / Ravi Shankar / Manoj Sharma / Sunil Tomar",
    address: "X/2210, Gali No. 10, Kailash Nagar, Gandhi Nagar, Delhi-110031",
    phones: ["9560992821", "9654038842", "9582746695", "8800474252"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    isHeadOffice: true,
    size: "large"
  },
  {
    id: "br2",
    city: "Chandni Chowk Desk",
    person: "Ravi Shankar",
    address: "Chandni Chowk Sourcing Market, Delhi-110006",
    phones: ["9654038842"],
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br3",
    city: "Tank Road & Raghubir Nagar",
    person: "Mohit Kumar",
    address: "Tank Road Garment Cluster, Karol Bagh, Delhi-110005",
    phones: ["8386000171"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br4",
    city: "Jafrabad & Panipat Hub",
    person: "Vicky Verma",
    address: "Sector 29, Industrial Area, Panipat, Haryana-132103",
    phones: ["9213222728"],
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br5",
    city: "Amroha, Hathras & Kanth",
    person: "Vimal Singh",
    address: "Main Bazar Road, Hathras, Uttar Pradesh-204101",
    phones: ["9999353587"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br6",
    city: "Ludhiana Textile Office",
    person: "Monu Jain / Naresh Sharma",
    address: "Industrial Area-A, Ludhiana, Punjab-141003",
    phones: ["9877934022", "7743069779"],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br7",
    city: "Bengaluru Hub",
    person: "Arihant Bhandari",
    address: "Chickpet Commercial Cross, Bengaluru, Karnataka-560053",
    phones: ["9043125401"],
    image: "https://images.unsplash.com/photo-1568249896077-ae954d890612?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br8",
    city: "Kolkata Hub",
    person: "Santosh Bothra",
    address: "Barabazar Sourcing Block, Kolkata, West Bengal-700007",
    phones: ["9910746184"],
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br9",
    city: "Tirupur Sourcing Center",
    person: "Naveen Kashyap / Jaiveer Singh",
    address: "Avinashi Road Knitwear Cluster, Tirupur, Tamil Nadu-641602",
    phones: ["9042080166", "8588069623"],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br10",
    city: "Ahmedabad & Bhavnagar",
    person: "Sanjay Parihar",
    address: "Maskati Cloth Market, Ahmedabad, Gujarat-380002",
    phones: ["9601038230"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br11",
    city: "Jaipur Sourcing Office",
    person: "Dilip Kothari",
    address: "Johari Bazar, Jaipur, Rajasthan-302003",
    phones: ["9664314475"],
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br12",
    city: "Nagpur & Amravati",
    person: "Ankit Jain",
    address: "Itwari Cloth Market, Nagpur, Maharashtra-440002",
    phones: ["9975978629"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br13",
    city: "Indore & Jabalpur",
    person: "Narendra (Kake) / Praveen Sharma / Hemant",
    address: "MT Cloth Market, Indore, Madhya Pradesh-452002",
    phones: ["9643950382", "7987084109", "9718361756"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br14",
    city: "Kanpur Hub",
    person: "Ashish Tiwari",
    address: "General Ganj, Kanpur, Uttar Pradesh-208001",
    phones: ["9560769206"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br15",
    city: "Mumbai Hub",
    person: "Pankaj Prajapat",
    address: "Mangaldas Market, Kalbadevi, Mumbai-400002",
    phones: ["8696448492"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br16",
    city: "Ulhas Nagar",
    person: "Hemant Kumar",
    address: "Ulhasnagar Garment Market, Thane, Maharashtra-421001",
    phones: ["7701983140"],
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br17",
    city: "Surat Sourcing Desk",
    person: "Ram Prasad Sharma",
    address: "Ring Road Textile Market, Surat, Gujarat-395002",
    phones: ["8619195709"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  },
  {
    id: "br18",
    city: "Erode & Madurai Desk",
    person: "Raghuveer Singh",
    address: "Erode Textile Market, Erode, Tamil Nadu-638001",
    phones: ["9315617931"],
    image: "https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?w=600&q=80",
    isHeadOffice: false,
    size: "normal"
  }
];

const localBrands = [
  { name: '5G Jeans', slug: '5g-jeans' },
  { name: 'Black Jack', slug: 'black-jack' },
  { name: 'Denis Park', slug: 'denis-park' },
  { name: 'FLU', slug: 'flu' },
  { name: 'Izaro', slug: 'izaro' },
  { name: 'Spark', slug: 'spark' },
  { name: 'H S', slug: 'h-s' },
  { name: 'H S Kids', slug: 'h-s-kids' },
  { name: 'Happy Boy', slug: 'happy-boy' },
  { name: 'Hello Brother', slug: 'hello-brother' },
  { name: 'Munkey', slug: 'munkey' },
  { name: 'Tejoo', slug: 'tejoo' },
  { name: 'Tejoo Premium', slug: 'tejoo-premium' },
  { name: 'Toxy', slug: 'toxy' },
  { name: 'Vipin', slug: 'vipin' },
];

let sql = `-- =====================================================================================\n`;
sql += `-- SEED DATA FOR RTC GLOBAL\n`;
sql += `-- Run this script in the Supabase SQL Editor to populate dummy data.\n`;
sql += `-- =====================================================================================\n\n`;

sql += `-- 1. Brands\n`;
let sortOrder = 1;
for (const b of localBrands) {
  sql += `INSERT INTO public.brands (name, slug, sort_order) \n`;
  sql += `VALUES ('${b.name.replace(/'/g, "''")}', '${b.slug}', ${sortOrder})\n`;
  sql += `ON CONFLICT (slug) DO NOTHING;\n\n`;
  sortOrder++;
}

sql += `-- 2. Categories\n`;
for (const cat of categories) {
  const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  sql += `INSERT INTO public.categories (name, slug) VALUES ('${cat.replace(/'/g, "''")}', '${slug}') ON CONFLICT (slug) DO NOTHING;\n`;
}
sql += `\n`;

sql += `-- 3. Branches\n`;
for (const branch of branchLocations) {
  const code = branch.id;
  const name = branch.city.replace(/'/g, "''");
  const type = branch.isHeadOffice ? 'HEAD_OFFICE' : 'BRANCH';
  const manager = branch.person.replace(/'/g, "''");
  
  // Format address as valid JSON string inside SQL
  const addrJson = JSON.stringify({ street: branch.address, city: branch.city }).replace(/'/g, "''");
  
  // Format phones as PostgreSQL text array literal, e.g. '{ "9560992821", "9654038842" }'
  const phonesArray = '{' + branch.phones.map(p => '"' + p + '"').join(',') + '}';
  
  sql += `INSERT INTO public.branches (code, name, type, address, manager, phone_numbers, image_url)\n`;
  sql += `VALUES ('${code}', '${name}', '${type}', '${addrJson}'::jsonb, '${manager}', '${phonesArray}'::text[], '${branch.image}')\n`;
  sql += `ON CONFLICT (code) DO NOTHING;\n\n`;
}
sql += `\n`;

sql += `-- 4. Products\n`;
let brandIndex = 0;
for (const prod of products) {
  const slug = prod.collection.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const tagMap = {
    'Best Seller': 'BEST_SELLER',
    'New Arrival': 'NEW',
    'New Style': 'NEW',
    'Hot Choice': 'HOT',
    'Hot': 'HOT',
    'Hot Seller': 'HOT'
  };
  const tag = tagMap[prod.badge] || 'NONE';
  const assignedBrand = localBrands[brandIndex % localBrands.length].slug;
  brandIndex++;

  sql += `INSERT INTO public.products (name, sku, slug, images, tag, price_label, category_id, brand_id)\n`;
  sql += `VALUES (\n`;
  sql += `  '${prod.collection.replace(/'/g, "''")}',\n`;
  sql += `  '${prod.sku}',\n`;
  sql += `  '${slug}-${prod.sku.toLowerCase()}',\n`;
  sql += `  ARRAY['${prod.image}'],\n`;
  sql += `  '${tag}',\n`;
  sql += `  '${prod.badge.replace(/'/g, "''")}',\n`;
  sql += `  (SELECT id FROM public.categories WHERE name = '${prod.category.replace(/'/g, "''")}' LIMIT 1),\n`;
  sql += `  (SELECT id FROM public.brands WHERE slug = '${assignedBrand}' LIMIT 1)\n`;
  sql += `)\n`;
  sql += `ON CONFLICT (slug) DO NOTHING;\n\n`;
}

fs.writeFileSync('./supabase/migrations/rtc_global_seed_data.sql', sql);
console.log('Seed SQL generated successfully!');
