'use client';

import React, { useEffect, useState, useCallback } from 'react';

export default React.memo(function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(current);
      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-white/5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-white shadow-[0_0_12px_#06b6d4,0_0_4px_#7c3aed]"
        style={{ width: `${progress * 100}%`, transition: 'width 50ms linear' }}
      />
    </div>
  );
});
