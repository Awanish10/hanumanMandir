import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ScrollText, MapPin, Sparkles } from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-light to-cream py-8 sm:py-14 border-b border-gold/30">
      {/* Background Decorative Temple Mandalas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[20px] border-saffron" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[20px] border-templeRed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Top sacred headline badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 text-templeRed text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-saffron fill-saffron" />
              <span>{templeInfo.tagline}</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight leading-tight">
                {templeInfo.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-templeText-muted font-medium leading-snug">
                {templeInfo.subTitle}
              </p>
            </div>

            {/* Verified Location Bar */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-templeText bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-gold/40 shadow-temple-sm max-w-full">
              <MapPin className="w-4 h-4 text-saffron-deep flex-shrink-0" />
              <span className="font-medium text-left truncate sm:whitespace-normal">
                {templeInfo.location.fullAddress}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/hanuman-chalisa"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-saffron to-saffron-deep hover:from-saffron-deep hover:to-saffron text-white text-base font-bold rounded-2xl shadow-temple hover:shadow-temple-hover transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 min-h-[48px]"
              >
                <BookOpen className="w-5 h-5" />
                <span>हनुमान चालीसा पढ़ें</span>
              </Link>

              <Link
                to="/hanuman-katha"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-cream-dark/50 text-templeRed border-2 border-templeRed/30 hover:border-templeRed text-base font-bold rounded-2xl shadow-temple-sm transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-templeRed focus:ring-offset-2 min-h-[48px]"
              >
                <ScrollText className="w-5 h-5 text-saffron-deep" />
                <span>हनुमान जी की कथा पढ़ें</span>
              </Link>
            </div>
          </div>

          {/* Devotional Hero Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-temple border-4 border-gold-light/60 bg-gradient-to-b from-[#FFF2D6] to-[#FFE4B5] group">
              <img
                src="/assets/images/hero-hanuman.svg"
                alt="संकटमोचन श्री हनुमान जी का दिव्य स्वरूप"
                className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                loading="eager"
                width="400"
                height="400"
              />
              <div className="absolute bottom-2 left-2 right-2 text-center bg-black/40 backdrop-blur-md rounded-xl py-1 px-3 text-[11px] sm:text-xs text-white font-medium border border-white/20">
                ॥ अतुलितबलधामं हेमशैलाभदेहं दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् ॥
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
