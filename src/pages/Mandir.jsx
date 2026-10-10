import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Heart, Sparkles, AlertCircle, ExternalLink, CheckCircle } from 'lucide-react';
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
            {templeInfo.name}
          </h1>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.officialPlaceName} — देहरिया, महाराजगंज, भदोही (उत्तर प्रदेश) के पावन स्थल का आधिकारिक विवरण।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* 1. Verified Location & Interactive Map Section */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed">
                <MapPin className="w-6 h-6 text-saffron-deep" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                    सत्यापित मंदिर स्थान (Exact Location)
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    सत्यापित
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-templeText-muted">
                  गूगल मैप्स: {templeInfo.officialPlaceName}
                </p>
              </div>
            </div>

            <div className="text-xs text-templeText-muted bg-cream px-3 py-1.5 rounded-xl border border-gold/30">
              <span className="font-bold text-templeRed">निर्देशांक (GPS): </span>
              {templeInfo.location.coordinates.latitude}, {templeInfo.location.coordinates.longitude}
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-temple-sm bg-cream relative">
            <iframe
              title="संकट मोचन मंदिर देहरिया - गूगल मैप्स"
              src={templeInfo.location.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">मंदिर का नाम (Temple)</span>
              <span className="text-base font-bold text-templeRed">संकट मोचन मंदिर</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">ग्राम (Village)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.village}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">डाकघर / क्षेत्र (Post)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.postArea}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">जनपद (District)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.district}</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">राज्य व पिन कोड</span>
              <span className="text-base font-bold text-templeRed">उत्तर प्रदेश – २२१३१४</span>
            </div>

            <div className="bg-cream p-4 rounded-2xl border border-gold/30">
              <span className="text-xs font-semibold text-templeText-muted block">देश (Country)</span>
              <span className="text-base font-bold text-templeRed">{templeInfo.location.country}</span>
            </div>
          </div>

          {/* Direct Navigation Action Buttons */}
          <div className="p-4 bg-white/90 rounded-2xl border border-gold/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-saffron-deep block uppercase">पूर्ण अधिकृत पता:</span>
              <p className="text-sm sm:text-base font-bold text-templeText">
                {templeInfo.location.fullAddress}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={templeInfo.location.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-saffron hover:bg-saffron-deep text-white font-bold text-xs sm:text-sm rounded-xl shadow-temple-sm transition-colors min-h-[44px]"
              >
                <Navigation className="w-4 h-4" />
                <span>दिशा-निर्देश (Directions)</span>
              </a>

              <a
                href={templeInfo.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-cream text-templeRed border border-gold/40 font-bold text-xs sm:text-sm rounded-xl shadow-temple-sm transition-colors min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4 text-saffron" />
                <span>गूगल मैप्स पर खोलें</span>
              </a>
            </div>
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
                दर्शन एवं आरती समय (Darshan Timings)
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                दैनिक दर्शन व आरती संबंधी अद्यतन
              </p>
            </div>
          </div>

          <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-amber-900">
                दर्शन समय सूचना:
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
                धार्मिक महत्व एवं आध्यात्मिक संदेश
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                पवनपुत्र संकट मोचन हनुमान जी की भक्ति और लोक कल्याण
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.spiritualMessage}
          </p>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            ग्रामीण संस्कृति में संकट मोचन हनुमान मंदिर केवल पूजा स्थल ही नहीं, अपितु पूरे क्षेत्र के लिए सुरक्षा, उत्साह, भाईचारे और सात्विक ऊर्जा का केंद्र है। मंगलवार और शनिवार को भक्तजन विशेष रूप से एकत्रित होकर हनुमान चालीसा, आरती और सुंदरकांड का पाठ करते हैं।
          </p>
        </div>

        {/* 4. Transparency Policy */}
        <div className="bg-cream/60 rounded-3xl p-6 border border-gold/30 text-xs sm:text-sm text-templeText-muted space-y-2">
          <div className="flex items-center gap-2 font-bold text-templeRed">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>सत्यता एवं प्रामाणिकता:</span>
          </div>
          <p className="leading-relaxed">
            यह वेबसाइट केवल प्रामाणिक और सत्यापित जानकारी प्रस्तुत करती है। मंदिर की भौगोलिक स्थिति गूगल मैप्स पर 'Sankat Mochan Mandir Dehariya' के रूप में सत्यापित है। अन्य विवरण मंदिर समिति से पुष्टि होने पर अद्यतन किए जाएंगे।
          </p>
        </div>

      </div>
    </div>
  );
}
