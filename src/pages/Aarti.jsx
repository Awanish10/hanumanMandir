import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import ReadingControls from '../components/ReadingControls';
import { aartiData, getFullAartiText } from '../data/aarti';

export default function Aarti() {
  const [fontSize, setFontSize] = useState(20);
  const [isReadingMode, setIsReadingMode] = useState(false);

  return (
    <div className={`transition-all ${isReadingMode ? 'bg-[#FFFDF7] py-6' : 'py-8 sm:py-12'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        {!isReadingMode && (
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30">
              <Flame className="w-3.5 h-3.5 text-saffron fill-saffron" />
              <span>{aartiData.subTitle}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
              {aartiData.title}
            </h1>

            <p className="text-sm sm:text-base text-templeText-muted max-w-lg mx-auto">
              श्रद्धा और भाव के साथ प्रातः एवं संध्या काल में हनुमान जी की इस पावन आरती का गायन करें।
            </p>
          </div>
        )}

        {/* Controls */}
        <ReadingControls
          fontSize={fontSize}
          setFontSize={setFontSize}
          minSize={16}
          maxSize={32}
          defaultSize={20}
          getTextToCopy={getFullAartiText}
          shareTitle="श्री हनुमान जी की आरती"
          shareText="जय श्री राम! आरती कीजै हनुमान लला की - संपूर्ण आरती पाठ।"
          isReadingMode={isReadingMode}
          setIsReadingMode={setIsReadingMode}
        />

        {/* Aarti Reading Card */}
        <div className="print-container bg-cream-card rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-gold/40 shadow-temple my-6">
          
          {/* Top Devotional Illustration or Icon */}
          <div className="text-center pb-6 border-b-2 border-gold/30 mb-8">
            <div className="w-16 h-16 rounded-full bg-saffron/15 border-2 border-gold mx-auto flex items-center justify-center text-saffron-deep mb-3 shadow-temple-sm">
              <Flame className="w-8 h-8 text-saffron fill-saffron animate-pulse" />
            </div>
            <p className="text-lg font-bold text-templeRed font-devanagari">
              ॥ श्री हनुमान जी की आरती ॥
            </p>
          </div>

          {/* Opening Refrain (मुखड़ा / ध्रुवपद) */}
          <section className="mb-8 text-center bg-cream/70 rounded-2xl p-5 sm:p-6 border border-gold/30 shadow-temple-sm">
            <p
              className="font-bold font-devanagari text-templeRed leading-relaxed"
              style={{ fontSize: `${fontSize + 2}px` }}
            >
              {aartiData.refrain.lines[0]}
              <br />
              {aartiData.refrain.lines[1]}
            </p>
          </section>

          {/* Stanzas (अंतरे) */}
          <section className="text-center space-y-8" aria-label="आरती के पद">
            {aartiData.stanzas.map((stanza, idx) => (
              <div key={idx} className="space-y-4">
                {/* Verse lines */}
                <div
                  className="font-semibold font-devanagari text-templeText leading-relaxed px-2"
                  style={{ fontSize: `${fontSize}px`, lineHeight: '1.9' }}
                >
                  {stanza.lines.map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>

                {/* Recurring Refrain Chorus */}
                <div className="py-2">
                  <p
                    className="font-bold font-devanagari text-saffron-deep opacity-90 text-sm sm:text-base"
                    style={{ fontSize: `${Math.max(fontSize - 3, 14)}px` }}
                  >
                    आरती कीजै हनुमान लला की।
                    <br />
                    दुष्ट दलन रघुनाथ कला की॥
                  </p>
                </div>

                {idx < aartiData.stanzas.length - 1 && (
                  <div className="w-24 h-px bg-gold/30 mx-auto" />
                )}
              </div>
            ))}
          </section>

          {/* Aarti Phalasruti & Closing */}
          <div className="mt-10 pt-6 border-t-2 border-gold/30 text-center space-y-2">
            <p
              className="font-bold font-devanagari text-templeRed leading-relaxed"
              style={{ fontSize: `${fontSize + 1}px` }}
            >
              आरती कीजै हनुमान लला की।
              <br />
              दुष्ट दलन रघुनाथ कला की॥
            </p>
            <p className="text-base font-bold text-saffron-deep font-devanagari pt-4">
              ॥ कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् ॥
            </p>
            <p className="text-sm font-semibold text-templeRed font-devanagari">
              ॥ बोलो बजरंगबली की जय ॥
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
