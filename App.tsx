/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Coffee, Star, Heart, MapPin, Menu, X, Baby, ChevronRight, Clock, ShieldCheck, Footprints, Globe } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import MultiColorText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AttractionCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { Attraction, PEEKABOO_DATA } from './types';

type Language = 'ar' | 'en';

const TRANSLATIONS = {
  en: {
    nav: ['Zones', 'Perks', 'Tickets'],
    bookNow: 'Book Now',
    tagline: "Irbid's Ultimate Adventure",
    heroTitle: "Magic moments in every jump!",
    heroSubtitle: "Welcome to Peekaboo Irbid.",
    ctaExplore: "Discover Zones",
    ctaParty: "Party Packages",
    zonesTitle: "Our Play Universe",
    zonesBadge: "Fun & Safety Combined!",
    zonesDesc: "Hand-crafted experiences in Irbid, Jordan. We offer the best indoor playground for your little champions.",
    perksTitle: "Parental Comfort Zone",
    perksSubtitle: "Relax while they play",
    perk1: "Fresh Sips",
    perk1Desc: "Premium Turkish coffee and snacks while you supervise.",
    perk2: "Elite Hygiene",
    perk2Desc: "Medical-grade sanitation throughout the facility.",
    perk3: "Extended Play",
    perk3Desc: PEEKABOO_DATA.hours.en,
    ticketsTitle: "Our Rates",
    ticketsDesc: "Great value for unforgettable joy",
    bookBtn: "Book Session",
    reserved: "Confirmed! ✨",
    processing: "Wait for it... 🧸",
    footerDesc: "Peekaboo Irbid: Where happiness meets safety. Join our community today.",
    footerVisit: "Find Us",
    footerExplore: "Explore",
    footerContact: PEEKABOO_DATA.contact.phone,
    footerAddress: PEEKABOO_DATA.contact.location.en,
    footerHours: PEEKABOO_DATA.hours.en,
    copy: "© 2025 Peekaboo Jordan. All rights reserved.",
    ageLabel: "Recommended",
    closeBtn: "Close",
  },
  ar: {
    nav: ['المناطق', 'الميزات', 'التذاكر'],
    bookNow: 'احجز الآن',
    tagline: "المكان الأروع في إربد",
    heroTitle: "لحظات سحرية في كل قفزة!",
    heroSubtitle: "أهلاً بكم في بيكابو إربد.",
    ctaExplore: "اكتشف المناطق",
    ctaParty: "عروض الحفلات",
    zonesTitle: "عالم اللعب الخاص بنا",
    zonesBadge: "المرح والأمان معاً!",
    zonesDesc: "تجارب مصممة بعناية في إربد، الأردن. نقدم أفضل ملعب داخلي لأبطالكم الصغار.",
    perksTitle: "منطقة راحة الأهل",
    perksSubtitle: "استرخِ بينما يلعبون",
    perk1: "قهوة طازجة",
    perk1Desc: "قهوة تركية فاخرة ووجبات خفيفة أثناء المراقبة.",
    perk2: "نظافة مثالية",
    perk2Desc: "تعقيم طبي شامل في جميع أنحاء المنشأة.",
    perk3: "أوقات ممتدة",
    perk3Desc: PEEKABOO_DATA.hours.ar,
    ticketsTitle: "أسعارنا",
    ticketsDesc: "قيمة رائعة لبهجة لا تُنسى",
    bookBtn: "احجز الآن",
    reserved: "تم التأكيد! ✨",
    processing: "لحظة من فضلك... 🧸",
    footerDesc: "بيكابو إربد: حيث تلتقي السعادة بالأمان. انضم إلى مجتمعنا اليوم.",
    footerVisit: "موقعنا",
    footerExplore: "استكشف",
    footerContact: PEEKABOO_DATA.contact.phone,
    footerAddress: PEEKABOO_DATA.contact.location.ar,
    footerHours: PEEKABOO_DATA.hours.ar,
    copy: "© ٢٠٢٥ بيكابو الأردن. جميع الحقوق محفوظة.",
    ageLabel: "العمر الموصى به",
    closeBtn: "إغلاق",
  }
};

const ZONES_DATA = (lang: Language): Attraction[] => [
  { 
    id: '1', 
    name: lang === 'ar' ? 'مجرة الكرات' : 'Ball Pit Galaxy', 
    category: lang === 'ar' ? 'لعب نشط' : 'Active Play', 
    ageGroup: lang === 'ar' ? 'جميع الأعمار' : 'All Ages', 
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1000&auto=format&fit=crop',
    description: lang === 'ar' ? 'بحر من الكرات الملونة مع إضاءة تفاعلية تجعل اللعب تجربة خيالية.' : 'A sea of colorful balls with interactive lighting that makes play a magical experience.'
  },
  { 
    id: '2', 
    name: lang === 'ar' ? 'ترامبولين التحدي' : 'Action Trampoline', 
    category: lang === 'ar' ? 'قفز' : 'Jumping', 
    ageGroup: lang === 'ar' ? '+٣ سنوات' : '3+ Years', 
    image: 'https://images.unsplash.com/photo-154433334d-0683030368a5?q=80&w=1000&auto=format&fit=crop',
    description: lang === 'ar' ? 'منطقة قفز آمنة وممتعة لتعزيز اللياقة والبهجة لدى الأطفال.' : 'A safe and fun jumping zone to boost fitness and joy for children.'
  },
  { 
    id: '3', 
    name: lang === 'ar' ? 'ركن الفنون' : 'Art Corner', 
    category: lang === 'ar' ? 'إبداع' : 'Creative', 
    ageGroup: lang === 'ar' ? '٢-١٠ سنوات' : '2-10 Years', 
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
    description: lang === 'ar' ? 'أنشطة يومية تشمل التلوين والأشغال اليدوية لتنمية المهارات الفنية.' : 'Daily activities including coloring and handcrafts to develop artistic skills.'
  },
];

const PeekyMascot = ({ className = "", scale = 1, showFootprints = false }: { className?: string, scale?: number, showFootprints?: boolean }) => (
  <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
     <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 md:w-48 md:h-48 relative drop-shadow-2xl"
     >
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#E41E26] rounded-t-[55%] rounded-b-[15%] border-4 border-white shadow-md">
          <div className="absolute top-[15%] left-[15%] w-[18%] h-[18%] bg-white rounded-full" />
          <div className="absolute top-[10%] right-[25%] w-[12%] h-[12%] bg-white rounded-full" />
          <div className="absolute bottom-[20%] right-[15%] w-[20%] h-[20%] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[65%] h-[55%] bg-white rounded-full border-4 border-white shadow-lg flex flex-col items-center justify-center overflow-hidden">
          <div className="flex gap-4 mb-3">
             <div className="w-4 h-4 bg-[#3d2010] rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
             </div>
             <div className="w-4 h-4 bg-[#3d2010] rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
             </div>
          </div>
          <div className="w-6 h-3 border-b-4 border-[#E41E26] rounded-full" />
          <div className="absolute bottom-[10%] flex items-center justify-center scale-110">
            <div className="w-3 h-3 bg-[#E41E26] rotate-45 z-10" />
            <div className="absolute -left-3 w-4 h-4 bg-[#E41E26] rounded-sm" />
            <div className="absolute -right-3 w-4 h-4 bg-[#E41E26] rounded-sm" />
          </div>
        </div>
     </motion.div>
     {showFootprints && (
       <div className="mt-4 flex gap-2">
         <Footprints className="text-[#E41E26] rotate-12" size={20} />
         <Footprints className="text-[#F7941D] -rotate-12 translate-y-2" size={20} />
       </div>
     )}
  </div>
);

const FootprintsRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-4 opacity-70 ${className}`}>
    <Footprints className="text-[#E41E26] rotate-12" size={24} />
    <Footprints className="text-[#F7941D] -rotate-12 translate-y-2" size={24} />
    <Footprints className="text-[#8CC63F] rotate-45 translate-y-4" size={24} />
    <Footprints className="text-[#00ADEF] -rotate-45 translate-y-2" size={24} />
    <Footprints className="text-[#FFD900] rotate-12" size={24} />
  </div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [lang, setLang] = useState<Language>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative min-h-screen text-gray-800 selection:bg-[#E41E26] selection:text-white cursor-auto md:cursor-none overflow-x-hidden ${isRTL ? 'font-[Cairo]' : 'font-[Quicksand]'}`}
    >
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Side Mascot */}
      <motion.div 
        className={`fixed top-1/2 z-50 pointer-events-none hidden lg:block ${isRTL ? '-right-12' : '-left-12'}`}
        animate={{ x: isRTL ? [-30, 0, -30] : [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <PeekyMascot scale={0.6} className={`${isRTL ? '-rotate-90' : 'rotate-90'} opacity-40 hover:opacity-100 transition-opacity`} />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-white/95 backdrop-blur-md border-b-4 border-[#00ADEF]/10">
        <div className="font-heading text-2xl font-black tracking-tighter flex items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <span className="text-[#FFD900]">P</span>
          <span className="text-[#E41E26]">E</span>
          <span className="text-[#E41E26]">E</span>
          <span className="text-[#8CC63F]">K</span>
          <span className="text-[#00ADEF]">A</span>
          <span className="text-[#00ADEF]">B</span>
          <span className="text-[#FFD900]">O</span>
          <span className="text-[#F7941D]">O</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-black uppercase tracking-widest text-gray-400">
          {t.nav.map((item, idx) => (
            <button key={idx} onClick={() => scrollToSection(['zones', 'perks', 'tickets'][idx])} className="hover:text-[#E41E26] transition-all hover:scale-110 bg-transparent border-none cursor-pointer">
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 font-bold text-gray-500"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
          <button 
            onClick={() => scrollToSection('tickets')}
            className="hidden md:inline-block bg-[#E41E26] text-white px-10 py-3.5 rounded-full text-xs font-black tracking-[0.2em] uppercase hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-100"
          >
            {t.bookNow}
          </button>
          <button className="md:hidden text-gray-800 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-12 md:hidden pt-20"
          >
            {t.nav.map((item, idx) => (
              <button key={idx} onClick={() => scrollToSection(['zones', 'perks', 'tickets'][idx])} className="text-5xl font-black text-gray-900 uppercase">
                {item}
              </button>
            ))}
            <FootprintsRow />
            <PeekyMascot scale={1} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          
          <div className="relative mb-10">
            <PeekyMascot className="z-20" scale={1.2} showFootprints />
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className={`absolute top-1/2 -translate-y-1/2 hidden md:block ${isRTL ? '-left-32' : '-right-32'}`}
            >
              <FootprintsRow className="scale-125" />
            </motion.div>
          </div>

          <MultiColorText text="PEEKABOO" isRTL={isRTL} className="text-[20vw] md:text-[14vw] leading-none mb-6 filter drop-shadow-2xl" />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl font-black max-w-3xl text-gray-800 leading-snug mb-12 px-4"
          >
            {t.heroTitle} <br className="hidden md:block" />
            <span className="text-[#00ADEF]">{t.heroSubtitle}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button
              onClick={() => scrollToSection('zones')}
              className="bg-[#F7941D] text-white px-12 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-[#F7941D]/30 hover:shadow-orange-400/50 transition-all hover:-translate-y-2 flex items-center justify-center gap-3"
            >
              {t.ctaExplore} <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => scrollToSection('tickets')}
              className="bg-[#00ADEF] text-white px-12 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-[#00ADEF]/30 hover:shadow-blue-400/50 transition-all hover:-translate-y-2 flex items-center justify-center gap-3"
            >
              {t.ctaParty}
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* ZONES SECTION */}
      <section id="zones" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
             <div className="relative">
                <span className="text-[#E41E26] font-black uppercase tracking-[0.4em] text-sm mb-6 block">{t.zonesBadge}</span>
                <h2 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9]">{t.zonesTitle.split(' ')[0]} <br/> <span className="text-[#00ADEF]">{t.zonesTitle.split(' ').slice(1).join(' ')}</span></h2>
             </div>
             <p className={`max-w-md text-gray-500 font-bold text-xl leading-relaxed pl-8 ${isRTL ? 'border-r-8 border-[#8CC63F] pr-8 pl-0' : 'border-l-8 border-[#8CC63F]'}`}>
               {t.zonesDesc}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {ZONES_DATA(lang).map((zone) => (
              <AttractionCard key={zone.id} attraction={zone} onClick={() => setSelectedAttraction(zone)} />
            ))}
          </div>
        </div>
      </section>

      {/* PERKS SECTION */}
      <section id="perks" className="relative z-10 py-24 md:py-48 bg-[#FFFAF0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              whileInView={{ scale: [1, 1.02, 1] }}
              className="relative aspect-[4/5] rounded-[5rem] overflow-hidden shadow-2xl border-[16px] border-white group"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
                alt="Parents at Cafe" 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD900]/30 to-transparent" />
            </motion.div>

            <div>
              <h2 className="text-6xl md:text-8xl font-black mb-12 leading-[1] tracking-tight">
                {t.perksTitle.split(' ').slice(0,-1).join(' ')} <br/> <span className="text-[#F7941D]">{t.perksTitle.split(' ').slice(-1)}</span>
              </h2>
              
              <div className="grid grid-cols-1 gap-12">
                {[
                  { icon: Coffee, title: t.perk1, desc: t.perk1Desc, color: '#F7941D' },
                  { icon: ShieldCheck, title: t.perk2, desc: t.perk2Desc, color: '#8CC63F' },
                  { icon: Clock, title: t.perk3, desc: t.perk3Desc, color: '#00ADEF' },
                ].map((perk, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: isRTL ? -20 : 20 }}
                    className="flex gap-10 group cursor-default"
                  >
                    <div 
                      className="w-20 h-20 shrink-0 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ color: perk.color }}
                    >
                      <perk.icon className="w-10 h-10" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-3xl font-black mb-2" style={{ color: perk.color }}>{perk.title}</h4>
                      <p className="text-gray-500 font-bold text-lg leading-relaxed">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKETS SECTION */}
      <section id="tickets" className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 flex flex-col items-center">
             <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-8 border-4 border-[#FFD900]">
                <FootprintsRow />
             </div>
             <h2 className="text-7xl md:text-9xl font-black text-gray-900 mb-8 tracking-tighter">{t.ticketsTitle}</h2>
             <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-sm">{t.ticketsDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PEEKABOO_DATA.tickets.map((ticket, i) => {
              const isPurchased = purchasedIndex === i;
              const isPurchasing = purchasingIndex === i;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -20, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="bg-white p-14 rounded-[4rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border-8 flex flex-col items-center text-center group"
                  style={{ borderColor: `${ticket.color}15` }}
                >
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10 transition-transform group-hover:scale-125" style={{ backgroundColor: `${ticket.color}15`, color: ticket.color }}>
                     <Baby className="w-12 h-12" strokeWidth={4} />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight">
                    {isRTL ? ticket.nameAr : ticket.name}
                  </h3>
                  <p className="text-gray-400 mb-10 font-bold text-lg">
                    {isRTL ? ticket.descAr : ticket.desc}
                  </p>
                  
                  <div className="text-7xl font-black mb-14" style={{ color: ticket.color }}>
                    {ticket.price}
                  </div>
                  
                  <ul className={`space-y-6 mb-16 text-gray-500 font-bold text-lg w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                    {(isRTL ? ticket.featuresAr : ticket.features).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4">
                        <Star className="w-6 h-6 shrink-0" style={{ color: ticket.color }} /> 
                        {feat}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handlePurchase(i)}
                    disabled={isPurchased}
                    style={{ backgroundColor: isPurchased ? '#F3F4F6' : ticket.color }}
                    className={`w-full py-6 rounded-[2.5rem] font-black text-xl text-white transition-all shadow-2xl ${
                      !isPurchased ? 'hover:scale-105 active:scale-95 hover:brightness-110 shadow-black/10' : 'text-gray-400'
                    }`}
                  >
                    {isPurchasing ? t.processing : isPurchased ? t.reserved : t.bookBtn}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-white border-t-[12px] border-[#00ADEF]/5 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="font-heading text-6xl font-black tracking-tighter mb-8 cursor-pointer relative inline-block">
                <span className="text-[#FFD900]">P</span>
                <span className="text-[#E41E26]">E</span>
                <span className="text-[#E41E26]">E</span>
                <span className="text-[#8CC63F]">K</span>
                <span className="text-[#00ADEF]">A</span>
                <span className="text-[#00ADEF]">B</span>
                <span className="text-[#FFD900]">O</span>
                <span className="text-[#F7941D]">O</span>
              </div>
              <p className="text-gray-500 font-bold text-xl max-w-sm mb-12 leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-2xl mb-8 text-gray-900">{t.footerExplore}</h4>
              <ul className="space-y-5 text-gray-500 font-bold text-lg">
                <li><button onClick={() => scrollToSection('zones')} className="hover:text-[#E41E26]">{t.nav[0]}</button></li>
                <li><button onClick={() => scrollToSection('tickets')} className="hover:text-[#00ADEF]">{t.nav[2]}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-2xl mb-8 text-gray-900">{t.footerVisit}</h4>
              <ul className="space-y-5 text-gray-500 font-bold text-lg">
                <li className="flex items-start gap-4"><MapPin className="text-[#E41E26] w-6 h-6 shrink-0" strokeWidth={3} /> {t.footerAddress}</li>
                <li className="flex items-center gap-4"><Clock className="text-[#8CC63F] w-6 h-6 shrink-0" strokeWidth={3} /> {t.footerHours}</li>
                <li>{t.footerContact}</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t-2 border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-300 font-black text-sm uppercase tracking-widest">
            <span>{t.copy}</span>
          </div>
        </div>
      </footer>

      {/* Attraction Modal */}
      <AnimatePresence>
        {selectedAttraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAttraction(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-white rounded-[5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border-[12px] border-white"
            >
              <button
                onClick={() => setSelectedAttraction(null)}
                className={`absolute top-10 z-20 p-4 rounded-full bg-white/90 shadow-2xl text-gray-900 hover:scale-110 active:scale-95 transition-all ${isRTL ? 'left-10' : 'right-10'}`}
              >
                <X className="w-8 h-8" strokeWidth={4} />
              </button>

              <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative">
                <img src={selectedAttraction.image} alt={selectedAttraction.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-14 md:p-24 flex flex-col justify-center">
                <span className="text-[#8CC63F] font-black uppercase tracking-[0.5em] text-sm mb-6 block">{selectedAttraction.category}</span>
                <h3 className="text-6xl md:text-8xl font-black text-gray-900 mb-10 leading-[0.9] tracking-tighter">{selectedAttraction.name}</h3>
                <p className="text-gray-500 font-bold text-2xl leading-relaxed mb-12">{selectedAttraction.description}</p>
                <div className="flex items-center gap-8 p-8 rounded-[3rem] bg-[#FFFAF0] border-4 border-[#FFD900]/20 w-fit">
                   <div className="p-5 bg-[#FFD900] rounded-3xl text-white">
                      <Baby className="w-12 h-12" strokeWidth={4} />
                   </div>
                   <div>
                     <p className="text-xs uppercase font-black text-gray-300 tracking-[0.3em] mb-1">{t.ageLabel}</p>
                     <p className="text-4xl font-black text-gray-900">{selectedAttraction.ageGroup}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;