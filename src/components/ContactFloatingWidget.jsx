import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import ContactModal from './ContactModal';

export default function ContactFloatingWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button (placed above bottom navigation on mobile) */}
      <aside aria-label="वेबसाइट सहायता एवं संपर्क" className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-30 print:hidden">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2.5 py-2.5 px-3.5 sm:px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-full shadow-2xl border-2 border-white/80 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="वेबसाइट अपडेट व संपर्क बॉक्स खोलें"
        >
          {/* Animated Icons */}
          <div className="relative flex items-center justify-center">
            <span className="absolute w-full h-full rounded-full bg-white/30 animate-ping opacity-75 pointer-events-none" />
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          <div className="text-left leading-tight hidden xs:block sm:block">
            <span className="text-[10px] sm:text-xs text-white/90 block font-normal">
              वेबसाइट अपडेट?
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block font-devanagari">
              संपर्क करें
            </span>
          </div>
        </button>
      </aside>

      {/* Modal Dialog */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
