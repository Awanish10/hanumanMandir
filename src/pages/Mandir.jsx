import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  ExternalLink, 
  CheckCircle,
  Calendar,
  Flame,
  HeartHandshake,
  ArrowRight,
  Bell,
  Phone,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
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
            {templeInfo.officialPlaceName} — देहरिया, महाराजगंज, भदोही (उत्तर प्रदेश) के पावन स्थल का आधिकारिक एवं प्रामाणिक विवरण।
          </p>

          <div className="w-20 h-1 bg-saffron mx-auto rounded-full mt-2" />
        </div>

        {/* 1. Auspicious Pran Pratishtha Announcement Banner */}
        {templeInfo.announcement && (
          <div className="bg-gradient-to-r from-saffron/20 via-cream-card to-saffron/20 rounded-3xl p-6 sm:p-8 border-2 border-gold/60 shadow-temple relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron to-templeRed flex items-center justify-center text-white shadow-md flex-shrink-0 mt-0.5">
                  <Bell className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-templeRed bg-white/80 px-2.5 py-0.5 rounded-full border border-gold/40">
                      🔔 {templeInfo.announcement.badge}
                    </span>
                    <span className="text-xs font-bold text-saffron-deep">
                      {templeInfo.announcement.date}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                    {templeInfo.announcement.title}
                  </h2>
                  <p className="text-sm text-templeText leading-relaxed">
                    {templeInfo.announcement.description}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
                <span className="text-xs font-bold text-templeRed block">
                  {templeInfo.announcement.chant}
                </span>
                <span className="text-[11px] text-templeText-muted">
                  संकट मोचन मंदिर परिवार
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Verified Location & Interactive Map Section */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed">
                <MapPin className="w-6 h-6 text-saffron-deep" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                    मंदिर स्थान एवं मानचित्र (Temple Location)
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-saffron/15 text-templeRed border border-saffron/30">
                    <Sparkles className="w-3 h-3 text-saffron fill-saffron" />
                    पावन धाम
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-templeText-muted">
                  {templeInfo.officialPlaceName}
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

          {/* Website Update & Mandir Contact Box */}
          <div className="p-5 bg-gradient-to-r from-cream-card via-white to-cream-card rounded-2xl border-2 border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-saffron-deep" />
              </div>
              <div>
                <span className="text-xs font-bold text-saffron-deep uppercase tracking-wider block">
                  वेबसाइट अद्यतन एवं संपर्क सहायता
                </span>
                <p className="text-sm font-bold text-templeText leading-snug">
                  वेबसाइट में कोई भी जानकारी अपडेट करानी हो तो संपर्क करें:
                </p>
                <span className="text-base font-extrabold text-templeRed font-mono block mt-0.5">
                  {templeInfo.contact.displayPhone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
              <a
                href={templeInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all active:scale-95 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>व्हाट्सएप</span>
              </a>

              <a
                href={`tel:${templeInfo.contact.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-saffron hover:bg-saffron-deep text-white font-bold text-xs sm:text-sm rounded-xl shadow-temple-sm transition-all active:scale-95 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>कॉल करें</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Darshan & Aarti Timings Information */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-templeRed/15 border border-gold/40 flex items-center justify-center text-templeRed">
                <Clock className="w-6 h-6 text-templeRed" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                    दर्शन एवं आरती समय (Darshan & Aarti Timings)
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-saffron/15 text-templeRed border border-saffron/30">
                    <Sparkles className="w-3 h-3 text-saffron fill-saffron" />
                    नित्य आरती
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-templeText-muted">
                  प्रतिदिन प्रातः एवं सायं पावन आरती व दर्शन
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-saffron-deep bg-saffron/10 px-3 py-1.5 rounded-xl border border-saffron/30 self-start sm:self-auto">
              दैनिक नित्य आरती
            </span>
          </div>

          {/* Timings Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-200 text-amber-950 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-800 flex-shrink-0">
                <Flame className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block">
                  🌅 प्रातः आरती (Morning Aarti)
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-templeRed font-devanagari">
                  {templeInfo.timings.morningAarti}
                </span>
                <p className="text-[11px] text-amber-900/80 mt-0.5">
                  प्रातः कालीन मंगला आरती व दर्शन
                </p>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-200 text-amber-950 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-templeRed/15 flex items-center justify-center text-templeRed flex-shrink-0">
                <Flame className="w-6 h-6 text-templeRed" />
              </div>
              <div>
                <span className="text-xs font-bold text-templeRed uppercase tracking-wide block">
                  🌆 सायं आरती (Evening Aarti)
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-templeRed font-devanagari">
                  {templeInfo.timings.eveningAarti}
                </span>
                <p className="text-[11px] text-amber-900/80 mt-0.5">
                  संध्या कालीन महाआरती व संकीर्तन
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-templeText-muted leading-relaxed">
            * {templeInfo.timings.description} {templeInfo.timings.note}
          </p>
        </div>

        {/* 4. Religious Festivals & Programs (धार्मिक त्योहार एवं कार्यक्रम) */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed">
              <Calendar className="w-6 h-6 text-saffron-deep" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                धार्मिक त्योहार एवं कार्यक्रम (Festivals & Programs)
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                मंदिर में आयोजित होने वाले विशेष पावन पर्व एवं अनुष्ठान
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templeInfo.festivals.map((fest) => (
              <div
                key={fest.id}
                className="p-5 bg-cream rounded-2xl border border-gold/30 space-y-2 hover:border-saffron/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-saffron/20 text-templeRed border border-saffron/30">
                    {fest.badge}
                  </span>
                  <span className="text-[11px] text-templeText-muted font-medium">
                    {fest.timing}
                  </span>
                </div>
                <h3 className="text-base font-bold font-devanagari text-templeRed">
                  {fest.name}
                </h3>
                <p className="text-xs sm:text-sm text-templeText leading-relaxed">
                  {fest.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-gold/25 text-xs text-templeText-muted text-center">
            📢 कार्यक्रमों की विशेष तिथियों व समय की सूचना समय-समय पर यहाँ अद्यतन की जाती है।
          </div>
        </div>

        {/* 5. Temple History & Spiritual Significance */}
        <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple space-y-6">
          <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-dark">
              <Heart className="w-6 h-6 text-saffron-deep" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                मंदिर परिचय एवं आध्यात्मिक संदेश
              </h2>
              <p className="text-xs sm:text-sm text-templeText-muted">
                आस्था, भक्ति और लोक कल्याण का पावन केंद्र
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.about}
          </p>

          <p className="text-sm sm:text-base text-templeText leading-relaxed">
            {templeInfo.spiritualMessage}
          </p>
        </div>

        {/* 6. Donation Call-to-Action Section */}
        <div className="bg-gradient-to-r from-cream-card via-white to-cream-card rounded-3xl p-6 sm:p-10 border-2 border-gold/50 shadow-temple">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-templeRed flex-shrink-0">
                <HeartHandshake className="w-7 h-7 text-saffron-deep" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-saffron-deep uppercase tracking-wider block">
                  ॥ पावन सहयोग ॥
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed">
                  {templeInfo.donation.title}
                </h3>
                <p className="text-xs sm:text-sm text-templeText leading-relaxed max-w-xl">
                  {templeInfo.donation.description}
                </p>
              </div>
            </div>

            <Link
              to="/donation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-saffron hover:bg-saffron-deep text-white font-bold text-sm rounded-2xl shadow-temple transition-all active:scale-95 flex-shrink-0 w-full sm:w-auto min-h-[48px]"
            >
              <span>दान व PhonePe QR देखें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
