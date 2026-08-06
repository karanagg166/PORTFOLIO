'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NebulaShader = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;

    // Simple pseudo FBM noise
    float noise(vec2 p) {
      return sin(p.x * 3.0 + uTime * 0.02) * cos(p.y * 3.0 + uTime * 0.015);
    }

    void main() {
      float n = noise(vUv * 2.0);
      float alpha = smoothstep(-0.5, 0.8, n) * 0.12;

      // Desaturated purple #1a0a2e to steel blue #0a1830
      vec3 colDeep = vec3(0.10, 0.04, 0.18);
      vec3 colBlue = vec3(0.04, 0.09, 0.19);
      vec3 color = mix(colDeep, colBlue, n * 0.5 + 0.5);

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

export default React.memo(function Nebula() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -40]} scale={[80, 50, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={NebulaShader.uniforms}
        vertexShader={NebulaShader.vertexShader}
        fragmentShader={NebulaShader.fragmentShader}
      />
    </mesh>
  );
});
