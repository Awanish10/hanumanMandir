import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

export default function Navbar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navLinks = [
    { name: 'होम', path: '/', icon: Home, subtitle: 'मुखपृष्ठ' },
    { name: 'हनुमान चालीसा', path: '/hanuman-chalisa', icon: BookOpen, subtitle: 'संपूर्ण पाठ एवं अर्थ' },
    { name: 'आरती', path: '/aarti', icon: Flame, subtitle: 'आरती कीजै हनुमान लला की' },
    { name: 'हनुमान जी की कथा', path: '/hanuman-katha', icon: ScrollText, subtitle: '८ पावन चरित्र एवं सीख' },
    { name: 'फोटो गैलरी', path: '/gallery', icon: ImageIcon, subtitle: 'दर्शन एवं दिव्य छवियाँ' },
    { name: 'मंदिर की जानकारी', path: '/mandir', icon: MapPin, subtitle: 'सत्यापित स्थान व विवरण' },
    { name: 'भक्ति और दोहे', path: '/bhakti', icon: Sparkles, subtitle: 'शास्त्र सम्मत दोहे' },
  ];

  // Close on route change
  useEffect(() => {
    if (setIsOpen) setIsOpen(false);
  }, [location.pathname]);

  // Lock scroll when open
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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (setIsOpen) setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const closeMenu = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const mobileDrawerContent = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm lg:hidden flex justify-end animate-fade-in"
      onClick={closeMenu}
      aria-modal="true"
      role="dialog"
      aria-label="मोबाइल नेविगेशन मेनू"
    >
      {/* Full-Height Drawer Container */}
      <div
        className="w-full sm:w-96 max-w-full h-full bg-[#FFFDF9] flex flex-col justify-between shadow-2xl border-l-2 border-gold/40 relative z-[10000] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Drawer Header */}
        <div className="p-4 border-b border-gold/30 bg-white flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-templeRed flex items-center justify-center p-1.5 border border-gold shadow-sm flex-shrink-0">
              <img src="/favicon.svg" alt="प्रतीक" className="w-full h-full object-contain" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-base font-bold text-templeRed font-devanagari block leading-tight truncate">
                {templeInfo.name}
              </span>
              <span className="text-[11px] text-templeText-muted truncate block">देहरिया, भदोही – 221314</span>
            </div>
          </div>

          {/* Prominent Close Button */}
          <button
            type="button"
            onClick={closeMenu}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-cream hover:bg-saffron/20 text-templeText hover:text-templeRed border border-gold/40 transition-colors flex-shrink-0 shadow-sm"
            aria-label="मेनू बंद करें"
          >
            <X className="w-6 h-6 text-templeRed" />
          </button>
        </div>

        {/* 2. Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2" aria-label="मोबाइल मेनू लिंक्स">
          <div className="text-[11px] font-bold text-saffron-deep uppercase tracking-wider px-2 mb-1">
            ॥ पावन सूची एवं दर्शन ॥
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3.5 rounded-2xl min-h-[54px] transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-saffron/25 via-saffron/10 to-transparent text-templeRed font-bold border-2 border-saffron shadow-temple-sm'
                      : 'bg-cream/40 text-templeText hover:bg-cream hover:text-saffron-deep border border-gold/25'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                          isActive
                            ? 'bg-templeRed text-white shadow-sm'
                            : 'bg-white text-templeRed border border-gold/30'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-base font-bold block font-devanagari leading-snug">
                          {link.name}
                        </span>
                        <span className="text-[11px] text-templeText-muted font-normal block leading-tight">
                          {link.subtitle}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        isActive ? 'text-templeRed translate-x-1' : 'text-templeText-muted/50'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. Drawer Footer: Directions & Devotional blessing */}
        <div className="p-4 border-t border-gold/30 bg-white space-y-2.5 pb-safe flex-shrink-0">
          <a
            href={templeInfo.location.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-sm rounded-xl shadow-temple transition-all active:scale-95 min-h-[46px]"
          >
            <Navigation className="w-4 h-4" />
            <span>गूगल मैप्स नेविगेशन (मार्ग देखें)</span>
          </a>

          <div className="text-center text-[11px] text-templeText-muted leading-relaxed pt-1">
            <p className="font-bold text-templeRed text-xs">॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥</p>
            <p className="text-[10px] text-templeText-muted/80 mt-0.5">
              ग्राम देहरिया, महाराजगंज, भदोही (उत्तर प्रदेश – 221314)
            </p>
          </div>
        </div>

      </div>
    </div>
  ) : null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-gold/30 shadow-sm transition-all">
      {/* Top Auspicious Ribbon */}
      <div className="bg-gradient-to-r from-templeRed via-saffron-deep to-templeRed text-white text-[11px] sm:text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse flex-shrink-0" />
        <span className="truncate">॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥</span>
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse flex-shrink-0" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Temple Branding */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1 min-w-0 flex-1 sm:flex-initial"
            aria-label={`${templeInfo.name} - मुखपृष्ठ`}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-saffron to-templeRed flex items-center justify-center shadow-temple border-2 border-gold-light overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/favicon.svg"
                alt="हनुमान जी प्रतीक"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <div className="flex flex-col text-left min-w-0 pr-2">
              <span className="text-base sm:text-2xl font-bold font-devanagari text-templeRed tracking-tight leading-snug truncate group-hover:text-saffron-deep transition-colors">
                {templeInfo.name}
              </span>
              <span className="text-[10px] sm:text-xs text-templeText-muted font-medium truncate">
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

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsOpen && setIsOpen(!isOpen)}
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

      {/* Render Mobile Drawer in document.body via Portal to prevent any CSS stacking/filter clipping */}
      {typeof document !== 'undefined' && mobileDrawerContent && createPortal(mobileDrawerContent, document.body)}
    </header>
  );
}
