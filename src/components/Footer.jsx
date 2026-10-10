import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Sparkles, Phone, MessageCircle, PhoneCall } from 'lucide-react';
import { templeInfo } from '../data/temple';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'मुखपृष्ठ (Home)', path: '/' },
    { name: 'श्री हनुमान चालीसा', path: '/hanuman-chalisa' },
    { name: 'संकट मोचन हनुमानाष्टक', path: '/hanumanashtak' },
    { name: 'श्री हनुमान आरती', path: '/aarti' },
    { name: 'हनुमान जी की कथाएँ', path: '/hanuman-katha' },
    { name: 'फोटो गैलरी', path: '/gallery' },
    { name: 'मंदिर की जानकारी', path: '/mandir' },
    { name: 'मंदिर में दान एवं सहयोग', path: '/donation' },
    { name: 'भक्ति, दोहे एवं विचार', path: '/bhakti' },
  ];

  return (
    <footer className="no-print bg-[#2A160E] text-cream border-t-4 border-saffron mt-auto">
      {/* Decorative auspicious header */}
      <div className="bg-gradient-to-r from-templeRed-dark via-templeRed to-templeRed-dark py-3 px-4 text-center border-b border-gold/30">
        <p className="text-sm sm:text-base font-semibold text-gold-light tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>राम काज करिबे को आतुर ॥ सेवक सिरोमनि श्री हनुमान</span>
          <Sparkles className="w-4 h-4 text-gold" />
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Col 1: Temple Info & Devotion */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center p-1.5 border border-gold">
                <img
                  src="/favicon.svg"
                  alt="प्रतीक"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-gold-light">
                {templeInfo.name}
              </h2>
            </div>
            <p className="text-sm text-cream/80 leading-relaxed font-normal">
              {templeInfo.subTitle}। यह पावन डिजिटल माध्यम श्रद्धालुओं को पवनपुत्र हनुमान जी की भक्ति, चालीसा, आरती और ज्ञान से जोड़ने हेतु समर्पित है।
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-gold/20 text-xs text-cream/90 leading-relaxed">
              <p className="font-semibold text-saffron-light mb-1">अध्यात्मिक संकल्प:</p>
              "पवनतनय संकट हरन, मंगल मूरति रूप। राम लखन सीता सहित, हृदय बसहु सुर भूप॥"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gold-light border-b border-gold/30 pb-2">
              महत्वपूर्ण पृष्ठ
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/80 hover:text-saffron-light hover:underline transition-colors block py-1"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Location Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gold-light border-b border-gold/30 pb-2">
              मंदिर स्थिति एवं पता
            </h3>
            <div className="flex items-start gap-2.5 text-sm text-cream/85">
              <MapPin className="w-5 h-5 text-saffron-light flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{templeInfo.location.fullAddress}</p>
                <p className="text-xs text-cream/70 mt-1">
                  ग्राम: देहरिया | क्षेत्र: महाराजगंज | जिला: भदोही (उ.प्र.) – 221314
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={templeInfo.location.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-saffron hover:bg-saffron-deep text-white text-xs font-semibold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <MapPin className="w-4 h-4" />
                <span>दिशा-निर्देश (Directions)</span>
              </a>
              <a
                href={templeInfo.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-cream text-xs font-semibold rounded-xl transition-all"
              >
                <span>गूगल मैप्स</span>
              </a>
            </div>

            <p className="text-[11px] text-cream/70 leading-normal">
              * ग्राम डेहरिया, महाराजगंज, भदोही (उत्तर प्रदेश)
            </p>
          </div>
        </div>

        {/* Website Update & Contact Box */}
        <div className="mt-10 p-5 sm:p-6 bg-white/5 rounded-2xl border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-saffron/20 border border-gold/40 flex items-center justify-center text-saffron-light flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-saffron-light uppercase tracking-wider block">
                वेबसाइट सहायता एवं अद्यतन
              </span>
              <p className="text-sm font-semibold text-white">
                वेबसाइट में कोई भी जानकारी अपडेट करानी हो तो संपर्क करें:{' '}
                <span className="text-gold-light font-mono font-bold text-base">
                  {templeInfo.contact.displayPhone}
                </span>
              </p>
              <p className="text-xs text-cream/70">
                (कॉल एवं व्हाट्सएप दोनों उपलब्ध)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0 w-full md:w-auto">
            <a
              href={templeInfo.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm min-h-[42px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>व्हाट्सएप</span>
            </a>

            <a
              href={`tel:${templeInfo.contact.phone}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-saffron hover:bg-saffron-deep text-white text-xs font-bold rounded-xl transition-all shadow-sm min-h-[42px]"
            >
              <Phone className="w-4 h-4" />
              <span>कॉल करें</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-10 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>© {currentYear} {templeInfo.name}, देहरिया, महाराजगंज, भदोही। सर्वाधिकार सुरक्षित।</p>
          <p className="flex items-center gap-1 text-center">
            श्रद्धा और सेवा भाव से निर्मित <Heart className="w-3.5 h-3.5 text-saffron fill-saffron inline" /> निस्वार्थ भक्ति
          </p>
        </div>
      </div>
    </footer>
  );
}
