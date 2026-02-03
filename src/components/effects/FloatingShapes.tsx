"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

// Extend Three.js objects for R3F (runtime registration)
extend({
    Mesh: THREE.Mesh,
    IcosahedronGeometry: THREE.IcosahedronGeometry,
    TorusGeometry: THREE.TorusGeometry,
    OctahedronGeometry: THREE.OctahedronGeometry,
    DodecahedronGeometry: THREE.DodecahedronGeometry,
    AmbientLight: THREE.AmbientLight,
    PointLight: THREE.PointLight,
});

interface ShapeProps {
    position: [number, number, number];
    geometry: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
    color: string;
    scale?: number;
    speed?: number;
    distort?: number;
}

function Shape({ position, geometry, color, scale = 1, speed = 1, distort = 0.3 }: ShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
        }
    });

    const geometryComponent = useMemo(() => {
        switch (geometry) {
            case "icosahedron":
                return <icosahedronGeometry args={[1, 0]} />;
            case "torus":
                return <torusGeometry args={[1, 0.4, 8, 16]} />;
            case "octahedron":
                return <octahedronGeometry args={[1, 0]} />;
            case "dodecahedron":
                return <dodecahedronGeometry args={[1, 0]} />;
            default:
                return <icosahedronGeometry args={[1, 0]} />;
        }
    }, [geometry]);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                {geometryComponent}
                <MeshDistortMaterial
                    color={color}
                    wireframe
                    distort={distort}
                    speed={2}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />

            {/* Floating shapes positioned around */}
            <Shape position={[-4, 2, -3]} geometry="icosahedron" color="#00d4ff" scale={0.8} speed={0.8} />
            <Shape position={[4, -1, -2]} geometry="torus" color="#00d4ff" scale={0.6} speed={1.2} />
            <Shape position={[-3, -2, -4]} geometry="octahedron" color="#1e3a5f" scale={0.5} speed={0.9} />
            <Shape position={[3, 2, -5]} geometry="dodecahedron" color="#00d4ff" scale={0.4} speed={1.1} />
            <Shape position={[0, 3, -6]} geometry="icosahedron" color="#1e3a5f" scale={0.3} speed={0.7} />
        </>
    );
}

interface FloatingShapesProps {
    className?: string;
    height?: string;
}

export default function FloatingShapes({
    className = "",
    height = "400px",
}: FloatingShapesProps) {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    return (
        <div
            ref={ref}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ height }}
        >
            {inView && (
                <Canvas
                    frameloop="demand"
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
