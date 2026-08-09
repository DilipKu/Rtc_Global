import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { Plus, Trash2, Edit, Globe, Search, ArrowLeft } from 'lucide-react';
import { useSeoContext } from '../../context/SeoContext';
import './Admin.css';

const SeoAdmin = () => {
  const [seoList, setSeoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSeo, setCurrentSeo] = useState({
    route_identifier: '',
    title: '',
    description: '',
    keywords: ''
  });
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { refreshSeo } = useSeoContext();

  useEffect(() => {
    fetchSeoList();
  }, []);

  const fetchSeoList = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('seo_settings').select('*').order('route_identifier');
    if (!error && data) {
      setSeoList(data);
    } else if (error) {
      console.error('Error fetching SEO:', error);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setCurrentSeo(item);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentSeo({
      route_identifier: '',
      title: '',
      description: '',
      keywords: ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this SEO configuration?')) {
      const { error } = await supabase.from('seo_settings').delete().eq('id', id);
      if (!error) {
        fetchSeoList();
        refreshSeo();
      } else {
        alert('Error deleting SEO configuration: ' + error.message);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // basic validation
    if (!currentSeo.route_identifier || !currentSeo.title) {
      alert('Route Identifier and Title are required.');
      setSaving(false);
      return;
    }

    const payload = {
      route_identifier: currentSeo.route_identifier.trim(),
      title: currentSeo.title,
      description: currentSeo.description,
      keywords: currentSeo.keywords,
      updated_at: new Date().toISOString()
    };

    if (currentSeo.id) {
      const { error } = await supabase.from('seo_settings').update(payload).eq('id', currentSeo.id);
      if (error) alert('Error saving: ' + error.message);
    } else {
      const { error } = await supabase.from('seo_settings').insert([payload]);
      if (error) alert('Error saving: ' + error.message);
    }
    
    await fetchSeoList();
    refreshSeo();
    setIsEditing(false);
    setSaving(false);
  };

  if (loading) return <div className="admin-loading">Loading SEO settings...</div>;

  const filteredSeoList = seoList.filter(item => 
    item.route_identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <div className="admin-content">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isEditing ? '2rem' : '1.5rem' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Globe color="var(--color-gold-500)" size={28} />
            SEO Settings Manager
          </h2>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Manage metadata, titles, and keywords across all pages.</p>
        </div>
        {!isEditing && (
          <button className="admin-btn-primary" onClick={handleAddNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px' }}>
            <Plus size={20} /> Add New Route
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="admin-form-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-bg-card)', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <button className="icon-btn" onClick={() => setIsEditing(false)} title="Go Back">
              <ArrowLeft size={24} color="var(--text-muted)" />
            </button>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              {currentSeo.id ? 'Edit SEO Configuration' : 'Create New SEO Configuration'}
            </h3>
          </div>
          
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-group">
              <label style={{ fontWeight: '600', color: 'var(--color-gold-500)' }}>Route Identifier</label>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', marginTop: '-0.25rem' }}>The exact URL path (e.g., /about, /contact, wholesale-ladies-wear-suppliers)</p>
              <input
                type="text"
                value={currentSeo.route_identifier}
                onChange={(e) => setCurrentSeo({ ...currentSeo, route_identifier: e.target.value })}
                placeholder="e.g. /home"
                required
                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--text-primary)' }}
              />
            </div>
            
            <div className="form-group" style={{ marginTop: '2rem' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Meta Title</label>
              <input
                type="text"
                value={currentSeo.title}
                onChange={(e) => setCurrentSeo({ ...currentSeo, title: e.target.value })}
                placeholder="Page Title - RTC Global Apparels"
                required
                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--text-primary)' }}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: currentSeo.title.length > 60 ? 'var(--color-error)' : 'var(--text-muted)', marginTop: '0.25rem' }}>
                {currentSeo.title.length} / 60 optimal characters
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '2rem' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Meta Description</label>
              <textarea
                value={currentSeo.description}
                onChange={(e) => setCurrentSeo({ ...currentSeo, description: e.target.value })}
                placeholder="A compelling description for search engines..."
                rows={4}
                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: currentSeo.description.length > 160 ? 'var(--color-error)' : 'var(--text-muted)', marginTop: '0.25rem' }}>
                {currentSeo.description.length} / 160 optimal characters
              </div>
            </div>
            
            <div className="form-group" style={{ marginTop: '2rem' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Keywords</label>
              <input
                type="text"
                value={currentSeo.keywords}
                onChange={(e) => setCurrentSeo({ ...currentSeo, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--text-primary)' }}
              />
            </div>

            <div className="form-actions" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="admin-btn-secondary" onClick={() => setIsEditing(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary" disabled={saving} style={{ padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', letterSpacing: '0.5px' }}>
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search routes or titles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '30px', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div className="text-muted" style={{ fontSize: '0.875rem' }}>
              Showing {filteredSeoList.length} routes
            </div>
          </div>

          <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {filteredSeoList.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', background: 'var(--color-bg-card)', borderRadius: '12px', border: '1px dashed var(--color-border)' }}>
                <Globe size={48} color="var(--color-border)" style={{ marginBottom: '1rem' }} />
                <h3 className="text-muted">No SEO configurations found</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Try adjusting your search or add a new route.</p>
              </div>
            )}
            {filteredSeoList.map((item) => (
              <div key={item.id} className="admin-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem', background: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', transition: 'all 0.3s ease', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-block', padding: '0.35rem 0.85rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold-500)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {item.route_identifier}
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="icon-btn" onClick={() => handleEdit(item)} title="Edit" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-gold-500)' }}>
                      <Edit size={16} />
                    </button>
                    <button className="icon-btn" onClick={() => handleDelete(item.id)} title="Delete" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.15rem', color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                    {item.title}
                  </h4>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6' }}>
                    {item.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default SeoAdmin;
