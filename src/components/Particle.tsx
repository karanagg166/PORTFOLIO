"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Container } from "@tsparticles/engine";

export default function Particle() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // Particles loaded - no console log for production
    }, []);

    // Optimized space-themed particle configuration
    const options: ISourceOptions = useMemo(() => ({
        background: {
            color: {
                value: "transparent",
            },
        },
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        // Lower FPS for better performance
        fpsLimit: 30,
        particles: {
            // Reduced particle count for performance
            number: {
                value: 80,
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
            },
            color: {
                value: [
                    "#ffffff",  // White stars
                    "#e8e8ff",  // Blue-white stars
                    "#fff8e7",  // Yellow-white stars
                    "#00d4ff",  // Cyan accent (rare)
                ],
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: { min: 0.2, max: 1 },
                animation: {
                    enable: true,
                    speed: 0.3,
                    sync: false,
                    startValue: "random",
                },
            },
            size: {
                value: { min: 0.5, max: 2.5 },
                animation: {
                    enable: false, // Disabled for performance
                },
            },
            // Disable links for cleaner space look
            links: {
                enable: false,
            },
            move: {
                enable: true,
                speed: { min: 0.03, max: 0.15 },
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "out",
                },
                attract: {
                    enable: false,
                },
            },
            // Reduced twinkle for performance
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.01, // Reduced from 0.05
                    opacity: 1,
                    color: {
                        value: "#00d4ff",
                    },
                },
            },
            // DISABLED shadows for major performance improvement
            shadow: {
                enable: false,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 120,
                    links: {
                        opacity: 0.2,
                        color: "#00d4ff",
                    },
                },
                push: {
                    quantity: 3,
                },
            },
        },
        detectRetina: true,
        // Performance optimizations - pause when not visible
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        // REMOVED emitters for performance - shooting stars are expensive
    }), []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
        />
    );
}
