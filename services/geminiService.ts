
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../types";

// Removed internal constant to strictly use process.env.API_KEY in the constructor

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Initializing GoogleGenAI with process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.4,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Relying on process.env.API_KEY being injected and available as per guidelines
  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message: message });
    // The text property returns the generated content as a string
    return response.text || "Oh no! 🙈 I got a little dizzy. Can you ask that again? Or call Dina at 0798636031 for urgent help.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The ball pit is making too much noise! I couldn't hear you clearly. Try again! 🎈";
  }
};
