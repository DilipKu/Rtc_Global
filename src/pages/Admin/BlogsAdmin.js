import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import RichTextEditor from '../../components/admin/RichTextEditor';
import './Admin.css';

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ 
    title: '', slug: '', excerpt: '', content: '', 
    author: '', image_url: '', is_published: true,
    // SEO Fields
    meta_title: '', meta_description: '', meta_keywords: '',
    canonical_tag: '', feature_image: '', og_image: '', twitter_image: '',
    og_tags: { title: '', description: '', image: '' },
    twitter_card_tags: { title: '', description: '', image: '' }
  });
  const [file, setFile] = useState(null);
  const [featureImageFile, setFeatureImageFile] = useState(null);
  const [ogImageFile, setOgImageFile] = useState(null);
  const [twitterImageFile, setTwitterImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Auto-populate og_tags and twitter_card_tags from meta_title and meta_description
  const updateSEOTags = (data) => {
    const ogImage = data.og_image || data.image_url || '';
    const twitterImage = data.twitter_image || data.image_url || '';
    return {
      ...data,
      og_tags: {
        title: data.meta_title || data.title || '',
        description: data.meta_description || data.excerpt || '',
        image: ogImage
      },
      twitter_card_tags: {
        title: data.meta_title || data.title || '',
        description: data.meta_description || data.excerpt || '',
        image: twitterImage
      }
    };
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (!error) setBlogs(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ 
      title: '', slug: '', excerpt: '', content: '', 
      author: '', image_url: '', is_published: true,
      meta_title: '', meta_description: '', meta_keywords: '',
      canonical_tag: '', feature_image: '', og_image: '', twitter_image: '',
      og_tags: { title: '', description: '', image: '' },
      twitter_card_tags: { title: '', description: '', image: '' }
    });
    setFile(null);
    setFeatureImageFile(null);
    setOgImageFile(null);
    setTwitterImageFile(null);
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setFile(null);
    setFeatureImageFile(null);
    setOgImageFile(null);
    setTwitterImageFile(null);
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await supabase.from('blogs').delete().eq('id', id);
      fetchBlogs();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.image_url;
      let finalFeatureImage = formData.feature_image;
      let finalOgImage = formData.og_image;
      let finalTwitterImage = formData.twitter_image;

      if (file) {
        finalImageUrl = await uploadService.uploadImage(file, 'blogs');
      }
      if (featureImageFile) {
        finalFeatureImage = await uploadService.uploadImage(featureImageFile, 'blogs');
      }
      if (ogImageFile) {
        finalOgImage = await uploadService.uploadImage(ogImageFile, 'blogs');
      }
      if (twitterImageFile) {
        finalTwitterImage = await uploadService.uploadImage(twitterImageFile, 'blogs');
      }

      let payload = { 
        ...formData, 
        image_url: finalImageUrl,
        feature_image: finalFeatureImage,
        og_image: finalOgImage,
        twitter_image: finalTwitterImage
      };

      // Auto-populate SEO tags
      payload = updateSEOTags(payload);

      if (currentBlog) {
        await supabase.from('blogs').update(payload).eq('id', currentBlog.id);
      } else {
        await supabase.from('blogs').insert([payload]);
      }
      
      setIsEditing(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Blogs</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              {/* Basic Information */}
              <fieldset className="form-fieldset">
                <legend>Basic Information</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label className="admin-label">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="admin-input" />
                  </div>
                  <div className="form-group">
                    <label className="admin-label">Slug</label>
                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="admin-input" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="admin-label">Author</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="admin-input" />
                </div>

                <div className="form-group">
                  <label className="admin-label">Excerpt</label>
                  <textarea rows="2" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="admin-textarea"></textarea>
                </div>

                <div className="form-group">
                  <label className="admin-label">Content</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({...formData, content})}
                  />
                </div>
              </fieldset>

              {/* Featured Images */}
              <fieldset className="form-fieldset">
                <legend>Featured Images</legend>
                <div className="form-group">
                  <label className="admin-label">Main Image</label>
                  {formData.image_url && <img src={formData.image_url} alt="Blog" className="preview-img-large" style={{maxWidth: '200px', marginBottom: '10px'}} />}
                  <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="admin-input" />
                  <small className="form-help-text">Used as main blog image</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">Feature Image</label>
                  {formData.feature_image && <img src={formData.feature_image} alt="Feature" className="preview-img-large" style={{maxWidth: '200px', marginBottom: '10px'}} />}
                  <input type="file" accept="image/*" onChange={e => setFeatureImageFile(e.target.files[0])} className="admin-input" />
                  <small className="form-help-text">Featured image for blog preview</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">OG Tag Image</label>
                  {formData.og_image && <img src={formData.og_image} alt="OG" className="preview-img-large" style={{maxWidth: '200px', marginBottom: '10px'}} />}
                  <input type="file" accept="image/*" onChange={e => setOgImageFile(e.target.files[0])} className="admin-input" />
                  <small className="form-help-text">Image for Open Graph (social media sharing)</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">Twitter Card Image</label>
                  {formData.twitter_image && <img src={formData.twitter_image} alt="Twitter" className="preview-img-large" style={{maxWidth: '200px', marginBottom: '10px'}} />}
                  <input type="file" accept="image/*" onChange={e => setTwitterImageFile(e.target.files[0])} className="admin-input" />
                  <small className="form-help-text">Image for Twitter Card</small>
                </div>
              </fieldset>

              {/* SEO Settings */}
              <fieldset className="form-fieldset">
                <legend>SEO Settings</legend>
                
                <div className="form-group">
                  <label className="admin-label">Meta Title</label>
                  <input type="text" placeholder="Max 60 characters" maxLength="60" value={formData.meta_title} onChange={e => setFormData({...formData, meta_title: e.target.value})} className="admin-input" />
                  <small className="form-help-text">{formData.meta_title.length}/60 characters</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">Meta Description</label>
                  <textarea rows="2" placeholder="Max 160 characters" maxLength="160" value={formData.meta_description} onChange={e => setFormData({...formData, meta_description: e.target.value})} className="admin-textarea"></textarea>
                  <small className="form-help-text">{formData.meta_description.length}/160 characters</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">Meta Keywords</label>
                  <input type="text" placeholder="Separate keywords with commas" value={formData.meta_keywords} onChange={e => setFormData({...formData, meta_keywords: e.target.value})} className="admin-input" />
                  <small className="form-help-text">Comma-separated keywords for SEO</small>
                </div>

                <div className="form-group">
                  <label className="admin-label">Canonical Tag</label>
                  <input type="url" placeholder="https://example.com/blog/post-slug" value={formData.canonical_tag} onChange={e => setFormData({...formData, canonical_tag: e.target.value})} className="admin-input" />
                  <small className="form-help-text">Canonical URL to prevent duplicate content issues</small>
                </div>
              </fieldset>

              {/* Social Media Preview */}
              <fieldset className="form-fieldset">
                <legend>Social Media Preview</legend>
                <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '15px'}}>
                  <p style={{margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '14px'}}>Open Graph Tags (Facebook, LinkedIn, etc.)</p>
                  <small style={{color: '#666', display: 'block', marginBottom: '10px'}}>
                    Title: {formData.meta_title || formData.title || '(not set)'}<br/>
                    Description: {formData.meta_description || formData.excerpt || '(not set)'}<br/>
                    Image: {formData.og_image || formData.image_url || '(not set)'}
                  </small>
                </div>

                <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '15px'}}>
                  <p style={{margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '14px'}}>Twitter Card Tags</p>
                  <small style={{color: '#666', display: 'block', marginBottom: '10px'}}>
                    Title: {formData.meta_title || formData.title || '(not set)'}<br/>
                    Description: {formData.meta_description || formData.excerpt || '(not set)'}<br/>
                    Image: {formData.twitter_image || formData.image_url || '(not set)'}
                  </small>
                </div>
              </fieldset>

              <div className="admin-checkbox-group">
                <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="admin-checkbox" />
                <label className="admin-label">Published</label>
              </div>
              
              <div className="admin-btn-group">
                <button type="submit" disabled={uploading} className="admin-btn-primary">
                  {uploading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="admin-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="admin-card">
            <div className="admin-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={handleAddNew} className="admin-btn-primary">
                + Add New Blog
              </button>
              <input 
                type="text" 
                placeholder="Search blogs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input"
                style={{ width: '250px', marginBottom: 0 }}
              />
            </div>
            
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          {blog.image_url ? (
                            <img src={blog.image_url} alt={blog.title} className="preview-img" />
                          ) : (
                            <div className="preview-placeholder"></div>
                          )}
                        </td>
                        <td className="text-bold">{blog.title}</td>
                        <td className="text-muted">{blog.author}</td>
                        <td>
                          <span className={`admin-badge ${blog.is_published ? 'badge-active' : 'badge-inactive'}`}>
                            {blog.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(blog)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(blog.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No blogs found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsAdmin;
