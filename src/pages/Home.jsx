import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flame, ScrollText, ArrowRight, MapPin, Quote, Shield, HeartHandshake, Compass, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import DevotionalCard from '../components/DevotionalCard';
import StoryCard from '../components/StoryCard';
import { templeInfo } from '../data/temple';
import { storiesData } from '../data/stories';
import { dailyQuote } from '../data/quotes';

export default function Home() {
  // Take first 3 stories for featured section
  const featuredStories = storiesData.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Main Devotional Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold text-saffron-deep tracking-wider uppercase">
            ॥ नित्य सेवा व उपासना ॥
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed mt-1">
            दैनिक भक्ति एवं पाठ
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <DevotionalCard
            title="हनुमान चालीसा पढ़ें"
            description="श्री हनुमान चालीसा का संपूर्ण पाठ पढ़ें। बड़े अक्षरों में सहज और शुद्ध वाचन।"
            to="/hanuman-chalisa"
            icon={BookOpen}
            badgeText="दैनिक पाठ"
          />

          <DevotionalCard
            title="आरती करें"
            description="श्रद्धा और भक्ति के साथ हनुमान जी की आरती पढ़ें। आरती कीजै हनुमान लला की।"
            to="/aarti"
            icon={Flame}
            badgeText="मंगल आरती"
          />

          <DevotionalCard
            title="हनुमान जी की कथा"
            description="पवनपुत्र हनुमान जी की प्रेरणादायक कथाएँ पढ़ें। जन्म से लेकर लंका विजय तक।"
            to="/hanuman-katha"
            icon={ScrollText}
            badgeText="पावन चरित्र"
          />
        </div>
      </section>

      {/* 3. Daily Devotional Quote (दैनिक दोहा) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-cream-dark/60 via-cream-card to-cream-dark/60 rounded-3xl p-6 sm:p-10 border-2 border-gold/40 shadow-temple text-center">
          <div className="w-12 h-12 rounded-full bg-saffron/20 border border-gold/40 flex items-center justify-center mx-auto mb-4 text-templeRed">
            <Quote className="w-6 h-6 text-saffron-deep" />
          </div>

          <span className="text-xs font-bold text-saffron-deep uppercase tracking-widest block mb-2">
            ॥ आज का पावन दोहा ॥
          </span>

          <blockquote className="text-xl sm:text-2xl font-bold font-devanagari text-templeRed leading-relaxed mb-4">
            "{dailyQuote.doha}"
          </blockquote>

          <p className="text-sm sm:text-base text-templeText max-w-xl mx-auto leading-relaxed mb-4">
            <span className="font-semibold text-saffron-deep">भावार्थ: </span>
            {dailyQuote.meaning}
          </p>

          <div className="inline-block px-3 py-1 bg-white rounded-full border border-gold/30 text-xs font-medium text-templeText-muted">
            स्रोत: {dailyQuote.source}
          </div>
        </div>
      </section>

      {/* 4. Temple Purpose & Spiritual Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-card rounded-3xl border border-gold/40 p-6 sm:p-10 lg:p-12 shadow-temple">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs sm:text-sm font-bold text-saffron-deep tracking-wider uppercase">
                ॥ मंदिर उद्देश्य एवं प्रेरणा ॥
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed">
                भक्ति, सेवा और आत्मबल का केंद्र
              </h2>
              <p className="text-sm sm:text-base text-templeText leading-relaxed">
                {templeInfo.name} देहरिया (महाराजगंज, भदोही) के पावन परिवेश में स्थित है। इस वेबसाइट का प्रमुख ध्येय सभी श्रद्धालुओं, विशेषकर बुजुर्गों, युवाओं एवं बच्चों को श्री हनुमान जी के आदर्शों—निस्वार्थ सेवा, अगाध निष्ठा, सत्य एवं संकट निवारण की शक्ति—से जोड़ना है।
              </p>
              <p className="text-sm sm:text-base text-templeText leading-relaxed">
                यहाँ उपलब्ध सभी धार्मिक सामग्री (चालीसा, आरती, कथाएँ) प्रामाणिक रूप से बिना किसी विज्ञापन या शुल्क के निःशुल्क उपलब्ध कराई गई है ताकि प्रत्येक भक्त एकाग्रचित्त होकर प्रभु स्मरण कर सके।
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream border border-gold/30 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center text-saffron-deep">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-templeRed">संकटमोचन शक्ति</h4>
                <p className="text-xs text-templeText leading-relaxed">
                  हनुमान जी का स्मरण भय और विपत्तियों को दूर कर मनोबल बढ़ाता है।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-gold/30 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-templeRed/15 flex items-center justify-center text-templeRed">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-templeRed">निस्वार्थ सेवा भाव</h4>
                <p className="text-xs text-templeText leading-relaxed">
                  भगवान श्री राम के प्रति अनन्य समर्पण सेवा का सर्वोच्च आदर्श है।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-gold/30 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold-dark">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-templeRed">सद्बुद्धि व ज्ञान</h4>
                <p className="text-xs text-templeText leading-relaxed">
                  'बल बुधि बिद्या देहु मोहिं'—जीवन में विवेक और धर्म की प्रेरणा।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-gold/30 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center text-saffron-deep">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-templeRed">शांति व पवित्रता</h4>
                <p className="text-xs text-templeText leading-relaxed">
                  स्वच्छ, सात्विक एवं सरल वातावरण में प्रभु का नाम-स्मरण।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold text-saffron-deep tracking-wider uppercase">
              ॥ पावन आख्यान ॥
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed mt-1">
              हनुमान जी की प्रमुख कथाएँ
            </h2>
            <div className="w-16 h-1 bg-saffron mt-2 rounded-full" />
          </div>

          <Link
            to="/hanuman-katha"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-templeRed hover:text-saffron-deep transition-colors group"
          >
            <span>सभी कथाएँ पढ़ें (8 कथाएँ)</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 6. Temple Location & Verification Notice Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cream-card via-white to-cream-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-temple">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs sm:text-sm font-bold text-saffron-deep tracking-wider uppercase">
                ॥ स्थान व संपर्क ॥
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-devanagari text-templeRed">
                मंदिर की स्थिति एवं दर्शन
              </h2>
              
              <div className="flex items-start gap-3 bg-cream p-4 rounded-2xl border border-gold/30">
                <MapPin className="w-6 h-6 text-saffron-deep flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-templeRed text-base sm:text-lg">
                    {templeInfo.name}
                  </p>
                  <p className="text-sm text-templeText">
                    {templeInfo.location.fullAddress}
                  </p>
                  <p className="text-xs text-templeText-muted">
                    पिन कोड: {templeInfo.location.pincode} | राज्य: {templeInfo.location.state}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-green-50/80 border border-green-200 rounded-xl text-xs text-green-900 leading-relaxed flex items-center gap-2">
                <span className="font-bold text-green-800">सत्यापित स्थिति: </span>
                <span>गूगल मैप्स पर 'Sankat Mochan Mandir Dehariya' के रूप में स्थान प्रमाणित है।</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-3 text-center p-6 bg-cream rounded-2xl border border-gold/30">
              <MapPin className="w-10 h-10 text-saffron-deep animate-bounce" />
              <h3 className="font-bold text-templeRed text-base font-devanagari">
                संकट मोचन मंदिर देहरिया
              </h3>
              <p className="text-xs text-templeText-muted">
                सटीक स्थान एवं दिशा-निर्देश (GPS: 25.2698, 82.6088)
              </p>
              <div className="w-full flex flex-col gap-2">
                <a
                  href={templeInfo.location.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-saffron hover:bg-saffron-deep text-white font-bold text-xs sm:text-sm rounded-xl shadow-temple-sm transition-colors min-h-[44px]"
                >
                  <span>दिशा-निर्देश (Directions)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={templeInfo.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-cream text-templeRed border border-gold/40 font-bold text-xs rounded-xl shadow-temple-sm transition-colors"
                >
                  <span>गूगल मैप्स पर देखें</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
