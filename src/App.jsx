import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import ContactFloatingWidget from './components/ContactFloatingWidget';

// Pages
import Home from './pages/Home';
import HanumanChalisa from './pages/HanumanChalisa';
import Hanumanashtak from './pages/Hanumanashtak';
import Aarti from './pages/Aarti';
import HanumanKatha from './pages/HanumanKatha';
import StoryDetail from './pages/StoryDetail';
import Gallery from './pages/Gallery';
import Mandir from './pages/Mandir';
import Donation from './pages/Donation';
import Bhakti from './pages/Bhakti';
import SanjeevaniAdventure from './pages/SanjeevaniAdventure';
import NotFound from './pages/NotFound';

/**
 * Scroll to top on every route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-templeText selection:bg-saffron selection:text-white overflow-x-hidden w-full max-w-full">
      <ScrollToTop />
      
      {/* Top Sticky Header */}
      <Navbar
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area - pb-20 on mobile to prevent MobileBottomNav overlap */}
      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden w-full max-w-full" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hanuman-chalisa" element={<HanumanChalisa />} />
          <Route path="/hanumanashtak" element={<Hanumanashtak />} />
          <Route path="/sankat-mochan-hanumanashtak" element={<Hanumanashtak />} />
          <Route path="/aarti" element={<Aarti />} />
          
          {/* Stories routes */}
          <Route path="/hanuman-katha" element={<HanumanKatha />} />
          <Route path="/hanuman-katha/:slug" element={<StoryDetail />} />

          {/* Gallery, Mandir Info, Donation, Bhakti */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mandir" element={<Mandir />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/bhakti" element={<Bhakti />} />
          <Route path="/sanjeevani-adventure" element={<SanjeevaniAdventure />} />

          {/* Custom 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Website Update & Contact Widget */}
      <ContactFloatingWidget />

      {/* Mobile Bottom Navigation (Visible on mobile only) */}
      <MobileBottomNav
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
}
