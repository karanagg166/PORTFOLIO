'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ThreeErrorBoundary from './ThreeErrorBoundary';
import ThreeGuard from './ThreeGuard';
import StarField from './StarField';
import Planet from './Planet';
import Nebula from './Nebula';
import CosmicDust from './CosmicDust';
import { useFPSMonitor } from '@/hooks/useFPSMonitor';
import type { PerformanceTier } from '@/hooks/useDevicePerformance';

interface SpaceSceneProps {
  tier: PerformanceTier;
  onDowngrade?: () => void;
  onCreated?: () => void;
}

function FPSMonitorComponent({ onDowngrade }: { onDowngrade?: () => void }) {
  const { tick } = useFPSMonitor({ onDowngrade, thresholdFPS: 20, consecutiveFailuresThreshold: 3 });

  useFrame(() => {
    tick();
  });

  return null;
}

function FrameGatedScene({ tier, onDowngrade }: { tier: PerformanceTier; onDowngrade?: () => void }) {
  const lastRenderTime = useRef(0);

  useFrame((state) => {
    if (tier === 'medium') {
      const now = state.clock.getElapsedTime();
      // Cap at ~30 FPS (0.033s)
      if (now - lastRenderTime.current < 0.033) {
        return;
      }
      lastRenderTime.current = now;
    }
  });

  return (
    <>
      <FPSMonitorComponent onDowngrade={onDowngrade} />
      
      {/* Lighting: Single sun light + minimal ambient */}
      <directionalLight position={[5, 3, 4]} intensity={1.2} color="#fff4e0" />
      <ambientLight intensity={0.03} />

      {/* 3D Elements */}
      <StarField />
      <Planet />
      
      {(tier === 'medium' || tier === 'high') && <Nebula />}
      {tier === 'high' && <CosmicDust />}

      {/* Bloom on high tier only */}
      {tier === 'high' && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.85} mipmapBlur intensity={0.4} />
        </EffectComposer>
      )}
    </>
  );
}

export default function SpaceScene({ tier, onDowngrade, onCreated }: SpaceSceneProps) {
  return (
    <ThreeGuard>
      <ThreeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          dpr={tier === 'high' ? [1, 1.5] : [1, 1]}
          onCreated={onCreated}
        >
          <color attach="background" args={['#010205']} />
          <FrameGatedScene tier={tier} onDowngrade={onDowngrade} />
        </Canvas>
      </ThreeErrorBoundary>
    </ThreeGuard>
  );
}
