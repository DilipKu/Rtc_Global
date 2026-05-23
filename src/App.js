import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
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
import ScrollToTop from './components/atoms/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/enquiry" element={<BulkEnquiryPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
