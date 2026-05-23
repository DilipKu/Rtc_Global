import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { useBrands } from '../../hooks/useBrands';
import styles from './CollectionsPage.module.css';

const CollectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId  = searchParams.get('category') || 'all';
  const brandSlug   = searchParams.get('brand')    || 'all';
  const brandName   = searchParams.get('brandName') || '';

  const { categories, loading: categoriesLoading } = useCategories();
  const { brands,     loading: brandsLoading }     = useBrands();

  // Build product query params
  const productParams = {};
  if (categoryId !== 'all') productParams.category = categoryId;
  if (brandSlug  !== 'all') productParams.brand    = brandSlug;

  const { products, loading: productsLoading } = useProducts(productParams);

  // ── Filter handlers ──────────────────────────────────────────
  const handleCategoryFilter = (id) => {
    const next = {};
    if (id !== 'all') next.category = id;
    // keep brand filter if active
    if (brandSlug !== 'all') { next.brand = brandSlug; next.brandName = brandName; }
    setSearchParams(next);
  };

  const handleBrandFilter = (slug, name) => {
    const next = {};
    if (slug !== 'all') { next.brand = slug; next.brandName = name; }
    // keep category filter if active
    if (categoryId !== 'all') next.category = categoryId;
    setSearchParams(next);
  };

  // ── Display labels ───────────────────────────────────────────
  const currentCategoryName = categoryId === 'all'
    ? 'All'
    : categories.find(c => c.id === categoryId)?.name || 'Collection';

  const activeBrandName = brandSlug === 'all' ? 'All Brands' : (brandName || brandSlug);

  const pageSubtitle = brandSlug !== 'all'
    ? `Showing ${activeBrandName} products${categoryId !== 'all' ? ` in ${currentCategoryName}` : ''}`
    : `Browse our premium wholesale ${currentCategoryName.toLowerCase()} collections`;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="heading-xl">Our Collections</h1>
          <p className="text-body text-dim">{pageSubtitle}</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">

          {/* ── Category Filters ── */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Category</span>
            <div className={styles.filters}>
              <button
                className={`${styles.filterBtn} ${categoryId === 'all' ? styles.active : ''}`}
                onClick={() => handleCategoryFilter('all')}
              >
                All
              </button>
              {!categoriesLoading && categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${categoryId === cat.id ? styles.active : ''}`}
                  onClick={() => handleCategoryFilter(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
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
                      to={`/enquiry?product=${encodeURIComponent(product.collection)}&sku=${product.sku}`}
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
      </section>
    </main>
  );
};

export default CollectionsPage;
