import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const BranchesAdmin = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', code: '', type: 'Franchise', city: '', state: '', address: '', phone_numbers: '', image_url: '', is_active: true });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const { data, error } = await supabase.from('branches').select('*').eq('is_deleted', false).order('name');
    if (!error) setBranches(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData({ name: '', code: '', type: 'Franchise', city: '', state: '', address: '', phone_numbers: '', image_url: '', is_active: true });
    setFile(null);
    setCurrentBranch(null);
    setIsEditing(true);
  };

  const handleEdit = (branch) => {
    const addr = branch.address || {};
    // Handle case where address might accidentally be a string from old test data
    const parsedAddr = typeof addr === 'string' ? { street: addr } : addr;

    setFormData({
      ...branch,
      phone_numbers: branch.phone_numbers ? branch.phone_numbers.join(', ') : '',
      city: parsedAddr.city || branch.city || '', // fallback to branch.city if data is malformed
      state: parsedAddr.state || branch.state || '',
      address: parsedAddr.street || (typeof addr === 'string' ? addr : '')
    });
    setFile(null);
    setCurrentBranch(branch);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      await supabase.from('branches').update({ is_deleted: true }).eq('id', id);
      fetchBranches();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.image_url;
      if (file) {
        finalImageUrl = await uploadService.uploadImage(file, 'branches');
      }

      const phoneNumbersArray = formData.phone_numbers 
        ? formData.phone_numbers.split(',').map(n => n.trim()).filter(n => n) 
        : [];
      
      const payload = { 
        ...formData, 
        image_url: finalImageUrl, 
        phone_numbers: phoneNumbersArray,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: '',
          country: 'India'
        }
      };
      
      // Clean up top-level properties not in the schema
      delete payload.city;
      delete payload.state;
      
      if (currentBranch) {
        await supabase.from('branches').update(payload).eq('id', currentBranch.id);
      } else {
        await supabase.from('branches').insert([payload]);
      }
      
      setIsEditing(false);
      fetchBranches();
    } catch (error) {
      alert('Error saving branch');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Branches</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentBranch ? 'Edit Branch' : 'Add New Branch'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Code</label>
                  <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="admin-input" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="admin-select">
                    <option value="Franchise">Franchise</option>
                    <option value="Company Owned">Company Owned</option>
                    <option value="Distributor">Distributor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="admin-label">City</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="admin-input" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="admin-label">State</label>
                <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label className="admin-label">Mobile / Phone Numbers</label>
                <input type="text" placeholder="Comma separated, e.g. 9876543210" value={formData.phone_numbers || ''} onChange={e => setFormData({...formData, phone_numbers: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label className="admin-label">Address</label>
                <textarea rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="admin-textarea"></textarea>
              </div>

              <div className="form-group">
                <label className="admin-label">Branch Image</label>
                {formData.image_url && <img src={formData.image_url} alt="Branch" className="preview-img-large" />}
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
                + Add New Branch
              </button>
            </div>
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name / Code</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((branch) => (
                      <tr key={branch.id}>
                        <td>
                          {branch.image_url ? (
                            <img src={branch.image_url} alt={branch.name} className="preview-img" style={{ width: '4rem' }} />
                          ) : (
                            <div className="preview-placeholder"></div>
                          )}
                        </td>
                        <td>
                          <div className="text-bold">{branch.name}</div>
                          <div className="text-muted">{branch.code} - {branch.type}</div>
                        </td>
                        <td>
                          {(branch.address?.city) || branch.city || 'N/A'}, {(branch.address?.state) || branch.state || ''}
                        </td>
                        <td>
                          <span className={`admin-badge ${branch.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {branch.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(branch)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(branch.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {branches.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No branches found.</td></tr>
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

export default BranchesAdmin;
