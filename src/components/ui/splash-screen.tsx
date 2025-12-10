'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSplash } from './splash-context';

interface SplashScreenProps {
  children: React.ReactNode;
}

const loadingMessages = [
  "Initializing reality...",
  "Loading memories...",
  "Compiling dreams...",
  "Connecting to the universe...",
];

export function SplashScreen({ children }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const { setSplashComplete } = useSplash();

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // End loading after 3.2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Notify context that splash is complete after fade out (0.8s)
      setTimeout(() => {
        setSplashComplete();
      }, 800);
    }, 3200);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [setSplashComplete]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            {/* Loading bar */}
            <div className="w-64 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-0.5 bg-black"
              />
            </div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-xs tracking-widest uppercase text-gray-500"
                >
                  {loadingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Press any key hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-12 font-mono text-[10px] tracking-widest uppercase text-gray-400"
            >
              Please wait...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
