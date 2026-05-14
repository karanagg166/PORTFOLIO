'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useMouse } from '@/hooks/useMouse';
import { useUIStore } from '@/store/useUIStore';
import gsap from 'gsap';

export default function CursorProvider() {
  const mouseRef = useMouse();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const cursorVariant = useUIStore((s) => s.cursorVariant);

  useEffect(() => {
    // Hide default cursor on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'none';
    }

    const animate = () => {
      const { x, y } = mouseRef.current;
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: x - 16,
          y: y - 16,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: x - 3,
          y: y - 3,
          duration: 0.08,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = '';
    };
  }, [mouseRef]);

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
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[100] mix-blend-screen hidden md:block shadow-[0_0_10px_#06b6d4]"
      />
    </>
  );
}
