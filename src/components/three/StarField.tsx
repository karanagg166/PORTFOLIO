'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

/**
 * StarField — Fixed realistic star positions from orbital perspective (no twinkling, no shooting stars)
 * Features rare satellite glint on medium/high tier
 */
export default React.memo(function StarField() {
  const { tier } = useDevicePerformance();
  const count = tier === 'high' ? 1200 : tier === 'medium' ? 600 : 300;

  const pointsRef = useRef<THREE.Points>(null);
  const glintRef = useRef<THREE.Points>(null);

  // Fixed star positions and realistic color distribution
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Depth spread (-50 to -5)
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -Math.random() * 45 - 5;

      const mix = Math.random();
      if (mix < 0.70) {
        // 70% Cold white
        col[i * 3] = 0.91; col[i * 3 + 1] = 0.92; col[i * 3 + 2] = 0.94;
      } else if (mix < 0.85) {
        // 15% Warm white
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.97; col[i * 3 + 2] = 0.90;
      } else if (mix < 0.95) {
        // 10% Faint blue
        col[i * 3] = 0.72; col[i * 3 + 1] = 0.78; col[i * 3 + 2] = 0.91;
      } else {
        // 5% Subtle orange
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.88; col[i * 3 + 2] = 0.69;
      }

      // Variable star size
      sz[i] = Math.random() * 0.08 + 0.03;
    }

    return [pos, col, sz];
  }, [count]);

  // Satellite glint position
  const glintPos = useMemo(() => new Float32Array([12, 8, -15]), []);

  useFrame((state) => {
    // Satellite glint animation: brightens briefly every ~30s
    if (glintRef.current) {
      const t = state.clock.getElapsedTime();
      const cycle = t % 30;
      let opacity = 0;
      if (cycle > 14 && cycle < 16) {
        // 2-second flash pulse
        opacity = Math.sin((cycle - 14) * Math.PI / 2) * 0.9;
      }
      (glintRef.current.material as THREE.PointsMaterial).opacity = opacity;
    }
  });

  return (
    <>
      {/* Fixed Stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Rare Satellite Glint */}
      {tier !== 'low' && (
        <points ref={glintRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[glintPos, 3]}
              count={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.12}
            color="#ffffff"
            transparent
            opacity={0}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
});
