'use client';

import { Canvas } from '@react-three/fiber';
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useTexture,
} from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { VodouMask } from './VodouMask';
import { Postpro } from './Postpro';

// Masques avec textures bois
function WoodMasks() {
  const woodTexture = useTexture('/textures/wood_texture.png');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);

  return (
    <group position={[0, -0.5, 0]}>
      <VodouMask
        url="/african_mask.glb"
        rotation={[-0.3, 0, 0]}
        scale={0.25}
        position={[0, 0, 3.5]}
        float
        woodTexture={woodTexture}
      />
      <VodouMask
        url="/african_mask2.glb"
        rotation={[0, 2, 0]}
        scale={0.20}
        position={[0, 0, -2.5]}
        float
        woodTexture={woodTexture}
      />
      <VodouMask
        url="/african_mask3.glb"
        rotation={[0, 85, 0]}
        scale={0.08}
        position={[-3, 0, -0.5]}
        float
        woodTexture={woodTexture}
      />
      <VodouMask
        url="/african_mask4.glb"
        rotation={[0, 38, 0]}
        scale={0.09}
        position={[3, 0, 0]}
        float
        woodTexture={woodTexture}
      />
    </group>
  );
}

export function MaskScene() {
  const [lightsOn, setLightsOn] = useState(false); // État de la lumière
  const lightRefs = {
    front: useRef<THREE.PointLight>(null),
    back: useRef<THREE.PointLight>(null),
    left: useRef<THREE.PointLight>(null),
    right: useRef<THREE.PointLight>(null),
  };

  return (
    <>
      {/* Trigger pour allumer/éteindre les lumières */}
      <button
        onClick={() => setLightsOn(!lightsOn)}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 20,
          left: 20,
          padding: '0.5rem 1rem',
          background: '#ffb86c',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        {lightsOn ? 'Éteindre' : 'Allumer'}
      </button>

      <Canvas
        gl={{ antialias: false }}
        shadows
        camera={{ position: [0, 0, 16], fov: 35 }}
      >
        {/* --- Arrière-plan et brouillard --- */}
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 6, 20]} />

        {/* --- Masques --- */}
        <WoodMasks />

        {/* --- Sol et ombres --- */}
        <AccumulativeShadows
          receiveShadow
          temporal
          frames={80}
          opacity={0.7}
          alphaTest={0.8}
          scale={16}
          position={[0, -0.8, 0]}
        >
          <RandomizedLight radius={5} ambient={0.9} position={[6, 8, -10]} bias={0.002} />
        </AccumulativeShadows>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.81, 0]} scale={100} receiveShadow>
          <planeGeometry />
          <meshStandardMaterial
            color="#3a3a3a"
            metalness={0.2}
            roughness={0.6}
            emissive="#111"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* --- Contrôles & environnement --- */}
        <Environment preset="night" />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.3}
        />

        {/* --- Lumières individuelles, activables avec toggle --- */}
        {lightsOn && (
          <>
            <pointLight
              ref={lightRefs.front}
              position={[0, 2, 5]}
              intensity={40}
              color="#ffb86c"
              castShadow
            />
            <pointLight
              ref={lightRefs.back}
              position={[0, 2, -6]}
              intensity={70}
              distance={10}
              color="#ffb86c"
              castShadow
            />
            <pointLight
              ref={lightRefs.left}
              position={[-5, 1.5, -0.5]}
              intensity={27}
              distance={10}
              color="#ffb86c"
              castShadow
            />
            <pointLight
              ref={lightRefs.right}
              position={[5, 2, 0.5]}
              intensity={35}
              distance={26}
              color="#ffb86c"
              castShadow
            />
          </>
        )}

        {/* --- Postprocessing --- */}
        <Postpro />
      </Canvas>
    </>
  );
}
