import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Flame,
  Home,
  BookOpen,
  ScrollText,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links with icons and subtitles
  const navLinks = [
    { name: 'होम', path: '/', icon: Home, subtitle: 'मुखपृष्ठ' },
    { name: 'हनुमान चालीसा', path: '/hanuman-chalisa', icon: BookOpen, subtitle: 'संपूर्ण पाठ एवं अर्थ' },
    { name: 'आरती', path: '/aarti', icon: Flame, subtitle: 'आरती कीजै हनुमान लला की' },
    { name: 'हनुमान जी की कथा', path: '/hanuman-katha', icon: ScrollText, subtitle: '८ पावन चरित्र एवं सीख' },
    { name: 'फोटो गैलरी', path: '/gallery', icon: ImageIcon, subtitle: 'दर्शन एवं दिव्य छवियाँ' },
    { name: 'मंदिर की जानकारी', path: '/mandir', icon: MapPin, subtitle: 'सत्यापित स्थान व विवरण' },
    { name: 'भक्ति और दोहे', path: '/bhakti', icon: Sparkles, subtitle: 'शास्त्र सम्मत दोहे' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gold/30 shadow-sm transition-all">
      {/* Top Auspicious Ribbon */}
      <div className="bg-gradient-to-r from-templeRed via-saffron-deep to-templeRed text-white text-[11px] sm:text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse flex-shrink-0" />
        <span className="truncate">॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥</span>
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse flex-shrink-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Temple Branding */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1"
            aria-label={`${templeInfo.name} - मुखपृष्ठ`}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-saffron to-templeRed flex items-center justify-center shadow-temple border-2 border-gold-light overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/favicon.svg"
                alt="हनुमान जी प्रतीक"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-2xl font-bold font-devanagari text-templeRed tracking-tight leading-tight group-hover:text-saffron-deep transition-colors">
                {templeInfo.name}
              </span>
              <span className="text-[10px] sm:text-xs text-templeText-muted font-medium line-clamp-1">
                देहरिया, महाराजगंज, भदोही
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= lg) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="मुख्य नेविगेशन"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-templeRed bg-cream-dark/60 font-bold shadow-sm'
                      : 'text-templeText hover:text-saffron-deep hover:bg-cream/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-saffron rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl text-templeText hover:text-templeRed hover:bg-cream border border-gold/40 focus:outline-none focus:ring-2 focus:ring-saffron transition-all active:scale-95 shadow-sm"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-templeRed" />
              ) : (
                <Menu className="w-6 h-6 text-templeText" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end animate-fade-in"
          onClick={closeMenu}
          aria-modal="true"
          role="dialog"
          aria-label="मोबाइल नेविगेशन मेनू"
        >
          {/* Slide-over Drawer Panel */}
          <div
            className="w-[85vw] max-w-sm h-full bg-cream-card flex flex-col justify-between shadow-2xl border-l-2 border-gold/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-gold/30 bg-white/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center p-1 border border-gold shadow-sm flex-shrink-0">
                  <img src="/favicon.svg" alt="प्रतीक" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="text-base font-bold text-templeRed font-devanagari block leading-tight">
                    {templeInfo.name}
                  </span>
                  <span className="text-[10px] text-templeText-muted">देहरिया, भदोही – 221314</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-cream hover:bg-saffron/20 text-templeText hover:text-templeRed border border-gold/30 transition-colors"
                aria-label="मेनू बंद करें"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Navigation List */}
            <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5" aria-label="मोबाइल मेनू लिंक्स">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 rounded-2xl min-h-[50px] transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-saffron/20 via-saffron/10 to-transparent text-templeRed font-bold border border-saffron/40 shadow-temple-sm'
                          : 'text-templeText hover:bg-cream hover:text-saffron-deep border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-templeRed text-white shadow-sm'
                                : 'bg-cream text-templeText-muted'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-sm font-bold block font-devanagari leading-snug">
                              {link.name}
                            </span>
                            <span className="text-[10px] text-templeText-muted font-normal block leading-tight">
                              {link.subtitle}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? 'text-templeRed translate-x-0.5' : 'text-templeText-muted/60'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Drawer Footer: Directions & Devotional blessing */}
            <div className="p-4 border-t border-gold/30 bg-white/70 space-y-3 pb-safe">
              <a
                href={templeInfo.location.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-xs rounded-xl shadow-temple-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>गूगल मैप्स नेविगेशन (मार्ग)</span>
              </a>

              <div className="text-center text-[11px] text-templeText-muted leading-relaxed">
                <p className="font-semibold text-templeRed">॥ जय श्री राम ॥ जय हनुमान ॥</p>
                <p className="text-[10px] text-templeText-muted/80 mt-0.5">
                  ग्राम देहरिया, महाराजगंज, भदोही (उ.प्र.)
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
