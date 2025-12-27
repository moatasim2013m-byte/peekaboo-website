
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const PeekyAvatar = () => (
  <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full border-2 border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
    <img 
      src="input_file_0.png" 
      alt="Peeky Mushroom Avatar" 
      className="w-10 h-10 object-contain translate-y-0.5"
    />
  </div>
);

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "أهلاً بكم في بيكابو إربد! 🍄 أنا دينا، كيف يمكنني مساعدتكم اليوم؟ اسألوني عن عروضنا وحفلات أعياد الميلاد! 🎈" }
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
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ background: 'linear-gradient(135deg, #E41E26 0%, #F7941D 100%)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="text-white w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00ADEF]"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="mb-4 w-80 md:w-96 h-[600px] max-h-[80vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#00ADEF]/20 flex flex-col"
          >
            <div className="bg-gradient-to-r from-[#E41E26] via-[#F7941D] to-[#FFD900] p-5 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-xl p-1 shadow-sm">
                  <img src="input_file_1.png" alt="Logo" className="h-10 w-auto" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight">Dina @ Peekaboo</h3>
                  <p className="text-[10px] opacity-90 font-black uppercase tracking-[0.2em]">AI Sales Manager 🍄</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/20 hover:bg-white/40 p-1.5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFFAF0]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'model' && (
                    <div className="shrink-0">
                      <PeekyAvatar />
                    </div>
                  )}
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed prose prose-sm prose-slate ${
                    msg.role === 'user' 
                      ? 'bg-[#00ADEF] text-white rounded-tr-none shadow-lg prose-invert' 
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'
                  }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-2 items-center text-gray-400">
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about sibling deals or Joy membership..."
                  className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#F7941D]/20 px-5 py-3 rounded-full text-sm font-bold focus:outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#E41E26] p-3.5 rounded-full hover:bg-red-600 transition-all active:scale-90 disabled:opacity-50 shadow-lg"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
