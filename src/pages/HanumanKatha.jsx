import React from 'react';
import { ScrollText, Sparkles } from 'lucide-react';
import StoryCard from '../components/StoryCard';
import { storiesData } from '../data/stories';

export default function HanumanKatha() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>॥ पावन चरित्र व पराक्रम ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
            श्री हनुमान जी की पावन कथाएँ
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            पवनपुत्र हनुमान जी का जीवन अगाध भक्ति, अप्रतिम पराक्रम, बुद्धि, निष्ठा और धर्म-रक्षा की अनुपम मिसाल है। यहाँ उनके बालपन से लेकर लंका विजय और अनन्य रामभक्ति की आठ प्रमुख प्रेरणादायक कथाएँ सरल हिंदी में प्रस्तुत हैं।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* Story Grid (2 cols md, 3 cols lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Bottom Devotional Note */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-temple text-center max-w-3xl mx-auto">
          <p className="font-bold text-templeRed text-base sm:text-lg font-devanagari mb-2">
            "महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥"
          </p>
          <p className="text-xs sm:text-sm text-templeText leading-relaxed">
            इन पावन कथाओं का पठन-पाठन बच्चों और परिवारों में नैतिक मूल्यों, निर्भीकता, और ईश्वर पर अटूट विश्वास का संचार करता है।
          </p>
        </div>

      </div>
    </div>
  );
}
