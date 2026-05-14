'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WaveShaderMaterial — GPU-driven wave displacement
 * Moves all vertex math to the GPU, eliminating CPU bottleneck
 */
class WaveShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#0a0f1a') },
        uEmissive: { value: new THREE.Color('#7c3aed') },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying float vDisplacement;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Multi-layered wave displacement (GPU-side)
          float wave1 = sin(pos.x * 0.3 + uTime * 0.5) * 0.4;
          float wave2 = sin(pos.y * 0.4 + uTime * 0.3) * 0.3;
          float wave3 = sin((pos.x + pos.y) * 0.2 + uTime * 0.7) * 0.2;

          float displacement = wave1 + wave2 + wave3;
          vDisplacement = displacement;
          pos.z += displacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uEmissive;
        varying float vDisplacement;
        varying vec2 vUv;

        void main() {
          // Wireframe-like grid lines using UV coordinates
          vec2 grid = abs(fract(vUv * 64.0 - 0.5) - 0.5);
          float line = min(grid.x, grid.y);
          float wireframe = 1.0 - smoothstep(0.0, 0.05, line);

          // Mix base color with emissive based on displacement
          vec3 color = mix(uColor, uEmissive, abs(vDisplacement) * 0.5);
          float alpha = wireframe * 0.2;

          gl_FragColor = vec4(color + uEmissive * 0.15, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false, // We do our own wireframe in the shader
    });
  }
}

extend({ WaveShaderMaterial });

/**
 * NoiseWaves — GPU-accelerated animated wave field
 * All vertex displacement happens on the GPU via custom shaders.
 * CPU cost: 1 uniform float update per frame (vs 4,096 vertices before)
 */
export default React.memo(function NoiseWaves() {
  const materialRef = useRef<WaveShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      position={[0, -4, -5]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[30, 30, 64, 64]} />
      {/* @ts-expect-error — custom extend'd material */}
      <waveShaderMaterial ref={materialRef} />
    </mesh>
  );
});
