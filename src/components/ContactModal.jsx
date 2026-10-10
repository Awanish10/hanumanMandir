import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, MessageCircle, X, Copy, Check, Sparkles, PhoneCall } from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templeInfo.contact.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // Fallback
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gold/50 relative overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-saffron/15 to-transparent rounded-bl-full pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream hover:bg-cream-dark text-templeText-muted hover:text-templeRed flex items-center justify-center border border-gold/30 transition-colors"
          aria-label="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron/20 to-templeRed/15 border border-gold/40 flex items-center justify-center mx-auto text-templeRed shadow-sm">
            <PhoneCall className="w-7 h-7 text-saffron-deep" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-saffron/15 text-templeRed text-xs font-bold border border-saffron/30">
            <Sparkles className="w-3 h-3 text-saffron fill-saffron" />
            <span>वेबसाइट अद्यतन सहायता</span>
          </span>

          <h3 id="contact-modal-title" className="text-xl sm:text-2xl font-extrabold font-devanagari text-templeRed">
            वेबसाइट में अपडेट कराएं
          </h3>

          <p className="text-xs sm:text-sm text-templeText leading-relaxed max-w-xs mx-auto">
            वेबसाइट में कोई भी जानकारी, समय, फोटो या सुझाव अपडेट कराने हेतु सीधे संपर्क करें।
          </p>
        </div>

        {/* Phone Number Box with Copy */}
        <div className="bg-cream/80 p-4 rounded-2xl border border-gold/40 mb-6 flex items-center justify-between gap-3">
          <div className="text-left min-w-0">
            <span className="text-[11px] font-semibold text-templeText-muted block uppercase">
              संपर्क मोबाइल नंबर (Call & WhatsApp)
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-templeRed tracking-wide block font-mono">
              {templeInfo.contact.displayPhone}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-cream border border-gold/40 text-xs font-bold text-templeText shadow-sm transition-all active:scale-95 flex-shrink-0"
            title="नंबर कॉपी करें"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-700">कॉपी हुआ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-saffron" />
                <span>कॉपी</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Action Buttons: WhatsApp & Call */}
        <div className="space-y-3">
          {/* WhatsApp Button */}
          <a
            href={templeInfo.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all active:scale-95 min-h-[50px]"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span>व्हाट्सएप पर मैसेज भेजें (WhatsApp)</span>
          </a>

          {/* Direct Call Button */}
          <a
            href={`tel:${templeInfo.contact.phone}`}
            className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-5 bg-gradient-to-r from-saffron to-saffron-deep hover:from-saffron-deep hover:to-templeRed text-white font-bold text-sm sm:text-base rounded-2xl shadow-temple transition-all active:scale-95 min-h-[50px]"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span>सीधे कॉल करें (Call Now)</span>
          </a>
        </div>

        {/* Auspicious Footer */}
        <div className="mt-5 pt-4 border-t border-gold/20 text-center">
          <p className="text-[11px] text-templeText-muted">
            ॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥
          </p>
          <p className="text-[10px] text-templeText-muted/80 mt-0.5">
            {templeInfo.name}, देहरिया, भदोही
          </p>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
