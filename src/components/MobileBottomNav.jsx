import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Flame, ScrollText } from 'lucide-react';

export default function MobileBottomNav() {
  const items = [
    { label: 'होम', path: '/', icon: Home },
    { label: 'चालीसा', path: '/hanuman-chalisa', icon: BookOpen },
    { label: 'आरती', path: '/aarti', icon: Flame },
    { label: 'कथाएँ', path: '/hanuman-katha', icon: ScrollText },
  ];

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-gold/30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden pb-safe"
      aria-label="त्वरित मोबाइल नेविगेशन"
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto items-center">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                  isActive
                    ? 'text-templeRed font-bold'
                    : 'text-templeText-muted hover:text-saffron-deep'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-transform ${
                      isActive ? 'bg-saffron/15 scale-110' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-templeRed stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  </div>
                  <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute top-0 w-8 h-1 bg-saffron rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
