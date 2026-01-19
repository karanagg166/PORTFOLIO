"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface GSAPTextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export function GSAPTextReveal({ children, className = "", delay = 0 }: GSAPTextRevealProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        const split = new SplitType(textRef.current, { types: "chars,words" });

        gsap.from(split.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            delay,
            ease: "back.out(1.7)",
        });

        return () => {
            split.revert();
        };
    }, { scope: textRef });

    return (
        <div ref={textRef} className={className}>
            {children}
        </div>
    );
}

interface GSAPFadeInProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
}

export function GSAPFadeIn({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.8
}: GSAPFadeInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const directions = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { y: 0, x: 60 },
            right: { y: 0, x: -60 },
        };

        gsap.from(ref.current, {
            opacity: 0,
            ...directions[direction],
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface GSAPScaleInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function GSAPScaleIn({ children, className = "", delay = 0 }: GSAPScaleInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.from(ref.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface GSAPStaggerProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}

export function GSAPStagger({ children, className = "", stagger = 0.1 }: GSAPStaggerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const items = ref.current.children;

        gsap.from(items, {
            opacity: 0,
            y: 40,
            stagger,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Magnetic button effect
interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
