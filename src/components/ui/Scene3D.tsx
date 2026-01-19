"use client";

import { motion } from "framer-motion";

export default function Scene3D() {
    return (
        <div className="w-full h-[400px] md:h-[500px] relative flex items-center justify-center overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 grid-bg opacity-50" />

            {/* Stars background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() > 0.8 ? "3px" : "2px",
                            height: Math.random() > 0.8 ? "3px" : "2px",
                            background: Math.random() > 0.5 ? "#00d4ff" : "#ffffff",
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main animated orb */}
            <motion.div
                className="relative w-56 h-56 md:w-72 md:h-72"
                animate={{
                    rotateY: [0, 360],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* Core sphere with deep blue gradient */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, #00d4ff, #1e3a5f, #0a1628, #030712)",
                        boxShadow: `
              0 0 80px rgba(0, 212, 255, 0.4),
              0 0 120px rgba(30, 58, 95, 0.3),
              inset 0 0 80px rgba(0, 0, 0, 0.6),
              inset -20px -20px 40px rgba(0, 212, 255, 0.1)
            `,
                    }}
                    animate={{
                        scale: [1, 1.03, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Inner glow ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border border-cyan-500/20"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.95, 1, 0.95],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Outer glow effect */}
                <motion.div
                    className="absolute inset-[-20px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, transparent 50%, rgba(0, 212, 255, 0.15) 70%, transparent 100%)",
                    }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orbiting ring 1 - Cyan */}
                <motion.div
                    className="absolute inset-[-30px] rounded-full"
                    style={{
                        border: "2px solid rgba(0, 212, 255, 0.4)",
                        transform: "rotateX(75deg)",
                    }}
                    animate={{
                        rotateZ: [0, 360],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <motion.div
                        className="absolute w-4 h-4 rounded-full -top-2 left-1/2 -translate-x-1/2"
                        style={{
                            background: "linear-gradient(135deg, #00d4ff, #1e3a5f)",
                            boxShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </motion.div>

                {/* Orbiting ring 2 - Dark blue accent */}
                <motion.div
                    className="absolute inset-[-50px] rounded-full"
                    style={{
                        border: "1px solid rgba(30, 58, 95, 0.5)",
                        transform: "rotateX(60deg) rotateY(20deg)",
                    }}
                    animate={{
                        rotateZ: [360, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <motion.div
                        className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
                        style={{
                            background: "linear-gradient(135deg, #1e3a5f, #2d4a6f)",
                            boxShadow: "0 0 15px rgba(30, 58, 95, 0.8)",
                        }}
                    />
                </motion.div>

                {/* Orbiting ring 3 */}
                <motion.div
                    className="absolute inset-[-70px] rounded-full"
                    style={{
                        border: "1px solid rgba(0, 212, 255, 0.15)",
                        transform: "rotateX(50deg) rotateY(-25deg)",
                    }}
                    animate={{
                        rotateZ: [0, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <motion.div
                        className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
                        style={{
                            background: "#00d4ff",
                            boxShadow: "0 0 10px rgba(0, 212, 255, 0.6)",
                        }}
                    />
                </motion.div>

                {/* Data streams effect */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`stream-${i}`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: "2px",
                            height: "80px",
                            background: "linear-gradient(180deg, transparent, #00d4ff, transparent)",
                            transformOrigin: "center center",
                            rotate: `${i * 120}deg`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scaleY: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                        }}
                    />
                ))}
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: `${4 + Math.random() * 4}px`,
                        height: `${4 + Math.random() * 4}px`,
                        background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#1e3a5f" : "#2d4a6f",
                        boxShadow: `0 0 ${10 + i * 2}px ${i % 3 === 0 ? "#00d4ff" : "#1e3a5f"}`,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 80 - 40, 0],
                        y: [0, Math.random() * 80 - 40, 0],
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}

            {/* Hexagon decorative elements */}
            <motion.div
                className="absolute bottom-10 right-10 w-16 h-16 opacity-20"
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "linear-gradient(135deg, #00d4ff, #1e3a5f)",
                }}
                animate={{
                    rotate: [0, 360],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute top-10 left-10 w-12 h-12 opacity-15"
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "linear-gradient(135deg, #1e3a5f, #00d4ff)",
                }}
                animate={{
                    rotate: [360, 0],
                    opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}
