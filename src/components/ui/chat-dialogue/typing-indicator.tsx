"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TypingIndicatorProps } from "./types";

export function TypingIndicator({ isVisible, position = 'left' }: TypingIndicatorProps) {
  const isRight = position === 'right';
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: isRight ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("flex", isRight ? "justify-end" : "justify-start")}
        >
          <div className={cn(
            "rounded-2xl px-4 py-3 flex gap-1",
            isRight 
              ? "bg-blue-500 rounded-br-md" 
              : "bg-gray-100 rounded-bl-md"
          )}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  isRight ? "bg-blue-200" : "bg-gray-400"
                )}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
