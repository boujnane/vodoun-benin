'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroTextProps {
  lines: string[];
  interval?: number; // temps entre chaque phrase
}

export default function IntroText({ lines, interval = 2000 }: IntroTextProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      if (current < lines.length) {
        setVisibleLines((prev) => [...prev, lines[current]]);
        current++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [lines, interval]);

  return (
    <div className="absolute top-1/3 w-full text-center px-4 space-y-4">
      {visibleLines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
