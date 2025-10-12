'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type VodouMaskProps = ThreeElements['group'] & {
  url: string;
  float?: boolean;
};

export function VodouMask({ url, float = false, ...props }: VodouMaskProps) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(url) as { scene: THREE.Group };

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  const initialPosition = (props.position as [number, number, number]) ?? [0, 0, 0];

  useFrame(({ clock }) => {
    if (float && ref.current) {
      ref.current.position.y = initialPosition[1] + Math.sin(clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return <primitive ref={ref} object={scene} {...props} dispose={null} />;
}
