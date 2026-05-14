'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SKILLS } from '@/lib/constants';

function OrbitingSkill({ name, distance, speed, proficiency }: { name: string, distance: number, speed: number, proficiency: number }) {
  const pivotRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  const size = (proficiency / 100) * 0.3;

  return (
    <group ref={pivotRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.01, distance + 0.01, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.5} />
      </mesh>
    </group>
  );
}

export default React.memo(function SkillsSolarSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {SKILLS.map((skill, i) => (
        <OrbitingSkill 
          key={skill.name}
          name={skill.name} 
          distance={1.5 + i * 0.6}
          speed={0.5 - i * 0.05}
          proficiency={skill.proficiency}
        />
      ))}
    </group>
  );
});
