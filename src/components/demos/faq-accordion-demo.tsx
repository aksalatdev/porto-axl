import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { FAQItem } from "@/components/ui/faq-accordion/types";

const defaultData: FAQItem[] = [
  {
    id: 1,
    question: "Who are you?",
    answer: "A wanderer in the realm of code. Building dreams, one line at a time.",
    icon: "►",
    iconPosition: "left",
  },
  {
    id: 2,
    question: "What drives you?",
    answer: "The thrill of creation. The joy of solving puzzles that others deem impossible.",
    icon: "►",
    iconPosition: "left",
  },
  {
    id: 3,
    question: "What are you seeking?",
    answer: "Meaning. Purpose. And maybe a good cup of coffee along the way.",
    icon: "►",
    iconPosition: "left",
  },
  {
    id: 4,
    question: "Any regrets?",
    answer: "Only the chances I didn't take. But every ending is a new beginning.",
    icon: "►",
    iconPosition: "left",
  },
  {
    id: 5,
    question: "What's next?",
    answer: "The journey continues. New quests await. The story is far from over.",
    icon: "►",
    iconPosition: "left",
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
      questionClassName="bg-white hover:bg-gray-50 border border-gray-200"
      answerClassName="bg-gray-50 text-gray-700"
    />
  );
}
