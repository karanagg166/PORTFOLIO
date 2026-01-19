"use client";

// Theatre.js, Lamina, and React Spring Three - Configuration and Exports
// These packages are installed and ready to use with @react-three/fiber

// Theatre.js - Animation Sequencing
// @theatre/core - Core animation engine
// @theatre/studio - Visual animation editor
// @theatre/r3f - React Three Fiber integration

// Lamina - Shader Material Layers
// Provides LayerMaterial, Depth, Fresnel, Noise layers

// React Spring Three - Physics-based animations
// @react-spring/three - Spring animations for 3D

// Note: These require Canvas context from @react-three/fiber
// Due to React 19 + R3F JSX type conflicts, these work at runtime
// but may show TypeScript errors in development.

// Re-export for easy access
export { getProject, types } from "@theatre/core";
export { default as studio } from "@theatre/studio";
export { SheetProvider, editable, PerspectiveCamera } from "@theatre/r3f";
export { LayerMaterial, Depth, Fresnel, Noise, Color, Gradient } from "lamina";
export { useSpring, animated, config } from "@react-spring/three";

// Configuration helper
export const initTheatreStudio = () => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        import("@theatre/studio").then((studio) => {
            studio.default.initialize();
        });
    }
};

// Example usage documentation
export const usageExamples = {
    theatreAnimation: `
    import { getProject, SheetProvider } from "@/components/effects/ThreeDEffects";
    
    const project = getProject("MyProject");
    const sheet = project.sheet("MainSheet");
    
    <Canvas>
      <SheetProvider sheet={sheet}>
        {/* Your animated meshes */}
      </SheetProvider>
    </Canvas>
  `,

    laminaMaterial: `
    import { LayerMaterial, Depth, Fresnel } from "@/components/effects/ThreeDEffects";
    
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial>
        <Depth colorA="#00d4ff" colorB="#000000" />
        <Fresnel color="#00d4ff" intensity={1.5} />
      </LayerMaterial>
    </mesh>
  `,

    reactSpring: `
    import { useSpring, animated } from "@/components/effects/ThreeDEffects";
    
    const [springs, api] = useSpring(() => ({
      scale: 1,
      color: "#00d4ff",
      config: { mass: 1, tension: 170, friction: 26 }
    }));
    
    <animated.mesh scale={springs.scale}>
      <animated.meshStandardMaterial color={springs.color} />
    </animated.mesh>
  `,
};
