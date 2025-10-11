'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { VodouMask } from './VodouMask';
import { Postpro } from './Postpro';

interface MaskSceneProps {
  lightsOn?: boolean;
  backgroundImage?: string; // chemin de l'image de fond
}

// Masques avec textures bois
function WoodMasks() {
  const woodTexture = useTexture('/textures/wood_texture.png');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);

  return (
    <group position={[0, -1, 0]}>
      <VodouMask url="/african_mask.glb" rotation={[-0.3, 0, 0]} scale={0.25} position={[0, 0, 3.5]} float woodTexture={woodTexture} />
      <VodouMask url="/african_mask2.glb" rotation={[0, 2, 0]} scale={0.2} position={[0, 0, -2.5]} float woodTexture={woodTexture} />
      <VodouMask url="/african_mask3.glb" rotation={[0, 85, 0]} scale={0.08} position={[-3, 0, -0.5]} float woodTexture={woodTexture} />
      <VodouMask url="/african_mask4.glb" rotation={[0, 38, 0]} scale={0.09} position={[3, 0, 0]} float woodTexture={woodTexture} />
    </group>
  );
}

export function MaskScene({ lightsOn = true, backgroundImage }: MaskSceneProps) {
  const lightRefs = {
    front: useRef<THREE.PointLight>(null),
    back: useRef<THREE.PointLight>(null),
    left: useRef<THREE.PointLight>(null),
    right: useRef<THREE.PointLight>(null),
  };

  // ⚡ Texture chargée côté client pour éviter l'erreur SSR
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (backgroundImage) {
      new THREE.TextureLoader().load(backgroundImage, (texture) => {
        setBgTexture(texture);
      });
    }
  }, [backgroundImage]);

  return (
    <div className="relative w-full h-full">
      {/* Canvas 3D */}
      <Canvas gl={{ antialias: true }} shadows camera={{ position: [0, 0, 16], fov: 35 }}>
        {/* --- Background --- */}
        {bgTexture ? (
          <primitive attach="background" object={bgTexture} />
        ) : (
          <color attach="background" args={['#0e0e0f']} />
        )}
        <fog attach="fog" args={['#0e0e0f', 6, 20]} />

        {/* --- Masks --- */}
        <WoodMasks />

        {/* --- Lights --- */}
        {lightsOn && (
          <>
            <pointLight ref={lightRefs.front} position={[0, 2, 5]} intensity={40} color="#ffb86c" />
            <pointLight ref={lightRefs.back} position={[0, 2, -6]} intensity={70} distance={10} color="#ffb86c" />
            <pointLight ref={lightRefs.left} position={[-5, 1.5, -0.5]} intensity={27} distance={10} color="#ffb86c" />
            <pointLight ref={lightRefs.right} position={[5, 2, 0.5]} intensity={35} distance={26} color="#ffb86c" />
          </>
        )}

        {/* --- Controls & Environment --- */}
        <Environment preset="night" />
        <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.3} />

        {/* --- Postprocessing --- */}
        <Postpro />
      </Canvas>

      {/* Overlay radial noir */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
        }}
      />
    </div>
  );
}
