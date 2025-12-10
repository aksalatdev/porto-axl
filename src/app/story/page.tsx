"use client";

import { Beliefs } from "@/components/ui/beliefs";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { PageTransition } from "@/components/ui/page-transition";

export default function Story() {
  return (
    <main className="relative min-h-screen bg-white text-black">
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

      <PageTransition>
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          <div className="w-full max-w-2xl mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              STORY
            </h1>
            <p className="font-mono text-xs sm:text-sm text-gray-500 leading-relaxed">
              A developer navigating through life, one line of code at a time.
              Building things that matter, learning from failures, and always
              moving forward.
            </p>
          </div>

          <div className="w-full max-w-2xl mb-12 sm:mb-16">
            <Beliefs />
          </div>

          <div className="w-full max-w-2xl">
            <div className="border border-gray-200 p-4 sm:p-6">
              <p className="font-mono text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                I believe in building with purpose, not just for the sake of
                building. Every project is a chapter, every bug is a lesson,
                every success is a stepping stone.
              </p>
              <p className="font-mono text-xs sm:text-sm text-gray-600 leading-relaxed">
                The journey is long, but the destination is worth it.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
