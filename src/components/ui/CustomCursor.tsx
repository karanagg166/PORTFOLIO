"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CustomCursorProps {
    color?: string;
    size?: number;
}

export default function CustomCursor({
    color = "#00d4ff",
    size = 20,
}: CustomCursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Motion values for smooth cursor movement
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring animation for smooth following
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if device has touch (skip cursor on mobile)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - size / 2);
            cursorY.set(e.clientY - size / 2);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add hover detection for interactive elements
        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('glow-btn') ||
                target.classList.contains('nav-link') ||
                target.classList.contains('interactive');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousemove", handleElementHover);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousemove", handleElementHover);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible, size]);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 500, damping: 28 },
                    opacity: { duration: 0.2 },
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: size,
                        height: size,
                        backgroundColor: color,
                        boxShadow: isHovering
                            ? `0 0 20px ${color}, 0 0 40px ${color}`
                            : `0 0 10px ${color}`,
                        transition: "box-shadow 0.3s ease",
                    }}
                />
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed pointer-events-none z-[9998] rounded-full border-2"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    borderColor: color,
                    width: size * 2.5,
                    height: size * 2.5,
                    marginLeft: -(size * 0.75),
                    marginTop: -(size * 0.75),
                }}
                animate={{
                    scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
                    opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.2 },
                }}
            />

            {/* Global style to hide default cursor */}
            <style jsx global>{`
                @media (hover: hover) and (pointer: fine) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
}
