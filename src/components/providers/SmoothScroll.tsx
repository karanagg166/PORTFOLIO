"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.5,
            // Performance optimizations
            lerp: 0.1, // Lower lerp = smoother but more CPU; 0.1 is balanced
            wheelMultiplier: 0.8, // Reduce scroll sensitivity
        });

        lenisRef.current = lenis;

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Pause when tab is not visible
        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenis.stop();
            } else {
                lenis.start();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
