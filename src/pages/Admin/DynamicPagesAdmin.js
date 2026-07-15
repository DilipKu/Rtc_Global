import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import './Admin.css';

const DynamicPagesAdmin = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [jsonContent, setJsonContent] = useState('');
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
    setJsonContent(JSON.stringify(page.content, null, 2));
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Validate JSON
      const parsedContent = JSON.parse(jsonContent);
      
      const { error } = await supabase
        .from('dynamic_pages')
        .update({ content: parsedContent, updated_at: new Date() })
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
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Edit raw JSON content for the About and Contact pages.</p>
        
        {isEditing ? (
          <div className="admin-card">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', textTransform: 'capitalize' }}>
              Edit {currentPage?.page_key.replace('_', ' ')}
            </h2>
            <form onSubmit={handleSubmit} className="admin-form">
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
              
              <div className="admin-btn-group">
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
                          <button type="button" onClick={() => handleEdit(page)} className="action-link action-edit">Edit JSON</button>
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
