import React, { useState } from 'react';
import { Sparkles, Quote, BookOpen } from 'lucide-react';
import QuoteCard from '../components/QuoteCard';
import { quotesData } from '../data/quotes';

export default function Bhakti() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories
  const categories = ['all', ...new Set(quotesData.map((q) => q.category))];

  const categoryLabels = {
    all: 'सभी दोहे',
    'संकटमोचन': 'संकटमोचन',
    'भक्ति भाव': 'भक्ति भाव',
    'ज्ञान व बल': 'ज्ञान व बल',
    'आरोग्य व शांति': 'आरोग्य व शांति',
    'राम भक्ति': 'राम भक्ति',
    'सद्बुद्धि व विनय': 'सद्बुद्धि व विनय',
    'शरण व रक्षा': 'शरण व रक्षा',
    'प्रभु दर्शन': 'प्रभु दर्शन',
  };

  const filteredQuotes =
    selectedCategory === 'all'
      ? quotesData
      : quotesData.filter((q) => q.category === selectedCategory);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>॥ अमृत वाणी व विचार ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
            भक्ति, दोहे एवं पावन विचार
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            गोस्वामी तुलसीदास जी विरचित श्री रामचरितमानस, सुंदरकांड, विनय पत्रिका एवं हनुमान चालीसा से संकलित प्रामाणिक दोहे एवं चौपाइयाँ मय सरल हिंदी भावार्थ।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold min-h-[44px] transition-all border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-saffron to-templeRed text-white border-transparent shadow-temple-sm scale-105'
                  : 'bg-white hover:bg-cream text-templeText border-gold/30 hover:border-saffron'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Quote Cards Grid (1 col mobile, 2 col md/lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>

        {/* Spiritual Guidance Footer */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-temple text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-templeRed font-bold text-base sm:text-lg font-devanagari">
            <BookOpen className="w-5 h-5 text-saffron" />
            <span>प्रामाणिक शास्त्र सम्मत संकलन</span>
          </div>
          <p className="text-xs sm:text-sm text-templeText leading-relaxed">
            यहाँ प्रस्तुत सभी दोहे एवं चौपाइयाँ गोस्वामी तुलसीदास जी की मान्य रचनाओं से ली गई हैं। किसी भी आधुनिक रचना को प्राचीन शास्त्र के रूप में प्रस्तुत नहीं किया गया है।
          </p>
        </div>

      </div>
    </div>
  );
}
