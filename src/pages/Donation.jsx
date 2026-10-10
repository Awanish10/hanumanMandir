import React, { useState } from 'react';
import { 
  HeartHandshake, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Share2, 
  Check, 
  MapPin, 
  Flame, 
  ExternalLink,
  Info,
  Calendar,
  Flower2
} from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Donation() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${templeInfo.donation.title} - ${templeInfo.name}`,
      text: `${templeInfo.donation.description} - ${templeInfo.location.fullAddress}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed silently
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // Fallback
      }
    }
  };

  const donationCauses = [
    {
      icon: Flame,
      title: 'नित्य पूजा, भोग एवं आरती',
      description: 'दैनिक प्रातः एवं सायं आरती, धूप-दीप, प्रसाद एवं पुष्प सेवा के लिए सहयोग।',
    },
    {
      icon: Flower2,
      title: 'पर्व-उत्सव एवं सुंदरकांड',
      description: 'हनुमान जन्मोत्सव, नवरात्रि, साप्ताहिक मंगलवार-शनिवार पाठ एवं संकीर्तन व्यवस्था।',
    },
    {
      icon: HeartHandshake,
      title: 'विशाल धार्मिक भंडारा',
      description: 'विशेष उत्सवों पर भक्तों के लिए महाप्रसाद, जलपान एवं समष्टि सेवा व्यवस्था।',
    },
    {
      icon: Sparkles,
      title: 'मंदिर प्रांगण व जीर्णोद्धार',
      description: 'मंदिर की स्वच्छता, सुंदरीकरण, प्रकाश व्यवस्था एवं आवश्यक निर्माण कार्य।',
    },
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* 1. Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30 shadow-sm">
            <HeartHandshake className="w-4 h-4 text-saffron fill-saffron" />
            <span>॥ पावन सहयोग एवं सेवा ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
            {templeInfo.donation.title}
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.donation.description}
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* 2. Main Donation QR Card */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border-2 border-gold/50 shadow-temple relative overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-saffron/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-templeRed/5 to-transparent rounded-tr-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: QR Code Display */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-3xl border-2 border-gold/40 shadow-temple-sm max-w-[280px] w-full">
                
                {/* PhonePe Header Branding */}
                <div className="mb-3 pb-2 border-b border-gray-100 flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    PhonePe QR
                  </span>
                  <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                    आधिकारिक
                  </span>
                </div>

                {/* QR Code Image */}
                <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-gray-100">
                  <img
                    src={templeInfo.donation.qrImage}
                    alt="संकट मोचन मंदिर PhonePe UPI QR Code"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>

                {/* Scan notice */}
                <p className="text-[11px] text-templeText-muted font-medium mt-3 leading-snug">
                  किसी भी UPI ऐप से स्कैन करें
                </p>
                <p className="text-[10px] text-templeText-muted/80">
                  (PhonePe, Google Pay, Paytm, BHIM)
                </p>
              </div>

              {/* Action Buttons for QR */}
              <div className="flex items-center gap-2 mt-4 w-full max-w-[280px]">
                <a
                  href={templeInfo.donation.qrImage}
                  download="Sankat-Mochan-Mandir-Donation-QR.png"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-cream text-templeRed border border-gold/50 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 min-h-[42px]"
                >
                  <Download className="w-3.5 h-3.5 text-saffron" />
                  <span>QR सेव करें</span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-saffron hover:bg-saffron-deep text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 min-h-[42px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>लिंक कॉपी हुआ!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>साझा करें</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Information & Devotional Message */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <span className="text-xs font-bold text-saffron-deep uppercase tracking-wider block">
                  ॥ श्री संकट मोचन हनुमान मंदिर डेहरिया ॥
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed mt-1">
                  श्रद्धा भाव से दान एवं सहयोग
                </h2>
              </div>

              <p className="text-sm sm:text-base text-templeText leading-relaxed">
                {templeInfo.donation.description}
              </p>

              {/* How to pay steps */}
              <div className="bg-cream p-4 sm:p-5 rounded-2xl border border-gold/30 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-templeRed uppercase tracking-wide flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-saffron" />
                  <span>दान करने की सरल विधि:</span>
                </h3>

                <ol className="text-xs sm:text-sm text-templeText space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    अपने फोन में <strong>PhonePe, Google Pay, Paytm, BHIM</strong> या कोई भी UPI ऐप खोलें।
                  </li>
                  <li>
                    <strong>"Scan QR" (स्कैन करें)</strong> विकल्प चुनें।
                  </li>
                  <li>
                    स्क्रीन पर दिख रहे क्यूआर कोड को स्कैन करें।
                  </li>
                  <li>
                    अपनी श्रद्धानुसार राशि दर्ज कर भुगतान पूर्ण करें।
                  </li>
                </ol>
              </div>

              {/* Devotional Note */}
              <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-amber-950 space-y-1">
                <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>{templeInfo.donation.note}</span>
                </p>
                <p className="text-xs text-amber-900 font-bold">
                  {templeInfo.donation.blessing}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Purpose / Utilization of Donation */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-saffron-deep uppercase tracking-wider">
              ॥ सद्कार्य एवं सेवा ॥
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed mt-1">
              सहयोग का सदुपयोग
            </h2>
            <p className="text-xs sm:text-sm text-templeText-muted mt-1">
              आपके द्वारा अर्पित सहयोग राशि सीधे मंदिर के धार्मिक एवं लोक-कल्याणकारी कार्यों में प्रयुक्त होती है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {donationCauses.map((cause, index) => {
              const Icon = cause.icon;
              return (
                <div
                  key={index}
                  className="bg-cream-card p-5 sm:p-6 rounded-2xl border border-gold/30 shadow-temple-sm flex items-start gap-4 hover:border-saffron/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-saffron/15 border border-gold/30 flex items-center justify-center text-templeRed flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-templeRed font-devanagari">
                      {cause.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-templeText leading-relaxed">
                      {cause.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Temple Location & Contact Card */}
        <div className="bg-cream/70 rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-templeRed font-bold">
            <MapPin className="w-5 h-5 text-saffron-deep flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-devanagari">
              मंदिर स्थिति एवं पता
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-templeText leading-relaxed">
            {templeInfo.location.fullAddress}
          </p>

          <div className="pt-2 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-templeText-muted">
            <span>पिन कोड: {templeInfo.location.pincode} | जनपद: {templeInfo.location.district} (उ.प्र.)</span>

            <a
              href={templeInfo.location.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-templeRed font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>गूगल मैप्स पर मार्ग देखें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
