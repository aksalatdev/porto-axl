'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextShimmer } from './text-shimmer';

interface SplashScreenProps {
  children: React.ReactNode;
}

export function SplashScreen({ children }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading time - 2.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black"
          >
            {/* Logo/Icon animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
                className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500"
              />
            </motion.div>

            {/* Text shimmer loading */}
            <TextShimmer 
              className="text-2xl font-bold [--base-color:theme(colors.pink.400)] [--base-gradient-color:theme(colors.pink.600)] dark:[--base-color:theme(colors.pink.300)] dark:[--base-gradient-color:theme(colors.pink.100)]" 
              duration={1.5}
            >
              Loading...
            </TextShimmer>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400"
            >
              bitadev portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - render but hidden during splash */}
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
