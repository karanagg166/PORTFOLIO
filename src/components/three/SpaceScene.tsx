'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ThreeErrorBoundary from './ThreeErrorBoundary';
import ThreeGuard from './ThreeGuard';
import StarField from './StarField';
import BlackHole from './BlackHole';
import Planet from './Planet';
import NoiseWaves from './NoiseWaves';
import Astronaut from './Astronaut';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  
  useFrame(() => {
    // Calculate scroll progress 0 to 1
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    // Top: [0, 0, 5]
    // Mid: orbits closer, e.g. [-2, 1, 2]
    // Bottom: pulls back, e.g. [0, -1, 7]
    
    if (scrollProgress < 0.5) {
      const p = scrollProgress * 2; // 0 to 1
      targetPos.current.set(
        -2 * p,
        1 * p,
        5 - 3 * p
      );
    } else {
      const p = (scrollProgress - 0.5) * 2; // 0 to 1
      targetPos.current.set(
        -2 + 2 * p,
        1 - 2 * p,
        2 + 5 * p
      );
    }
    
    // Lerp camera position
    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function SpaceScene() {
  const perf = useDevicePerformance();

  return (
    <ThreeGuard>
      <ThreeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        >
          <color attach="background" args={['#030712']} />
          <ambientLight intensity={0.2} />
          
          <CameraController />
          <StarField />
          <BlackHole />
          <Planet />
          <NoiseWaves />
          <Astronaut />
          
          {perf !== 'low' && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
            </EffectComposer>
          )}
        </Canvas>
      </ThreeErrorBoundary>
    </ThreeGuard>
  );
}
