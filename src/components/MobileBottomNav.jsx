import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Flame, ScrollText, Menu, X } from 'lucide-react';

export default function MobileBottomNav({ isMenuOpen, setIsMenuOpen }) {
  const primaryTabs = [
    { label: 'होम', path: '/', icon: Home },
    { label: 'चालीसा', path: '/hanuman-chalisa', icon: BookOpen },
    { label: 'आरती', path: '/aarti', icon: Flame },
    { label: 'कथाएँ', path: '/hanuman-katha', icon: ScrollText },
  ];

  const toggleMenu = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-30 bg-white/98 backdrop-blur-lg border-t border-gold/40 shadow-[0_-4px_20px_rgba(61,36,24,0.08)] md:hidden pb-safe"
      aria-label="त्वरित मोबाइल नेविगेशन"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {primaryTabs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full min-h-[48px] transition-colors relative ${
                  isActive && !isMenuOpen
                    ? 'text-templeRed font-bold'
                    : 'text-templeText-muted hover:text-saffron-deep'
                }`
              }
            >
              {({ isActive }) => {
                const active = isActive && !isMenuOpen;
                return (
                  <>
                    <div
                      className={`p-1 rounded-xl transition-all ${
                        active ? 'bg-saffron/20 scale-110' : ''
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-templeRed stroke-[2.4]' : 'stroke-[1.8]'}`} />
                    </div>
                    <span className="text-[10px] leading-tight mt-0.5 tracking-tight font-medium font-devanagari">
                      {item.label}
                    </span>
                    {active && (
                      <span className="absolute top-0 w-8 h-1 bg-saffron rounded-full" />
                    )}
                  </>
                );
              }}
            </NavLink>
          );
        })}

        {/* 5th Button: Full Menu Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] transition-colors relative ${
            isMenuOpen
              ? 'text-templeRed font-bold'
              : 'text-templeText-muted hover:text-saffron-deep'
          }`}
          aria-label={isMenuOpen ? 'मेनू बंद करें' : 'संपूर्ण मेनू खोलें'}
          aria-expanded={isMenuOpen}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              isMenuOpen ? 'bg-templeRed text-white scale-110' : ''
            }`}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.4]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[1.8]" />
            )}
          </div>
          <span className="text-[10px] leading-tight mt-0.5 tracking-tight font-medium font-devanagari">
            {isMenuOpen ? 'बंद' : 'मेनू'}
          </span>
          {isMenuOpen && (
            <span className="absolute top-0 w-8 h-1 bg-templeRed rounded-full" />
          )}
        </button>
      </div>
    </nav>
  );
}
