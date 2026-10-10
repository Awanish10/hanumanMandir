import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, Share2, Sparkles, BookOpen, Lightbulb, Check } from 'lucide-react';
import { storiesData, getStoryBySlug } from '../data/stories';
import { shareContent } from '../utils/share';

export default function StoryDetail() {
  const { slug } = useParams();
  const story = getStoryBySlug(slug);

  const [fontSize, setFontSize] = useState(19);
  const [feedback, setFeedback] = useState('');

  if (!story) {
    return <Navigate to="/hanuman-katha" replace />;
  }

  // Find index for Prev / Next navigation
  const currentIndex = storiesData.findIndex((s) => s.slug === story.slug);
  const prevStory = currentIndex > 0 ? storiesData[currentIndex - 1] : null;
  const nextStory = currentIndex < storiesData.length - 1 ? storiesData[currentIndex + 1] : null;

  const handleShare = async () => {
    const res = await shareContent({
      title: `${story.title} - श्री हनुमान जी की कथा`,
      text: `${story.title}: ${story.shortIntro}`,
      url: window.location.href,
    });
    if (res.message) {
      setFeedback(res.message);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <article className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/hanuman-katha"
            className="inline-flex items-center gap-2 text-sm font-bold text-templeRed hover:text-saffron-deep transition-colors py-2 px-3 rounded-xl bg-white border border-gold/30 shadow-temple-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>सभी कथाएँ</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Font size toggles */}
            <div className="hidden sm:flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-gold/30 text-xs font-semibold">
              <span className="text-templeText-muted mr-1">आकार:</span>
              <button
                type="button"
                onClick={() => setFontSize((f) => Math.max(f - 1, 16))}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-cream"
                title="छोटा करें"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize((f) => Math.min(f + 1, 26))}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-cream"
                title="बड़ा करें"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-cream border border-gold/30 text-xs font-bold text-templeText shadow-temple-sm transition-colors"
            >
              <Share2 className="w-4 h-4 text-saffron" />
              <span>साझा करें</span>
            </button>
          </div>
        </div>

        {feedback && (
          <div className="text-center text-xs font-bold text-templeRed bg-saffron-light/20 py-1.5 px-4 rounded-xl border border-saffron/30 animate-fade-in">
            {feedback}
          </div>
        )}

        {/* Story Header */}
        <header className="text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-saffron/15 text-saffron-deep text-xs font-bold border border-saffron/30">
            {story.subtitle}
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-templeText-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-saffron" />
              पठन समय: {story.readTime}
            </span>
            <span>•</span>
            <span>कथा क्रम: {currentIndex + 1} / {storiesData.length}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full max-w-2xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-temple border-2 border-gold/40 bg-cream">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Short Summary Banner */}
        <div className="bg-cream p-5 sm:p-6 rounded-2xl border-l-4 border-saffron text-sm sm:text-base font-medium text-templeText leading-relaxed shadow-temple-sm">
          {story.shortIntro}
        </div>

        {/* Narrative Sections */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-8">
          {story.paragraphs.map((para, index) => (
            <section key={index} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold font-devanagari text-templeRed flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-saffron" />
                {para.heading}
              </h2>
              <p
                className="font-normal font-devanagari text-templeText leading-relaxed"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.9' }}
              >
                {para.text}
              </p>
            </section>
          ))}

          {/* Moral Box */}
          {story.moral && (
            <div className="mt-8 pt-6 border-t-2 border-gold/30">
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cream via-cream-light to-cream border border-gold/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center text-saffron-deep flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-templeRed text-base font-devanagari mb-1">
                    कथा की पावन सीख (Moral)
                  </h3>
                  <p className="text-sm sm:text-base text-templeText leading-relaxed">
                    {story.moral}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Previous and Next Navigation */}
        <nav
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold/30"
          aria-label="कथा नेविगेशन"
        >
          {prevStory ? (
            <Link
              to={`/hanuman-katha/${prevStory.slug}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-cream-card hover:bg-cream border border-gold/30 shadow-temple-sm transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-saffron transform group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <span className="text-[11px] font-semibold text-templeText-muted block uppercase">पिछली कथा</span>
                <span className="text-sm font-bold text-templeRed truncate block font-devanagari">
                  {prevStory.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextStory ? (
            <Link
              to={`/hanuman-katha/${nextStory.slug}`}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-cream-card hover:bg-cream border border-gold/30 shadow-temple-sm transition-all group text-right sm:col-start-2"
            >
              <div className="overflow-hidden w-full text-right">
                <span className="text-[11px] font-semibold text-templeText-muted block uppercase">अगली कथा</span>
                <span className="text-sm font-bold text-templeRed truncate block font-devanagari">
                  {nextStory.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-saffron transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>

        {/* Return Button */}
        <div className="text-center pt-4">
          <Link
            to="/hanuman-katha"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-saffron hover:bg-saffron-deep text-white font-bold text-sm shadow-temple-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>सभी ८ कथाओं की सूची पर लौटें</span>
          </Link>
        </div>

      </div>
    </article>
  );
}
