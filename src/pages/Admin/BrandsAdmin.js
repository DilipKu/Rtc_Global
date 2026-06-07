import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const BrandsAdmin = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', slug: '', logo_url: '', is_active: true, sort_order: 0 });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const { data, error } = await supabase.from('brands').select('*').eq('is_deleted', false).order('sort_order');
    if (!error) setBrands(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ name: '', slug: '', logo_url: '', is_active: true, sort_order: 0 });
    setFile(null);
    setCurrentBrand(null);
    setIsEditing(true);
  };

  const handleEdit = (brand) => {
    setFormData(brand);
    setFile(null);
    setCurrentBrand(brand);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      await supabase.from('brands').update({ is_deleted: true }).eq('id', id);
      fetchBrands();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalLogoUrl = formData.logo_url;
      if (file) {
        finalLogoUrl = await uploadService.uploadImage(file, 'brands');
      }

      const payload = { ...formData, logo_url: finalLogoUrl };
      
      if (currentBrand) {
        await supabase.from('brands').update(payload).eq('id', currentBrand.id);
      } else {
        await supabase.from('brands').insert([payload]);
      }
      
      setIsEditing(false);
      fetchBrands();
    } catch (error) {
      alert('Error saving brand');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Brands</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
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
                <label className="admin-label">Logo Image</label>
                {formData.logo_url && <img src={formData.logo_url} alt="Logo" className="preview-img-large" />}
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="admin-input" />
              </div>
              <div className="form-group">
                <label className="admin-label">Sort Order</label>
                <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} className="admin-input" />
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
                + Add New Brand
              </button>
            </div>
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td>
                          {brand.logo_url ? (
                            <img src={brand.logo_url} alt={brand.name} className="preview-img" />
                          ) : (
                            <div className="preview-placeholder"></div>
                          )}
                        </td>
                        <td className="text-bold">{brand.name}</td>
                        <td className="text-muted">{brand.slug}</td>
                        <td>
                          <span className={`admin-badge ${brand.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {brand.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(brand)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(brand.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {brands.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No brands found.</td></tr>
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

export default BrandsAdmin;
