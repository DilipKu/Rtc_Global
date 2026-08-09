import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDynamicSeo } from '../../hooks/useDynamicSeo';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { useBrands } from '../../hooks/useBrands';
import { getCategorySeoUrl, resolveCategoryFromSlug, getCategorySlug } from '../../utils/categorySlug';
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

  const categorySlug = activeCategory ? activeCategory.slug : pathCategorySlug;
  const seoKey = activeCategory ? getCategorySlug(activeCategory) : pathCategorySlug;
  const catTitle = activeCategory ? activeCategory.name : (pathCategorySlug ? pathCategorySlug.replace(/-/g, ' ') : '');
  
  const seoHelmet = useDynamicSeo(seoKey || '/collections', {
    title: catTitle ? `${catTitle} - Wholesale Suppliers India | RTC Global` : 'Our Latest Collection - RTC Global Apparels',
    description: catTitle ? `Explore wholesale ${catTitle} collections at RTC Global.` : 'Explore wholesale garment collections.',
    canonical: categorySlug ? `https://rtcglobalapparels.com/collections/${categorySlug}` : 'https://rtcglobalapparels.com/collections'
  });

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
      {seoHelmet}
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
