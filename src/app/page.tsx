import { DefaultDemo } from "@/components/demos/faq-accordion-demo";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24">
      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full">
        <FlickeringGrid
          className="w-full h-full"
          squareSize={4}
          gridGap={6}
          flickerChance={0.4}
          maxOpacity={0.5}
          colorPalette={[
            "rgba(255, 105, 180,",  // Hot pink
            "rgba(255, 20, 147,",   // Deep pink
            "rgba(255, 182, 193,",  // Light pink
            "rgba(255, 192, 203,",  // Pink
            "rgba(219, 112, 147,",  // Pale violet red
          ]}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-6">Hi !</h1>
        <DefaultDemo />
      </div>
    </main>
  );
}