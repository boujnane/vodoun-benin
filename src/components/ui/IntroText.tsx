'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroTextProps {
  lines: string[];
  interval?: number; // temps entre chaque phrase
}

export default function IntroText({ lines, interval = 700 }: IntroTextProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (lines.length === 0) return;

    // afficher le premier texte immédiatement
    setVisibleLines([lines[0]]);

    let current = 1; // démarrer à partir du deuxième élément
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
    <div
      className="
        absolute 
        w-full text-center px-4 
        space-y-6
        top-[20%] sm:top-[25%] md:top-[25%] lg:top-[25%]
      "
    >
      <AnimatePresence>
        {visibleLines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            className="
              text-white 
              font-semibold 
              drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]
              text-lg 
              sm:text-xl 
              md:text-3xl 
              lg:text-4xl 
              xl:text-5xl
              tracking-wide
              leading-snug
            "
          >
            {line}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
