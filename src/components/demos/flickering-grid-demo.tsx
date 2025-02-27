import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function FlickeringGridDemo() {
  return (
    <div className="relative h-[500px] rounded-lg w-full bg-background overflow-hidden border">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        colorPalette={["#6B7280", "#4B5563", "#374151"]} // Replace color with colorPalette
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    </div>
  );
}
