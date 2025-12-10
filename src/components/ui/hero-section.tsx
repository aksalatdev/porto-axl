'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './typewriter';
import { SocialIcons } from './social-icons';
import { useSplash } from './splash-context';

const dialogues = [
  "Welcome, traveler.",
  "I am a developer who writes code and dreams in pixels.",
  "This is my story. My journey. My quest.",
  "Shall we begin?"
];

export function HeroSection() {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);
  const { isSplashComplete } = useSplash();

  // Wait for splash to complete before starting typewriter
  useEffect(() => {
    if (isSplashComplete) {
      // Small delay after splash completes
      const timer = setTimeout(() => {
        setStartTypewriter(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSplashComplete]);

  const handleComplete = () => {
    if (currentDialogue < dialogues.length - 1) {
      setTimeout(() => {
        setCurrentDialogue(prev => prev + 1);
      }, 500);
    } else {
      setShowAll(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mb-8 sm:mb-12 md:mb-16 text-center px-2"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-2"
      >
        BITADEV
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-[8px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-400 mb-4 sm:mb-6"
      >
        Developer / Creator / Dreamer
      </motion.p>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center mb-6 sm:mb-8 md:mb-12"
      >
        <SocialIcons />
      </motion.div>

      {/* Dialogue Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="border border-gray-200 p-4 sm:p-6 text-left"
      >
        <div className="min-h-[60px] sm:min-h-[80px]">
          {!startTypewriter ? (
            <span className="font-mono text-xs sm:text-sm text-gray-400">...</span>
          ) : !showAll ? (
            <Typewriter
              key={currentDialogue}
              text={dialogues[currentDialogue]}
              speed={40}
              onComplete={handleComplete}
              className="font-mono text-xs sm:text-sm text-gray-700"
              sound={true}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {dialogues.map((dialogue, index) => (
                <p key={index} className="font-mono text-xs sm:text-sm text-gray-700">
                  {index === dialogues.length - 1 ? (
                    <span className="text-black font-medium">{dialogue}</span>
                  ) : (
                    dialogue
                  )}
                </p>
              ))}
            </motion.div>
          )}
        </div>

        {/* Continue indicator */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-end mt-4"
          >
            <span className="text-[10px] font-mono text-gray-400">▼ CONTINUE</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
