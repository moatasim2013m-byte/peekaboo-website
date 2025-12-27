/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Attraction } from '../types';
import { PlusCircle } from 'lucide-react';

interface AttractionCardProps {
  attraction: Attraction;
  onClick: () => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] w-full overflow-hidden border-b md:border-r border-gray-100 bg-white cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={onClick}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={attraction.image} 
          alt={attraction.name} 
          className="h-full w-full object-cover"
          variants={{
            rest: { scale: 1, filter: 'brightness(90%)' },
            hover: { scale: 1.05, filter: 'brightness(105%)' }
          }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-bold bg-[#FFD97D] text-[#8B6E2F] px-3 py-1 rounded-full shadow-sm">
             {attraction.ageGroup}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, rotate: -45 },
               hover: { opacity: 1, rotate: 0 }
             }}
             className="bg-white text-[#FF7B9C] rounded-full p-2 shadow-lg"
           >
             <PlusCircle className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <motion.h3 
            className="text-3xl font-bold text-white mb-1 drop-shadow-md"
            variants={{
              hover: { y: -5 }
            }}
          >
            {attraction.name}
          </motion.h3>
          <p className="text-sm font-bold uppercase tracking-widest text-[#60D394] drop-shadow-sm">
            {attraction.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AttractionCard;