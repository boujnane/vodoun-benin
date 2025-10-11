'use client'; 
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
  TiltShift2,
  Vignette,
  ToneMapping,
} from '@react-three/postprocessing';

// Composant pour gérer tous les effets visuels de la scène
export function Postpro() {
  return (
    <EffectComposer enableNormalPass={false}>
      <HueSaturation saturation={-0.4} /> 
      <BrightnessContrast brightness={-0.1} contrast={0.4} />
      <TiltShift2 samples={8} blur={0.8} /> 
      <Bloom 
        mipmapBlur 
        luminanceThreshold={0.5} 
        intensity={1.5} 
        kernelSize={5} 
        luminanceSmoothing={0.0}
      /> 
      <Vignette eskil={false} offset={0.1} darkness={0.8} /> 
      <ToneMapping />
    </EffectComposer>
  );
}