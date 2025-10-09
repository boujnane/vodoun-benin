'use client';
import KaleidoscopeEffect from "@/components/KaleidoscopeEffect";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/main"); // navigation programmatique vers /home
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <KaleidoscopeEffect />

      <div
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10vw',
          fontWeight: '900',
          fontFamily: '"AfricanFont", sans-serif',
          textAlign: 'center',
          color: '#2b9348',
          padding: '0.2em 0.5em',
          borderRadius: '8px',
          WebkitTextStroke: '2px white',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      >
        Vodoun
      </div>
    </div>
  );
}
