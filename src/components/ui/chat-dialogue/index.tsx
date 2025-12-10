"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ReplayButton } from "./replay-button";
import type { ChatDialogueProps } from "./types";

export function ChatDialogue({
  messages,
  className,
  autoPlay = true,
  typingDelay = 800,
  typingDuration = 1000,
}: ChatDialogueProps) {
  const [visibleMessages, setVisibleMessages] = React.useState<typeof messages>([]);
  const [showTyping, setShowTyping] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);
  const currentIndexRef = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const processNextMessage = React.useCallback(() => {
    const idx = currentIndexRef.current;
    
    if (idx >= messages.length) {
      setIsComplete(true);
      setShowTyping(false);
      return;
    }

    const msg = messages[idx];
    
    if (msg.type === "question") {
      // QUESTION (abu-abu, orang lain nanya): show typing first, then show question
      setTimeout(() => {
        setShowTyping(true);
        
        setTimeout(() => {
          setShowTyping(false);
          setVisibleMessages(prev => [...prev, msg]);
          currentIndexRef.current = idx + 1;
          
          // Small delay before next message
          setTimeout(() => {
            processNextMessage();
          }, typingDelay);
        }, typingDuration);
      }, 100);
    } else {
      // ANSWER (biru, lo jawab): show immediately, no typing indicator
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg]);
        currentIndexRef.current = idx + 1;
        
        // Small delay before next message
        setTimeout(() => {
          processNextMessage();
        }, typingDelay);
      }, typingDelay);
    }
  }, [messages, typingDelay, typingDuration]);

  const startAnimation = React.useCallback(() => {
    setVisibleMessages([]);
    setShowTyping(false);
    setIsComplete(false);
    setHasStarted(true);
    currentIndexRef.current = 0;
    
    // Start processing after a small delay
    setTimeout(() => {
      processNextMessage();
    }, 300);
  }, [processNextMessage]);

  const handleReplay = React.useCallback(() => {
    startAnimation();
  }, [startAnimation]);

  // Intersection Observer to trigger animation on viewport entry
  React.useEffect(() => {
    if (!autoPlay || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlay, hasStarted, startAnimation]);

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-3 p-4", className)}>
      {visibleMessages.map((message) => (
        <MessageBubble
          key={message.id}
          type={message.type}
          content={message.content}
          isVisible={true}
        />
      ))}
      
      {/* Typing indicator - ONLY shows before answer (abu-abu), always on left */}
      <TypingIndicator isVisible={showTyping} />
      
      <ReplayButton onClick={handleReplay} isVisible={isComplete} />
    </div>
  );
}

export { MessageBubble } from "./message-bubble";
export { TypingIndicator } from "./typing-indicator";
export { ReplayButton } from "./replay-button";
export type { ChatDialogueProps, ConversationMessage, MessageBubbleProps, TypingIndicatorProps, ReplayButtonProps } from "./types";
