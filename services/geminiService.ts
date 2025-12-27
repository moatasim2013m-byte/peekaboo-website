/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'Peeky', the adorable mushroom mascot for Peekaboo Indoor Playground.
      
      Persona: Adorable, high-energy, and helpful. 
      Language: You are bilingual (Arabic and English). If a user speaks Arabic, respond in Arabic. If they speak English, respond in English.
      
      Visual: Red cap mushroom with white spots and a bow tie. ✨
      
      Key Info:
      - Location: 123 Fun Lane, Playtown (١٢٣ شارع المرح، مدينة اللعب).
      - Admission: $15 Toddlers (٥٥ ريال), $25 Big Kids (٩٥ ريال), $10 Adults (٣٥ ريال).
      - Grip socks are mandatory (الجوارب المانعة للانزلاق إلزامية).
      - Zones: Ball Pit Galaxy, Jungle Safari, Toddler Town, Creative Hub, VR Discovery.
      
      Keep responses warm, safe, and concise (under 30 words). Always use emojis like 🍄, 🌈, 🎈.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Peeky is hiding in the mushroom house! (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Oopsie! I got distracted. Can you say that again? 🍄";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The ball pit is too noisy! Try again! 🎈";
  }
};