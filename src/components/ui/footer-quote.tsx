'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  // Life quotes
  "I've been through a lot, but I'm okay now. I'm home.",
  'The wound is the place where the light enters you.',
  'Not all who wander are lost.',
  'In the middle of difficulty lies opportunity.',
  'The only way out is through.',
  'Stars cannot shine without darkness.',
  'What feels like the end is often the beginning.',
  'You are not your mistakes. You are not your struggles.',
  'Healing is not linear, and that is okay.',
  'Sometimes the bravest thing is to keep going.',
  'Your story is not over yet.',
  'Growth is painful. Change is painful. But nothing is as painful as staying stuck.',
  'The sun will rise and we will try again.',
  // Code quotes
  'The code you write today is the legacy you leave tomorrow.',
  'Every bug is just a feature waiting to be understood.',
  'First, solve the problem. Then, write the code.',
  'Simplicity is the soul of efficiency.',
  'Talk is cheap. Show me the code.',
];

function QuoteText({ quote }: { quote: string }) {
  return <span>&ldquo;{quote}&rdquo;</span>;
}

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
          <QuoteText quote={quotes[currentQuote]} />
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
