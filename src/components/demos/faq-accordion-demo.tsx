// components/demos/faq-accordion-demo.tsx
import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { FAQItem } from "@/components/ui/faq-accordion/types";

const defaultData: FAQItem[] = [
  {
    id: 1,
    question: "Are you lost, baby girl? 😏",
    answer: "No worries, I'll guide you through this magical world.",
    icon: "💫",
    iconPosition: "right",
  },
  {
    id: 2,
    question: "Do I need a license to flirt with you? 🥰",
    answer: "Nope, but a sweet message might help! 💕",
    icon: "💌",
    iconPosition: "left",
  },
  {
    id: 3,
    question: "What’s your secret ingredient? 😍",
    answer: "A little bit of charm, a pinch of sass, and a whole lot of love. 💖",
    icon: "🍯",
    iconPosition: "right",
  },
  {
    id: 4,
    question: "Can I get lost in your eyes? 👀",
    answer: "Only if you promise not to find your way out. 😜",
    icon: "✨",
    iconPosition: "left",
  },
  {
    id: 5,
    question: "What if I press the wrong button? 😳",
    answer: "Oops! Looks like you just opened my heart. 💘",
    icon: "🎯",
    iconPosition: "right",
  },
];

export function DefaultDemo() {
  return (
    <FaqAccordion 
      data={defaultData}
      className="max-w-[700px]"
    />
  );
}

export function CustomStyleDemo() {
  return (
    <FaqAccordion 
      data={defaultData}
      className="max-w-[700px]"
      questionClassName="bg-secondary hover:bg-secondary/80"
      answerClassName="bg-secondary text-secondary-foreground"
      timestamp="Updated daily at 12:00 PM"
    />
  );
}