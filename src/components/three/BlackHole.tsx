'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BlackHole — Glowing accretion disk with gravitational distortion
 * Uses ring geometry with emissive material + surrounding glow particles
 */
export default React.memo(function BlackHole() {
  const groupRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Accretion disk particles (orbiting ring particles)
  const particleData = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 1.2 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 0.15;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Colors: cyan to purple gradient
      const mix = Math.random();
      if (mix < 0.4) {
        colors[i * 3] = 0.02; colors[i * 3 + 1] = 0.71; colors[i * 3 + 2] = 0.83;
      } else if (mix < 0.7) {
        colors[i * 3] = 0.49; colors[i * 3 + 1] = 0.23; colors[i * 3 + 2] = 0.93;
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 0.2;
      }

      sizes[i] = Math.random() * 0.05 + 0.02;
    }

    return { positions, colors, sizes, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Gentle float
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.15 - 0.5;
    }
    if (diskRef.current) {
      diskRef.current.rotation.z = t * 0.4;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.8;
      // Pulsating scale
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(pulse);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.3;
      particlesRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[3, -0.5, -6]}>
      {/* Event horizon core — dark sphere with subtle emissive edge */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#0a0a1a"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Accretion disk — glowing torus ring */}
      <mesh ref={diskRef} rotation={[Math.PI * 0.45, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#06b6d4"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Secondary inner ring */}
      <mesh rotation={[Math.PI * 0.5, 0.2, 0]}>
        <torusGeometry args={[1.0, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
            count={particleData.count}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleData.colors, 3]}
            count={particleData.count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
});
