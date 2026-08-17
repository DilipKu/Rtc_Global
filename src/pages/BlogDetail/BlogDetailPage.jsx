import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../config/supabaseClient';
import styles from './BlogDetailPage.module.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
        let query = supabase.from('blogs').select('*');
        
        if (isUuid) {
          query = query.or(`id.eq.${id},slug.eq.${id}`);
        } else {
          query = query.eq('slug', id);
        }
        
        const { data, error } = await query.single();
        
        if (!error && data) {
          setBlog({
            id: data.id,
            title: data.title,
            image: data.image_url || 'https://via.placeholder.com/1200x600?text=Blog',
            category: 'Industry Update',
            date: new Date(data.created_at).toLocaleDateString(),
            readTime: '5 min read',
            content: data.content,
            author: data.author || 'RTC Admin',
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            meta_keywords: data.meta_keywords,
            canonical_url: data.canonical_url
          });
        }
      } catch (e) {
        console.error("Error fetching blog:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <main className={styles.page}><div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div></main>;

  if (!blog) {
    return (
      <main className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Article not found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {blog && (
        <Helmet>
          <title>{blog.meta_title || `${blog.title} | RTC Global Apparels`}</title>
          {blog.meta_description && <meta name="description" content={blog.meta_description} />}
          {blog.meta_keywords && <meta name="keywords" content={blog.meta_keywords} />}
          <meta property="og:title" content={blog.meta_title || blog.title} />
          {blog.meta_description && <meta property="og:description" content={blog.meta_description} />}
          <meta property="og:image" content={blog.image_url || 'https://rtcglobalapparels.com/logo-solid.png'} />
          <meta property="og:type" content="article" />
          {blog.canonical_url && <link rel="canonical" href={blog.canonical_url} />}
        </Helmet>
      )}

      {/* ── Article Header ── */}
      <header className={styles.header}>
        <div className={styles.heroOverlay}>
          <img src={blog.image} alt={blog.title} className={styles.heroImage} />
          <div className={styles.heroGradient} />
        </div>
        
        <div className={`container ${styles.headerContent}`}>
          <h1 className={styles.title}>{blog.title}</h1>
        </div>
      </header>

      {/* ── Article Body ── */}
      <article className={styles.articleBody}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <div 
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </div>
        </div>
      </article>
      
      {/* ── CTA Footer ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Upgrade Your Wholesale Sourcing?</h2>
            <p>Connect with RTC Global's regional desks to secure the best margins on premium denim, casual wear, and more.</p>
            <div className={styles.ctaActions}>
              <Link to="/branches" className={styles.primaryCta}>Find Regional Desk</Link>
              <Link to="/contact" className={styles.secondaryCta}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailPage;
