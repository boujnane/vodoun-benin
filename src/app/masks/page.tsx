'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskScene } from "@/components/MaskScene";

export default function MaskPage() {
  const router = useRouter();
  const [lightOn, setLightOn] = useState(true);

  const toggleLight = () => {
    const next = !lightOn;
    setLightOn(next);
    window.dispatchEvent(new CustomEvent("mask-light-toggle", { detail: { lightOn: next } }));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0e0e0f] text-white">

      {/* === 3D Scene === */}
      <div className="absolute inset-0">
      <MaskScene 
        lightsOn={lightOn} 
        backgroundImage="background_main.png"
      />
      </div>

      {/* === Back Button (top left) === */}
      <button
        onClick={() => router.back()}
        aria-label="Retour"
        className="absolute top-6 left-6 z-40 flex items-center justify-center h-12 w-12 md:h-14 md:w-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 text-white/90 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* === Light Toggle Button (top right) === */}
      <button
        onClick={toggleLight}
        aria-pressed={!lightOn}
        aria-label={lightOn ? "Éteindre la lumière" : "Allumer la lumière"}
        className="absolute top-6 right-6 z-40 flex items-center justify-center h-12 w-12 md:h-14 md:w-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 text-white/90 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2"
      >
        {lightOn ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* === Header Title === */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-30 select-none pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.15em] text-white/90">
          <span className="font-semibold text-white">MASQUES</span> SACRÉS
        </h1>
        <p className="text-sm md:text-base text-neutral-400 mt-2 uppercase tracking-[0.25em]">
          Vodoun
        </p>
      </header>

      {/* === Footer Instructions === */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs md:text-sm text-neutral-400 select-none z-30 pointer-events-none">
        <div className="flex items-center gap-2 justify-center">
          <div className="h-[1px] w-6 bg-neutral-500/50" />
          <p className="tracking-widest">FAITES GLISSER POUR EXPLORER</p>
          <div className="h-[1px] w-6 bg-neutral-500/50" />
        </div>
      </footer>

      {/* === Subtle Overlay Gradients === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

    </div>
  );
}
