'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const beliefs = [
  { word: 'TIME', meaning: 'The only currency you can\'t earn back' },
  { word: 'MONEY', meaning: 'Freedom in its purest form' },
  { word: 'CERTAINTY', meaning: 'Peace of mind over chaos' },
  { word: 'SIMPLICITY', meaning: 'Less noise, more clarity' },
  { word: 'GROWTH', meaning: 'The only direction worth moving' },
  { word: 'PEACE', meaning: 'The ultimate destination' },
];

export function Beliefs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full border border-gray-200 p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {beliefs.map((belief, index) => (
          <motion.div
            key={belief.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="cursor-default"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
              hoveredIndex === index ? 'text-black' : 'text-gray-300'
            }`}>
              {belief.word}
            </span>
            
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[9px] sm:text-[10px] font-mono text-gray-400 mt-1 overflow-hidden"
                >
                  {belief.meaning}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
