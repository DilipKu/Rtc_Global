import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';
import { Calendar, Clock, ChevronLeft, User, Share2 } from 'lucide-react';
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
            author: data.author || 'RTC Admin'
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
          <button onClick={() => navigate('/blog')} className={styles.backBtn}>
            <ChevronLeft size={16} /> Back to Blog
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* ── Article Header ── */}
      <header className={styles.header}>
        <div className={styles.heroOverlay}>
          <img src={blog.image} alt={blog.title} className={styles.heroImage} />
          <div className={styles.heroGradient} />
        </div>
        
        <div className={`container ${styles.headerContent}`}>
          <button onClick={() => navigate('/blog')} className={styles.backLink}>
            <ChevronLeft size={16} /> Back to Blog
          </button>
          
          <div className={styles.metaTop}>
            <span className={styles.category}>{blog.category}</span>
          </div>
          
          <h1 className={styles.title}>{blog.title}</h1>
          
          <div className={styles.metaBottom}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>
                <User size={18} />
              </div>
              <div className={styles.authorText}>
                <span className={styles.authorName}>{blog.author}</span>
                <span className={styles.dateRead}>
                  <Calendar size={12} /> {blog.date} &nbsp;•&nbsp; <Clock size={12} /> {blog.readTime}
                </span>
              </div>
            </div>
            
            <button className={styles.shareBtn} aria-label="Share Article">
              <Share2 size={16} /> Share
            </button>
          </div>
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
