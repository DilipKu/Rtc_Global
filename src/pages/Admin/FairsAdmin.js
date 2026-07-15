import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const FairsAdmin = () => {
  const [fairs, setFairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFair, setCurrentFair] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ 
    title: '', description: '', date_range: '', location: '', 
    image_urls: [], is_active: true 
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFairs();
  }, []);

  const fetchFairs = async () => {
    const { data, error } = await supabase.from('fairs').select('*').order('created_at', { ascending: false });
    if (!error) setFairs(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ 
      title: '', description: '', date_range: '', location: '', 
      image_urls: [], is_active: true 
    });
    setFiles([]);
    setCurrentFair(null);
    setIsEditing(true);
  };

  const handleEdit = (fair) => {
    setFormData(fair);
    setFiles([]);
    setCurrentFair(fair);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await supabase.from('fairs').delete().eq('id', id);
      fetchFairs();
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      image_urls: formData.image_urls.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let uploadedUrls = [...(formData.image_urls || [])];
      
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const url = await uploadService.uploadImage(files[i], 'fairs');
          if (url) uploadedUrls.push(url);
        }
      }

      const payload = { ...formData, image_urls: uploadedUrls };

      if (currentFair) {
        await supabase.from('fairs').update(payload).eq('id', currentFair.id);
      } else {
        await supabase.from('fairs').insert([payload]);
      }
      
      setIsEditing(false);
      fetchFairs();
    } catch (error) {
      alert('Error saving fair/event');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Garment Fairs</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentFair ? 'Edit Garment Fair' : 'Add Garment Fair'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label className="admin-label">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Date Range</label>
                  <input type="text" placeholder="e.g. 10th - 12th Aug 2026" value={formData.date_range} onChange={e => setFormData({...formData, date_range: e.target.value})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="admin-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="admin-label">Description</label>
                <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="admin-textarea"></textarea>
              </div>
              
              <div className="form-group">
                <label className="admin-label" style={{ marginBottom: '0.5rem' }}>Images (Gallery)</label>
                
                {formData.image_urls && formData.image_urls.length > 0 && (
                  <div className="image-preview-grid">
                    {formData.image_urls.map((url, idx) => (
                      <div key={idx} className="image-preview-item">
                        <img src={url} alt={`Fair ${idx}`} />
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
                <label className="admin-label">Active (Visible)</label>
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
                + Add New Fair
              </button>
              <input 
                type="text" 
                placeholder="Search fairs..." 
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
                      <th>Title</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Images</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fairs.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase())).map((fair) => (
                      <tr key={fair.id}>
                        <td className="text-bold">{fair.title}</td>
                        <td className="text-muted">{fair.date_range}</td>
                        <td className="text-muted">{fair.location}</td>
                        <td>{fair.image_urls?.length || 0}</td>
                        <td>
                          <span className={`admin-badge ${fair.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {fair.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(fair)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(fair.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {fairs.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                      <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No garment fairs found.</td></tr>
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

export default FairsAdmin;
