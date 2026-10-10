import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Flame, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import ReadingControls from '../components/ReadingControls';
import { hanumanashtakData, getFullHanumanashtakText } from '../data/hanumanashtak';

export default function Hanumanashtak() {
  const [fontSize, setFontSize] = useState(20);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);

  return (
    <div className={`transition-all ${isReadingMode ? 'bg-[#FFFDF7] py-6' : 'py-8 sm:py-12'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* 1. Header (Hidden in strict reading mode) */}
        {!isReadingMode && (
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30">
              <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
              <span>रचयिता: {hanumanashtakData.author}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
              {hanumanashtakData.title}
            </h1>

            <p className="text-sm sm:text-base text-templeText-muted max-w-lg mx-auto leading-relaxed">
              {hanumanashtakData.description}
            </p>
          </div>
        )}

        {/* 2. Reading Controls Bar */}
        <ReadingControls
          fontSize={fontSize}
          setFontSize={setFontSize}
          minSize={16}
          maxSize={32}
          defaultSize={20}
          getTextToCopy={getFullHanumanashtakText}
          shareTitle="संकट मोचन हनुमानाष्टक - संपूर्ण पाठ"
          shareText="जय संकट मोचन हनुमान! श्री संकट मोचन हनुमानाष्टक का संपूर्ण पाठ एवं भावार्थ पढ़ें।"
          isReadingMode={isReadingMode}
          setIsReadingMode={setIsReadingMode}
        />

        {/* Meaning Toggle Button */}
        <div className="flex items-center justify-end my-3">
          <button
            type="button"
            onClick={() => setShowMeaning(!showMeaning)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-cream text-templeText border border-gold/40 shadow-sm transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-saffron" />
            <span>{showMeaning ? 'भावार्थ छिपाएँ (केवल पाठ)' : 'हिंदी भावार्थ देखें'}</span>
          </button>
        </div>

        {/* 3. Sacred Text Container */}
        <div className="print-container bg-cream-card rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-gold/40 shadow-temple my-4">
          
          {/* Top Auspicious Inscription */}
          <div className="text-center border-b-2 border-gold/30 pb-6 mb-8">
            <p className="text-lg sm:text-xl font-bold text-templeRed font-devanagari">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-sm sm:text-base font-semibold text-saffron-deep mt-1 font-devanagari">
              ॥ श्री संकटमोचन हनुमानाष्टकम् ॥
            </p>
          </div>

          {/* 4. The 8 Verses (अष्टक) */}
          <div className="space-y-8 sm:space-y-10">
            {hanumanashtakData.verses.map((verse) => (
              <article
                key={verse.number}
                className="p-5 sm:p-7 rounded-2xl bg-white/70 border border-gold/30 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Verse Number Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-gold/20 pb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron/15 text-templeRed text-xs font-bold border border-saffron/30">
                    <span>पद संख्या {verse.number}</span>
                  </span>
                  <span className="text-[11px] text-templeText-muted">
                    ॥ संकटमोचन नाम तिहारो ॥
                  </span>
                </div>

                {/* Verse Lines */}
                <div
                  className="font-devanagari text-templeRed font-bold leading-loose text-center space-y-2 py-2"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {verse.lines.map((line, idx) => (
                    <p key={idx} className="tracking-wide">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Optional Hindi Meaning */}
                {showMeaning && (
                  <div className="mt-4 pt-4 border-t border-gold/20 text-xs sm:text-sm text-templeText leading-relaxed bg-cream/60 p-3.5 rounded-xl">
                    <span className="font-bold text-saffron-deep block mb-1">
                      सरल भावार्थ:
                    </span>
                    <p>{verse.meaning}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* 5. Concluding Sacred Doha */}
          <section className="mt-10 pt-8 border-t-2 border-gold/30 text-center" aria-label="समापन दोहा">
            <span className="text-xs font-bold text-saffron-deep uppercase tracking-widest block mb-3">
              ॥ समापन दोहा ॥
            </span>

            <div
              className="font-devanagari text-templeRed font-extrabold leading-loose py-3 px-4 bg-gradient-to-r from-saffron/10 via-saffron/20 to-saffron/10 rounded-2xl border border-gold/40 shadow-sm"
              style={{ fontSize: `${Math.max(fontSize, 20)}px` }}
            >
              {hanumanashtakData.doha.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {showMeaning && (
              <div className="mt-4 text-xs sm:text-sm text-templeText leading-relaxed max-w-xl mx-auto bg-cream/70 p-3.5 rounded-xl border border-gold/30">
                <span className="font-bold text-saffron-deep block mb-1">दोहा भावार्थ:</span>
                <p>{hanumanashtakData.doha.meaning}</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-base sm:text-lg font-bold text-templeRed font-devanagari">
                ॥ इति श्री संकटमोचन हनुमानाष्टकम् संपूर्णम् ॥
              </p>
              <p className="text-xs text-saffron-deep mt-1 font-semibold">
                ॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥
              </p>
            </div>
          </section>

        </div>

        {/* 6. Spiritual Benefits / Mahatmya Card */}
        {!isReadingMode && (
          <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-temple space-y-4 my-8">
            <h3 className="text-base sm:text-lg font-bold font-devanagari text-templeRed flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron fill-saffron" />
              <span>हनुमानाष्टक पाठ का आध्यात्मिक महात्म्य</span>
            </h3>

            <p className="text-xs sm:text-sm text-templeText leading-relaxed">
              गोस्वामी तुलसीदास जी द्वारा रचित <strong>संकट मोचन हनुमानाष्टक</strong> का पाठ सभी प्रकार के सांसारिक, मानसिक एवं शारीरिक कष्टों को दूर करने में अचूक माना गया है। इसमें हनुमान जी द्वारा देवताओं, सुग्रीव, माता सीता, लक्ष्मण जी और भगवान श्री राम के संकटों को हरने के पावन प्रसंगों का स्मरण किया गया है।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-cream rounded-xl border border-gold/30 text-center">
                <span className="text-xs font-bold text-templeRed block">मंगलवार व शनिवार</span>
                <span className="text-[11px] text-templeText-muted">विशेष फलदायी पाठ</span>
              </div>
              <div className="p-3 bg-cream rounded-xl border border-gold/30 text-center">
                <span className="text-xs font-bold text-templeRed block">संकट निवारण</span>
                <span className="text-[11px] text-templeText-muted">भय व संताप से मुक्ति</span>
              </div>
              <div className="p-3 bg-cream rounded-xl border border-gold/30 text-center">
                <span className="text-xs font-bold text-templeRed block">मनोबल व आत्मशक्ति</span>
                <span className="text-[11px] text-templeText-muted">सकारात्मक ऊर्जा का संचार</span>
              </div>
            </div>
          </div>
        )}

        {/* 7. Next Devotional Reads */}
        {!isReadingMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Link
              to="/hanuman-chalisa"
              className="p-5 rounded-2xl bg-white hover:bg-cream border border-gold/40 shadow-sm flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saffron/15 flex items-center justify-center text-templeRed">
                  <BookOpen className="w-5 h-5 text-saffron-deep" />
                </div>
                <div>
                  <span className="text-xs text-templeText-muted block">पावन पाठ</span>
                  <span className="text-sm font-bold text-templeRed group-hover:text-saffron-deep">
                    श्री हनुमान चालीसा पढ़ें
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-templeText-muted group-hover:text-templeRed group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/aarti"
              className="p-5 rounded-2xl bg-white hover:bg-cream border border-gold/40 shadow-sm flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-templeRed/15 flex items-center justify-center text-templeRed">
                  <Flame className="w-5 h-5 text-templeRed" />
                </div>
                <div>
                  <span className="text-xs text-templeText-muted block">मंगल आरती</span>
                  <span className="text-sm font-bold text-templeRed group-hover:text-saffron-deep">
                    हनुमान जी की आरती पढ़ें
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-templeText-muted group-hover:text-templeRed group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
