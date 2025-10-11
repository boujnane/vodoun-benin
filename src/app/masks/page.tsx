'use client'; 

import { MaskScene } from "@/components/MaskScene"; // Assurez-vous que le chemin d'importation est correct

// La page de test pour votre masque 3D
export default function MaskTestPage() {
  return (
    // Conteneur plein écran pour le Canvas R3F
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#1a1a1a', // Correspond au fond de la scène 3D
      }}
    >
      <h1 
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          color: '#f0e130',
          textShadow: '0 0 10px rgba(240, 225, 48, 0.5)',
          fontSize: '2rem',
          fontFamily: 'sans-serif',
          textAlign: 'center',
        }}
      >
        MASK 3D (Phase de test)
      </h1>
      
      {/* 🎭 Affichage de votre scène 3D en plein écran */}
      <MaskScene />
      
      <p
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif',
        }}
      >
        Faites glisser pour changer lC&apos;angle de vue.
      </p>
    </div>
  );
}