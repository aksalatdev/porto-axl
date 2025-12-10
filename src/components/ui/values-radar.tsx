'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Value {
  name: string;
  level: number; // 0-100
}

const values: Value[] = [
  { name: 'TIME', level: 90 },
  { name: 'MONEY', level: 75 },
  { name: 'CERTAINTY', level: 60 },
  { name: 'SIMPLICITY', level: 85 },
  { name: 'GROWTH', level: 95 },
  { name: 'PEACE', level: 80 },
];

export function ValuesRadar() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;
  const sides = values.length;

  // Calculate points for hexagon
  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / sides - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Generate hexagon path
  const generateHexPath = (radius: number) => {
    const points = Array.from({ length: sides }, (_, i) => getPoint(i, radius));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  // Generate data path based on values
  const generateDataPath = () => {
    const points = values.map((v, i) => getPoint(i, (v.level / 100) * maxRadius));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border border-gray-200 p-4 sm:p-6"
    >
      <h3 className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-gray-400 mb-4 sm:mb-6">
        — CORE VALUES —
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Radar Chart */}
        <div className="relative">
          <svg width="300" height="300" viewBox="0 0 300 300" className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]">
            {/* Background hexagons */}
            {[20, 40, 60, 80, 100].map((percent) => (
              <path
                key={percent}
                d={generateHexPath((percent / 100) * maxRadius)}
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            ))}

            {/* Axis lines */}
            {values.map((_, i) => {
              const point = getPoint(i, maxRadius);
              return (
                <line
                  key={i}
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke="#e5e5e5"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data area */}
            <motion.path
              d={generateDataPath()}
              fill="rgba(0, 0, 0, 0.05)"
              stroke="black"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Data points */}
            {values.map((v, i) => {
              const point = getPoint(i, (v.level / 100) * maxRadius);
              return (
                <motion.circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={hoveredIndex === i ? 6 : 4}
                  fill="black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                />
              );
            })}

            {/* Labels */}
            {values.map((v, i) => {
              const labelPoint = getPoint(i, maxRadius + 25);
              return (
                <text
                  key={i}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[8px] sm:text-[10px] font-mono tracking-wider transition-colors ${
                    hoveredIndex === i ? 'fill-black' : 'fill-gray-400'
                  }`}
                >
                  {v.name}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Stats List */}
        <div className="flex-1 w-full md:w-auto">
          <div className="space-y-3">
            {values.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`text-[10px] sm:text-xs font-mono w-20 transition-colors ${
                  hoveredIndex === i ? 'text-black' : 'text-gray-400'
                }`}>
                  {v.name}
                </span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${v.level}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                  />
                </div>
                <span className={`text-[10px] sm:text-xs font-mono w-8 text-right transition-colors ${
                  hoveredIndex === i ? 'text-black' : 'text-gray-400'
                }`}>
                  {v.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
