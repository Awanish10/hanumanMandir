import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function DevotionalCard({
  title,
  description,
  to,
  icon: Icon,
  badgeText,
  accentColor = 'saffron',
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-cream-card border border-gold/40 shadow-temple hover:shadow-temple-hover transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-saffron"
    >
      {/* Decorative Corner subtle gradient */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-saffron/10 to-transparent rounded-tr-3xl pointer-events-none" />

      <div>
        {/* Header icon and badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron/20 to-templeRed/15 border border-gold/40 flex items-center justify-center text-templeRed group-hover:scale-110 transition-transform shadow-temple-sm">
            <Icon className="w-7 h-7 text-templeRed" />
          </div>
          {badgeText && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cream-dark text-templeText-muted border border-gold/30">
              {badgeText}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed group-hover:text-saffron-deep transition-colors mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-templeText leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between text-saffron-deep font-bold text-sm group-hover:text-templeRed">
        <span>पाठ आरम्भ करें</span>
        <div className="w-8 h-8 rounded-full bg-cream group-hover:bg-saffron group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
