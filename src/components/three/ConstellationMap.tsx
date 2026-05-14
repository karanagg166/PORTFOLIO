'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { SKILLS } from '@/lib/constants';

/**
 * ConstellationMap — Skills as glowing star points grouped by category
 * Connected by faint lines within the same category (like constellations)
 */
export default React.memo(function ConstellationMap() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Group skills by category and assign positions
  const { skillPoints, connections } = useMemo(() => {
    const categories = [...new Set(SKILLS.map((s) => s.category))];
    const categoryAngles: Record<string, number> = {};
    categories.forEach((cat, i) => {
      categoryAngles[cat] = (i / categories.length) * Math.PI * 2;
    });

    const points: Array<{ skill: typeof SKILLS[0]; position: THREE.Vector3 }> = [];

    SKILLS.forEach((skill, i) => {
      const catAngle = categoryAngles[skill.category];
      const catMembers = SKILLS.filter((s) => s.category === skill.category);
      const memberIndex = catMembers.indexOf(skill);
      const memberSpread = memberIndex * 0.7;

      const radius = 2.5 + memberSpread * 0.4;
      const angle = catAngle + (memberIndex - catMembers.length / 2) * 0.25;
      const height = (Math.random() - 0.5) * 1.5;

      points.push({
        skill,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
      });
    });

    // Create connections between skills in the same category
    const conns: Array<[THREE.Vector3, THREE.Vector3]> = [];
    categories.forEach((cat) => {
      const catPoints = points.filter((p) => p.skill.category === cat);
      for (let i = 0; i < catPoints.length - 1; i++) {
        conns.push([catPoints[i].position, catPoints[i + 1].position]);
      }
      // Close the loop if enough points
      if (catPoints.length > 2) {
        conns.push([catPoints[catPoints.length - 1].position, catPoints[0].position]);
      }
    });

    return { skillPoints: points, connections: conns };
  }, []);

  // Create line geometries for connections
  const lineGeometries = useMemo(() => {
    return connections.map(([a, b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      return geo;
    });
  }, [connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Cleanup
  useEffect(() => {
    return () => {
      lineGeometries.forEach((g) => g.dispose());
    };
  }, [lineGeometries]);

  const categoryColors: Record<string, string> = {
    frontend: '#06b6d4',
    backend: '#7c3aed',
    devops: '#22d3ee',
    tools: '#a855f7',
    languages: '#06b6d4',
  };

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {/* Constellation lines */}
      {lineGeometries.map((geo, i) => {
        const lineMat = new THREE.LineBasicMaterial({ color: '#7c3aed', transparent: true, opacity: 0.15 });
        const lineObj = new THREE.Line(geo, lineMat);
        return <primitive key={`line-${i}`} object={lineObj} />;
      })}

      {/* Star points */}
      {skillPoints.map(({ skill, position }) => {
        const isHovered = hoveredSkill === skill.name;
        const color = categoryColors[skill.category] || '#06b6d4';
        const size = (skill.proficiency / 100) * 0.08 + 0.04;

        return (
          <group key={skill.name} position={position}>
            {/* Star glow */}
            <mesh
              onPointerEnter={() => setHoveredSkill(skill.name)}
              onPointerLeave={() => setHoveredSkill(null)}
            >
              <sphereGeometry args={[isHovered ? size * 2.5 : size, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isHovered ? 1 : 0.8}
                toneMapped={false}
              />
            </mesh>

            {/* Outer glow */}
            <mesh>
              <sphereGeometry args={[size * 3, 8, 8]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isHovered ? 0.15 : 0.05}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Label */}
            {isHovered && (
              <Html distanceFactor={10} position={[0, 0.4, 0]} center>
                <div className="px-3 py-1.5 text-xs text-white rounded-md bg-deep-space/90 border border-cyan-500/30 backdrop-blur-sm whitespace-nowrap shadow-xl">
                  <span className="font-bold">{skill.name}</span>
                  <span className="text-white/50 ml-2">{skill.proficiency}%</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
});
