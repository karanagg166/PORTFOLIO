import { useState, useEffect } from 'react';

export function useDevicePerformance() {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Basic heuristic: check logical cores
    if (typeof navigator !== 'undefined') {
      const cores = navigator.hardwareConcurrency || 4;
      if (cores < 4) setTier('low');
      else if (cores < 8) setTier('medium');
      else setTier('high');
    }
  }, []);

  return tier;
}
