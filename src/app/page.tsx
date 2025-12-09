import { DefaultDemo } from "@/components/demos/faq-accordion-demo";
import { AgentPlanDemo } from "@/components/demos/agent-plan-demo";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { CharacterStats } from "@/components/ui/character-stats";
import { FooterQuote } from "@/components/ui/footer-quote";
import { HeroSection } from "@/components/ui/hero-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      {/* Under Development Badge */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-200 bg-white/80 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-500"></span>
          </span>
          <span className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-500">Under Development</span>
        </div>
      </div>

      {/* Background Grid - subtle */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <FlickeringGrid
          className="w-full h-full"
          squareSize={2}
          gridGap={8}
          flickerChance={0.2}
          maxOpacity={0.08}
          colorPalette={["rgba(0, 0, 0,"]}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        {/* Hero Section with Typewriter */}
        <HeroSection />

        {/* Character Stats */}
        <div className="w-full max-w-2xl mb-16">
          <CharacterStats />
        </div>

        {/* Dialog Section */}
        <div className="w-full max-w-2xl mb-16">
          <h2 className="text-xs font-mono tracking-widest uppercase text-gray-400 mb-4">
            — DIALOGUE —
          </h2>
          <DefaultDemo />
        </div>

        {/* Quest Log */}
        <div className="w-full max-w-2xl mb-16">
          <h2 className="text-xs font-mono tracking-widest uppercase text-gray-400 mb-4">
            — QUEST LOG —
          </h2>
          <AgentPlanDemo />
        </div>

        {/* Footer Quote */}
        <div className="w-full max-w-2xl">
          <FooterQuote />
        </div>
      </div>
    </main>
  );
}
