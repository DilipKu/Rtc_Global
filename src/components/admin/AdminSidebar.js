import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Briefcase, 
  MapPin, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageSquare,
  FileJson,
  FileText,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../pages/Admin/Admin.css';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: Tags, label: 'Categories' },
    { path: '/admin/brands', icon: Briefcase, label: 'Brands' },
    { path: '/admin/branches', icon: MapPin, label: 'Branches' },
    { path: '/admin/hero', icon: ImageIcon, label: 'Hero Slides' },
    { path: '/admin/pages', icon: FileJson, label: 'Dynamic Pages' },
    { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { path: '/admin/fairs', icon: Calendar, label: 'Fairs & Events' },
  ];

  const handleLogout = async () => {
    await signOut();
    window.location.href = '#/admin/login';
  };

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        <span className="sidebar-title">Admin Portal</span>
        <button 
          className="sidebar-toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <button 
          onClick={handleLogout} 
          className="admin-nav-item" 
          style={{ width: '100%', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut size={20} />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
