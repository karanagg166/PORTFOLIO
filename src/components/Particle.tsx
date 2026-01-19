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
        console.log("Particles container loaded", container);
    }, []);

    // Space-themed particle configuration
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
        fpsLimit: 60,
        particles: {
            // Stars configuration
            number: {
                value: 250,
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
                    "#b0c4de",  // Light steel blue
                    "#add8e6",  // Light blue
                    "#f0f8ff",  // Alice blue
                ],
            },
            shape: {
                type: ["circle", "star"],
                options: {
                    star: {
                        sides: 4,
                    },
                },
            },
            opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                    startValue: "random",
                },
            },
            size: {
                value: { min: 0.5, max: 3 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                    startValue: "random",
                },
            },
            // Disable links for cleaner space look
            links: {
                enable: false,
            },
            move: {
                enable: true,
                speed: { min: 0.05, max: 0.3 },
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
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                    color: {
                        value: "#00d4ff",
                    },
                },
            },
            // Shadow glow effect for stars
            shadow: {
                enable: true,
                color: "#00d4ff",
                blur: 5,
                offset: {
                    x: 0,
                    y: 0,
                },
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
                    distance: 150,
                    links: {
                        opacity: 0.3,
                        color: "#00d4ff",
                    },
                },
                push: {
                    quantity: 5,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        detectRetina: true,
        pauseOnBlur: false,
        pauseOnOutsideViewport: false,
        // Additional emitters for shooting stars
        emitters: [
            {
                direction: "bottom-right",
                rate: {
                    quantity: 1,
                    delay: 8,
                },
                position: {
                    x: 0,
                    y: 0,
                },
                size: {
                    width: 100,
                    height: 0,
                },
                particles: {
                    shape: {
                        type: "circle",
                    },
                    color: {
                        value: "#ffffff",
                    },
                    size: {
                        value: 2,
                    },
                    move: {
                        enable: true,
                        speed: 15,
                        direction: "bottom-right",
                        straight: true,
                        outModes: "destroy",
                    },
                    opacity: {
                        value: 1,
                        animation: {
                            enable: true,
                            speed: 1,
                            startValue: "max",
                            destroy: "min",
                        },
                    },
                    life: {
                        duration: {
                            value: 1.5,
                        },
                        count: 1,
                    },
                },
            },
        ],
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
