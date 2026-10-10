import React, { useState } from 'react';
import { Copy, Share2, Printer, ZoomIn, ZoomOut, RotateCcw, Check, Eye, EyeOff } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { shareContent } from '../utils/share';

export default function ReadingControls({
  fontSize,
  setFontSize,
  minSize = 16,
  maxSize = 30,
  defaultSize = 20,
  getTextToCopy,
  shareTitle,
  shareText,
  isReadingMode,
  setIsReadingMode,
}) {
  const [copied, setCopied] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleCopy = async () => {
    if (!getTextToCopy) return;
    const text = getTextToCopy();
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setFeedbackMsg('सफलतापूर्वक कॉपी हो गया!');
      setTimeout(() => {
        setCopied(false);
        setFeedbackMsg('');
      }, 3000);
    } else {
      setFeedbackMsg('कॉपी करने में त्रुटि हुई');
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  const handleShare = async () => {
    const res = await shareContent({
      title: shareTitle || 'श्री हनुमान मंदिर',
      text: shareText || 'जय श्री राम! हनुमान जी की पावन भक्ति पढ़ें।',
      url: window.location.href,
    });
    if (res.message) {
      setFeedbackMsg(res.message);
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const increaseSize = () => {
    setFontSize((prev) => Math.min(prev + 2, maxSize));
  };

  const decreaseSize = () => {
    setFontSize((prev) => Math.max(prev - 2, minSize));
  };

  const resetSize = () => {
    setFontSize(defaultSize);
  };

  return (
    <div className="no-print my-4 p-3 bg-cream-card border border-gold/40 rounded-2xl shadow-temple-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Font-size adjustments */}
        <div className="flex items-center gap-1.5 bg-cream px-2 py-1 rounded-xl border border-gold/30">
          <span className="text-xs font-semibold text-templeText-muted mr-1 hidden sm:inline">अक्षर आकार:</span>
          
          <button
            type="button"
            onClick={decreaseSize}
            disabled={fontSize <= minSize}
            className="w-9 h-9 min-w-[36px] flex items-center justify-center rounded-lg bg-white hover:bg-saffron/10 text-templeText disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-gold/20 font-bold"
            title="अक्षर छोटा करें (Font Size Decrease)"
            aria-label="अक्षर छोटा करें"
          >
            <ZoomOut className="w-4 h-4 text-templeRed" />
            <span className="text-xs ml-0.5 font-bold">A-</span>
          </button>

          <button
            type="button"
            onClick={resetSize}
            className="px-2 h-9 flex items-center justify-center rounded-lg bg-white hover:bg-saffron/10 text-templeText transition-colors border border-gold/20 text-xs font-medium"
            title="सामान्य आकार (Reset Size)"
            aria-label="सामान्य आकार रीसेट करें"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 text-templeText-muted" />
            <span>{fontSize}px</span>
          </button>

          <button
            type="button"
            onClick={increaseSize}
            disabled={fontSize >= maxSize}
            className="w-9 h-9 min-w-[36px] flex items-center justify-center rounded-lg bg-white hover:bg-saffron/10 text-templeText disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-gold/20 font-bold"
            title="अक्षर बड़ा करें (Font Size Increase)"
            aria-label="अक्षर बड़ा करें"
          >
            <ZoomIn className="w-4 h-4 text-saffron-deep" />
            <span className="text-xs ml-0.5 font-bold">A+</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {setIsReadingMode && (
            <button
              type="button"
              onClick={() => setIsReadingMode(!isReadingMode)}
              className={`h-9 px-3 flex items-center gap-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isReadingMode
                  ? 'bg-templeRed text-white border-templeRed shadow-sm'
                  : 'bg-white text-templeText hover:bg-saffron/10 border-gold/30'
              }`}
              title={isReadingMode ? 'सामान्य मोड' : 'एकाग्र पठन मोड (Reading Mode)'}
              aria-label="पठन मोड टॉगल करें"
            >
              {isReadingMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isReadingMode ? 'सामान्य मोड' : 'शांत पठन'}</span>
            </button>
          )}

          {getTextToCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="h-9 px-3 flex items-center gap-1.5 rounded-xl bg-white hover:bg-saffron/10 text-templeText border border-gold/30 text-xs font-semibold transition-colors"
              title="संपूर्ण पाठ कॉपी करें"
              aria-label="संपूर्ण पाठ कॉपी करें"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-deep" />}
              <span>{copied ? 'कॉपी हुआ' : 'कॉपी करें'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="h-9 px-3 flex items-center gap-1.5 rounded-xl bg-white hover:bg-saffron/10 text-templeText border border-gold/30 text-xs font-semibold transition-colors"
            title="साझा करें"
            aria-label="यह पृष्ठ साझा करें"
          >
            <Share2 className="w-3.5 h-3.5 text-saffron" />
            <span>साझा करें</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="h-9 px-2.5 hidden sm:flex items-center gap-1.5 rounded-xl bg-white hover:bg-saffron/10 text-templeText border border-gold/30 text-xs font-semibold transition-colors"
            title="प्रिंट करें"
            aria-label="यह पृष्ठ प्रिंट करें"
          >
            <Printer className="w-3.5 h-3.5 text-templeText-muted" />
            <span>प्रिंट</span>
          </button>
        </div>
      </div>

      {/* Accessible Feedback alert */}
      {feedbackMsg && (
        <div
          role="status"
          aria-live="polite"
          className="mt-2 text-center text-xs font-medium text-templeRed bg-saffron-light/20 py-1 px-3 rounded-lg border border-saffron/30"
        >
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}
