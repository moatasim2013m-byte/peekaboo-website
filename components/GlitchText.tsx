/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface MultiColorTextProps {
  text: string;
  className?: string;
  isRTL?: boolean;
}

const LOGO_COLORS = [
  '#FFD900', // Yellow (P)
  '#E41E26', // Red (E)
  '#E41E26', // Red (E)
  '#8CC63F', // Green (K)
  '#00ADEF', // Blue (A)
  '#00ADEF', // Blue (B)
  '#FFD900', // Yellow (O)
  '#F7941D', // Orange (O)
];

const PeekyFace = ({ size = "sm" }: { size?: "sm" | "md" }) => {
  const s = size === "sm" ? 0.4 : 0.8;
  return (
    <div style={{ transform: `scale(${s})`, transformOrigin: 'center' }} className="relative w-20 h-20">
      {/* Cap */}
      <div className="absolute top-0 left-0 w-20 h-12 bg-[#E41E26] rounded-t-full border-2 border-black/10">
        <div className="absolute top-2 left-4 w-4 h-4 bg-white rounded-full" />
        <div className="absolute top-1 right-6 w-3 h-3 bg-white rounded-full" />
        <div className="absolute top-6 left-10 w-3 h-3 bg-white rounded-full" />
      </div>
      {/* Body */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-10 bg-white rounded-full border-2 border-black/5" />
      {/* Eyes */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-2.5 h-2.5 bg-[#42210b] rounded-full shadow-[inset_-1px_-1px_0px_white]" />
        <div className="w-2.5 h-2.5 bg-[#42210b] rounded-full shadow-[inset_-1px_-1px_0px_white]" />
      </div>
      {/* Bow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center">
        <div className="w-2 h-2 bg-[#E41E26] rotate-45" />
        <div className="absolute -left-1 w-2 h-2 bg-[#E41E26] rounded-sm" />
        <div className="absolute -right-1 w-2 h-2 bg-[#E41E26] rounded-sm" />
      </div>
    </div>
  );
};

const MultiColorText: React.FC<MultiColorTextProps> = ({ text, className = '', isRTL = false }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className} ${isRTL ? 'flex-row-reverse' : ''}`}>
      <h1 className="flex flex-wrap justify-center font-black select-none">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            style={{ 
              color: LOGO_COLORS[i % LOGO_COLORS.length],
              textShadow: '4px 4px 0px rgba(0,0,0,0.05)',
              position: 'relative'
            }}
            className="inline-block px-1"
          >
            {char}
            {/* Character in first letter */}
            {i === 0 && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                 <div className="translate-y-1">
                   <PeekyFace size="sm" />
                 </div>
              </div>
            )}
          </motion.span>
        ))}
      </h1>
      
      {/* Standby Character */}
      <motion.div
        className={`absolute bottom-0 ${isRTL ? '-left-8 md:-left-16' : '-right-8 md:-right-16'}`}
        animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <PeekyFace size="md" />
      </motion.div>
    </div>
  );
};

export default MultiColorText;