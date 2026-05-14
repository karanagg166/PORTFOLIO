'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NoiseWaves — Animated undulating plane with vertex displacement
 * Creates a flowing wave field beneath the scene
 */
export default React.memo(function NoiseWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // Store initial positions for displacement
  const initialPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 64, 64);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !geometryRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = geometryRef.current.attributes.position;
    const arr = positions.array as Float32Array;

    for (let i = 0; i < positions.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const x = initialPositions[ix];
      const y = initialPositions[iy];

      // Multi-layered wave displacement
      arr[iz] =
        Math.sin(x * 0.3 + t * 0.5) * 0.4 +
        Math.sin(y * 0.4 + t * 0.3) * 0.3 +
        Math.sin((x + y) * 0.2 + t * 0.7) * 0.2;
    }

    positions.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -4, -5]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry ref={geometryRef} args={[30, 30, 64, 64]} />
      <meshStandardMaterial
        color="#0a0f1a"
        emissive="#7c3aed"
        emissiveIntensity={0.15}
        wireframe
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});
