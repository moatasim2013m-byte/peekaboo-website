
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
  '#FFD900', // Yellow
  '#E41E26', // Red
  '#E41E26', // Red
  '#8CC63F', // Green
  '#00ADEF', // Blue
  '#00ADEF', // Blue
  '#FFD900', // Yellow
  '#F7941D', // Orange
];

const PeekyFace = ({ size = "sm" }: { size?: "sm" | "md" }) => {
  const s = size === "sm" ? 40 : 80;
  return (
    <div style={{ width: s, height: s }} className="relative flex items-center justify-center">
      <img src="input_file_0.png" alt="Peeky" className="w-full h-full object-contain" />
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
          </motion.span>
        ))}
      </h1>
      
      {/* Standby Character */}
      <motion.div
        className={`absolute -bottom-4 ${isRTL ? '-left-8 md:-left-16' : '-right-8 md:-right-16'}`}
        animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <PeekyFace size="md" />
      </motion.div>
    </div>
  );
};

export default MultiColorText;
