'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  mappedX: number;
  mappedY: number;
}

export function useMouse() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, mappedX: 0, mappedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        mappedX: (e.clientX / window.innerWidth) * 2 - 1,
        mappedY: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouseRef;
}
