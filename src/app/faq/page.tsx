// app/faq/page.tsx
import { DefaultDemo } from "@/components/demos/faq-accordion-demo";

export default function FAQPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <DefaultDemo />
    </div>
  );
}