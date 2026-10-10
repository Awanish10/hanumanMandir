import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function StoryCard({ story }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/hanuman-katha/${story.slug}`}
      className="group flex flex-col bg-cream-card rounded-3xl overflow-hidden border border-gold/40 shadow-temple hover:shadow-temple-hover transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-saffron text-left cursor-pointer"
      aria-label={`${story.title} - संपूर्ण कथा पढ़ें`}
    >
      {/* Thumbnail */}
      <div className="relative block w-full aspect-[16/10] bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
        {!imgError ? (
          <img
            src={story.image}
            alt={story.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-saffron/20 to-templeRed/10 text-templeRed text-center">
            <BookOpen className="w-10 h-10 mb-2 opacity-80" />
            <span className="text-xs font-bold font-devanagari">{story.title}</span>
          </div>
        )}

        {/* Read Time Tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-templeText-muted flex items-center gap-1 shadow-sm border border-gold/30">
          <Clock className="w-3.5 h-3.5 text-saffron-deep" />
          <span>{story.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-saffron-deep uppercase tracking-wider block mb-1">
            {story.subtitle}
          </span>

          <h3 className="text-lg sm:text-xl font-bold font-devanagari text-templeRed group-hover:text-saffron-deep transition-colors mb-2 leading-snug">
            {story.title}
          </h3>

          <p className="text-xs sm:text-sm text-templeText leading-relaxed line-clamp-3 mb-4">
            {story.shortIntro}
          </p>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs sm:text-sm font-bold text-templeRed group-hover:text-saffron-deep">
          <span>पूरी कथा पढ़ें</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-saffron" />
        </div>
      </div>
    </Link>
  );
}
