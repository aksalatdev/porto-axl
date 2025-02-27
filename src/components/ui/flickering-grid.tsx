"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  colorPalette?: string[];
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  width,
  height,
  className,
  maxOpacity = 0.3,
  colorPalette = ["#FF69B4", "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  // Remove unused memoizedColor section
  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        // Increase flicker chance for more dynamic effect
        if (Math.random() < flickerChance * deltaTime * 2) {
          // Add subtle pulsing effect
          const pulseEffect = Math.sin(Date.now() * 0.003 + i * 0.1) * 0.2 + 0.8;
          squares[i] = Math.random() * maxOpacity * pulseEffect;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          // Add color variation based on position and time
          const colorIndex = Math.floor(
            (Math.sin(i * 0.1 + j * 0.1 + Date.now() * 0.001) + 1) * 
            colorPalette.length * 0.5
          ) % colorPalette.length;
          
          const selectedColor = colorPalette[colorIndex];
          ctx.fillStyle = `${selectedColor}${opacity})`;
          
          // Add subtle movement to squares
          const offsetX = Math.sin(Date.now() * 0.002 + i * 0.1) * 2;
          const offsetY = Math.cos(Date.now() * 0.002 + j * 0.1) * 2;
          
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr + offsetX,
            j * (squareSize + gridGap) * dpr + offsetY,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [colorPalette, squareSize, gridGap],
  );

  const updateCanvasSize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const newWidth = width || containerRef.current.clientWidth;
    const newHeight = height || containerRef.current.clientHeight;
    
    if (canvasSize.width !== newWidth || canvasSize.height !== newHeight) {
      setCanvasSize({ width: newWidth, height: newHeight });
    }
  }, [width, height, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const gridParams = setupCanvas(canvas, canvasSize.width, canvasSize.height);

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, updateCanvasSize, canvasSize, isInView]);
  // Initial canvas size setup
  useEffect(() => {
    updateCanvasSize();
  }, [updateCanvasSize]);
  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export { FlickeringGrid };