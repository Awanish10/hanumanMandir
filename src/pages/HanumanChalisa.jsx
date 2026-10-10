import React, { useState } from 'react';
import { Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import ReadingControls from '../components/ReadingControls';
import { chalisaData, getFullChalisaText } from '../data/chalisa';

export default function HanumanChalisa() {
  const [fontSize, setFontSize] = useState(20);
  const [isReadingMode, setIsReadingMode] = useState(false);

  return (
    <div className={`transition-all ${isReadingMode ? 'bg-[#FFFDF7] py-6' : 'py-8 sm:py-12'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header (hidden in strict reading mode if toggled) */}
        {!isReadingMode && (
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30">
              <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
              <span>रचयिता: {chalisaData.author}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
              {chalisaData.title}
            </h1>

            <p className="text-sm sm:text-base text-templeText-muted max-w-lg mx-auto">
              संकटमोचन महाबली श्री हनुमान जी की कृपा प्राप्ति एवं सभी कष्टों के निवारण हेतु चालीस पावन चौपाइयों का संग्रह।
            </p>
          </div>
        )}

        {/* Reading Controls Bar */}
        <ReadingControls
          fontSize={fontSize}
          setFontSize={setFontSize}
          minSize={16}
          maxSize={32}
          defaultSize={20}
          getTextToCopy={getFullChalisaText}
          shareTitle="श्री हनुमान चालीसा - संपूर्ण पाठ"
          shareText="जय श्री राम! श्री हनुमान चालीसा का संपूर्ण पाठ शुद्ध देवनागरी में पढ़ें।"
          isReadingMode={isReadingMode}
          setIsReadingMode={setIsReadingMode}
        />

        {/* Main Sacred Text Container */}
        <div className="print-container bg-cream-card rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-gold/40 shadow-temple my-6">
          
          {/* Top Inscription */}
          <div className="text-center border-b-2 border-gold/30 pb-6 mb-8">
            <p className="text-lg sm:text-xl font-bold text-templeRed font-devanagari">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-sm sm:text-base font-semibold text-saffron-deep mt-1 font-devanagari">
              ॥ श्री जानकीवल्लभो विजयते ॥
            </p>
          </div>

          {/* 1. Opening Dohas (प्रारंभिक दोहा) */}
          <section className="mb-10 text-center" aria-label="प्रारंभिक दोहा">
            <div className="inline-block px-4 py-1.5 rounded-full bg-saffron/15 text-templeRed text-sm font-bold mb-6 border border-saffron/30">
              ॥ दोहा ॥
            </div>

            <div className="space-y-8">
              {chalisaData.openingDohas.map((doha, idx) => (
                <div key={idx} className="bg-cream/70 rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-temple-sm">
                  <p
                    className="font-bold font-devanagari text-templeRed leading-relaxed"
                    style={{ fontSize: `${fontSize + 1}px` }}
                  >
                    {doha.lines[0]}
                    <br />
                    {doha.lines[1]}
                  </p>
                  {doha.meaning && (
                    <p className="text-xs sm:text-sm text-templeText-muted mt-3 pt-3 border-t border-gold/20 font-normal leading-normal">
                      <span className="font-semibold text-saffron-deep">अर्थ: </span>
                      {doha.meaning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 2. Chaupais (४० चौपाइयाँ) */}
          <section className="mb-10 text-center" aria-label="चालीस चौपाइयाँ">
            <div className="inline-block px-4 py-1.5 rounded-full bg-saffron/15 text-templeRed text-sm font-bold mb-6 border border-saffron/30">
              ॥ चौपाई ॥
            </div>

            <div className="divide-y divide-gold/25">
              {chalisaData.chaupais.map((ch) => (
                <div
                  key={ch.number}
                  className="py-4 sm:py-5 hover:bg-cream/40 rounded-xl transition-colors px-2"
                >
                  <p
                    className="font-semibold font-devanagari text-templeText leading-loose tracking-wide"
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.9' }}
                  >
                    {ch.lines[0]}
                    <br />
                    {ch.lines[1]}
                    <span className="inline-block ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-saffron/20 text-templeRed border border-gold/40 align-middle">
                      {ch.number}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Closing Doha (समापन दोहा) */}
          <section className="mt-8 text-center" aria-label="समापन दोहा">
            <div className="inline-block px-4 py-1.5 rounded-full bg-saffron/15 text-templeRed text-sm font-bold mb-6 border border-saffron/30">
              ॥ दोहा ॥
            </div>

            <div className="bg-cream/70 rounded-2xl p-5 sm:p-7 border border-gold/30 shadow-temple-sm">
              <p
                className="font-bold font-devanagari text-templeRed leading-relaxed"
                style={{ fontSize: `${fontSize + 1}px` }}
              >
                {chalisaData.closingDoha.lines[0]}
                <br />
                {chalisaData.closingDoha.lines[1]}
              </p>
              {chalisaData.closingDoha.meaning && (
                <p className="text-xs sm:text-sm text-templeText-muted mt-3 pt-3 border-t border-gold/20 font-normal leading-normal">
                  <span className="font-semibold text-saffron-deep">अर्थ: </span>
                  {chalisaData.closingDoha.meaning}
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gold/30 text-center">
              <p className="text-lg font-bold text-templeRed font-devanagari">
                ॥ इति श्री हनुमान चालीसा समाप्त ॥
              </p>
              <p className="text-sm font-semibold text-saffron-deep mt-1 font-devanagari">
                ॥ जय श्री राम ॥
              </p>
            </div>
          </section>

        </div>

        {/* Benefits & Note Section */}
        {!isReadingMode && (
          <div className="no-print mt-8 bg-cream/70 rounded-2xl p-5 sm:p-6 border border-gold/30 text-xs sm:text-sm text-templeText leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-templeRed text-sm">
              <CheckCircle2 className="w-4 h-4 text-saffron" />
              <span>श्री हनुमान चालीसा पाठ का महत्व:</span>
            </div>
            <p>
              'जो यह पढ़ै हनुमान चलीसा, होय सिद्धि साखी गौरीसा।' नियमित रूप से हनुमान चालीसा का पाठ करने से मन की एकाग्रता बढ़ती है, आत्मबल में वृद्धि होती है और संकटों से मुक्ति प्राप्त होती है।
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
