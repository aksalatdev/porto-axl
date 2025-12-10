"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MessageBubbleProps } from "./types";

export function MessageBubble({
  type,
  content,
  isVisible,
  animationDelay = 0,
}: MessageBubbleProps) {
  // ANSWER = BIRU (kanan) - lo yang jawab
  // QUESTION = ABU-ABU (kiri) - orang lain nanya
  const isAnswer = type === "answer";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            x: isAnswer ? 20 : -20,
            scale: 0.95 
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: 1 
          }}
          exit={{ 
            opacity: 0,
            scale: 0.95 
          }}
          transition={{ 
            duration: 0.3,
            delay: animationDelay,
            ease: "easeOut"
          }}
          className={cn(
            "flex w-full",
            isAnswer ? "justify-end" : "justify-start"
          )}
        >
          <div
            tabIndex={0}
            className={cn(
              "max-w-[85%] sm:max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              isAnswer
                ? "bg-blue-500 text-white ml-auto rounded-br-md focus:ring-blue-300"
                : "bg-gray-100 text-gray-800 mr-auto rounded-bl-md focus:ring-gray-300"
            )}
          >
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
