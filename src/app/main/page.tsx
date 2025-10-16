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
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const showTimer = setTimeout(() => setShowIntro(true), 800);
      return () => clearTimeout(showTimer);
    }
  }, [countdown]);

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col">
      {/* ✅ Optimisation iOS : Canvas GPU isolé */}
      <div className="fixed inset-0 -z-10">
        <VantaBackground />
      </div>

      <ModernNavbar />

      {/* Compte à rebours fluide */}
      <AnimatePresence>
        {!showIntro && countdown >= 1 && (
          <motion.div
            key={countdown}
            initial={{ opacity: 0, scale: 0.7, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: -15 }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              type: "tween",
            }}
            className="absolute top-1/3 w-full text-center select-none"
            style={{
              willChange: "transform, opacity",
            }}
          >
            <span
              className="text-[9rem] md:text-[14rem] font-AfricanFont text-transparent 
                         bg-clip-text bg-gradient-to-b from-yellow-300 via-amber-100 to-orange-600 
                         drop-shadow-none inline-block"
              style={{
                filter: "blur(0.4px)",
                textShadow: "0 0 15px rgba(255, 230, 150, 0.4)",
                letterSpacing: "0.05em",
                WebkitFontSmoothing: "antialiased",
                transform: "translateZ(0)", // ✅ évite le repaint sur iOS
              }}
            >
              {countdown}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texte d’introduction */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 overflow-y-auto px-4 py-8 flex flex-col items-center"
        >
          <IntroText lines={vaudouIntroLines} interval={5000} />
        </motion.div>
      )}
    </div>
  );
}
