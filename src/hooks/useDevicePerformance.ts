import { useState, useEffect } from 'react';

export function useDevicePerformance() {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTier('low');
      return;
    }

    // Mobile check: mobile screens should not run high tier effects
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

  return tier;
}
