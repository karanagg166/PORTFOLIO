'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Astronaut — Built from geometry primitives (no GLTF dependency)
 * Stylized low-poly astronaut that floats and rotates gently
 */
export default React.memo(function Astronaut() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle float
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.3;
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
    }
  });

  const suitMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e8e8e8',
    roughness: 0.6,
    metalness: 0.1,
  }), []);

  const visorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a1628',
    emissive: '#06b6d4',
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#7c3aed',
    emissive: '#7c3aed',
    emissiveIntensity: 0.3,
    roughness: 0.5,
  }), []);

  return (
    <group ref={groupRef} position={[4, 0, -4]} scale={0.4}>
      {/* Helmet */}
      <mesh position={[0, 1.2, 0]} material={suitMaterial}>
        <sphereGeometry args={[0.55, 16, 16]} />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 1.2, 0.3]} material={visorMaterial}>
        <sphereGeometry args={[0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      </mesh>

      {/* Body / torso */}
      <mesh position={[0, 0.2, 0]} material={suitMaterial}>
        <boxGeometry args={[0.8, 1.0, 0.5]} />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0.3, -0.35]} material={accentMaterial}>
        <boxGeometry args={[0.6, 0.7, 0.25]} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, 0.4]} material={suitMaterial}>
        <capsuleGeometry args={[0.12, 0.6, 4, 8]} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -0.4]} material={suitMaterial}>
        <capsuleGeometry args={[0.12, 0.6, 4, 8]} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.2, -0.7, 0]} rotation={[0, 0, 0.1]} material={suitMaterial}>
        <capsuleGeometry args={[0.14, 0.6, 4, 8]} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.2, -0.7, 0]} rotation={[0, 0, -0.1]} material={suitMaterial}>
        <capsuleGeometry args={[0.14, 0.6, 4, 8]} />
      </mesh>

      {/* Helmet light */}
      <pointLight position={[0, 1.2, 0.6]} intensity={0.5} distance={3} color="#06b6d4" />
    </group>
  );
});
