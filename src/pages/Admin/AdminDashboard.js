import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabaseClient';
import { Package, Tags, Briefcase, MapPin, PlusCircle, Activity } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    branches: 0,
    enquiries: 0,
    loading: true
  });

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, catRes, brandRes, branchRes, enqRes, recentRes] = await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
          supabase.from('categories').select('*', { count: 'exact', head: true }),
          supabase.from('brands').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
          supabase.from('branches').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
          supabase.from('enquiries').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('id, name, created_at, category:categories(name)').eq('is_deleted', false).order('created_at', { ascending: false }).limit(5)
        ]);

        setStats({
          products: prodRes.count || 0,
          categories: catRes.count || 0,
          brands: brandRes.count || 0,
          branches: branchRes.count || 0,
          enquiries: enqRes.count || 0,
          loading: false
        });

        if (!recentRes.error) {
          setRecentProducts(recentRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 className="admin-header" style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p className="text-muted">Welcome back, <strong>{profile?.display_name || 'Admin'}</strong>! Here is what's happening today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          
          <div className="metric-card admin-card-clickable" onClick={() => navigate('/admin/products')} style={{ cursor: 'pointer' }}>
            <div className="metric-icon-wrapper">
              <Package size={28} />
            </div>
            <div className="metric-details">
              <div className="metric-label">Total Products</div>
              <div className="metric-value">{stats.loading ? '-' : stats.products}</div>
            </div>
          </div>

          <div className="metric-card admin-card-clickable" onClick={() => navigate('/admin/categories')} style={{ cursor: 'pointer' }}>
            <div className="metric-icon-wrapper" style={{ filter: 'hue-rotate(280deg)' }}>
              <Tags size={28} />
            </div>
            <div className="metric-details">
              <div className="metric-label">Categories</div>
              <div className="metric-value">{stats.loading ? '-' : stats.categories}</div>
            </div>
          </div>

          <div className="metric-card admin-card-clickable" onClick={() => navigate('/admin/brands')} style={{ cursor: 'pointer' }}>
            <div className="metric-icon-wrapper" style={{ filter: 'hue-rotate(120deg)' }}>
              <Briefcase size={28} />
            </div>
            <div className="metric-details">
              <div className="metric-label">Brands Managed</div>
              <div className="metric-value">{stats.loading ? '-' : stats.brands}</div>
            </div>
          </div>

          <div className="metric-card admin-card-clickable" onClick={() => navigate('/admin/branches')} style={{ cursor: 'pointer' }}>
            <div className="metric-icon-wrapper" style={{ filter: 'hue-rotate(45deg)' }}>
              <MapPin size={28} />
            </div>
            <div className="metric-details">
              <div className="metric-label">Active Branches</div>
              <div className="metric-value">{stats.loading ? '-' : stats.branches}</div>
            </div>
          </div>

          <div className="metric-card admin-card-clickable" onClick={() => navigate('/admin/enquiries')} style={{ cursor: 'pointer' }}>
            <div className="metric-icon-wrapper" style={{ filter: 'hue-rotate(190deg)' }}>
              <Activity size={28} />
            </div>
            <div className="metric-details">
              <div className="metric-label">Enquiries</div>
              <div className="metric-value">{stats.loading ? '-' : stats.enquiries}</div>
            </div>
          </div>
          
        </div>

        <div className="form-row" style={{ marginTop: '2.5rem' }}>
          {/* Quick Actions */}
          <div className="dashboard-section" style={{ marginTop: 0 }}>
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Quick Actions</h2>
            </div>
            <div className="admin-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <button onClick={() => navigate('/admin/products')} className="admin-card admin-card-clickable" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', color: 'var(--text-primary)', outline: 'none' }}>
                <PlusCircle size={32} color="var(--color-gold-500)" />
                <span style={{ fontWeight: 600 }}>Add Product</span>
              </button>
              <button onClick={() => navigate('/admin/hero')} className="admin-card admin-card-clickable" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', color: 'var(--text-primary)', outline: 'none' }}>
                <PlusCircle size={32} color="var(--color-gold-500)" />
                <span style={{ fontWeight: 600 }}>Update Banner</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section" style={{ marginTop: 0 }}>
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={20} color="var(--color-gold-500)" /> 
                Recently Added Products
              </h2>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <tbody>
                  {recentProducts.map(product => (
                    <tr key={product.id}>
                      <td className="text-bold">{product.name}</td>
                      <td className="text-muted">{product.category?.name}</td>
                      <td className="text-muted" style={{ textAlign: 'right' }}>
                        {new Date(product.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentProducts.length === 0 && !stats.loading && (
                    <tr><td colSpan="3" className="text-muted text-center">No recent products.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
