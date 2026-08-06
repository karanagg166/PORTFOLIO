import { useRef, useCallback } from 'react';

interface FPSMonitorOptions {
  onDowngrade?: () => void;
  thresholdFPS?: number;
  consecutiveFailuresThreshold?: number;
}

export function useFPSMonitor(options: FPSMonitorOptions = {}) {
  const {
    onDowngrade,
    thresholdFPS = 20,
    consecutiveFailuresThreshold = 3,
  } = options;

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const lowFPSCount = useRef(0);

  const tick = useCallback(() => {
    const now = performance.now();
    frameCount.current += 1;
    const delta = now - lastTime.current;

    if (delta >= 2000) { // Check every 2 seconds
      const currentFPS = (frameCount.current * 1000) / delta;
      frameCount.current = 0;
      lastTime.current = now;

      if (currentFPS < thresholdFPS) {
        lowFPSCount.current += 1;
        if (lowFPSCount.current >= consecutiveFailuresThreshold) {
          onDowngrade?.();
          lowFPSCount.current = 0;
        }
      } else {
        lowFPSCount.current = 0;
      }
    }
  }, [thresholdFPS, consecutiveFailuresThreshold, onDowngrade]);

  return { tick };
}
