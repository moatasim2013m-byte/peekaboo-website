/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const PeekyAvatar = () => (
  <div className="relative w-12 h-12 flex-shrink-0">
    {/* Mushroom Cap */}
    <div className="absolute top-0 left-0 w-full h-[65%] bg-[#E41E26] rounded-t-[50%] rounded-b-[20%] shadow-sm border-2 border-white">
      <div className="absolute top-1.5 left-2 w-2.5 h-2.5 bg-white rounded-full opacity-90" />
      <div className="absolute top-1 right-3 w-2 h-2 bg-white rounded-full opacity-90" />
      <div className="absolute bottom-1 right-4 w-2.5 h-2.5 bg-white rounded-full opacity-90" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
    </div>
    {/* Mushroom Stem/Body */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[65%] h-[55%] bg-white rounded-full border-2 border-[#5D3D2E]/10 flex flex-col items-center justify-center">
      {/* Kawaii Eyes */}
      <div className="flex gap-2 mb-1 scale-75">
        <div className="w-2 h-2 bg-[#3d2010] rounded-full relative">
           <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full" />
        </div>
        <div className="w-2 h-2 bg-[#3d2010] rounded-full relative">
           <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full" />
        </div>
      </div>
      {/* Bow Tie */}
      <div className="absolute bottom-[10%] flex items-center justify-center scale-[0.6]">
        <div className="w-2 h-2 bg-[#E41E26] rotate-45 z-10" />
        <div className="absolute -left-2 w-3 h-3 bg-[#E41E26] rounded-sm" />
        <div className="absolute -right-2 w-3 h-3 bg-[#E41E26] rounded-sm" />
      </div>
    </div>
    {/* Blush */}
    <div className="absolute top-[65%] left-2.5 w-1.5 h-0.5 bg-[#FF7B9C] rounded-full opacity-40" />
    <div className="absolute top-[65%] right-2.5 w-1.5 h-0.5 bg-[#FF7B9C] rounded-full opacity-40" />
  </div>
);

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m Peeky! 🍄 Ready to play at Peekaboo? 🌈' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    const responseText = await sendMessageToGemini(input);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="mb-4 w-80 md:w-96 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#00ADEF]/20"
          >
            <div className="bg-gradient-to-r from-[#E41E26] via-[#F7941D] to-[#FFD900] p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-0.5 shadow-md">
                  <PeekyAvatar />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg leading-tight">Peeky</h3>
                  <p className="text-[10px] text-white/90 font-black uppercase tracking-[0.2em]">Playground Mascot</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white bg-white/20 hover:bg-white/40 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-[#FFFAF0]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'model' && (
                    <div className="bg-white rounded-full p-0.5 h-fit shadow-sm border border-gray-100 scale-75 origin-top-left">
                      <PeekyAvatar />
                    </div>
                  )}
                  <div className={`max-w-[75%] p-4 rounded-3xl text-sm font-bold leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#00ADEF] text-white rounded-tr-none shadow-lg' 
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="scale-75 origin-top-left"><PeekyAvatar /></div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 bg-[#E41E26] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2.5 h-2.5 bg-[#8CC63F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2.5 h-2.5 bg-[#00ADEF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Chat with Peeky..."
                  className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#00ADEF]/20 px-5 py-3 rounded-full text-sm font-black focus:outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#E41E26] p-3.5 rounded-full hover:bg-red-600 transition-all active:scale-90 disabled:opacity-50 shadow-lg shadow-red-100"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl border-4 border-[#FFD900] z-50 overflow-hidden group"
      >
        <div className="scale-150 group-hover:scale-175 transition-transform duration-300">
          <PeekyAvatar />
        </div>
      </motion.button>
    </div>
  );
};

export default AIChat;