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
  applyWood?: boolean;
}

function SceneContent({
  models,
  lightsOn,
  backgroundImage,
}: ModelSceneProps) {
  const lightRefs = {
    front: useRef<THREE.PointLight>(null),
    back: useRef<THREE.PointLight>(null),
    left: useRef<THREE.PointLight>(null),
    right: useRef<THREE.PointLight>(null),
  };

  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (backgroundImage) {
      new THREE.TextureLoader().load(backgroundImage, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        setBgTexture(texture);
      });
    }
  }, [backgroundImage]);

  return (
    <>
      {bgTexture ? <primitive attach="background" object={bgTexture} /> : <color attach="background" args={['#0e0e0f']} />}
      <fog attach="fog" args={['#0e0e0f', 6, 20]} />

      {models.map((model) => (
        <VodouMask
          key={model.url + JSON.stringify(model.position)} // ✅ clé stable et unique
          {...model}
          float
        />
      ))}

      {lightsOn && (
        <>
          <directionalLight position={[0, 30, -150]} intensity={30} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <directionalLight position={[0, 30, 30]} intensity={30} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        </>
      )}

      <Environment preset="night" />
      <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.3} />
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
        }}
      />
    </div>
  );
}
