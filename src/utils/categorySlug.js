// SEO Slug mapping for categories
export const CATEGORY_SEO_MAPPINGS = {
  // Key: normalized category label/id/slug -> Value: clean SEO slug
  'saree': 'wholesale-saree-suppliers',
  'sarees': 'wholesale-saree-suppliers',
  'saree collection': 'wholesale-saree-suppliers',
  'artisanal heritage sarees': 'wholesale-saree-suppliers',
  
  'kurti': 'wholesale-kurti-suppliers-india',
  'kurtis': 'wholesale-kurti-suppliers-india',
  'kurti collection': 'wholesale-kurti-suppliers-india',
  
  'western': 'wholesale-western-wear-suppliers',
  'western wear': 'wholesale-western-wear-suppliers',
  'womenswear': 'wholesale-western-wear-suppliers',
  'ladies collection': 'wholesale-ladies-wear-suppliers',
  "women's collection": 'wholesale-ladies-wear-suppliers',
  'ladies': 'wholesale-ladies-wear-suppliers',
  
  'ethnic': 'wholesale-ethnic-wear-suppliers',
  'ethnic wear': 'wholesale-ethnic-wear-suppliers',
  'ethnic collection': 'wholesale-ethnic-wear-suppliers',
  'contemporary festive wear': 'wholesale-ethnic-wear-suppliers',

  'men': 'wholesale-mens-wear-suppliers',
  'menswear': 'wholesale-mens-wear-suppliers',
  "men's collection": 'wholesale-mens-wear-suppliers',
  'menswear essentials': 'wholesale-mens-wear-suppliers',

  'kids': 'wholesale-kids-wear-suppliers',
  'kids wear': 'wholesale-kids-wear-suppliers',
  "kids' wear": 'wholesale-kids-wear-suppliers',
  'kids collection': 'wholesale-kids-wear-suppliers',
  'organic kids wear': 'wholesale-kids-wear-suppliers',

  'blanket': 'wholesale-blanket-suppliers',
  'blankets': 'wholesale-blanket-suppliers',
  'blanket collection': 'wholesale-blanket-suppliers',
  'blankets & home': 'wholesale-blanket-suppliers',
  'luxe home textiles': 'wholesale-blanket-suppliers'
};

// Map SEO slug back to friendly display key or category keywords
export const REVERSE_SEO_MAPPINGS = {
  'wholesale-saree-suppliers': ['saree', 'sarees', 'artisanal heritage sarees'],
  'wholesale-kurti-suppliers-india': ['kurti', 'kurtis'],
  'wholesale-western-wear-suppliers': ['western', 'womenswear', 'western wear'],
  'wholesale-ladies-wear-suppliers': ['ladies collection', "women's collection", 'ladies'],
  'wholesale-ethnic-wear-suppliers': ['ethnic', 'ethnic wear', 'contemporary festive wear'],
  'wholesale-mens-wear-suppliers': ['men', 'menswear', "men's collection", 'menswear essentials'],
  'wholesale-kids-wear-suppliers': ['kids', 'kids wear', "kids' wear", 'kids collection', 'organic kids wear'],
  'wholesale-blanket-suppliers': ['blanket', 'blankets', 'blankets & home', 'luxe home textiles']
};

/**
 * Generates clean SEO slug from category object or name
 */
export const getCategorySlug = (category) => {
  if (!category) return '';

  // If category already has an explicit SEO slug format
  if (category.slug && category.slug.startsWith('wholesale-')) {
    return category.slug;
  }

  const rawKey = (category.slug || category.label || category.name || category.id || '').toString().toLowerCase().trim();
  
  if (CATEGORY_SEO_MAPPINGS[rawKey]) {
    return CATEGORY_SEO_MAPPINGS[rawKey];
  }

  // Check if any mapping key matches part of rawKey
  for (const [key, seoSlug] of Object.entries(CATEGORY_SEO_MAPPINGS)) {
    if (rawKey.includes(key) || key.includes(rawKey)) {
      return seoSlug;
    }
  }

  // Fallback to normalized slug
  const fallback = rawKey.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return fallback ? `wholesale-${fallback}-india` : 'collections';
};

/**
 * Returns full URL path for a category
 */
export const getCategorySeoUrl = (category) => {
  if (!category) return '/collections';
  if (typeof category === 'string') {
    const slug = getCategorySlug({ slug: category });
    return `/${slug}`;
  }
  const slug = getCategorySlug(category);
  return `/${slug}`;
};

/**
 * Resolves a URL category parameter (ID or slug) to matching category object
 */
export const resolveCategoryFromSlug = (slugOrId, categories = []) => {
  if (!slugOrId || slugOrId === 'all') return null;
  
  const normalized = slugOrId.toLowerCase().trim();

  // 1. Direct ID match
  let matched = categories.find(c => String(c.id).toLowerCase() === normalized);
  if (matched) return matched;

  // 2. Direct slug match
  matched = categories.find(c => (c.slug && c.slug.toLowerCase() === normalized));
  if (matched) return matched;

  // 3. Match via SEO slug calculation
  matched = categories.find(c => getCategorySlug(c) === normalized);
  if (matched) return matched;

  // 4. Reverse keyword lookup
  const keywords = REVERSE_SEO_MAPPINGS[normalized];
  if (keywords && keywords.length > 0) {
    matched = categories.find(c => {
      const cName = (c.name || '').toLowerCase();
      const cLabel = (c.label || '').toLowerCase();
      const cSlug = (c.slug || '').toLowerCase();
      return keywords.some(k => cName.includes(k) || cLabel.includes(k) || cSlug.includes(k));
    });
    if (matched) return matched;
  }

  return null;
};
