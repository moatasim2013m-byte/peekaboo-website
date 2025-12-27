/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Bubbles = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border-2 border-white/30 bg-white/10"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#fef9f3] via-[#fff1f1] to-[#f0f9ff]">
      
      <Bubbles />

      {/* Playful Blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#FFD97D] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-[20%] right-[-20%] w-[90vw] h-[70vw] bg-[#60D394] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-15%] left-[15%] w-[70vw] h-[70vw] bg-[#FF7B9C] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;