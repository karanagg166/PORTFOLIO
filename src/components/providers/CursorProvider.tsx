'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useUIStore } from '@/store/useUIStore';

/**
 * CursorProvider — Custom cursor with CSS-driven smooth following
 * Uses native CSS transitions + will-change for GPU compositing.
 * No GSAP, no requestAnimationFrame loop.
 */
export default function CursorProvider() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cursorVariant = useUIStore((s) => s.cursorVariant);

  useEffect(() => {
    // Only on devices with a fine pointer (mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = '';
    };
  }, []);

  // Cursor morph classes based on variant
  const outerClass = cursorVariant === 'hover'
    ? 'w-12 h-12 border-purple-400/70 bg-purple-500/10'
    : cursorVariant === 'typing'
      ? 'w-6 h-6 border-cyan-400/70 rounded-sm'
      : 'w-8 h-8 border-cyan-500/50';

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[100] mix-blend-screen hidden md:block transition-[width,height,border-color,background-color,border-radius] duration-300 ${outerClass}`}
        style={{ willChange: 'transform', transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s, border-radius 0.3s' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[100] mix-blend-screen hidden md:block shadow-[0_0_10px_#06b6d4]"
        style={{ willChange: 'transform', transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
    </>
  );
}
