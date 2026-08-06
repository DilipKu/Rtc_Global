import React, { useMemo, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { useBrands } from '../../hooks/useBrands';
import { getCategorySeoUrl, resolveCategoryFromSlug } from '../../utils/categorySlug';
import styles from './CollectionsPage.module.css';

const CollectionsPage = ({ categorySlug: propCategorySlug }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  // Active category slug from props, route params, or query string
  const pathCategorySlug = propCategorySlug || params.categorySlug;
  const searchCategory = searchParams.get('category');
  const brandSlug = searchParams.get('brand') || 'all';
  const brandName = searchParams.get('brandName') || '';

  // Resolve active category object
  const activeCategory = useMemo(() => {
    const rawIdentifier = pathCategorySlug || searchCategory;
    if (!rawIdentifier || rawIdentifier === 'all') return null;
    return resolveCategoryFromSlug(rawIdentifier, categories);
  }, [pathCategorySlug, searchCategory, categories]);

  const activeCategoryId = activeCategory ? activeCategory.id : (pathCategorySlug || searchCategory || 'all');

  // Build product query params
  const productParams = {};
  if (activeCategoryId !== 'all') {
    productParams.category = pathCategorySlug || searchCategory || activeCategoryId;
  }
  if (brandSlug !== 'all') {
    productParams.brand = brandSlug;
  }

  const { products, loading: productsLoading } = useProducts(productParams);

  // Set document title and SEO meta tags
  useEffect(() => {
    const catTitle = activeCategory ? activeCategory.name : (pathCategorySlug ? pathCategorySlug.replace(/-/g, ' ') : '');
    
    // Helper functions for meta tags
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const categorySlug = activeCategory ? activeCategory.slug : pathCategorySlug;

    if (categorySlug === 'wholesale-ladies-wear-suppliers') {
      document.title = 'Wholesale Ladies Wear Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Find trusted Wholesale Ladies Wear Suppliers with RTC Global Apparels. Quality ladies wear sourcing, bulk supply, and reliable distribution across India.');
      setMeta('keywords', 'Wholesale Ladies Wear Suppliers, Wholesale Ladies Wear Dealers, Wholesale Ladies Wear Distributor');
      
      setMeta('og:title', 'Wholesale Ladies Wear Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Find trusted Wholesale Ladies Wear Suppliers with RTC Global Apparels. Quality ladies wear sourcing, bulk supply, and reliable distribution across India.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-ladies-wear-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Ladies Wear Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Find trusted Wholesale Ladies Wear Suppliers with RTC Global Apparels. Quality ladies wear sourcing, bulk supply, and reliable distribution across India.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-ladies-wear-suppliers');
    } else if (categorySlug === 'wholesale-kids-wear-suppliers') {
      document.title = 'Wholesale Kids Wear Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Choose RTC Global Apparels for trusted Wholesale Kids Wear Suppliers offering quality kidswear sourcing, bulk supply, and reliable distribution across India.');
      setMeta('keywords', 'Wholesale Kids Wear Suppliers, Wholesale Kids Wear Dealers, Wholesale Kids Wear Distributor');
      
      setMeta('og:title', 'Wholesale Kids Wear Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Choose RTC Global Apparels for trusted Wholesale Kids Wear Suppliers offering quality kidswear sourcing, bulk supply, and reliable distribution across India.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-kids-wear-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Kids Wear Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Choose RTC Global Apparels for trusted Wholesale Kids Wear Suppliers offering quality kidswear sourcing, bulk supply, and reliable distribution across India.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-kids-wear-suppliers');
    } else if (categorySlug === 'wholesale-mens-wear-suppliers') {
      document.title = 'Wholesale Mens Wear Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Find trusted Wholesale Mens Wear Suppliers at RTC Global Apparels. We offer quality men\'s apparel sourcing, bulk supply, and reliable distribution across India.');
      setMeta('keywords', 'Wholesale Mens Wear Suppliers, Wholesale Mens Wear Dealers, Wholesale Mens Wear Distributor');
      
      setMeta('og:title', 'Wholesale Mens Wear Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Find trusted Wholesale Mens Wear Suppliers at RTC Global Apparels. We offer quality men\'s apparel sourcing, bulk supply, and reliable distribution across India.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-mens-wear-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Mens Wear Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Find trusted Wholesale Mens Wear Suppliers at RTC Global Apparels. We offer quality men\'s apparel sourcing, bulk supply, and reliable distribution across India.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-mens-wear-suppliers');
    } else if (categorySlug === 'wholesale-blanket-suppliers') {
      document.title = 'Wholesale Blanket Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Looking for Wholesale Blanket Suppliers? RTC Global Apparels delivers premium blankets with dependable bulk sourcing, competitive pricing, and timely supply.');
      setMeta('keywords', 'Wholesale Blanket Suppliers, Wholesale Blanket Dealers, Wholesale Blanket Distributor');
      
      setMeta('og:title', 'Wholesale Blanket Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Looking for Wholesale Blanket Suppliers? RTC Global Apparels delivers premium blankets with dependable bulk sourcing, competitive pricing, and timely supply.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-blanket-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Blanket Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Looking for Wholesale Blanket Suppliers? RTC Global Apparels delivers premium blankets with dependable bulk sourcing, competitive pricing, and timely supply.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-blanket-suppliers');
    } else if (categorySlug === 'wholesale-saree-suppliers') {
      document.title = 'Wholesale Saree Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Discover trusted Wholesale Saree Suppliers at RTC Global Apparels. Source quality sarees in bulk with reliable supply, competitive pricing, and consistent service.');
      setMeta('keywords', 'Wholesale Saree Suppliers, Wholesale Saree Dealers, Wholesale Saree Distributor');
      
      setMeta('og:title', 'Wholesale Saree Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Discover trusted Wholesale Saree Suppliers at RTC Global Apparels. Source quality sarees in bulk with reliable supply, competitive pricing, and consistent service.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-saree-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Saree Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Discover trusted Wholesale Saree Suppliers at RTC Global Apparels. Source quality sarees in bulk with reliable supply, competitive pricing, and consistent service.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-saree-suppliers');
    } else if (categorySlug === 'wholesale-ethnic-wear-suppliers') {
      document.title = 'Wholesale Ethnic Wear Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Choose RTC Global Apparels for Wholesale Ethnic Wear Suppliers offering premium ethnic apparel, reliable bulk sourcing, consistent quality, and timely delivery.');
      setMeta('keywords', 'Wholesale Ethnic Wear Suppliers, Wholesale Ethnic Wear Dealers, Wholesale Ethnic Wear Distributor');
      
      setMeta('og:title', 'Wholesale Ethnic Wear Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Choose RTC Global Apparels for Wholesale Ethnic Wear Suppliers offering premium ethnic apparel, reliable bulk sourcing, consistent quality, and timely delivery.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-ethnic-wear-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Ethnic Wear Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Choose RTC Global Apparels for Wholesale Ethnic Wear Suppliers offering premium ethnic apparel, reliable bulk sourcing, consistent quality, and timely delivery.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-ethnic-wear-suppliers');
    } else if (categorySlug === 'wholesale-western-wear-suppliers') {
      document.title = 'Wholesale Western Wear Suppliers - RTC Global Apparels';
      
      setMeta('description', 'Get premium western apparel from trusted Wholesale Western Wear Suppliers at RTC Global Apparels with reliable bulk sourcing and timely supply.');
      setMeta('keywords', 'Wholesale Western Wear Suppliers, Wholesale Western Wear Dealers, Wholesale Western Wear Distributor');
      
      setMeta('og:title', 'Wholesale Western Wear Suppliers - RTC Global Apparels', true);
      setMeta('og:description', 'Get premium western apparel from trusted Wholesale Western Wear Suppliers at RTC Global Apparels with reliable bulk sourcing and timely supply.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/wholesale-western-wear-suppliers', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Wholesale Western Wear Suppliers - RTC Global Apparels');
      setMeta('twitter:description', 'Get premium western apparel from trusted Wholesale Western Wear Suppliers at RTC Global Apparels with reliable bulk sourcing and timely supply.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/wholesale-western-wear-suppliers');
    } else if (catTitle) {
      document.title = `${catTitle} - Wholesale Suppliers India | RTC Global`;
      // Minimal SEO for sub-categories
      setMeta('description', `Explore wholesale ${catTitle} collections at RTC Global.`);
      setMeta('og:title', `${catTitle} - Wholesale Suppliers India | RTC Global`, true);
      if (categorySlug) {
        setLink('canonical', `https://rtcglobalapparels.com/collections/${categorySlug}`);
      }
    } else {
      // Main Collections Page SEO
      document.title = 'Our Latest Collection - RTC Global Apparels';
      
      setMeta('description', 'Explore wholesale garment collections with trending styles for men, women, kids, sarees, and ethnic wear, backed by reliable B2B supply.');
      setMeta('keywords', 'Wholesale Garment Sourcing & Distribution, Wholesale Western Wear Suppliers, Wholesale Ethnic Wear Suppliers, Wholesale Kurti Suppliers, Wholesale Saree Suppliers, Ladies Garment Wholesaler, Mens Garment Wholesaler, Kids Garment Wholesaler');
      
      setMeta('og:title', 'Our Latest Collection - RTC Global Apparels', true);
      setMeta('og:description', 'Explore wholesale garment collections with trending styles for men, women, kids, sarees, and ethnic wear, backed by reliable B2B supply.', true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://rtcglobalapparels.com/collections', true);
      setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
      setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Our Latest Collection - RTC Global Apparels');
      setMeta('twitter:description', 'Explore wholesale garment collections with trending styles for men, women, kids, sarees, and ethnic wear, backed by reliable B2B supply.');
      setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

      setLink('canonical', 'https://rtcglobalapparels.com/collections');
    }
  }, [activeCategory, pathCategorySlug]);

  // Filter handlers
  const handleCategoryFilter = (cat) => {
    if (!cat || cat === 'all') {
      if (brandSlug !== 'all') {
        navigate(`/collections?brand=${encodeURIComponent(brandSlug)}&brandName=${encodeURIComponent(brandName)}`);
      } else {
        navigate('/collections');
      }
      return;
    }

    const catObj = typeof cat === 'object' ? cat : (categories.find(c => c.id === cat || c.slug === cat) || { slug: cat, id: cat });
    const seoUrl = getCategorySeoUrl(catObj);

    if (brandSlug !== 'all') {
      navigate(`${seoUrl}?brand=${encodeURIComponent(brandSlug)}&brandName=${encodeURIComponent(brandName)}`);
    } else {
      navigate(seoUrl);
    }
  };

  const handleBrandFilter = (slug, name) => {
    const currentSeoUrl = activeCategory ? getCategorySeoUrl(activeCategory) : '/collections';
    if (slug === 'all') {
      navigate(currentSeoUrl);
    } else {
      navigate(`${currentSeoUrl}?brand=${encodeURIComponent(slug)}&brandName=${encodeURIComponent(name)}`);
    }
  };

  // Display labels
  const currentCategoryName = activeCategory
    ? activeCategory.name
    : (pathCategorySlug ? pathCategorySlug.replace(/wholesale-|-suppliers|-india|-wear/gi, ' ').trim() : 'All');

  const activeBrandName = brandSlug === 'all' ? 'All Brands' : (brandName || brandSlug);

  const pageSubtitle = brandSlug !== 'all'
    ? `Showing ${activeBrandName} products${activeCategory ? ` in ${currentCategoryName}` : ''}`
    : activeCategory
      ? `Browse our premium wholesale ${currentCategoryName.toLowerCase()} collection directly from manufacturers`
      : 'Browse our premium wholesale categories directly from top manufacturers';

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className="container">
          <div className={styles.showingStrip}>
            <p>{pageSubtitle}</p>
          </div>

          <div className={styles.layoutWrapper}>
            {/* ── Sidebar Filters ── */}
            <aside className={styles.sidebar}>
              {/* ── Category Filters ── */}
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Category</span>
                <div className={styles.filters}>
                  <button
                    className={`${styles.filterBtn} ${!activeCategory && !pathCategorySlug && searchCategory !== 'all' ? styles.active : ''}`}
                    onClick={() => handleCategoryFilter('all')}
                  >
                    All
                  </button>
                  {!categoriesLoading && categories.map((cat) => {
                    const isSelected = activeCategory ? activeCategory.id === cat.id : (searchCategory === cat.id);
                    return (
                      <button
                        key={cat.id}
                        className={`${styles.filterBtn} ${isSelected ? styles.active : ''}`}
                        onClick={() => handleCategoryFilter(cat)}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Brand Filters ── */}
              {!brandsLoading && brands.length > 0 && (
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>Brand</span>
                  <div className={styles.filters}>
                    <button
                      className={`${styles.filterBtn} ${brandSlug === 'all' ? styles.active : ''}`}
                      onClick={() => handleBrandFilter('all', '')}
                    >
                      All Brands
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        className={`${styles.filterBtn} ${brandSlug === brand.slug ? styles.activeBrand : ''}`}
                        onClick={() => handleBrandFilter(brand.slug, brand.name)}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* ── Main Content ── */}
            <div className={styles.mainContent}>
              {/* ── Products Grid ── */}
              {productsLoading ? (
                <div className={styles.loaderWrapper}>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B1A2F]"></div>
                </div>
              ) : (
                <>
                  <div className={styles.grid}>
                    {products.map((product) => (
                      <div key={product.id} className={styles.cardWrapper}>
                        <Link
                          to={`/enquiry?product=${encodeURIComponent(product.collection)}&sku=${product.sku}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image)}`}
                          className={styles.linkOverlay}
                          aria-label={`Enquiry for ${product.collection}`}
                        />
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </div>

                  {products.length === 0 && (
                    <div className={styles.noResults}>
                      <p>
                        {brandSlug !== 'all'
                          ? `No products found for brand "${activeBrandName}".`
                          : 'No products found in this category.'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CollectionsPage;
