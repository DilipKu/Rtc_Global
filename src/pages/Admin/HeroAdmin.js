import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { uploadService } from '../../services/uploadService';
import './Admin.css';

const HeroAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  
  const [formData, setFormData] = useState({ 
    heading_line_1: '', heading_line_2: '', tagline: '', 
    subtext: '', highlight: '', image_url: '', video_url: '', sort_order: 0, is_active: true 
  });
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const { data, error } = await supabase.from('hero_slides').select('*').order('sort_order');
    if (!error) setSlides(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    const nextSortOrder = slides.length > 0 ? Math.max(...slides.map(s => s.sort_order || 0)) + 1 : 0;
    setFormData({ 
      heading_line_1: '', heading_line_2: '', tagline: '', 
      subtext: '', highlight: '', image_url: '', video_url: '', sort_order: nextSortOrder, is_active: true 
    });
    setFile(null);
    setVideoFile(null);
    setCurrentSlide(null);
    setIsEditing(true);
  };

  const handleEdit = (slide) => {
    setFormData(slide);
    setFile(null);
    setVideoFile(null);
    setCurrentSlide(slide);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      await supabase.from('hero_slides').delete().eq('id', id);
      fetchSlides();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.image_url;
      let finalVideoUrl = formData.video_url;
      
      if (file) {
        finalImageUrl = await uploadService.uploadImage(file, 'hero');
      }
      if (videoFile) {
        finalVideoUrl = await uploadService.uploadVideo(videoFile, 'hero_videos');
      }

      const payload = { ...formData, image_url: finalImageUrl, video_url: finalVideoUrl };
      
      let response;
      if (currentSlide) {
        response = await supabase.from('hero_slides').update(payload).eq('id', currentSlide.id);
      } else {
        response = await supabase.from('hero_slides').insert([payload]);
      }
      
      if (response.error) {
        console.error("Supabase Error:", response.error);
        alert(`Failed to save slide: ${response.error.message || response.error.details || 'Unknown error'}`);
        return;
      }
      
      setIsEditing(false);
      fetchSlides();
    } catch (error) {
      console.error("Exception:", error);
      alert(`Error saving slide: ${error.message || 'Unknown exception'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Manage Hero Slides</h1>
        
        {isEditing ? (
          <div className="admin-card admin-form-container">
            <h2>{currentSlide ? 'Edit Slide' : 'Add New Slide'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Heading Line 1</label>
                  <input required type="text" value={formData.heading_line_1} onChange={e => setFormData({...formData, heading_line_1: e.target.value})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Heading Line 2</label>
                  <input required type="text" value={formData.heading_line_2} onChange={e => setFormData({...formData, heading_line_2: e.target.value})} className="admin-input" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Tagline</label>
                  <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="admin-input" />
                </div>
                <div className="form-group">
                  <label className="admin-label">Highlight Button Text</label>
                  <input type="text" value={formData.highlight} onChange={e => setFormData({...formData, highlight: e.target.value})} className="admin-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="admin-label">Subtext</label>
                <textarea rows="2" value={formData.subtext} onChange={e => setFormData({...formData, subtext: e.target.value})} className="admin-textarea"></textarea>
              </div>

              <div className="form-group">
                <label className="admin-label">Video URL (Optional - Replaces Image if provided)</label>
                <input type="text" placeholder="https://example.com/video.mp4" value={formData.video_url || ''} onChange={e => setFormData({...formData, video_url: e.target.value})} className="admin-input" />
                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Or upload a video file:</div>
                <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={e => setVideoFile(e.target.files[0])} className="admin-input" />
              </div>

              <div className="form-group">
                <label className="admin-label">Slide Image (1600x800 recommended)</label>
                {formData.image_url && <img src={formData.image_url} alt="Slide preview" className="preview-img-large" style={{ width: '100%' }} />}
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="admin-input" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="admin-label">Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} className="admin-input" />
                </div>
                <div className="form-group" style={{ justifyContent: 'center' }}>
                  <div className="admin-checkbox-group">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="admin-checkbox" />
                    <label className="admin-label">Active</label>
                  </div>
                </div>
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
                + Add New Slide
              </button>
            </div>
            {loading ? <p>Loading...</p> : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Heading</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slides.map((slide) => (
                      <tr key={slide.id}>
                        <td>
                          {slide.image_url ? (
                            <img src={slide.image_url} alt="Slide" className="preview-img" style={{ width: '6rem' }} />
                          ) : (
                            <div className="preview-placeholder" style={{ width: '6rem' }}></div>
                          )}
                        </td>
                        <td>
                          <div className="text-bold">{slide.heading_line_1}</div>
                          <div className="text-muted">{slide.heading_line_2}</div>
                        </td>
                        <td>{slide.sort_order}</td>
                        <td>
                          <span className={`admin-badge ${slide.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {slide.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleEdit(slide)} className="action-link action-edit">Edit</button>
                          <button type="button" onClick={() => handleDelete(slide.id)} className="action-link action-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {slides.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No slides found.</td></tr>
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

export default HeroAdmin;
