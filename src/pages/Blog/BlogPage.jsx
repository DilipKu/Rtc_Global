import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          const mapped = data.map(b => ({
            id: b.slug || b.id,
            title: b.title,
            image: b.image_url || 'https://via.placeholder.com/600x400?text=Blog',
            category: 'Industry Update',
            date: new Date(b.created_at).toLocaleDateString(),
            readTime: '5 min read',
            snippet: b.excerpt,
            author: b.author || 'RTC Admin',
          }));
          setBlogs(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch blogs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} className={styles.breadcrumbIcon} />
            <span>Blog</span>
          </div>
          <h1 className={styles.headerTitle}>B2B Industry Insights</h1>
          <p className={styles.headerSubtitle}>
            Expert advice, market trends, and sourcing strategies for clothing retailers and wholesalers.
          </p>
        </div>
      </header>

      {/* ── Blog Grid ── */}
      <section className={styles.content}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
              No articles published yet. Check back later!
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {blogs.map((blog, index) => (
                <article 
                  key={blog.id} 
                  className={`${styles.blogCard} reveal`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.imageWrapper}>
                    <img src={blog.image} alt={blog.title} className={styles.blogImage} loading="lazy" />
                    <span className={styles.categoryBadge}>{blog.category}</span>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.metaInfo}>
                      <span className={styles.metaItem}>
                        <Calendar size={14} /> {blog.date}
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} /> {blog.readTime}
                      </span>
                    </div>
                    
                    <h2 className={styles.blogTitle}>
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h2>
                    
                    <p className={styles.blogSnippet}>{blog.snippet}</p>
                    
                    <div className={styles.cardFooter}>
                      <span className={styles.author}>By {blog.author}</span>
                      <Link to={`/blog/${blog.id}`} className={styles.readMoreBtn}>
                        Read Article <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
