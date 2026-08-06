'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useCanvasVisibility } from '@/hooks/useCanvasVisibility';

const SpaceScene = dynamic(() => import('./SpaceScene'), { ssr: false });

export default function SpaceSceneWrapper() {
  const { tier, downgradeTier } = useDevicePerformance();
  const { isDocumentVisible } = useCanvasVisibility();
  const [webglFailed, setWebglFailed] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Pre-check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglFailed(true);
      }
    } catch {
      setWebglFailed(true);
    }
  }, []);

  // LOW TIER or WebGL failed -> No 3D Canvas, static poster stays visible
  if (tier === 'low' || webglFailed || !isDocumentVisible) {
    return null;
  }

  return (
    <div
      className="w-full h-full transition-opacity duration-500 ease-out"
      style={{ opacity: canvasReady ? 1 : 0 }}
    >
      <SpaceScene
        tier={tier}
        onDowngrade={downgradeTier}
        onCreated={() => setCanvasReady(true)}
      />
    </div>
  );
}
