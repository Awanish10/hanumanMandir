import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import HanumanChalisa from './pages/HanumanChalisa';
import Aarti from './pages/Aarti';
import HanumanKatha from './pages/HanumanKatha';
import StoryDetail from './pages/StoryDetail';
import Gallery from './pages/Gallery';
import Mandir from './pages/Mandir';
import Bhakti from './pages/Bhakti';
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
  return (
    <div className="min-h-screen flex flex-col bg-cream text-templeText selection:bg-saffron selection:text-white">
      <ScrollToTop />
      
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main Content Area - pb-20 on mobile to prevent MobileBottomNav overlap */}
      <main className="flex-1 pb-20 md:pb-0" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hanuman-chalisa" element={<HanumanChalisa />} />
          <Route path="/aarti" element={<Aarti />} />
          
          {/* Stories routes */}
          <Route path="/hanuman-katha" element={<HanumanKatha />} />
          <Route path="/hanuman-katha/:slug" element={<StoryDetail />} />

          {/* Gallery, Mandir Info, Bhakti */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mandir" element={<Mandir />} />
          <Route path="/bhakti" element={<Bhakti />} />

          {/* Custom 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (Visible on mobile only) */}
      <MobileBottomNav />
    </div>
  );
}
