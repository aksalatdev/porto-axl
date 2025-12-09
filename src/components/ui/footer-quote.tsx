'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "I've been through a lot, but I'm okay now. I'm home.",
  "The code you write today is the legacy you leave tomorrow.",
  "Every bug is just a feature waiting to be understood.",
  "In the world of zeros and ones, creativity is infinite.",
  "Coffee: turning sleep deprivation into productivity since forever.",
  "The best error message is the one that never shows up.",
  "Code is poetry written for machines to dance to.",
  "Debugging: being the detective in a crime movie where you're also the murderer.",
  "First, solve the problem. Then, write the code.",
  "It works on my machine. — Every developer, ever.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Simplicity is the soul of efficiency.",
  "Talk is cheap. Show me the code.",
];

export function FooterQuote() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-8 border-t border-gray-200">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">TIP</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-gray-500 italic font-mono max-w-md mx-auto"
        >
          "{quotes[currentQuote]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
