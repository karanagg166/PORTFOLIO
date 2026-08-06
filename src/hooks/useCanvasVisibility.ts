import { useState, useEffect } from 'react';

export function useCanvasVisibility() {
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Tab visibility
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 2. Inactivity tracking (30 seconds)
    let timeoutId: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      setIsUserActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsUserActive(false);
      }, 30000);
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, resetInactivityTimer, { passive: true });
    });

    resetInactivityTimer();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, resetInactivityTimer);
      });
    };
  }, []);

  return {
    isDocumentVisible,
    isUserActive,
    shouldRenderCanvas: isDocumentVisible,
  };
}
