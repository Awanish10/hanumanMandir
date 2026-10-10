import React, { useState } from 'react';
import { ZoomIn, Sparkles, Image as ImageIcon } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

export default function GalleryGrid({ images, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter images based on category
  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold min-h-[44px] transition-all border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-saffron to-templeRed text-white border-transparent shadow-temple-sm scale-105'
                  : 'bg-white hover:bg-cream text-templeText border-gold/30 hover:border-saffron'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Responsive Image Grid (2 cols mobile, 3 sm/md, 4 lg) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredImages.map((img, index) => (
          <div
            key={img.id}
            onClick={() => openLightbox(index)}
            className="group relative bg-cream-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/40 shadow-temple hover:shadow-temple-hover transition-all duration-300 cursor-pointer aspect-square sm:aspect-[4/3] flex flex-col justify-end"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            aria-label={`${img.title} का बड़ा रूप देखें`}
          >
            {/* Background image */}
            <img
              src={img.src}
              alt={img.alt || img.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover zoom icon */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
              <ZoomIn className="w-4 h-4 text-gold-light" />
            </div>

            {/* Bottom Caption Box */}
            <div className="relative z-10 p-3 sm:p-4 text-white">
              <span className="inline-block px-2 py-0.5 rounded-md bg-saffron/90 text-[10px] sm:text-xs font-semibold mb-1 shadow-sm">
                {img.tag}
              </span>
              <h4 className="text-xs sm:text-sm font-bold font-devanagari line-clamp-1 text-gold-light group-hover:text-white transition-colors">
                {img.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
