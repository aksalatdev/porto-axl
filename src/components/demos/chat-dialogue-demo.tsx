"use client";

import { ChatDialogue } from "@/components/ui/chat-dialogue";
import type { ConversationMessage } from "@/components/ui/chat-dialogue/types";

const conversationData: ConversationMessage[] = [
  {
    id: 1,
    type: "question",
    content: "Who are you?",
  },
  {
    id: 2,
    type: "answer",
    content: "A wanderer in the realm of code. Building dreams, one line at a time.",
  },
  {
    id: 3,
    type: "question",
    content: "What drives you?",
  },
  {
    id: 4,
    type: "answer",
    content: "The thrill of creation. The joy of solving puzzles that others deem impossible.",
  },
  {
    id: 5,
    type: "question",
    content: "What are you seeking?",
  },
  {
    id: 6,
    type: "answer",
    content: "Meaning. Purpose. And maybe a good cup of coffee along the way.",
  },
  {
    id: 7,
    type: "question",
    content: "Any regrets?",
  },
  {
    id: 8,
    type: "answer",
    content: "Only the chances I didn't take. But every ending is a new beginning.",
  },
  {
    id: 9,
    type: "question",
    content: "What's next?",
  },
  {
    id: 10,
    type: "answer",
    content: "The journey continues. New quests await. The story is far from over.",
  },
];

export function ChatDialogueDemo() {
  return (
    <ChatDialogue
      messages={conversationData}
      className="max-w-[700px]"
      typingDelay={600}
      typingDuration={800}
    />
  );
}
