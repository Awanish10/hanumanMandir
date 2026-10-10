import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full text-center bg-cream-card rounded-3xl p-8 sm:p-10 border-2 border-gold/40 shadow-temple space-y-6">
        
        <div className="w-16 h-16 rounded-full bg-saffron/20 border-2 border-gold mx-auto flex items-center justify-center text-templeRed">
          <AlertCircle className="w-8 h-8 text-saffron-deep" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-saffron-deep font-devanagari">
            ४०४
          </span>
          <h1 className="text-2xl font-bold text-templeRed font-devanagari">
            यह पृष्ठ उपलब्ध नहीं है
          </h1>
          <p className="text-sm text-templeText leading-relaxed">
            क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह यहाँ नहीं है या उसका पता बदल गया है।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-saffron hover:bg-saffron-deep text-white font-bold text-sm shadow-temple-sm transition-colors min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>मुखपृष्ठ पर जाएँ</span>
          </Link>

          <Link
            to="/hanuman-chalisa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-cream text-templeRed border border-gold/40 font-bold text-sm shadow-temple-sm transition-colors min-h-[44px]"
          >
            <BookOpen className="w-4 h-4 text-saffron-deep" />
            <span>हनुमान चालीसा पढ़ें</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-gold/20 text-xs font-semibold text-templeText-muted">
          ॥ जय श्री राम ॥ जय संकटमोचन हनुमान ॥
        </div>

      </div>
    </div>
  );
}
