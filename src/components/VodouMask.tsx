'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type VodouMaskProps = ThreeElements['group'] & {
  url: string;
  float?: boolean;
  woodTexture?: THREE.Texture; // facultatif
};

export function VodouMask({ url, float = false, woodTexture, ...props }: VodouMaskProps) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(url) as { scene: THREE.Group };

  // Si une texture bois est fournie, on l'applique
  if (woodTexture) {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: woodTexture,
          roughness: 0.6,
          metalness: 0.2,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  } else {
    // sinon on garde le matériau d'origine et on active l'ombre
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }

  // Position initiale
  const initialPosition = (props.position as [number, number, number]) ?? [0, 0, 0];
  ref.current?.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);

  // Animation flottement
  useFrame(({ clock }) => {
    if (float && ref.current) {
      ref.current.position.y = initialPosition[1] + Math.sin(clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return <primitive ref={ref} object={scene} {...props} dispose={null} />;
}
