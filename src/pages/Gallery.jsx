import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import GalleryGrid from '../components/GalleryGrid';
import { galleryImages, galleryCategories } from '../data/gallery';

export default function Gallery() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>॥ पावन दर्शन ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
            श्री हनुमान जी की भक्ति छवि दीर्घा
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            संकटमोचन श्री हनुमान जी के विभिन्न दिव्य स्वरूपों, आरती दीप, मंदिर शिखर एवं भक्तिमय प्रतीकों के दर्शन करें। किसी भी छवि पर टैप कर पूर्ण आकार में देखें।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* Gallery Grid with Category Filters & Lightbox */}
        <GalleryGrid images={galleryImages} categories={galleryCategories} />

        {/* Licensing & Authenticity Transparency Notice */}
        <div className="bg-cream-card rounded-2xl p-5 sm:p-6 border border-gold/40 shadow-temple-sm max-w-3xl mx-auto flex items-start gap-3 text-xs sm:text-sm text-templeText leading-relaxed">
          <Info className="w-5 h-5 text-saffron-deep flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-templeRed">चित्र संकलन व पारदर्शिता: </span>
            इस दीर्घा में केवल धर्मसम्मत, उच्च गुणवत्ता युक्त एवं अधिकृत स्थानीय कलाकृतियों का उपयोग किया गया है। ग्राम देहरिया मंदिर के वास्तविक विग्रह एवं परिसर के अधिकृत छायाचित्र मंदिर समिति द्वारा उपलब्ध कराए जाने पर यहाँ जोड़े जाएंगे।
          </div>
        </div>

      </div>
    </div>
  );
}
