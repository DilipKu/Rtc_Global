import React from 'react';
import { Link } from 'react-router-dom';
import { mockBlogs } from '../../data/mockBlogs';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import styles from './BlogPage.module.css';

const BlogPage = () => {
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
          <div className={styles.blogGrid}>
            {mockBlogs.map((blog, index) => (
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
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
