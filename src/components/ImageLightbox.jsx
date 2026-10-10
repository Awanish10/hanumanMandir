import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  // Handle ESC and Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Lock scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="छवि दर्शन"
    >
      {/* Top Bar with counter & close button */}
      <div
        className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold-light" />
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-saffron"
          aria-label="बंद करें (Escape)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-gold/40 shadow-2xl">
          <img
            src={currentImage.src}
            alt={currentImage.alt || currentImage.title}
            className="max-h-[65vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption and Information */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="inline-block px-3 py-0.5 rounded-full bg-saffron text-white text-xs font-bold mb-1 shadow-sm">
            {currentImage.tag || 'दर्शन'}
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-devanagari text-gold-light">
            {currentImage.title}
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 mt-1 leading-relaxed">
            {currentImage.caption}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-black/50 hover:bg-saffron text-white flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-saffron"
            aria-label="पिछली छवि"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-black/50 hover:bg-saffron text-white flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-saffron"
            aria-label="अगली छवि"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}
    </div>
  );
}
