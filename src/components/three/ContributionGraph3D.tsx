'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default React.memo(function ContributionGraph3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  const gridSize = 14;
  const cubes = useMemo(() => {
    const list = [];
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let z = -gridSize/2; z < gridSize/2; z++) {
        const h = Math.random() > 0.7 ? Math.random() * 2 : 0.1;
        list.push({ x, z, h });
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -5]} rotation={[0.4, 0, 0]}>
      {cubes.map((c, i) => (
        <mesh key={i} position={[c.x * 0.3, c.h / 2, c.z * 0.3]}>
          <boxGeometry args={[0.2, c.h, 0.2]} />
          <meshStandardMaterial color={c.h > 1 ? "#06b6d4" : c.h > 0.5 ? "#7c3aed" : "#1e293b"} />
        </mesh>
      ))}
    </group>
  );
});
