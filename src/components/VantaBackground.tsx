'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let VANTA: any;

    const loadVanta = async () => {
      // Import dynamique côté client
      // @ts-ignore
      await import('vanta/dist/vanta.fog.min.js');
      VANTA = (window as any).VANTA;

      if (vantaRef.current && !vantaEffect.current && VANTA && VANTA.FOG) {
        vantaEffect.current = VANTA.FOG({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: 0xffe84b, // jaune
          midtoneColor: 0xa4e000,   // vert
          lowlightColor: 0xff8c00,  // orange
          baseColor: 0x000000,      // noir
          speed: 1.5,
          zoom: 0.7,
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 z-0" />;
}
