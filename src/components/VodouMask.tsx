'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type VodouMaskProps = ThreeElements['group'] & {
  url: string;
  float?: boolean;
  woodTexture?: THREE.Texture;
};

export function VodouMask({ url, float = false, woodTexture, ...props }: VodouMaskProps) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(url) as { scene: THREE.Group };

  // Si on a une texture bois, on l'applique à tous les meshes
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
    // Sinon, on conserve le traitement existant
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.envMapIntensity = 1.2;
          }
        });
      }
    });
  }

  // Animation de flottement optionnelle
  useFrame(({ clock }) => {
    if (float && ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return <primitive ref={ref} object={scene} {...props} dispose={null} />;
}
