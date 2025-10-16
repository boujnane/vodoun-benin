'use client';
import { useRef, useEffect } from 'react';

export default function KaleidoscopeEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Détection mobile et ajustement du nombre de "tranches"
    const isMobile = window.innerWidth < 800;
    const slices = isMobile ? 10 : 15;
    const mirror = true;

    // Gestion du ratio pour affichage net sur mobile
    const DPR = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    let w2 = w / 2;
    let h2 = h / 2;
    const { PI, sin, cos } = Math;
    const PI2 = PI * 2;

    const offset = { x: 50, y: 10 };
    let img: HTMLImageElement | null = null;
    let pattern: CanvasPattern | null = null;

    function setup() {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = 'https://cdn.midjourney.com/892f003f-3516-4d5a-936c-20dadc35936a/0_0.png';
      img.onload = () => {
        if (!ctx) return;
        pattern = ctx.createPattern(img!, 'repeat');
        requestAnimationFrame(loop);
      };
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const radius = w2 + h2;
      const deltaAngle = PI2 / slices;
      const x = [-1, -1, radius * sin(deltaAngle), radius * sin(deltaAngle / 2)];
      const y = [-1, radius, radius * cos(deltaAngle), radius * cos(deltaAngle / 2)];

      for (let i = 0; i < slices; i++) {
        // tranche principale
        ctx.save();
        ctx.translate(w2, h2);
        ctx.rotate(i * deltaAngle);
        ctx.translate(offset.x, offset.y);

        ctx.beginPath();
        ctx.moveTo(x[0] - offset.x, y[0] - offset.y);
        ctx.lineTo(x[1] - offset.x, y[1] - offset.y);
        ctx.lineTo(x[2] - offset.x, y[2] - offset.y);
        ctx.closePath();

        if (pattern) ctx.fillStyle = pattern;
        ctx.fill();
        ctx.restore();

        // tranche miroir
        if (mirror) {
          ctx.save();
          ctx.translate(w2, h2);
          ctx.rotate((i - 1) * deltaAngle);
          ctx.scale(-1, 1);
          ctx.translate(offset.x, offset.y);

          ctx.beginPath();
          ctx.moveTo(x[0] - offset.x, y[0] - offset.y);
          ctx.lineTo(x[1] - offset.x, y[1] - offset.y);
          ctx.lineTo(x[3] - offset.x, y[3] - offset.y);
          ctx.closePath();

          if (pattern) ctx.fillStyle = pattern;
          ctx.fill();
          ctx.restore();
        }
      }

      // ✅ même vitesse qu’avant
      const imgW = img?.width ?? 100;
      const imgH = img?.height ?? 100;
      offset.x = (offset.x + 0.75) % imgW;
      offset.y = (offset.y + 0.25) % imgH;

      requestAnimationFrame(loop);
    }

    function handleResize() {
      if (!canvas || !ctx) return; // ✅ vérifie qu'ils existent
      w = window.innerWidth;
      h = window.innerHeight;
      w2 = w / 2;
      h2 = h / 2;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function handleMouseMove(e: MouseEvent) {
      const imgW = img?.width ?? 0;
      const imgH = img?.height ?? 0;
      offset.x += imgW * (e.movementX / w);
      offset.y += imgH * (e.movementY / h);
    }

    function handleClick() {
      offset.x = 0;
      offset.y = 0;
    }

    window.addEventListener('resize', handleResize);
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    canvas.addEventListener('click', handleClick);

    setup();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        touchAction: 'none',
      }}
    />
  );
}
