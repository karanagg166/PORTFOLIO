"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Copy, Check, Github, Linkedin, Twitter } from "lucide-react";

// Marquee text component
function MarqueeText() {
    const text = "LET'S BUILD SOMETHING AMAZING • LET'S CONNECT • ";
    const repeatedText = text.repeat(10);

    return (
        <div className="overflow-hidden whitespace-nowrap py-8 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10">
            <motion.div
                className="inline-block text-4xl md:text-6xl font-bold text-white/10"
                animate={{ x: [0, -2000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {repeatedText}
            </motion.div>
        </div>
    );
}

// 3D Floating Icon component for the Three.js scene
interface SocialIcon3DProps {
    position: [number, number, number];
    icon: string;
    label: string;
    href: string;
    mousePosition: { x: number; y: number };
}

function SocialIcon3D({ position, icon, label, href, mousePosition }: SocialIcon3DProps) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            // Mouse parallax effect - icons tilt towards cursor
            const targetRotationX = mousePosition.y * 0.3;
            const targetRotationY = mousePosition.x * 0.3;

            meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
            meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;

            // Scale on hover
            const targetScale = hovered ? 1.2 : 1;
            meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
            meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
            meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group
                ref={meshRef}
                position={position}
                onPointerOver={() => {
                    setHovered(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = "default";
                }}
                onClick={() => window.open(href, "_blank")}
            >
                {/* Background glow */}
                <mesh>
                    <circleGeometry args={[1.2, 32]} />
                    <meshBasicMaterial
                        color={hovered ? "#00d4ff" : "#1a1a2e"}
                        transparent
                        opacity={hovered ? 0.3 : 0.1}
                    />
                </mesh>

                {/* Icon ring */}
                <mesh>
                    <ringGeometry args={[0.9, 1, 32]} />
                    <meshBasicMaterial
                        color={hovered ? "#00d4ff" : "#ffffff"}
                        transparent
                        opacity={hovered ? 1 : 0.3}
                    />
                </mesh>

                {/* Icon text */}
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={0.6}
                    color={hovered ? "#00d4ff" : "#ffffff"}
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Inter-Bold.woff"
                >
                    {icon}
                </Text>

                {/* Label */}
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.25}
                    color={hovered ? "#00d4ff" : "#888888"}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </group>
        </Float>
    );
}

// Mouse-following spotlight
function CursorSpotlight({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    const lightRef = useRef<THREE.PointLight>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    useFrame(() => {
        if (lightRef.current && glowRef.current) {
            const x = (mousePosition.x * viewport.width) / 2;
            const y = (mousePosition.y * viewport.height) / 2;

            lightRef.current.position.x += (x - lightRef.current.position.x) * 0.1;
            lightRef.current.position.y += (y - lightRef.current.position.y) * 0.1;
            lightRef.current.position.z = 3;

            glowRef.current.position.copy(lightRef.current.position);
        }
    });

    return (
        <>
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
            </mesh>
            <pointLight
                ref={lightRef}
                color="#ffffff"
                intensity={10}
                distance={12}
                decay={2}
            />
        </>
    );
}

// Main 3D Scene
function ContactScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    const socialItems = [
        { icon: "GH", label: "GitHub", href: "https://github.com/karanagg166", position: [-4, 0, 0] as [number, number, number] },
        { icon: "IN", label: "LinkedIn", href: "https://www.linkedin.com/in/karan-aggarwal-166/", position: [-1.3, 0, 0] as [number, number, number] },
        { icon: "✉", label: "Email", href: "mailto:karanagg166@gmail.com", position: [1.3, 0, 0] as [number, number, number] },
        { icon: "X", label: "Twitter", href: "https://twitter.com/karanagg166", position: [4, 0, 0] as [number, number, number] },
    ];

    return (
        <>
            {/* Very dim ambient light - mostly dark */}
            <ambientLight intensity={0.1} />

            {/* Cursor spotlight */}
            <CursorSpotlight mousePosition={mousePosition} />

            {/* Social icons */}
            {socialItems.map((item) => (
                <SocialIcon3D
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    position={item.position}
                    mousePosition={mousePosition}
                />
            ))}

            {/* Hint text */}
            <Text
                position={[0, 3, 0]}
                fontSize={0.3}
                color="#333333"
                anchorX="center"
                anchorY="middle"
            >
                Move your cursor to explore...
            </Text>
        </>
    );
}

// Copy to clipboard tooltip
function CopyTooltip({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                >
                    Email Copied! ✓
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface ContactProps {
    className?: string;
}

export default function Contact({ className = "" }: ContactProps) {
    const [copied, setCopied] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText("karanagg166@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div ref={ref} className={`min-h-screen py-10 relative ${className}`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-4 relative z-10"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    LET'S <span className="gradient-text">CONNECT</span>
                </h1>
            </motion.div>

            {/* Marquee ticker */}
            <MarqueeText />

            {/* 3D Canvas with Dark Room Effect */}
            <div
                ref={containerRef}
                className="h-[500px] w-full relative"
                style={{ background: "linear-gradient(to bottom, #000000 0%, #0a0a1a 100%)" }}
            >
                {inView && (
                    <Canvas
                        camera={{ position: [0, 0, 10], fov: 45 }}
                        gl={{ antialias: true, alpha: false }}
                        style={{ background: "transparent" }}
                    >
                        <Suspense fallback={null}>
                            <ContactScene mousePosition={mousePosition} />
                        </Suspense>
                    </Canvas>
                )}

                {/* Mobile fallback */}
                <div className="absolute inset-0 flex items-center justify-center gap-6 md:hidden bg-black/80">
                    <a href="https://github.com/karanagg166" target="_blank" rel="noopener noreferrer"
                        className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-colors">
                        <Github size={28} className="text-white" />
                    </a>
                    <a href="https://www.linkedin.com/in/karan-aggarwal-166/" target="_blank" rel="noopener noreferrer"
                        className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-colors">
                        <Linkedin size={28} className="text-white" />
                    </a>
                    <a href="mailto:karanagg166@gmail.com"
                        className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-colors">
                        <Mail size={28} className="text-white" />
                    </a>
                    <a href="https://twitter.com/karanagg166" target="_blank" rel="noopener noreferrer"
                        className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-colors">
                        <Twitter size={28} className="text-white" />
                    </a>
                </div>
            </div>

            {/* Email copy section */}
            <div className="flex justify-center mt-12 relative z-10">
                <motion.button
                    onClick={copyEmail}
                    className="relative group glass-card px-8 py-4 flex items-center gap-4 hover:border-cyan-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <CopyTooltip show={copied} />
                    <Mail className="text-cyan-400" size={24} />
                    <span className="text-lg font-medium">karanagg166@gmail.com</span>
                    <div className="w-px h-6 bg-white/20" />
                    {copied ? (
                        <Check size={20} className="text-green-400" />
                    ) : (
                        <Copy size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    )}
                </motion.button>
            </div>

            {/* Quick links */}
            <div className="flex justify-center gap-8 mt-8 relative z-10">
                {[
                    { icon: <Github size={20} />, href: "https://github.com/karanagg166", label: "GitHub" },
                    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/karan-aggarwal-166/", label: "LinkedIn" },
                    { icon: <Twitter size={20} />, href: "https://twitter.com/karanagg166", label: "Twitter" },
                ].map((link) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                        whileHover={{ y: -2 }}
                    >
                        {link.icon}
                        <span className="text-sm hidden sm:inline">{link.label}</span>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
