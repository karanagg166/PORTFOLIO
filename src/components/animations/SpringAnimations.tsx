"use client";

// React Spring Web Animations (works without R3F Canvas)
import { useSpring, animated, config } from "@react-spring/web";
import { useState } from "react";

interface SpringCardProps {
    children: React.ReactNode;
    className?: string;
}

// Card with spring hover effect
export function SpringCard({ children, className = "" }: SpringCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const springs = useSpring({
        transform: isHovered ? "scale(1.05) translateY(-10px)" : "scale(1) translateY(0px)",
        boxShadow: isHovered
            ? "0 25px 50px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.2)"
            : "0 10px 30px rgba(0, 0, 0, 0.3)",
        config: config.wobbly,
    });

    return (
        <animated.div
            style={springs}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={className}
        >
            {children}
        </animated.div>
    );
}

// Bouncy button with spring animation
export function SpringButton({
    children,
    className = "",
    onClick
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const [clicked, setClicked] = useState(false);

    const springs = useSpring({
        scale: clicked ? 0.95 : 1,
        config: config.stiff,
    });

    return (
        <animated.button
            style={{ transform: springs.scale.to(s => `scale(${s})`) }}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
            onMouseLeave={() => setClicked(false)}
            onClick={onClick}
            className={className}
        >
            {children}
        </animated.button>
    );
}

// Floating element with spring physics
export function SpringFloat({
    children,
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const springs = useSpring({
        from: { y: 0 },
        to: async (next) => {
            while (true) {
                await next({ y: -15 });
                await next({ y: 0 });
            }
        },
        delay,
        config: { tension: 100, friction: 10 },
    });

    return (
        <animated.div style={{ transform: springs.y.to(y => `translateY(${y}px)`) }} className={className}>
            {children}
        </animated.div>
    );
}

// Animated number counter with spring
export function SpringCounter({
    value,
    className = ""
}: {
    value: number;
    className?: string;
}) {
    const springs = useSpring({
        number: value,
        from: { number: 0 },
        config: { tension: 50, friction: 14 },
    });

    return (
        <animated.span className={className}>
            {springs.number.to(n => Math.floor(n))}
        </animated.span>
    );
}

// Reveal animation on mount
export function SpringReveal({
    children,
    direction = "up",
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
}) {
    const directions = {
        up: { from: { y: 50, opacity: 0 }, to: { y: 0, opacity: 1 } },
        down: { from: { y: -50, opacity: 0 }, to: { y: 0, opacity: 1 } },
        left: { from: { x: 50, opacity: 0 }, to: { x: 0, opacity: 1 } },
        right: { from: { x: -50, opacity: 0 }, to: { x: 0, opacity: 1 } },
    };

    const springs = useSpring({
        from: directions[direction].from,
        to: directions[direction].to,
        delay,
        config: config.gentle,
    });

    return (
        <animated.div
            style={{
                transform: springs.y
                    ? springs.y.to(y => `translateY(${y}px)`)
                    : springs.x?.to(x => `translateX(${x}px)`),
                opacity: springs.opacity,
            }}
            className={className}
        >
            {children}
        </animated.div>
    );
}

// Pulsing glow effect
export function SpringGlow({
    children,
    color = "#00d4ff",
    className = ""
}: {
    children: React.ReactNode;
    color?: string;
    className?: string;
}) {
    const springs = useSpring({
        from: { glow: 0 },
        to: async (next) => {
            while (true) {
                await next({ glow: 1 });
                await next({ glow: 0 });
            }
        },
        config: { duration: 2000 },
    });

    return (
        <animated.div
            style={{
                boxShadow: springs.glow.to(
                    g => `0 0 ${20 + g * 30}px ${color}${Math.floor(40 + g * 40).toString(16)}`
                ),
            }}
            className={className}
        >
            {children}
        </animated.div>
    );
}
