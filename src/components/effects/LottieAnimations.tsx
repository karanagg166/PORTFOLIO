"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Space-themed rocket animation data (inline for simplicity)
const rocketAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Rocket",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Rocket",
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: -45 },
                p: {
                    a: 1,
                    k: [
                        { t: 0, s: [50, 50], e: [45, 45] },
                        { t: 15, s: [45, 45], e: [50, 50] },
                        { t: 30, s: [50, 50], e: [55, 55] },
                        { t: 45, s: [55, 55], e: [50, 50] },
                        { t: 60, s: [50, 50] }
                    ]
                },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "el",
                            s: { a: 0, k: [20, 30] },
                            p: { a: 0, k: [0, 0] }
                        },
                        {
                            ty: "fl",
                            c: { a: 0, k: [0, 0.83, 1, 1] },
                            o: { a: 0, k: 100 }
                        },
                        {
                            ty: "tr",
                            p: { a: 0, k: [0, 0] },
                            a: { a: 0, k: [0, 0] },
                            s: { a: 0, k: [100, 100] },
                            r: { a: 0, k: 0 },
                            o: { a: 0, k: 100 }
                        }
                    ]
                }
            ]
        },
        {
            ddd: 0,
            ind: 2,
            ty: 4,
            nm: "Flame",
            sr: 1,
            ks: {
                o: {
                    a: 1,
                    k: [
                        { t: 0, s: [100], e: [60] },
                        { t: 15, s: [60], e: [100] },
                        { t: 30, s: [100], e: [60] },
                        { t: 45, s: [60], e: [100] },
                        { t: 60, s: [100] }
                    ]
                },
                r: { a: 0, k: -45 },
                p: {
                    a: 1,
                    k: [
                        { t: 0, s: [62, 62], e: [57, 57] },
                        { t: 15, s: [57, 57], e: [62, 62] },
                        { t: 30, s: [62, 62], e: [67, 67] },
                        { t: 45, s: [67, 67], e: [62, 62] },
                        { t: 60, s: [62, 62] }
                    ]
                },
                a: { a: 0, k: [0, 0] },
                s: {
                    a: 1,
                    k: [
                        { t: 0, s: [100, 100], e: [80, 120] },
                        { t: 15, s: [80, 120], e: [100, 100] },
                        { t: 30, s: [100, 100], e: [120, 80] },
                        { t: 45, s: [120, 80], e: [100, 100] },
                        { t: 60, s: [100, 100] }
                    ]
                }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "el",
                            s: { a: 0, k: [12, 20] },
                            p: { a: 0, k: [0, 0] }
                        },
                        {
                            ty: "fl",
                            c: { a: 0, k: [1, 0.5, 0, 1] },
                            o: { a: 0, k: 100 }
                        },
                        {
                            ty: "tr",
                            p: { a: 0, k: [0, 0] },
                            a: { a: 0, k: [0, 0] },
                            s: { a: 0, k: [100, 100] },
                            r: { a: 0, k: 0 },
                            o: { a: 0, k: 100 }
                        }
                    ]
                }
            ]
        }
    ]
};

// Pulsing circle animation
const pulseAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Pulse",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Circle",
            sr: 1,
            ks: {
                o: {
                    a: 1,
                    k: [
                        { t: 0, s: [100], e: [30] },
                        { t: 30, s: [30], e: [100] },
                        { t: 60, s: [100] }
                    ]
                },
                p: { a: 0, k: [50, 50] },
                s: {
                    a: 1,
                    k: [
                        { t: 0, s: [50, 50], e: [100, 100] },
                        { t: 30, s: [100, 100], e: [50, 50] },
                        { t: 60, s: [50, 50] }
                    ]
                }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "el",
                            s: { a: 0, k: [60, 60] },
                            p: { a: 0, k: [0, 0] }
                        },
                        {
                            ty: "st",
                            c: { a: 0, k: [0, 0.83, 1, 1] },
                            o: { a: 0, k: 100 },
                            w: { a: 0, k: 2 }
                        },
                        {
                            ty: "tr",
                            p: { a: 0, k: [0, 0] }
                        }
                    ]
                }
            ]
        }
    ]
};

// Loading spinner animation
const spinnerAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Spinner",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Arc",
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: {
                    a: 1,
                    k: [
                        { t: 0, s: [0], e: [360] },
                        { t: 60, s: [360] }
                    ]
                },
                p: { a: 0, k: [50, 50] },
                s: { a: 0, k: [100, 100] }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "el",
                            s: { a: 0, k: [40, 40] },
                            p: { a: 0, k: [0, 0] }
                        },
                        {
                            ty: "st",
                            c: { a: 0, k: [0, 0.83, 1, 1] },
                            o: { a: 0, k: 100 },
                            w: { a: 0, k: 3 }
                        },
                        {
                            ty: "tm",
                            s: { a: 0, k: 0 },
                            e: { a: 0, k: 25 },
                            o: { a: 0, k: 0 }
                        },
                        {
                            ty: "tr",
                            p: { a: 0, k: [0, 0] }
                        }
                    ]
                }
            ]
        }
    ]
};

interface LottieAnimationProps {
    type?: "rocket" | "pulse" | "spinner";
    size?: number;
    className?: string;
    loop?: boolean;
}

export function LottieAnimation({
    type = "rocket",
    size = 100,
    className = "",
    loop = true
}: LottieAnimationProps) {
    const animations = {
        rocket: rocketAnimation,
        pulse: pulseAnimation,
        spinner: spinnerAnimation,
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={className}
            style={{ width: size, height: size }}
        >
            <Lottie
                animationData={animations[type]}
                loop={loop}
                style={{ width: "100%", height: "100%" }}
            />
        </motion.div>
    );
}

// Loading component using Lottie
export function LottieLoader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <LottieAnimation type="spinner" size={60} />
            <p className="text-cyan-400 text-sm font-medium animate-pulse">{text}</p>
        </div>
    );
}

// Decorative floating element
export function LottieFloatingDecor({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{
                y: [0, -20, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <LottieAnimation type="pulse" size={80} />
        </motion.div>
    );
}
