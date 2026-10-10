import React, { useState } from 'react';
import { Copy, Share2, Check, Sparkles, BookOpen } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { shareContent } from '../utils/share';

export default function QuoteCard({ quote }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fullQuoteText = `${quote.doha}\n\nअर्थ: ${quote.meaning}\n(स्रोत: ${quote.source})\n॥ जय श्री राम ॥`;

  const handleCopy = async () => {
    const success = await copyToClipboard(fullQuoteText);
    if (success) {
      setCopied(true);
      setFeedback('कॉपी हो गया!');
      setTimeout(() => {
        setCopied(false);
        setFeedback('');
      }, 2500);
    }
  };

  const handleShare = async () => {
    const res = await shareContent({
      title: 'पवित्र हनुमान जी दोहा',
      text: fullQuoteText,
      url: window.location.href,
    });
    if (res.message) {
      setFeedback(res.message);
      setTimeout(() => setFeedback(''), 2500);
    }
  };

  return (
    <article className="relative bg-cream-card rounded-3xl p-6 sm:p-7 border border-gold/40 shadow-temple hover:shadow-temple-hover transition-all flex flex-col justify-between">
      {/* Top Tag and Actions */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gold/20">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/15 text-templeRed text-xs font-bold border border-saffron/30">
            <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>{quote.category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white hover:bg-cream border border-gold/30 text-templeText-muted hover:text-templeRed transition-colors"
              title="दोहा कॉपी करें"
              aria-label="दोहा कॉपी करें"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-white hover:bg-cream border border-gold/30 text-templeText-muted hover:text-saffron-deep transition-colors"
              title="दोहा साझा करें"
              aria-label="दोहा साझा करें"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Doha Text */}
        <div className="my-4 text-center px-2 py-4 bg-cream/60 rounded-2xl border border-gold/20">
          <p className="text-lg sm:text-xl font-bold font-devanagari text-templeRed whitespace-pre-line leading-relaxed">
            {quote.doha}
          </p>
        </div>

        {/* Hindi Meaning */}
        <div className="space-y-2 mt-4 text-sm text-templeText">
          <p className="leading-relaxed">
            <span className="font-bold text-saffron-deep">भावार्थ: </span>
            {quote.meaning}
          </p>
          {quote.context && (
            <p className="text-xs text-templeText-muted italic">
              <span className="font-semibold text-templeText">प्रसंग: </span>
              {quote.context}
            </p>
          )}
        </div>
      </div>

      {/* Footer Source */}
      <div className="mt-6 pt-3 border-t border-gold/20 flex items-center justify-between text-xs text-templeText-muted">
        <div className="flex items-center gap-1 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-saffron" />
          <span>स्रोत: {quote.source}</span>
        </div>
        {feedback && (
          <span className="text-xs font-bold text-templeRed animate-fade-in">
            {feedback}
          </span>
        )}
      </div>
    </article>
  );
}
