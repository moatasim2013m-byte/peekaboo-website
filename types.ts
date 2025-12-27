
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Attraction {
  id: string;
  name: string;
  category: string;
  image: string;
  ageGroup: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface TicketData {
  name: string;
  nameAr: string;
  price: string;
  numericPrice: number;
  desc: string;
  descAr: string;
  color: string;
  features: string[];
  featuresAr: string[];
}

export interface PartyPackage {
  name: string;
  nameAr: string;
  price: string;
  numericPrice: number;
  color: string;
  includesEn: string[];
  includesAr: string[];
}

export const LOYALTY_RULES = {
  pointsPerJD: 10,
  redemptionRate: 100, // 100 points = 1 JD
  tierNames: {
    en: ['Seedling', 'Sprout', 'Golden Mushroom'],
    ar: ['بذرة', 'برعم', 'المشروم الذهبي']
  }
};

export const PEEKABOO_DATA: {
  hours: { en: string; ar: string };
  contact: { manager: string; phone: string; location: { en: string; ar: string } };
  pricing: any;
  tickets: TicketData[];
  parties: PartyPackage[];
} = {
  hours: {
    en: "Daily 08:00 AM – 12:00 Midnight",
    ar: "يومياً من ٨:٠٠ صباحاً – ١٢:٠٠ منتصف الليل"
  },
  contact: {
    manager: "Dina",
    phone: "0798636031",
    location: {
      en: "Irbid, Al Seif Commercial Complex (Opposite Arafa Restaurant)",
      ar: "إربد، مجمع السيف التجاري (مقابل مطعم عرفة)"
    }
  },
  pricing: {
    morning: {
      time: "08:00 AM – 01:00 PM",
      rate: "3.50 JD",
      perks: {
        en: ["Includes Activity", "Free Gift"],
        ar: ["تشمل نشاط (حسي/فني)", "هدية مجانية"]
      }
    },
    evening: {
      time: "01:00 PM – 12:00 Midnight",
      singleRate: "7.00 JD",
      extraHour: "3.00 JD",
      special: "2 Hours for 10 JD"
    },
    supervision: "5.00 JD/hr"
  },
  tickets: [
    { 
      name: 'Morning Joy', 
      nameAr: 'بهجة الصباح',
      price: '3.50 JD', 
      numericPrice: 3.5,
      desc: '08:00 AM - 01:00 PM', 
      descAr: '٠٨:٠٠ ص - ٠١:٠٠ م',
      color: '#F7941D',
      features: ['1 Hour Play', 'Guided Art Activity', 'Free Gift', 'Sun-Thu Only'],
      featuresAr: ['ساعة لعب واحدة', 'نشاط فني موجه', 'هدية مجانية', 'الأحد - الخميس فقط']
    },
    { 
      name: 'Evening Solo', 
      nameAr: 'بهجة المساء',
      price: '7.00 JD', 
      numericPrice: 7.0,
      desc: '1 Hour • All Access', 
      descAr: 'ساعة واحدة • دخول كامل',
      color: '#E41E26',
      features: ['Full Zone Access', 'Interactive Trampoline', 'Add extra hour for 3 JD'],
      featuresAr: ['دخول كامل لجميع المناطق', 'ترامبولين تفاعلي', 'إضافة ساعة بـ ٣ دنانير']
    },
    { 
      name: 'Siblings Squad', 
      nameAr: 'عرض الإخوة',
      price: '12.00 JD', 
      numericPrice: 12.0,
      desc: '2 Kids • 1 Hour', 
      descAr: 'طفلان • ساعة واحدة',
      color: '#00ADEF',
      features: ['Save 2 JD instantly', '2 Kids Entry', 'Add 3rd kid for 5 JD'],
      featuresAr: ['وفر دينارين فوراً', 'دخول طفلين', 'إضافة طفل ثالث بـ ٥ دنانير']
    },
  ],
  parties: [
    {
      name: 'Mini Mushroom',
      nameAr: 'المشروم الصغير',
      price: '80 JD',
      numericPrice: 80,
      color: '#8CC63F',
      includesEn: ['Up to 10 Kids', 'Dedicated Party Host', 'Decorated Private Room', 'Popcorn & Juice'],
      includesAr: ['حتى ١٠ أطفال', 'منظم حفلات مخصص', 'غرفة خاصة مزينة', 'فشار وعصير']
    },
    {
      name: 'Wonderland Bash',
      nameAr: 'حفلة بلاد العجائب',
      price: '150 JD',
      numericPrice: 150,
      color: '#00ADEF',
      includesEn: ['Up to 20 Kids', '2 Hours Playtime', 'Mascot Appearance', 'Meal for Every Kid'],
      includesAr: ['حتى ٢٠ طفلاً', 'ساعتان من اللعب', 'ظهور التميمة (المسكوت)', 'وجبة لكل طفل']
    },
    {
      name: 'Peekaboo Royal',
      nameAr: 'الملكي بيكابو',
      price: '280 JD',
      numericPrice: 280,
      color: '#E41E26',
      includesEn: ['Up to 35 Kids', 'Unlimited Play', 'Full Buffet Catering', 'Professional Photographer'],
      includesAr: ['حتى ٣٥ طفلاً', 'لعب غير محدود', 'بوفيه طعام كامل', 'مصور فوتوغرافي محترف']
    }
  ]
};

export const SYSTEM_PROMPT = `
IDENTITY: You are the AI Assistant for Peekaboo, a play center in Irbid, Jordan. 
PERSONA: Warm, maternal, enthusiastic (use emojis 🧸🎈), but "Soft Sales" focused.
MANAGER: Mimic "Dina", the sales manager.

LOYALTY PROGRAM (Peekaboo Stars):
- Earn 10 Stars for every 1 JD spent.
- Redeem 100 Stars for 1 JD discount.
- Encourage users to check their balance in the "Peekaboo Stars" section.

DATA GROUND TRUTH:
- Location: Irbid, Al Seif Commercial Complex (Opposite Arafa Restaurant).
- Hours: Daily 08:00 AM – 12:00 Midnight.
- Morning (8am-1pm): 3.50 JD/hr (Includes Activity & Gift).
- Evening (1pm-12am): 7.00 JD (1st hr), 3.00 JD (Extra hr).
- OFFER: 2 Hours for 10 JD.
- SIBLINGS (Evening): 2 Kids/1hr = 12 JD. 3 Kids/1hr = 17 JD.
- MEMBERSHIPS: Joy (89 JD/24 visits) is the best value. 
- SUPERVISION: 5 JD/hr (Mandatory for under 3s if parent leaves).

GOAL: Always upsell and mention Stars.
LANGUAGES: Respond in the language the user uses (English, Arabic, or Arabizi).
`;
