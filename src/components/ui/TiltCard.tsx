"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glareOpacity?: number;
    scale?: number;
}

export default function TiltCard({
    children,
    className = "",
    tiltAmount = 15,
    glareOpacity = 0.15,
    scale = 1.02,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Motion values for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

    // Glare position
    const glareX = useTransform(x, [-0.5, 0.5], ["-50%", "150%"]);
    const glareY = useTransform(y, [-0.5, 0.5], ["-50%", "150%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -0.5 to 0.5
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    scale: isHovering ? scale : 1,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 30 },
                }}
                className="relative w-full h-full"
            >
                {/* 3D elevated content */}
                <div
                    style={{
                        transform: "translateZ(50px)",
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full h-full"
                >
                    {children}
                </div>

                {/* Glare effect */}
                {isHovering && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
                        style={{
                            transform: "translateZ(60px)",
                        }}
                    >
                        <motion.div
                            className="absolute w-[200%] h-[200%] rounded-full"
                            style={{
                                x: glareX,
                                y: glareY,
                                background: `radial-gradient(circle, rgba(0, 212, 255, ${glareOpacity}) 0%, transparent 50%)`,
                            }}
                        />
                    </motion.div>
                )}

                {/* Glow border on hover */}
                <motion.div
                    className="absolute -inset-[1px] rounded-[inherit] pointer-events-none"
                    animate={{
                        opacity: isHovering ? 1 : 0,
                        boxShadow: isHovering
                            ? "0 0 30px rgba(0, 212, 255, 0.4), inset 0 0 30px rgba(0, 212, 255, 0.1)"
                            : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: isHovering
                            ? "linear-gradient(135deg, rgba(0, 212, 255, 0.3), transparent, rgba(0, 212, 255, 0.3))"
                            : "transparent",
                        transform: "translateZ(1px)",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
