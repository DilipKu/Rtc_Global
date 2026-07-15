import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ 
    name: '', sku: '', slug: '', description: '', 
    category_id: '', brand_id: '', branch_id: '', 
    price_label: '', price: 0, original_price: 0, 
    stock: 0, tag: 'NONE', is_active: true, images: []
  });
  
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, catRes, brandRes, branchRes] = await Promise.all([
      supabase.from('products').select('*, brand:brands(name), category:categories(name)').eq('is_deleted', false).order('created_at', { ascending: false }).order('id', { ascending: false }),
      supabase.from('categories').select('id, name').eq('is_active', true),
      supabase.from('brands').select('id, name').eq('is_active', true),
      supabase.from('branches').select('id, name').eq('is_active', true)
    ]);

    if (!prodRes.error) setProducts(prodRes.data);
    if (!catRes.error) setCategories(catRes.data);
    if (!brandRes.error) setBrands(brandRes.data);
    if (!branchRes.error) setBranches(branchRes.data);
    
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ 
      name: '', sku: '', slug: '', description: '', 
      category_id: categories[0]?.id || '', 
      brand_id: brands[0]?.id || '', 
      branch_id: branches[0]?.id || '', 
      price_label: '', price: 0, original_price: 0, 
      stock: 0, tag: 'NONE', is_active: true, images: []
    });
    setFiles([]);
    setCurrentProduct(null);
    setIsEditing(true);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      category_id: product.category_id || '',
      brand_id: product.brand_id || '',
      branch_id: product.branch_id || ''
    });
    setFiles([]);
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await supabase.from('products').update({ is_deleted: true }).eq('id', id);
      fetchData();
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let uploadedUrls = [...formData.images];
      
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const url = await uploadService.uploadImage(files[i], 'products');
          if (url) uploadedUrls.push(url);
        }
      }

      const { brand, category, ...payload } = formData;
      payload.images = uploadedUrls;
      
      if (currentProduct) {
        await supabase.from('products').update(payload).eq('id', currentProduct.id);
      } else {
        await supabase.from('products').insert([payload]);
      }
      
      setIsEditing(false);
      fetchData();
    } catch (error) {
      alert('Error saving product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Products</h1>
        
        {isEditing ? (
          <div className="admin-card">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              
              <div className="form-row form-row-3">
                <div className="form-group form-col-span-2">
                  <label className="admin-label">Product Name</label>
                  <input required type="text" value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} 
                    className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">SKU</label>
                  <input required type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="admin-input" />
                </div>
              </div>
              
              <div className="form-row form-row-3">
                <div className="form-group">
                  <label className="admin-label">Category</label>
                  <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="admin-select">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="admin-label">Brand</label>
                  <select required value={formData.brand_id} onChange={e => setFormData({...formData, brand_id: e.target.value})} className="admin-select">
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="admin-label">Branch</label>
                  <select value={formData.branch_id} onChange={e => setFormData({...formData, branch_id: e.target.value})} className="admin-select">
                    <option value="">Select Branch</option>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row form-row-4">
                <div className="form-group">
                  <label className="admin-label">Price Label</label>
                  <input type="text" placeholder="e.g. Starting from ₹500" value={formData.price_label} onChange={e => setFormData({...formData, price_label: e.target.value})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Price</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Stock</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Tag</label>
                  <select value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="admin-select">
                    <option value="NONE">None</option>
                    <option value="NEW">New Arrival</option>
                    <option value="BEST_SELLER">Best Seller</option>
                    <option value="HOT">Hot</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="admin-label">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="admin-textarea"></textarea>
              </div>

              <div className="form-group">
                <label className="admin-label" style={{ marginBottom: '0.5rem' }}>Images</label>
                
                {formData.images && formData.images.length > 0 && (
                  <div className="image-preview-grid">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="image-preview-item">
                        <img src={url} alt={`Product ${idx}`} />
                        <button type="button" onClick={() => removeImage(idx)} className="image-remove-btn">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <input type="file" multiple accept="image/*" onChange={e => setFiles(e.target.files)} className="admin-input" />
                <p className="text-muted" style={{ marginTop: '0.25rem' }}>Select multiple files to add more images.</p>
              </div>

              <div className="admin-checkbox-group">
                <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="admin-checkbox" />
                <label className="admin-label">Active (Visible on website)</label>
              </div>
              
              <div className="admin-btn-group">
                <button type="submit" disabled={uploading} className="admin-btn-primary">
                  {uploading ? 'Saving Product...' : 'Save Product'}
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
                + Add New Product
              </button>
              <input 
                type="text" 
                placeholder="Search products..." 
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
                      <th>Product</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Tag</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => 
                      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          {prod.images && prod.images.length > 0 ? (
                            <img src={prod.images[0]} alt={prod.name} className="preview-img" style={{ height: '3rem', width: '3rem' }} />
                          ) : (
                            <div className="preview-placeholder" style={{ height: '3rem', width: '3rem' }}></div>
                          )}
                        </td>
                        <td>
                          <div className="text-bold">{prod.name}</div>
                          <div className="text-muted">SKU: {prod.sku || prod.slug}</div>
                        </td>
                        <td>{prod.category?.name}</td>
                        <td>{prod.brand?.name}</td>
                        <td>
                          {prod.tag !== 'NONE' && (
                            <span className="admin-badge badge-info">
                              {prod.tag}
                            </span>
                          )}
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(prod)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(prod.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                      <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No products found.</td></tr>
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

export default ProductsAdmin;
