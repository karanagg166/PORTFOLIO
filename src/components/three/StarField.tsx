'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

/**
 * StarField — Adaptive star count, colored stars, shooting stars
 */
export default React.memo(function StarField() {
  const perf = useDevicePerformance();
  const count = perf === 'high' ? 2000 : perf === 'medium' ? 1000 : 500;
  const shootingStarCount = perf === 'low' ? 0 : 3;

  const pointsRef = useRef<THREE.Points>(null);
  const shootingRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const shootingGeoRef = useRef<THREE.BufferGeometry>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const mix = Math.random();
      if (mix < 0.3) {
        col[i * 3] = 0.02; col[i * 3 + 1] = 0.71; col[i * 3 + 2] = 0.83; // cyan
      } else if (mix < 0.55) {
        col[i * 3] = 0.49; col[i * 3 + 1] = 0.23; col[i * 3 + 2] = 0.93; // purple
      } else if (mix < 0.7) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.4; // warm
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1; // white
      }
    }

    return [pos, col];
  }, [count]);

  // Shooting star positions
  const shootingPositions = useMemo(() => {
    const pos = new Float32Array(shootingStarCount * 3);
    for (let i = 0; i < shootingStarCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 20 + 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [shootingStarCount]);

  const targetVelocity = useRef(1);
  const currentVelocity = useRef(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      
      if (dt > 0) {
        const deltaY = Math.abs(currentScrollY - lastScrollY.current);
        const velocity = deltaY / dt;
        
        // Map scroll velocity to a speed multiplier (1 to 5)
        targetVelocity.current = Math.min(5, 1 + velocity * 2);
      }
      
      lastScrollY.current = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Decay velocity back to 1 over time
    const decayInterval = setInterval(() => {
      targetVelocity.current = Math.max(1, targetVelocity.current * 0.9);
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayInterval);
    };
  }, []);

  useFrame((state, delta) => {
    // Smoothly interpolate current velocity towards target velocity
    currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.1;
    const speedMult = currentVelocity.current;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015 * speedMult;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.02;
    }

    // Animate shooting stars
    if (shootingRef.current && shootingGeoRef.current && shootingStarCount > 0) {
      const pos = shootingGeoRef.current.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < shootingStarCount; i++) {
        arr[i * 3] -= 0.15 * speedMult; // move left
        arr[i * 3 + 1] -= 0.08 * speedMult; // move down

        // Reset when off-screen
        if (arr[i * 3] < -30 || arr[i * 3 + 1] < -20) {
          arr[i * 3] = (Math.random() - 0.3) * 40 + 15;
          arr[i * 3 + 1] = Math.random() * 15 + 10;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      pos.needsUpdate = true;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometryRef.current?.dispose();
      shootingGeoRef.current?.dispose();
    };
  }, []);

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Shooting stars */}
      {shootingStarCount > 0 && (
        <points ref={shootingRef}>
          <bufferGeometry ref={shootingGeoRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[shootingPositions, 3]}
              count={shootingStarCount}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            color="#ffffff"
            transparent
            opacity={0.9}
            sizeAttenuation
            depthWrite={false}
            toneMapped={false}
          />
        </points>
      )}
    </>
  );
});
