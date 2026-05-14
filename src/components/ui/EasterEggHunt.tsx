'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { useEasterEggStore } from '@/store/useEasterEggStore';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/**
 * Easter Egg detector — Konami code, idle screensaver, logo click
 */
export default function EasterEggHunt() {
  const { konamiCount, isMatrixRain, toggleMatrixRain } = useEasterEggStore();
  const konamiRef = useRef<string[]>([]);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > KONAMI_CODE.length) {
        konamiRef.current.shift();
      }

      if (konamiRef.current.length === KONAMI_CODE.length &&
          konamiRef.current.every((k, i) => k === KONAMI_CODE[i])) {
        toggleMatrixRain();
        konamiRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMatrixRain]);

  // Reset idle timer on any interaction
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    window.addEventListener('mousemove', resetIdle, { passive: true });
    window.addEventListener('keydown', resetIdle, { passive: true });

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Konami detection notification */}
      {konamiCount > 0 && (
        <div className="fixed top-20 right-6 z-[60] glass p-4 border border-green-500/50 text-green-400 font-mono text-xs animate-in slide-in-from-right fade-in rounded-lg shadow-2xl">
          🎮 System breach event detected: KONAMI [{konamiCount}]
        </div>
      )}

      {/* Matrix Rain effect */}
      {isMatrixRain && <MatrixRain onClose={toggleMatrixRain} />}
    </>
  );
}

function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`カタカナひらがな';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#06b6d4';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : Math.random() > 0.5 ? '#06b6d4' : '#7c3aed';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    // Auto-close after 10 seconds
    const timeout = setTimeout(onClose, 10000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cyan-400/60 font-mono text-xs">
        Click anywhere or wait to close
      </div>
    </div>
  );
}
