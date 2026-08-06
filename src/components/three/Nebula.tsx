'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nebula — Volumetric space gas clouds using layered transparent planes
 * Creates subtle, dark, atmospheric depth in deep space
 */
export default React.memo(function Nebula() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -25]}>
      {/* Deep purple/blue gas cloud 1 */}
      <mesh position={[-5, 2, -10]} rotation={[0, 0, 0.2]}>
        <planeGeometry args={[45, 30]} />
        <meshBasicMaterial
          color="#1a103c"
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dark cyan cosmic dust 2 */}
      <mesh position={[6, -3, -5]} rotation={[0, 0, -0.4]}>
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial
          color="#0a2540"
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Deep indigo background cloud 3 */}
      <mesh position={[0, -5, -15]}>
        <planeGeometry args={[50, 35]} />
        <meshBasicMaterial
          color="#0d1b2a"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
});
