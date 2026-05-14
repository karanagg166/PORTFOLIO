'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ThreeErrorBoundary from './ThreeErrorBoundary';
import ThreeGuard from './ThreeGuard';
import StarField from './StarField';
import BlackHole from './BlackHole';
import Planet from './Planet';
import NoiseWaves from './NoiseWaves';
import Astronaut from './Astronaut';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

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
