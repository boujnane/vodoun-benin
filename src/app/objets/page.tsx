'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModelScene } from "@/components/ModelScene";

// === Groupes de modèles disponibles ===
const MODEL_GROUPS = {
  masks: [
    { 
      url: "/mask_meshy.glb", 
      rotation: [0, 3, 0] as [number, number, number], 
      scale: 2, 
      position: [0, 0.5, 0] as [number, number, number] 
    },
  ],
  zangbetos: [
    { url: "/Zangbéto.glb", scale: 2, position: [0, 1, 0] as [number, number, number] }
  ],
  Egungun: [
    { url: "/egungun.glb", scale: 2, position: [0, 1, 0] as [number, number, number] },
  ],
  statues: [
    { url: "/statue_vodoun.glb", scale: 2, position: [0, 0.5, 0] as [number, number, number] },
  ],
};

export default function MaskGalleryPage() {
  const router = useRouter();
  const [lightOn, setLightOn] = useState(true);
  const [currentGroup, setCurrentGroup] = useState<keyof typeof MODEL_GROUPS>("masks");

  const toggleLight = () => setLightOn((prev) => !prev);

  const categories = [
    { key: "masks", label: "Masques", thumbnail: "/mask_benin-removebg-preview.png" },
    { key: "zangbetos", label: "Zangbétos", thumbnail: "/zangbéto3-removebg-preview.png" },
    { key: "Egungun", label: "Egungun", thumbnail: "/egungun_miniature.png" },
    { key: "statues", label: "Statues", thumbnail: "/statue_vodoun.png" },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0e0e0f] text-white">

      {/* === 3D Scene === */}
      <div className="absolute inset-0">
        <ModelScene
          key={currentGroup}
          models={MODEL_GROUPS[currentGroup]}
          lightsOn={lightOn}
          backgroundImage="bg_pattern_vodou.png"
        />
      </div>

      {/* === Header === */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.15em] text-white/90">
          <span className="font-semibold text-white">{categories.find(c => c.key === currentGroup)?.label}</span>
        </h1>
        <p className="text-sm md:text-base text-neutral-400 mt-2 uppercase tracking-[0.25em]">
          Collection Vodoun
        </p>
      </header>

      {/* === Mosaic Selector === */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30 bg-black/20 p-3 rounded-2xl backdrop-blur-md border border-white/10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCurrentGroup(cat.key as keyof typeof MODEL_GROUPS)}
            className={`flex flex-col items-center p-2 rounded-lg transition ${
              currentGroup === cat.key
                ? "bg-white/20 ring-2 ring-amber-400"
                : "bg-white/10 hover:bg-white/15"
            }`}
          >
            <div className="relative w-16 h-16 rounded-md overflow-hidden">
              <Image
                src={cat.thumbnail}
                alt={cat.label}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className="mt-1 text-xs uppercase tracking-widest text-white/80">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* === Buttons === */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-40 h-12 w-12 md:h-14 md:w-14 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={toggleLight}
        className="absolute top-6 right-6 z-40 h-12 w-12 md:h-14 md:w-14 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 flex items-center justify-center"
      >
        {lightOn ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
