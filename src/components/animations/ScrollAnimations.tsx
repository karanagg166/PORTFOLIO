"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    triggerOnce?: boolean;
}

// Uses react-intersection-observer for scroll detection
export function ScrollReveal({
    children,
    className = "",
    threshold = 0.1,
    triggerOnce = true
}: ScrollRevealProps) {
    const { ref, inView } = useInView({
        threshold,
        triggerOnce,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface AutoAnimateListProps {
    children: React.ReactNode;
    className?: string;
}

// Uses @formkit/auto-animate for automatic list animations
export function AutoAnimateList({ children, className = "" }: AutoAnimateListProps) {
    const [parent] = useAutoAnimate({
        duration: 300,
        easing: "ease-out",
    });

    return (
        <div ref={parent} className={className}>
            {children}
        </div>
    );
}

interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

// Parallax scrolling effect
export function Parallax({ children, className = "", speed = 0.5 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const rect = element.getBoundingClientRect();
            const offset = (rect.top + scrolled) * speed;
            element.style.transform = `translateY(${scrolled * speed - offset}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

// Count up animation when in view
export function CountUp({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
    className = ""
}: CountUpProps) {
    const { ref, inView } = useInView({ triggerOnce: true });
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!inView || !countRef.current) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * end);

            if (countRef.current) {
                countRef.current.textContent = `${prefix}${current}${suffix}`;
            }

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [inView, end, duration, suffix, prefix]);

    return (
        <span ref={ref} className={className}>
            <span ref={countRef}>{prefix}0{suffix}</span>
        </span>
    );
}
