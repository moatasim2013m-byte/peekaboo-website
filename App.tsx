
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Added Loader2 to the icons imported from lucide-react
import { Coffee, Star, Heart, MapPin, Menu, X, Baby, ChevronRight, Clock, ShieldCheck, Footprints, Globe, Trophy, Gift, Sparkles, Sprout as SproutIcon, Leaf, Crown, MinusCircle, CheckCircle2, Cake, Send, Calendar, Users, Loader2, Lock, LayoutDashboard, Settings, Camera, Image as ImageIcon } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import AttractionCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import AdminDashboard from './components/AdminDashboard';
import { Attraction, PEEKABOO_DATA, LOYALTY_RULES } from './types';

type Language = 'ar' | 'en';

const TIER_CONFIG = {
  Seedling: {
    color: '#8CC63F',
    bg: 'from-[#8CC63F]/20 to-[#4A7c1e]/10',
    icon: Leaf,
    threshold: 0,
    perksEn: ['Earn stars on every jump', 'Welcome gift'],
    perksAr: ['اربح نجوم مع كل قفزة', 'هدية ترحيبية']
  },
  Sprout: {
    color: '#00ADEF',
    bg: 'from-[#00ADEF]/20 to-[#00709d]/10',
    icon: SproutIcon,
    threshold: 500,
    perksEn: ['5% Birthday discount', 'Exclusive events'],
    perksAr: ['خصم ٥٪ على أعياد الميلاد', 'فعاليات حصرية']
  },
  'Golden Mushroom': {
    color: '#E41E26',
    bg: 'from-[#E41E26] to-[#F7941D]',
    icon: Crown,
    threshold: 1000,
    perksEn: ['Free Parent Coffee', 'VIP Early Booking', 'Double star weekends'],
    perksAr: ['قهوة مجانية للأهل', 'حجز VIP مبكر', 'عطلات النجوم المضاعفة']
  }
};

const THEMES = [
  { id: 'pawpatrol', nameEn: 'Paw Patrol', nameAr: 'باو باترول', color: '#00ADEF', img: 'input_file_2.png' },
  { id: 'princess', nameEn: 'Princess Dream', nameAr: 'حلم الأميرات', color: '#E41E26', img: 'input_file_4.png' },
  { id: 'hellokitty', nameEn: 'Hello Kitty', nameAr: 'هالو كيتي', color: '#F7941D', img: 'input_file_5.png' },
  { id: 'safari', nameEn: 'Safari Jungle', nameAr: 'سفاري الأدغال', color: '#8CC63F', img: 'input_file_6.png' },
  { id: 'donuts', nameEn: 'Sweet Donuts', nameAr: 'عالم الحلويات', color: '#FFD900', img: 'input_file_7.png' },
  { id: 'space', nameEn: 'Space Adventure', nameAr: 'مغامرة الفضاء', color: '#00ADEF', img: 'input_file_8.png' },
];

const GALLERY_IMAGES = [
  'input_file_2.png',
  'input_file_3.png',
  'input_file_4.png',
  'input_file_5.png',
  'input_file_6.png',
  'input_file_7.png',
  'input_file_8.png',
];

const TRANSLATIONS = {
  en: {
    nav: ['Zones', 'Perks', 'Parties', 'Tickets'],
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
    partyTitle: "Birthday Magic",
    partySubtitle: "The Most Spectacular Party in Irbid!",
    partyDesc: "We take care of everything—from the theme to the treats—so you can enjoy the magic too.",
    themesLabel: "Our Celebration Themes",
    packagesLabel: "Select Package",
    bookBtn: "Book Session",
    bookParty: "Request Party Date",
    reserved: "Confirmed! ✨",
    processing: "Wait for it... 🧸",
    formName: "Child's Name",
    formAge: "Age Turning",
    formDate: "Party Date",
    formGuests: "Guest Count",
    ticketsTitle: "Our Rates",
    ticketsDesc: "Great value for unforgettable joy",
    footerDesc: "Peekaboo Irbid: Where happiness meets safety. Join our community today.",
    footerVisit: "Find Us",
    footerExplore: "Explore",
    footerContact: PEEKABOO_DATA.contact.phone,
    footerAddress: PEEKABOO_DATA.contact.location.en,
    footerHours: PEEKABOO_DATA.hours.en,
    copy: "© 2025 Peekaboo Jordan. All rights reserved.",
    ageLabel: "Recommended",
    closeBtn: "Close",
    loyaltyTitle: "Peekaboo Stars",
    loyaltyBalance: "Your Balance",
    loyaltyPoints: "Stars",
    loyaltyEarnPrefix: "Earn ",
    loyaltyEarnSuffix: " Stars",
    loyaltyRedeem: "Redeem 100 Stars for 1 JD off!",
    loyaltyStatus: "Status",
    loyaltyNextTier: "Next Tier in",
    loyaltyPerks: "Your Perks",
    maxTier: "Max Level Reached! 👑",
    redeemToggle: "Use Stars Discount",
    redeemSuccess: "Redeemed! -1 JD",
    insufficientPoints: "Not enough stars",
    journeyTitle: "Your Adventure Journey",
    staffLogin: "Staff Portal",
    galleryTitle: "Our Real Moments",
    galleryBadge: "Peekaboo Snapshots"
  },
  ar: {
    nav: ['المناطق', 'الميزات', 'الحفلات', 'التذاكر'],
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
    partyTitle: "سحر أعياد الميلاد",
    partySubtitle: "الحفلة الأكثر روعة في إربد!",
    partyDesc: "نحن نهتم بكل شيء - من الثيم إلى الضيافة - حتى تتمكن أنت أيضاً من الاستمتاع بالسحر.",
    themesLabel: "ثيماتنا الحقيقية",
    packagesLabel: "اختر العرض",
    bookBtn: "احجز الآن",
    bookParty: "اطلب موعد الحفلة",
    reserved: "تم التأكيد! ✨",
    processing: "لحظة من فضلك... 🧸",
    formName: "اسم الطفل",
    formAge: "العمر القادم",
    formDate: "موعد الحفلة",
    formGuests: "عدد الضيوف",
    ticketsTitle: "أسعارنا",
    ticketsDesc: "قيمة رائعة لبهجة لا تُنسى",
    footerDesc: "بيكابو إربد: حيث تلتقي السعادة بالأمان. انضم إلى مجتمعنا اليوم.",
    footerVisit: "موقعنا",
    footerExplore: "استكشف",
    footerContact: PEEKABOO_DATA.contact.phone,
    footerAddress: PEEKABOO_DATA.contact.location.ar,
    footerHours: PEEKABOO_DATA.hours.ar,
    copy: "© ٢٠٥ بيكابو الأردن. جميع الحقوق محفوظة.",
    ageLabel: "العمر الموصى به",
    closeBtn: "إغلاق",
    loyaltyTitle: "نجوم بيكابو",
    loyaltyBalance: "رصيدك الحالي",
    loyaltyPoints: "نجمة",
    loyaltyEarnPrefix: "اربح ",
    loyaltyEarnSuffix: " نجمة",
    loyaltyRedeem: "استبدل ١٠٠ نجمة بخصم ١ دينار!",
    loyaltyStatus: "الرتبة",
    loyaltyNextTier: "المستوى القادم بعد",
    loyaltyPerks: "مميزاتك",
    maxTier: "لقد وصلت للقمة! 👑",
    redeemToggle: "استخدم خصم النجوم",
    redeemSuccess: "تم الاستبدال! -١ دينار",
    insufficientPoints: "النجوم لا تكفي",
    journeyTitle: "رحلة مغامرتك",
    staffLogin: "بوابة الموظفين",
    galleryTitle: "لحظاتنا الحقيقية",
    galleryBadge: "لقطات من بيكابو"
  }
};

const PeekyMascot = ({ className = "", scale = 1, showFootprints = false }: { className?: string, scale?: number, showFootprints?: boolean }) => (
  <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
     <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative drop-shadow-2xl"
     >
        <img 
          src="input_file_0.png" 
          alt="Peeky Mushroom Mascot" 
          className="w-32 md:w-48 object-contain"
        />
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Dynamic Data State
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('peekaboo_site_content');
    return saved ? JSON.parse(saved) : PEEKABOO_DATA;
  });

  const [zones, setZones] = useState<Attraction[]>(() => {
    const saved = localStorage.getItem('peekaboo_zones');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Ball Pit Galaxy', category: 'Active Play', ageGroup: 'All Ages', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1000&auto=format&fit=crop', description: 'A sea of colorful balls with interactive lighting.' },
      { id: '2', name: 'Action Trampoline', category: 'Jumping', ageGroup: '3+ Years', image: 'https://images.unsplash.com/photo-154433334d-0683030368a5?q=80&w=1000&auto=format&fit=crop', description: 'Safe jumping zone for high energy.' },
      { id: '3', name: 'Art Corner', category: 'Creative', ageGroup: '2-10 Years', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop', description: 'Arts and crafts for young creators.' },
    ];
  });

  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);
  const [redeemActive, setRedeemActive] = useState(false);
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('peekaboo_stars');
    return saved ? parseInt(saved, 10) : 150; 
  });

  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id);
  const [partyStatus, setPartyStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    localStorage.setItem('peekaboo_stars', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('peekaboo_site_content', JSON.stringify(siteContent));
    localStorage.setItem('peekaboo_zones', JSON.stringify(zones));
  }, [siteContent, zones]);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const trackBooking = (type: string, details: any) => {
    const bookings = JSON.parse(localStorage.getItem('peekaboo_bookings') || '[]');
    bookings.push({ id: Date.now(), type, details, timestamp: new Date().toISOString() });
    localStorage.setItem('peekaboo_bookings', JSON.stringify(bookings.slice(-50))); 
  };

  const handlePurchase = (index: number, price: number) => {
    setPurchasingIndex(index);
    trackBooking('Ticket', { ticketName: siteContent.tickets[index].name, price });
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
      
      let finalPoints = points;
      let finalPrice = price;

      if (redeemActive && points >= LOYALTY_RULES.redemptionRate) {
        finalPoints -= LOYALTY_RULES.redemptionRate;
        finalPrice = Math.max(0, price - 1); 
      }

      const earned = Math.floor(finalPrice * LOYALTY_RULES.pointsPerJD);
      setPoints(finalPoints + earned);
      setRedeemActive(false); 
    }, 1500);
  };

  const handlePartySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartyStatus('submitting');
    trackBooking('Party', { theme: selectedTheme });
    setTimeout(() => {
      setPartyStatus('success');
      setTimeout(() => setPartyStatus('idle'), 5000);
    }, 2000);
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

  const getCurrentTierKey = () => {
    if (points >= TIER_CONFIG['Golden Mushroom'].threshold) return 'Golden Mushroom';
    if (points >= TIER_CONFIG.Sprout.threshold) return 'Sprout';
    return 'Seedling';
  };

  const getNextTierInfo = () => {
    const current = getCurrentTierKey();
    if (current === 'Golden Mushroom') return null;
    const next = current === 'Seedling' ? 'Sprout' : 'Golden Mushroom';
    const needed = TIER_CONFIG[next].threshold - points;
    const progress = (points - TIER_CONFIG[current].threshold) / (TIER_CONFIG[next].threshold - TIER_CONFIG[current].threshold);
    return { name: next, needed, progress: Math.min(Math.max(progress, 0), 1) };
  };

  const currentTier = TIER_CONFIG[getCurrentTierKey()];
  const nextInfo = getNextTierInfo();
  const TierIcon = currentTier.icon;

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative min-h-screen text-gray-800 selection:bg-[#E41E26] selection:text-white cursor-auto md:cursor-none overflow-x-hidden ${isRTL ? 'font-[Cairo]' : 'font-[Quicksand]'}`}
    >
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Admin Panel Overlay */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        siteContent={siteContent}
        setSiteContent={setSiteContent}
        zones={zones}
        setZones={setZones}
      />

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
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <img src="input_file_1.png" alt="Peekaboo Logo" className="h-10 md:h-14 w-auto object-contain hover:scale-110 transition-transform" />
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-10 text-sm font-black uppercase tracking-widest text-gray-400">
            {t.nav.map((item, idx) => (
              <button key={idx} onClick={() => scrollToSection(['zones', 'perks', 'parties', 'tickets'][idx])} className="hover:text-[#E41E26] transition-all hover:scale-110 bg-transparent border-none cursor-pointer">
                {item}
              </button>
            ))}
          </div>
          <motion.div 
             whileHover={{ scale: 1.05 }}
             className="flex items-center gap-2 bg-[#FFD900]/10 px-4 py-2 rounded-full border border-[#FFD900]/30 cursor-pointer group"
             onClick={() => scrollToSection('tickets')}
          >
             <Star className="w-5 h-5 text-[#F7941D] fill-[#F7941D] group-hover:rotate-12 transition-transform" />
             <span className="font-black text-[#F7941D]">{points}</span>
          </motion.div>
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
            <img src="input_file_1.png" alt="Logo" className="w-48 mb-8" />
            {t.nav.map((item, idx) => (
              <button key={idx} onClick={() => scrollToSection(['zones', 'perks', 'parties', 'tickets'][idx])} className="text-5xl font-black text-gray-900 uppercase">
                {item}
              </button>
            ))}
            <FootprintsRow />
            <PeekyMascot scale={1} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION with VIBRANT PHOTO GRID (Fixed "Crashed" Visibility) */}
      <header className="relative min-h-[110vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-32 pb-24">
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef9f3] via-white/80 to-[#f0f9ff] -z-10" />
        
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content Card */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 z-10"
          >
            <div className="bg-white/40 backdrop-blur-xl p-10 md:p-14 rounded-[4rem] border-4 border-white shadow-2xl shadow-[#00ADEF]/10">
              <div className="relative mb-8 inline-block">
                <PeekyMascot scale={1} showFootprints />
              </div>
              
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="mb-8"
              >
                <img src="input_file_1.png" alt="PEEKABOO Logo" className="w-full max-w-[320px] h-auto drop-shadow-xl" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                {t.heroTitle} <br/>
                <span className="text-[#00ADEF]">{t.heroSubtitle}</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => scrollToSection('zones')}
                  className="bg-[#F7941D] text-white px-8 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-[#F7941D]/30 hover:shadow-orange-400/50 transition-all hover:-translate-y-2 flex items-center justify-center gap-3"
                >
                  {t.ctaExplore} <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => scrollToSection('parties')}
                  className="bg-[#00ADEF] text-white px-8 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-[#00ADEF]/30 hover:shadow-blue-400/50 transition-all hover:-translate-y-2 flex items-center justify-center gap-3"
                >
                  {t.ctaParty}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature Photo Grid (Vibrant and Visible) */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] w-full">
            {/* The 4-loop Mosaic inspired by user scribble */}
            <div className="absolute inset-0 grid grid-cols-2 gap-6 p-4">
              {[
                { img: GALLERY_IMAGES[1], delay: 0.2, rotate: -3, scale: 1, pos: 'top-0 left-0' },
                { img: GALLERY_IMAGES[2], delay: 0.4, rotate: 2, scale: 1.05, pos: 'top-10 left-0' },
                { img: GALLERY_IMAGES[3], delay: 0.6, rotate: -1, scale: 1, pos: 'top-0 left-0' },
                { img: GALLERY_IMAGES[4], delay: 0.8, rotate: 4, scale: 0.95, pos: 'top-0 left-0' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: item.scale, y: 0, rotate: item.rotate }}
                  transition={{ delay: item.delay, type: "spring", stiffness: 60 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
                  className="relative group h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white cursor-pointer"
                >
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Celebration" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <Star className="text-[#FFD900] fill-[#FFD900]" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floaties */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFD900] rounded-full blur-[80px] opacity-20"
            />
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 left-1/4"
            >
              <FootprintsRow className="scale-150 rotate-12" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* GALLERY SECTION - Cleaner & Straight */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <ImageIcon className="text-[#8CC63F]" />
                 <span className="text-[#8CC63F] font-black uppercase tracking-[0.4em] text-sm block">{t.galleryBadge}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter">{t.galleryTitle}</h2>
            </div>
            <div className="p-8 bg-[#FFFAF0] rounded-[3rem] border-4 border-[#FFD900]/20 flex items-center gap-6">
               <Camera size={32} className="text-[#F7941D]" />
               <p className="text-gray-500 font-bold max-w-[200px]">{lang === 'ar' ? 'لقطات حية من أروع الحفلات' : 'Live snaps from our best parties'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="rounded-[3rem] overflow-hidden shadow-xl aspect-square border-8 border-gray-50 bg-gray-100 group"
              >
                <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Peekaboo Experience" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONES SECTION */}
      <section id="zones" className="relative z-10 py-24 md:py-32 bg-[#FFFAF0]">
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
            {zones.map((zone) => (
              <AttractionCard key={zone.id} attraction={zone} onClick={() => setSelectedAttraction(zone)} />
            ))}
          </div>
        </div>
      </section>

      {/* BIRTHDAY PARTIES SECTION */}
      <section id="parties" className="relative z-10 py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div 
               initial={{ rotate: -10 }}
               whileInView={{ rotate: 10 }}
               transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
               className="inline-block mb-6"
            >
               <Cake size={80} className="text-[#E41E26]" />
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-black text-gray-900 mb-8 tracking-tighter">{t.partyTitle}</h2>
            <p className="text-[#F7941D] font-black uppercase tracking-[0.5em] text-sm mb-6">{t.partySubtitle}</p>
            <p className="max-w-2xl mx-auto text-gray-500 font-bold text-xl">{t.partyDesc}</p>
          </div>

          {/* Theme Scroller with REAL PHOTOS */}
          <div className="mb-32">
             <h3 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-4">
               <Sparkles className="text-[#FFD900]" /> {t.themesLabel} <Sparkles className="text-[#FFD900]" />
             </h3>
             <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x px-4">
                {THEMES.map((theme) => (
                   <motion.button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      whileHover={{ y: -10 }}
                      className={`flex-shrink-0 w-[300px] h-[400px] rounded-[3rem] overflow-hidden relative shadow-2xl transition-all border-8 snap-center ${selectedTheme === theme.id ? 'border-[#F7941D] scale-105' : 'border-transparent opacity-80'}`}
                   >
                      <img src={theme.img} className="absolute inset-0 w-full h-full object-cover" alt={theme.nameEn} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-0 right-0 p-6 text-white">
                         <h4 className="text-2xl font-black mb-2">{lang === 'ar' ? theme.nameAr : theme.nameEn}</h4>
                         {selectedTheme === theme.id && <motion.div layoutId="spark" className="mx-auto"><Sparkles className="mx-auto text-[#FFD900]" /></motion.div>}
                      </div>
                   </motion.button>
                ))}
             </div>
          </div>

          {/* Packages grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
             {siteContent.parties.map((pkg, i) => (
                <motion.div
                   key={i}
                   whileHover={{ y: -15 }}
                   className="bg-[#FFFAF0] p-12 rounded-[4rem] border-4 border-gray-100 flex flex-col shadow-xl relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Cake size={120} style={{ color: pkg.color }} />
                   </div>
                   <h4 className="text-3xl font-black mb-4" style={{ color: pkg.color }}>{lang === 'ar' ? pkg.nameAr : pkg.name}</h4>
                   <div className="text-6xl font-black mb-12" style={{ color: pkg.color }}>{pkg.price}</div>
                   
                   <ul className="space-y-6 flex-1">
                      {(lang === 'ar' ? pkg.includesAr : pkg.includesEn).map((item, idx) => (
                         <li key={idx} className="flex items-start gap-4 text-gray-600 font-bold">
                            <Star className="w-5 h-5 shrink-0 mt-1" style={{ color: pkg.color }} />
                            {item}
                         </li>
                      ))}
                   </ul>
                </motion.div>
             ))}
          </div>

          {/* Booking Form */}
          <div className="max-w-4xl mx-auto bg-gray-50 p-12 md:p-20 rounded-[5rem] shadow-inner relative">
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-3xl shadow-xl border-4 border-[#00ADEF]">
                <h3 className="text-2xl font-black">{t.bookParty}</h3>
             </div>
             
             <form onSubmit={handlePartySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div className="flex flex-col gap-4">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Users size={16} /> {t.formName}
                   </label>
                   <input required type="text" className="w-full bg-white px-8 py-5 rounded-3xl border-2 border-transparent focus:border-[#F7941D] transition-all outline-none font-bold" />
                </div>
                <div className="flex flex-col gap-4">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Baby size={16} /> {t.formAge}
                   </label>
                   <input required type="number" className="w-full bg-white px-8 py-5 rounded-3xl border-2 border-transparent focus:border-[#F7941D] transition-all outline-none font-bold" />
                </div>
                <div className="flex flex-col gap-4">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Calendar size={16} /> {t.formDate}
                   </label>
                   <input required type="date" className="w-full bg-white px-8 py-5 rounded-3xl border-2 border-transparent focus:border-[#F7941D] transition-all outline-none font-bold" />
                </div>
                <div className="flex flex-col gap-4">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Users size={16} /> {t.formGuests}
                   </label>
                   <input required type="number" className="w-full bg-white px-8 py-5 rounded-3xl border-2 border-transparent focus:border-[#F7941D] transition-all outline-none font-bold" />
                </div>
                <div className="md:col-span-2">
                   <button 
                      type="submit" 
                      disabled={partyStatus !== 'idle'}
                      className={`w-full py-8 rounded-[3rem] font-black text-2xl text-white transition-all shadow-2xl flex items-center justify-center gap-4 ${
                         partyStatus === 'success' ? 'bg-[#8CC63F]' : 'bg-[#E41E26] hover:scale-105 active:scale-95'
                      }`}
                   >
                      {partyStatus === 'idle' && <><Send size={24} /> {t.bookParty}</>}
                      {partyStatus === 'submitting' && <><Loader2 className="animate-spin" /> {t.processing}</>}
                      {partyStatus === 'success' && <><Sparkles /> {t.reserved}</>}
                   </button>
                </div>
             </form>
          </div>
        </div>
      </section>

      {/* TICKETS & LOYALTY SECTION */}
      <section id="tickets" className="relative z-10 py-32 md:py-48 px-6 bg-[#FFFAF0]">
        <div className="max-w-7xl mx-auto">
          {/* LOYALTY DASHBOARD */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className={`mb-32 bg-gradient-to-br ${currentTier.bg} p-12 md:p-16 rounded-[5rem] shadow-2xl relative overflow-hidden border-8 border-white transition-colors duration-500`}
          >
             <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                {getCurrentTierKey() === 'Golden Mushroom' ? (
                  <img src="input_file_0.png" className="w-[300px] grayscale brightness-150 opacity-20" alt="" />
                ) : (
                  <TierIcon size={240} style={{ color: currentTier.color }} />
                )}
             </div>

             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="text-center lg:text-left flex-1 w-full">
                   <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center border-4 border-[#FFD900]/20">
                         {getCurrentTierKey() === 'Golden Mushroom' ? (
                           <img src="input_file_0.png" className="w-16 h-16 object-contain" alt="" />
                         ) : (
                           <TierIcon size={48} style={{ color: currentTier.color }} />
                         )}
                      </div>
                      <div>
                        <h2 className="text-gray-900 font-black text-5xl md:text-6xl tracking-tighter mb-2">{t.loyaltyTitle}</h2>
                        <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-2xl w-fit shadow-sm mx-auto md:mx-0">
                           <Trophy className="w-5 h-5" style={{ color: currentTier.color }} />
                           <span className="font-black uppercase tracking-widest text-xs" style={{ color: currentTier.color }}>
                              {t.loyaltyStatus}: {getCurrentTierKey()}
                           </span>
                        </div>
                      </div>
                   </div>

                   {/* Journey Progress Tracker */}
                   <div className="w-full max-w-2xl mx-auto lg:mx-0 mt-12 bg-white/40 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white/50">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-sm font-black text-gray-800 uppercase tracking-widest">{t.journeyTitle}</p>
                        {nextInfo && <span className="text-sm font-black text-[#E41E26] bg-white px-3 py-1 rounded-full">{nextInfo.needed} {t.loyaltyPoints} Left</span>}
                      </div>

                      <div className="relative h-20 flex items-center justify-between">
                         <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-full top-1/2 -translate-y-1/2 overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
                               className="h-full bg-gradient-to-r from-[#8CC63F] via-[#00ADEF] to-[#E41E26]"
                               transition={{ type: "spring", stiffness: 40, damping: 20 }}
                            />
                         </div>

                         {Object.entries(TIER_CONFIG).map(([key, config], idx) => {
                            const Icon = config.icon;
                            const isReached = points >= config.threshold;
                            const isCurrent = getCurrentTierKey() === key;
                            
                            return (
                               <div key={key} className="relative z-10 flex flex-col items-center">
                                  <motion.div 
                                     animate={isCurrent ? { scale: [1, 1.15, 1], boxShadow: `0 0 20px ${config.color}50` } : {}}
                                     transition={{ duration: 2, repeat: Infinity }}
                                     className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-xl ${
                                        isReached ? 'bg-white border-4' : 'bg-gray-100 grayscale border-2 border-gray-200'
                                     }`}
                                     style={{ borderColor: isReached ? config.color : '#e5e7eb' }}
                                  >
                                     {key === 'Golden Mushroom' ? (
                                       <img src="input_file_0.png" className={`w-8 h-8 object-contain ${isReached ? '' : 'grayscale opacity-50'}`} alt="" />
                                     ) : (
                                       <Icon size={24} style={{ color: isReached ? config.color : '#9ca3af' }} />
                                     )}
                                  </motion.div>
                                  <div className={`absolute top-16 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${
                                     isReached ? 'text-gray-900' : 'text-gray-400'
                                  }`}>
                                     {config.threshold} pts
                                  </div>
                               </div>
                            );
                         })}
                      </div>
                   </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center">
                   <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl min-w-[320px]">
                      <h4 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-3">
                         <Sparkles size={20} className="text-[#FFD900]" />
                         {t.loyaltyPerks}
                      </h4>
                      <ul className="space-y-4">
                         {(isRTL ? currentTier.perksAr : currentTier.perksEn).map((perk, i) => (
                           <li key={i} className="flex items-center gap-3 text-gray-600 font-bold">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTier.color }} />
                              {perk}
                           </li>
                         ))}
                      </ul>
                   </div>

                   <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-col items-center min-w-[280px] border-4 border-[#FFD900]/10">
                      <p className="text-gray-400 font-black uppercase text-xs tracking-widest mb-4">{t.loyaltyBalance}</p>
                      <div className="flex items-center gap-5">
                         <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                         >
                            <Star size={56} className="text-[#FFD900] fill-[#FFD900] drop-shadow-lg" />
                         </motion.div>
                         <span className="text-8xl font-black text-gray-900 leading-none">{points}</span>
                      </div>
                      <p className="mt-6 text-[#F7941D] font-black uppercase text-sm tracking-widest">{t.loyaltyPoints}</p>
                   </div>
                </div>
             </div>
             
             <div className="mt-16 pt-8 border-t border-black/5 flex flex-wrap justify-center lg:justify-between items-center gap-10">
                <div className="flex items-center gap-4 text-gray-700 bg-white/30 px-6 py-3 rounded-2xl">
                   <Gift size={24} className="text-[#E41E26]" />
                   <p className="font-bold text-sm uppercase tracking-wide">{t.loyaltyRedeem}</p>
                </div>

                {points >= LOYALTY_RULES.redemptionRate ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRedeemActive(!redeemActive)}
                    className={`flex items-center gap-4 px-8 py-4 rounded-full font-black uppercase text-sm transition-all shadow-lg ${
                      redeemActive 
                        ? 'bg-[#8CC63F] text-white' 
                        : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-[#8CC63F]/30'
                    }`}
                  >
                    {redeemActive ? <CheckCircle2 className="w-5 h-5" /> : <MinusCircle className="w-5 h-5" />}
                    {t.redeemToggle}
                  </motion.button>
                ) : (
                  <div className="text-gray-400 font-black uppercase text-xs flex items-center gap-2">
                    <X className="w-4 h-4" /> {t.insufficientPoints}
                  </div>
                )}
             </div>
          </motion.div>

          <div className="text-center mb-24 flex flex-col items-center">
             <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-8 border-4 border-[#FFD900]">
                <FootprintsRow />
             </div>
             <h2 className="text-7xl md:text-9xl font-black text-gray-900 mb-8 tracking-tighter">{t.ticketsTitle}</h2>
             <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-sm">{t.ticketsDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {siteContent.tickets.map((ticket, i) => {
              const isPurchased = purchasedIndex === i;
              const isPurchasing = purchasingIndex === i;
              
              const basePrice = ticket.numericPrice;
              const finalPriceValue = (redeemActive && points >= LOYALTY_RULES.redemptionRate) ? Math.max(0, basePrice - 1) : basePrice;
              const earnedStars = Math.floor(finalPriceValue * LOYALTY_RULES.pointsPerJD);

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -20, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="bg-white p-14 rounded-[4rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border-8 flex flex-col items-center text-center group relative overflow-hidden"
                  style={{ borderColor: redeemActive && points >= LOYALTY_RULES.redemptionRate ? '#8CC63F30' : `${ticket.color}15` }}
                >
                  <div className="absolute top-6 right-6 flex flex-col items-center bg-[#FFD900]/10 px-4 py-2 rounded-2xl border border-[#FFD900]/20">
                     <Star size={14} className="text-[#F7941D] fill-[#F7941D] mb-1" />
                     <span className="text-[10px] font-black text-[#F7941D] uppercase">+{earnedStars} {t.loyaltyPoints}</span>
                  </div>

                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10 transition-transform group-hover:scale-125" style={{ backgroundColor: `${ticket.color}15`, color: ticket.color }}>
                     <Baby className="w-12 h-12" strokeWidth={4} />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight">
                    {isRTL ? ticket.nameAr : ticket.name}
                  </h3>
                  <p className="text-gray-400 mb-10 font-bold text-lg">
                    {isRTL ? ticket.descAr : ticket.desc}
                  </p>
                  
                  <div className="flex flex-col items-center mb-14">
                    {redeemActive && points >= LOYALTY_RULES.redemptionRate ? (
                      <>
                        <span className="text-2xl font-bold text-gray-300 line-through mb-1">{ticket.price}</span>
                        <span className="text-7xl font-black text-[#8CC63F]">{finalPriceValue.toFixed(2)} JD</span>
                      </>
                    ) : (
                      <div className="text-7xl font-black" style={{ color: ticket.color }}>
                        {ticket.price}
                      </div>
                    )}
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
                    onClick={() => handlePurchase(i, ticket.numericPrice)}
                    disabled={isPurchased}
                    style={{ backgroundColor: isPurchased ? '#F3F4F6' : (redeemActive && points >= LOYALTY_RULES.redemptionRate ? '#8CC63F' : ticket.color) }}
                    className={`w-full py-6 rounded-[2.5rem] font-black text-xl text-white transition-all shadow-2xl ${
                      !isPurchased ? 'hover:scale-105 active:scale-95 hover:brightness-110 shadow-black/10' : 'text-gray-400'
                    }`}
                  >
                    {isPurchasing ? t.processing : isPurchased ? t.reserved : t.bookBtn}
                  </button>

                  <AnimatePresence>
                    {redeemActive && points >= LOYALTY_RULES.redemptionRate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 flex items-center gap-2 text-[#8CC63F] font-black uppercase text-xs"
                      >
                        <Sparkles className="w-4 h-4" /> {t.redeemSuccess}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <div className="mb-8 cursor-pointer relative inline-block">
                <img src="input_file_1.png" alt="Peekaboo Logo" className="h-16 md:h-24 w-auto object-contain" />
              </div>
              <p className="text-gray-500 font-bold text-xl max-w-sm mb-12 leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-2xl mb-8 text-gray-900">{t.footerExplore}</h4>
              <ul className="space-y-5 text-gray-500 font-bold text-lg">
                <li><button onClick={() => scrollToSection('zones')} className="hover:text-[#E41E26]">{t.nav[0]}</button></li>
                <li><button onClick={() => scrollToSection('tickets')} className="hover:text-[#00ADEF]">{t.nav[3]}</button></li>
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
            <div className="flex items-center gap-6">
              <span>{t.copy}</span>
              <button onClick={() => setIsAdminOpen(true)} className="flex items-center gap-2 hover:text-[#E41E26] transition-colors">
                <Lock size={14} /> {t.staffLogin}
              </button>
            </div>
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
