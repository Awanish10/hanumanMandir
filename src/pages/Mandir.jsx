import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Heart, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Mandir() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-templeRed text-xs sm:text-sm font-bold border border-saffron/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>॥ पावन धाम परिचय ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-devanagari text-templeRed tracking-tight">
            मंदिर परिचय एवं जानकारी
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.name}, देहरिया (महाराजगंज, भदोही) के संबंध में आधिकारिक एवं सत्यापित विवरण।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* 1. Verified Location Card */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed">
              <MapPin className="w-6 h-6 text-saffron-deep" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                सत्यापित भौगोलिक स्थिति (Location)
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                उत्तर प्रदेश के भदोही जनपद अंतर्गत ग्राम देहरिया
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">ग्राम (Village)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.village}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">क्षेत्र / डाकघर (Post / Area)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.postArea}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">जिला (District)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.district}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">राज्य (State)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.state}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">पिन कोड (PIN Code)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.pincode}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">देश (Country)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.country}</span>
            </div>
          </div>

          {/* Full Address Banner */}
          <div className="p-4 bg-white/80 rounded-2xl border border-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-saffron-deep block uppercase">पूर्ण पता:</span>
              <p className="text-sm sm:text-base font-bold text-templeText">
                {templeInfo.location.fullAddress}
              </p>
            </div>

            <a
              href={templeInfo.location.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-saffron hover:bg-saffron-deep text-white font-bold text-sm rounded-xl shadow-temple-sm transition-colors flex-shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>गूगल मैप्स नेविगेशन</span>
            </a>
          </div>
        </div>

        {/* 2. Darshan & Timings Information */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-templeRed/15 border border-gold/40 flex items-center justify-center text-templeRed">
              <Clock className="w-6 h-6 text-templeRed" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                दर्शन एवं आरती समय (Timings)
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                मंदिर समिति द्वारा आधिकारिक पुष्टि स्थिति
              </p>
            </div>
          </div>

          <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-amber-900">
                समय पुष्टि सूचना:
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                {templeInfo.verifiedStatus.hoursNotice} मंदिर समिति से दैनिक पट खुलने, प्रातः आरती, मध्याह्न विश्राम एवं संध्या आरती का अधिकृत समय प्राप्त होते ही इस खंड में प्रकाशित किया जाएगा।
              </p>
            </div>
          </div>
        </div>

        {/* 3. Temple Purpose & Spiritual Message */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-dark">
              <Heart className="w-6 h-6 text-saffron-deep" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                धार्मिक महत्व एवं संदेश
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                पवनपुत्र हनुमान जी की भक्ति और लोक कल्याण
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.spiritualMessage}
          </p>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            ग्रामीण संस्कृति में हनुमान मंदिर केवल पूजा स्थल ही नहीं, अपितु पूरे समुदाय के लिए सुरक्षा, उत्साह, भाईचारे और सात्विक ऊर्जा का केंद्र होते हैं। मंगलवार और शनिवार को भक्तजन विशेष रूप से एकत्रित होकर हनुमान चालीसा और सुंदरकांड का पाठ करते हैं।
          </p>
        </div>

        {/* 4. Transparency Policy */}
        <div className="bg-cream/60 rounded-3xl p-6 border border-gold/30 text-xs sm:text-sm text-templeText-muted space-y-2">
          <div className="flex items-center gap-2 font-bold text-templeRed">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>सत्यता एवं गोपनीयता नीति:</span>
          </div>
          <p className="leading-relaxed">
            यह वेबसाइट केवल प्रामाणिक और सत्यापित जानकारी प्रस्तुत करती है। मंदिर के पुजारी का नाम, फोन नंबर, निर्माण वर्ष अथवा इतिहास की किसी भी अपुष्ट जानकारी का कृत्रिम रूप से निर्माण नहीं किया गया है। समस्त विवरण मंदिर की स्थानीय समिति की सहमति के उपरांत ही अद्यतन (update) किया जाएगा।
          </p>
        </div>

      </div>
    </div>
  );
}
