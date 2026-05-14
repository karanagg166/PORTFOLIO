'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Planet — Sphere with atmosphere glow effect using layered meshes
 */
export default React.memo(function Planet() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + 1;
    }
  });

  return (
    <group ref={groupRef} position={[-3, 1, -10]}>
      {/* Planet core */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#06b6d4"
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Surface detail — wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Inner atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ring / orbit line */}
      <mesh rotation={[Math.PI * 0.55, 0.3, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
});
