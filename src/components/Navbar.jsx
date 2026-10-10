import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links configuration
  const navLinks = [
    { name: 'होम', path: '/' },
    { name: 'हनुमान चालीसा', path: '/hanuman-chalisa' },
    { name: 'आरती', path: '/aarti' },
    { name: 'हनुमान जी की कथा', path: '/hanuman-katha' },
    { name: 'फोटो गैलरी', path: '/gallery' },
    { name: 'मंदिर की जानकारी', path: '/mandir' },
    { name: 'भक्ति और दोहे', path: '/bhakti' },
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gold/30 shadow-sm transition-all">
      {/* Top Auspicious Ribbon */}
      <div className="bg-gradient-to-r from-templeRed via-saffron-deep to-templeRed text-white text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse" />
        <span>॥ जय श्री राम ॥ जय बजरंगबली हनुमान ॥</span>
        <Flame className="w-3.5 h-3.5 text-gold-light animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Temple Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1"
            aria-label={`${templeInfo.name} - मुखपृष्ठ`}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-saffron to-templeRed flex items-center justify-center shadow-temple border-2 border-gold-light overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/favicon.svg"
                alt="हनुमान जी प्रतीक"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed tracking-tight leading-tight group-hover:text-saffron-deep transition-colors">
                {templeInfo.name}
              </span>
              <span className="text-[11px] sm:text-xs text-templeText-muted font-medium line-clamp-1">
                देहरिया, महाराजगंज, भदोही
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-templeText hover:text-templeRed hover:bg-cream border border-gold/30 focus:outline-none focus:ring-2 focus:ring-saffron transition-colors"
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

      {/* Mobile Drawer Navigation (Accessible Dialog) */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[calc(4rem+25px)] sm:top-[calc(5rem+25px)] z-50 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-cream-card w-full max-w-sm ml-auto h-full shadow-2xl border-l border-gold/30 p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="मोबाइल नेविगेशन मेनू"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gold/20 mb-4">
                <span className="text-base font-bold text-templeRed">
                  नेविगेशन मेनू
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-templeText-muted hover:text-templeRed hover:bg-cream"
                  aria-label="मेनू बंद करें"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1" aria-label="मोबाइल मेनू">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-base font-medium min-h-[44px] transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-saffron/15 to-transparent text-templeRed font-bold border-l-4 border-saffron'
                          : 'text-templeText hover:bg-cream hover:text-saffron-deep'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Footer info */}
            <div className="pt-6 border-t border-gold/20 text-center">
              <p className="text-xs text-templeText-muted leading-relaxed">
                ग्राम देहरिया, महाराजगंज, भदोही
                <br />
                पिन कोड – 221314
              </p>
              <p className="text-[11px] font-semibold text-saffron-deep mt-2">
                ॥ जय श्री राम ॥
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
