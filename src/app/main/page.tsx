'use client';

import { useState, useEffect } from "react";
import { ModernNavbar } from "@/components/ui/ModernNavbar";
import { VantaBackground } from "@/components/VantaBackground";
import IntroText from "@/components/ui/IntroText";
import { motion, AnimatePresence } from "framer-motion";

const vaudouIntroLines = [
  "Le Vodou Béninois est une culture ancestrale riche et respectée.",
  "Il unit l'homme, la nature et les esprits pour guider la vie quotidienne.",
  "Les rites visent l'harmonie, la protection et la guérison.",
  "Chaque divinité possède ses couleurs, ses symboles et ses offrandes.",
  "Contrairement aux clichés, le Vodou n’est pas diabolique, mais spirituel et humaniste.",
  "Découvrons ensemble ce panthéon fascinant, ses histoires et ses enseignements."
];

export default function MainPage() {
  const [countdown, setCountdown] = useState(3);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (countdown > 1) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowIntro(true), 800);
    }
  }, [countdown]);

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col">
      <VantaBackground />
      <ModernNavbar />

      {/* Compte à rebours stylisé */}
      <AnimatePresence>
        {!showIntro && countdown >= 1 && (
          <motion.div
            key={countdown}
            initial={{ opacity: 0, scale: 0.3, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 2, rotate: -45 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute top-1/3 w-full text-center
                       text-[12rem] md:text-[18rem] font-AfricanFont 
                       text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-amber-100 to-orange-700
                       drop-shadow-[0_0_20px_rgba(255,255,150,0.5)]
                       select-none"
            style={{
              textShadow: `
                0 0 25px rgba(255, 230, 150, 0.4),
                0 0 50px rgba(255, 200, 100, 0.2)
              `,
              letterSpacing: "0.05em",
            }}
          >
            {countdown}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texte d’introduction après le compte à rebours */}
      {showIntro && (
        <div className="absolute inset-0 overflow-y-auto px-4 py-8 flex flex-col items-center">
          <IntroText lines={vaudouIntroLines} interval={5000} />
        </div>
      )}
    </div>
  );
}
