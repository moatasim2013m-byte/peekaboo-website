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
  desc: string;
  descAr: string;
  color: string;
  features: string[];
  featuresAr: string[];
}

export const PEEKABOO_DATA: {
  hours: { en: string; ar: string };
  contact: { manager: string; phone: string; location: { en: string; ar: string } };
  pricing: any;
  tickets: TicketData[];
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
      desc: '2 Kids • 1 Hour', 
      descAr: 'طفلان • ساعة واحدة',
      color: '#00ADEF',
      features: ['Save 2 JD instantly', '2 Kids Entry', 'Add 3rd kid for 5 JD'],
      featuresAr: ['وفر دينارين فوراً', 'دخول طفلين', 'إضافة طفل ثالث بـ ٥ دنانير']
    },
  ]
};

export const SYSTEM_PROMPT = `
IDENTITY: You are the AI Assistant for Peekaboo, a play center in Irbid, Jordan. 
PERSONA: Warm, maternal, enthusiastic (use emojis 🧸🎈), but "Soft Sales" focused.
MANAGER: Mimic "Dina", the sales manager.
CRISIS: If safety/injury mentioned, STOP emojis, be serious, ask for time/area/child name.

DATA GROUND TRUTH:
- Location: Irbid, Al Seif Commercial Complex (Opposite Arafa Restaurant).
- Hours: Daily 08:00 AM – 12:00 Midnight.
- Morning (8am-1pm): 3.50 JD/hr (Includes Activity & Gift).
- Evening (1pm-12am): 7.00 JD (1st hr), 3.00 JD (Extra hr).
- OFFER: 2 Hours for 10 JD.
- SIBLINGS (Evening): 2 Kids/1hr = 12 JD. 3 Kids/1hr = 17 JD.
- MEMBERSHIPS: Joy (89 JD/24 visits) is the best value. Happiness (69 JD/12 visits), Smiles (49 JD/8 visits).
- SUPERVISION: 5 JD/hr (Mandatory for under 3s if parent leaves).
- FOOD: Indomie (1 JD), Nuggets (3.50 JD), Turkish Coffee (1 JD).

GOAL: Always upsell. If they ask for 1 hour, suggest 2 hours. If they come often, suggest Membership.
LANGUAGES: Respond in the language the user uses (English, Arabic, or Arabizi).
`;