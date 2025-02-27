// components/ui/faq-accordion/faq-accordion.tsx
import type { FaqAccordionProps } from "./types";
import { FaqAccordionClient } from "./faq-accordion-client";

export function FaqAccordion(props: FaqAccordionProps) {
  return <FaqAccordionClient {...props} />;
}