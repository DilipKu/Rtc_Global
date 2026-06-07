import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', slug: '', image_url: '', is_active: true });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (!error) setCategories(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ name: '', slug: '', image_url: '', is_active: true });
    setFile(null);
    setCurrentCategory(null);
    setIsEditing(true);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setFile(null);
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.image_url;
      if (file) {
        finalImageUrl = await uploadService.uploadImage(file, 'categories');
      }

      const payload = { ...formData, image_url: finalImageUrl };

      if (currentCategory) {
        await supabase.from('categories').update(payload).eq('id', currentCategory.id);
      } else {
        await supabase.from('categories').insert([payload]);
      }
      
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      alert('Error saving category');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Categories</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label className="admin-label">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="admin-input" />
              </div>
              <div className="form-group">
                <label className="admin-label">Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="admin-input" />
              </div>
              
              <div className="form-group">
                <label className="admin-label">Category Image</label>
                {formData.image_url && <img src={formData.image_url} alt="Category" className="preview-img-large" />}
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="admin-input" />
              </div>
              
              <div className="admin-checkbox-group">
                <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="admin-checkbox" />
                <label className="admin-label">Active</label>
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
            <div className="admin-actions">
              <button onClick={handleAddNew} className="admin-btn-primary">
                + Add New Category
              </button>
            </div>
            
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td>
                          {cat.image_url ? (
                            <img src={cat.image_url} alt={cat.name} className="preview-img" />
                          ) : (
                            <div className="preview-placeholder"></div>
                          )}
                        </td>
                        <td className="text-bold">{cat.name}</td>
                        <td className="text-muted">{cat.slug}</td>
                        <td>
                          <span className={`admin-badge ${cat.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {cat.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(cat)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(cat.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No categories found.</td></tr>
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

export default CategoriesAdmin;
