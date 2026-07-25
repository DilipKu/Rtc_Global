import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { Plus, Trash2 } from 'lucide-react';
import './Admin.css';

const DynamicPagesAdmin = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  
  // For raw JSON editor (fallback for other pages)
  const [jsonContent, setJsonContent] = useState('');
  
  // For Contact Page Editor
  const [contactData, setContactData] = useState({
    phone_number: '',
    whatsapp_number: '',
    email: '',
    business_address: '',
    business_hours: '',
    accountsDirectory: []
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('dynamic_pages').select('*').order('page_key');
    if (!error && data) {
      setPages(data);
    }
    setLoading(false);
  };

  const handleEdit = (page) => {
    setCurrentPage(page);
    if (page.page_key === 'contact') {
      setContactData({
        phone_number: page.content?.phone_number || '',
        whatsapp_number: page.content?.whatsapp_number || '',
        email: page.content?.email || '',
        business_address: page.content?.business_address || '',
        business_hours: page.content?.business_hours || '',
        accountsDirectory: page.content?.accountsDirectory || []
      });
    } else {
      setJsonContent(JSON.stringify(page.content, null, 2));
    }
    setIsEditing(true);
  };

  const handleContactChange = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const addAccountContact = () => {
    setContactData(prev => ({
      ...prev,
      accountsDirectory: [...prev.accountsDirectory, { name: '', mobile: '' }]
    }));
  };

  const updateAccountContact = (index, field, value) => {
    setContactData(prev => {
      const updated = [...prev.accountsDirectory];
      updated[index][field] = value;
      return { ...prev, accountsDirectory: updated };
    });
  };

  const removeAccountContact = (index) => {
    setContactData(prev => {
      const updated = [...prev.accountsDirectory];
      updated.splice(index, 1);
      return { ...prev, accountsDirectory: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let contentToSave;
      
      if (currentPage.page_key === 'contact') {
        contentToSave = { ...contactData };
      } else {
        contentToSave = JSON.parse(jsonContent);
      }
      
      const { error } = await supabase
        .from('dynamic_pages')
        .update({ content: contentToSave, updated_at: new Date() })
        .eq('id', currentPage.id);

      if (error) throw error;
      
      setIsEditing(false);
      fetchPages();
    } catch (err) {
      alert('Error saving page: Invalid JSON or network issue. ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Dynamic Pages</h1>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Edit the content of dynamic pages on your website.</p>
        
        {isEditing ? (
          <div className="admin-card">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', textTransform: 'capitalize' }}>
              Edit {currentPage?.page_key.replace('_', ' ')}
            </h2>
            <form onSubmit={handleSubmit} className="admin-form">
              
              {currentPage?.page_key === 'contact' ? (
                // --- CUSTOM CONTACT FORM ---
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="admin-label">General Contact Information</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={contactData.phone_number} 
                        onChange={e => handleContactChange('phone_number', e.target.value)}
                        placeholder="Phone Numbers (comma separated)"
                        className="admin-input" 
                        required
                      />
                      <input 
                        type="text" 
                        value={contactData.whatsapp_number} 
                        onChange={e => handleContactChange('whatsapp_number', e.target.value)}
                        placeholder="WhatsApp Number"
                        className="admin-input" 
                        required
                      />
                      <input 
                        type="email" 
                        value={contactData.email} 
                        onChange={e => handleContactChange('email', e.target.value)}
                        placeholder="Email Address"
                        className="admin-input" 
                        required
                      />
                      <input 
                        type="text" 
                        value={contactData.business_hours} 
                        onChange={e => handleContactChange('business_hours', e.target.value)}
                        placeholder="Business Hours"
                        className="admin-input" 
                        required
                      />
                    </div>
                    <textarea 
                      value={contactData.business_address} 
                      onChange={e => handleContactChange('business_address', e.target.value)}
                      placeholder="Business Address"
                      className="admin-textarea"
                      rows="2"
                      style={{ marginTop: '1rem' }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="admin-label">Accounts & Billing Departments</label>
                      <button type="button" onClick={addAccountContact} className="admin-btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus size={14} /> Add Contact
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                      {contactData.accountsDirectory.length === 0 && (
                         <p className="text-muted" style={{ fontSize: '14px' }}>No contacts added yet.</p>
                      )}
                      {contactData.accountsDirectory.map((acc, index) => (
                        <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <input 
                            type="text" 
                            value={acc.name} 
                            onChange={e => updateAccountContact(index, 'name', e.target.value)}
                            placeholder="Contact Name"
                            className="admin-input"
                            style={{ flex: 1 }}
                            required
                          />
                          <input 
                            type="text" 
                            value={acc.mobile} 
                            onChange={e => updateAccountContact(index, 'mobile', e.target.value)}
                            placeholder="Mobile Number"
                            className="admin-input"
                            style={{ flex: 1 }}
                            required
                          />
                          <button type="button" onClick={() => removeAccountContact(index)} className="admin-btn-secondary" style={{ padding: '0.5rem', color: '#ef4444', borderColor: '#fee2e2', background: '#fef2f2' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // --- FALLBACK JSON EDITOR ---
                <div className="form-group">
                  <label className="admin-label">Page Content (JSON)</label>
                  <textarea 
                    rows="20" 
                    value={jsonContent} 
                    onChange={e => setJsonContent(e.target.value)} 
                    className="admin-textarea"
                    style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}
                    required
                  ></textarea>
                  <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '12px' }}>
                    Please ensure the JSON is perfectly valid. Do not remove existing keys, only change their values.
                  </p>
                </div>
              )}
              
              <div className="admin-btn-group" style={{ marginTop: '2rem' }}>
                <button type="submit" disabled={saving} className="admin-btn-primary">
                  {saving ? 'Saving...' : 'Save Content'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="admin-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="admin-card">
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Page Key</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.id}>
                        <td>
                          <div className="text-bold" style={{ textTransform: 'capitalize' }}>
                            {page.page_key.replace('_', ' ')}
                          </div>
                          <div className="text-muted" style={{ fontSize: '12px' }}>{page.page_key}</div>
                        </td>
                        <td>{new Date(page.updated_at).toLocaleString()}</td>
                        <td>
                          <button type="button" onClick={() => handleEdit(page)} className="action-link action-edit">
                            {page.page_key === 'contact' ? 'Edit Details' : 'Edit JSON'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {pages.length === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No dynamic pages found. Have you run the migration?</td></tr>
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

export default DynamicPagesAdmin;

