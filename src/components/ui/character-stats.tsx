'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: string | number;
  maxValue?: number;
}

const stats: Stat[] = [
  { label: 'LVL', value: 23 },
  { label: 'EXP', value: 7420, maxValue: 10000 },
  { label: 'Projects', value: 12 },
  { label: 'Coffee', value: '∞' },
  { label: 'Bugs Fixed', value: 999 },
  { label: 'Lines of Code', value: '50K+' },
];

export function CharacterStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full border border-gray-200 p-3 sm:p-4"
    >
      <h3 className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-gray-400 mb-3 sm:mb-4">— STATUS —</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col"
          >
            <span className="text-[8px] sm:text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-mono font-bold text-black">
                {stat.value}
              </span>
              {stat.maxValue && (
                <span className="text-xs text-gray-400">/ {stat.maxValue}</span>
              )}
            </div>
            {stat.maxValue && (
              <div className="w-full h-1 bg-gray-200 mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(Number(stat.value) / stat.maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="h-full bg-black"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
