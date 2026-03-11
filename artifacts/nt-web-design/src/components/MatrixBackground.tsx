import React, { useEffect, useRef } from 'react';

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789∑∆∏'.split('');
    const fontSize = 15;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Semi-transparent dark navy background to create the fade effect
      ctx.fillStyle = 'rgba(6, 10, 20, 0.08)'; 
      ctx.fillRect(0, 0, width, height);

      // Electric blue text
      ctx.fillStyle = '#00AADD'; 
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrame: number;
    // Slow down the matrix slightly
    let lastTime = 0;
    const interval = 50; // ms between frames

    const loop = (time: number) => {
      if (time - lastTime > interval) {
        draw();
        lastTime = time;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) drops[x] = 1;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
    />
  );
}
