import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute } from './components/auth/ProtectedRoutes';
import Login from './pages/Auth/Login';
import ProfilePage from './pages/Auth/ProfilePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HeroAdmin from './pages/Admin/HeroAdmin';
import BrandsAdmin from './pages/Admin/BrandsAdmin';
import BranchesAdmin from './pages/Admin/BranchesAdmin';
import CategoriesAdmin from './pages/Admin/CategoriesAdmin';
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import EnquiriesAdmin from './pages/Admin/EnquiriesAdmin';
import DynamicPagesAdmin from './pages/Admin/DynamicPagesAdmin';
import BlogsAdmin from './pages/Admin/BlogsAdmin';
import FairsAdmin from './pages/Admin/FairsAdmin';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home/HomePage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetail/CollectionDetailPage';
import BulkEnquiryPage from './pages/BulkEnquiry/BulkEnquiryPage';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ContactPage from './pages/Contact/ContactPage';
import HowItWorksPage from './pages/HowItWorks/HowItWorksPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import BranchesPage from './pages/Branches/BranchesPage';
import TermsAndConditionsPage from './pages/TermsAndConditions/TermsAndConditions';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicy';
import BlogPage from './pages/Blog/BlogPage';
import BlogDetailPage from './pages/BlogDetail/BlogDetailPage';
import FairsPage from './pages/Fairs/FairsPage';
import ScrollToTop from './components/atoms/ScrollToTop';

import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* All Routes Wrapped in MainLayout for Global Header/Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:id" element={<CollectionDetailPage />} />
              <Route path="/enquiry" element={<BulkEnquiryPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/fairs" element={<FairsPage />} />
              <Route path="/terms" element={<TermsAndConditionsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Login isAdminRoute={true} />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Admin Protected Routes */}
              <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/enquiries" element={<EnquiriesAdmin />} />
                  <Route path="/admin/hero" element={<HeroAdmin />} />
                  <Route path="/admin/brands" element={<BrandsAdmin />} />
                  <Route path="/admin/branches" element={<BranchesAdmin />} />
                  <Route path="/admin/categories" element={<CategoriesAdmin />} />
                  <Route path="/admin/products" element={<ProductsAdmin />} />
                  <Route path="/admin/pages" element={<DynamicPagesAdmin />} />
                  <Route path="/admin/blogs" element={<BlogsAdmin />} />
                  <Route path="/admin/fairs" element={<FairsAdmin />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

