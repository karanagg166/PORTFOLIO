import { useState, useEffect, useCallback } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function useDevicePerformance() {
  const [tier, setTier] = useState<PerformanceTier>('medium');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTier('low');
      return;
    }

    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is non-standard in some browsers
    const memory = navigator.deviceMemory || 4;

    if (cores < 4 || memory < 4) {
      setTier('low');
    } else if (isMobile || cores < 8 || memory < 8) {
      setTier('medium');
    } else {
      setTier('high');
    }
  }, []);

  const downgradeTier = useCallback(() => {
    setTier((prev) => {
      if (prev === 'high') return 'medium';
      if (prev === 'medium') return 'low';
      return 'low';
    });
  }, []);

  return { tier, downgradeTier };
}

