'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { VodouMask } from './VodouMask';
import { Postpro } from './Postpro';

interface Model {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

interface ModelSceneProps {
  models: Model[];
  lightsOn?: boolean;
  backgroundImage?: string;
  applyWood?: boolean; // seulement pour les masques
}

function SceneContent({
  models,
  lightsOn,
  backgroundImage,
  applyWood = false,
}: ModelSceneProps) {
  const lightRefs = {
    front: useRef<THREE.PointLight>(null),
    back: useRef<THREE.PointLight>(null),
    left: useRef<THREE.PointLight>(null),
    right: useRef<THREE.PointLight>(null),
  };

  const woodTexture = useTexture('/textures/wood_texture.png');
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (backgroundImage) {
      new THREE.TextureLoader().load(backgroundImage, (texture) => setBgTexture(texture));
    }
  }, [backgroundImage]);

  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);

  return (
    <>
      {/* Background */}
      {bgTexture ? <primitive attach="background" object={bgTexture} /> : <color attach="background" args={['#0e0e0f']} />}
      <fog attach="fog" args={['#0e0e0f', 6, 20]} />

      {/* Dynamic models */}
      {models.map((model, i) => (
        <VodouMask
          key={i}
          {...model}
          float
          woodTexture={applyWood ? woodTexture : undefined} // seulement pour masques
        />
      ))}

      {/* Lights */}
      {lightsOn && (
        <>
          {/* Lumière frontale globale pour tous les modèles */}
          <directionalLight
            position={[0, 30, 10]}
            intensity={57}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Lumières d’ambiance supplémentaires */}
          <pointLight ref={lightRefs.front} position={[0, 2, 5]} intensity={140} color="#ffFFFF" />
          <pointLight ref={lightRefs.back} position={[0, 2, -6]} intensity={70} distance={10} color="#ffb86c" />
          <pointLight ref={lightRefs.left} position={[-5, 1.5, -0.5]} intensity={27} distance={10} color="#ffb86c" />
          <pointLight ref={lightRefs.right} position={[5, 2, 0.5]} intensity={35} distance={26} color="#ffb86c" />
        </>
      )}

      {/* Controls & Environment */}
      <Environment preset="night" />
      <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.3} />

      {/* Postprocessing */}
      <Postpro />
    </>
  );
}

export function ModelScene({ models, lightsOn = true, backgroundImage, applyWood = false }: ModelSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas gl={{ antialias: true }} shadows camera={{ position: [0, 0, 16], fov: 35 }}>
        <SceneContent models={models} lightsOn={lightsOn} backgroundImage={backgroundImage} applyWood={applyWood} />
      </Canvas>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
        }}
      />
    </div>
  );
}
