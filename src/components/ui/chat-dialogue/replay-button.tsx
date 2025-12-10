"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { ReplayButtonProps } from "./types";

export function ReplayButton({ onClick, isVisible }: ReplayButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
