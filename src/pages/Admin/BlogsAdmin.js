import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ 
    title: '', slug: '', excerpt: '', content: '', 
    author: '', image_url: '', is_published: true 
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      author: '', image_url: '', is_published: true 
    });
    setFile(null);
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setFile(null);
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
      if (file) {
        finalImageUrl = await uploadService.uploadImage(file, 'blogs');
      }

      const payload = { ...formData, image_url: finalImageUrl };

      if (currentBlog) {
        await supabase.from('blogs').update(payload).eq('id', currentBlog.id);
      } else {
        await supabase.from('blogs').insert([payload]);
      }
      
      setIsEditing(false);
      fetchBlogs();
    } catch (error) {
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
                <textarea rows="8" required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="admin-textarea"></textarea>
              </div>
              
              <div className="form-group">
                <label className="admin-label">Featured Image</label>
                {formData.image_url && <img src={formData.image_url} alt="Blog" className="preview-img-large" />}
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="admin-input" />
              </div>
              
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
