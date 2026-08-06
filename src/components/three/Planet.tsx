'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateEarthTextures } from './earthTextures';

interface PlanetProps {
  tier?: 'high' | 'medium' | 'low';
}

// Atmosphere Shader
const AtmosphereShader = {
  uniforms: {
    uSunDirection: { value: new THREE.Vector3(5, 3, 4).normalize() },
    uAtmosphereColor: { value: new THREE.Color('#4a8ab5') },
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uSunDirection;
    uniform vec3 uAtmosphereColor;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      
      // Fresnel rim falloff
      float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormal)), 3.0);
      
      // Sun awareness — brighter on sun-facing side
      float sunDot = max(0.0, dot(vNormal, uSunDirection));
      float intensity = fresnel * (0.3 + 0.7 * sunDot);

      gl_FragColor = vec4(uAtmosphereColor, intensity * 0.45);
    }
  `,
};

export default React.memo(function Planet({ tier = 'medium' }: PlanetProps) {
  const planetGroupRef = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  // Generate textures on mount
  const textures = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return generateEarthTextures();
  }, []);

  useFrame((state, delta) => {
    // Slow orbital rotation (~0.5 deg per sec)
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * 0.02;
    }

    // Cloud layer rotates faster
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.026;
    }
  });

  return (
    <group ref={planetGroupRef} position={[2.8, -0.8, -2.5]} rotation={[0.4, 0, 0.1]}>
      {/* 1. Earth Surface */}
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        {textures ? (
          <meshStandardMaterial
            map={textures.dayTexture}
            roughnessMap={textures.specularTexture}
            roughness={0.65}
            metalness={0.0}
            emissiveMap={textures.nightTexture}
            emissive="#ffd080"
            emissiveIntensity={1.2}
          />
        ) : (
          <meshStandardMaterial color="#0a1e3f" roughness={0.7} />
        )}
      </mesh>

      {/* 2. Atmosphere Shell (Thin Fresnel rim, NormalBlending) */}
      <mesh>
        <sphereGeometry args={[2.62, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.NormalBlending}
          uniforms={AtmosphereShader.uniforms}
          vertexShader={AtmosphereShader.vertexShader}
          fragmentShader={AtmosphereShader.fragmentShader}
        />
      </mesh>

      {/* 3. Cloud Layer (High tier only) */}
      {tier === 'high' && textures && (
        <mesh ref={cloudRef}>
          <sphereGeometry args={[2.53, 48, 48]} />
          <meshStandardMaterial
            alphaMap={textures.cloudTexture}
            transparent
            opacity={0.35}
            color="#ffffff"
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
});
